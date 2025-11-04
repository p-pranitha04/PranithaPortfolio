import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, RotateCw } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github } from "lucide-react";


interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  achievements: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  achievements,
  liveUrl,
  githubUrl
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device is mobile
  useState(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsFlipped(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only handle click on mobile and if not clicking a button
    if (isMobile && !(e.target as HTMLElement).closest('button')) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleLiveClick = () => {
    console.log(`Live demo clicked for: ${title}`);
    // todo: remove mock functionality
  };

  const handleGithubClick = () => {
    if (githubUrl) {
      window.open(githubUrl, '_blank');
    }
  };

  return (
    <div
      className="group perspective-1000 relative"
      style={{
        height: '384px',
        minHeight: '384px',
        maxHeight: '384px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
      >
        {/* Front Side */}
        <Card className={`absolute inset-0 w-full h-full backface-hidden overflow-hidden shadow-lg ${isMobile ? 'cursor-pointer' : ''}`}
              data-testid={`card-project-front-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <div className="relative h-48 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/90 line-clamp-2">{description}</p>
            </div>
          </div>

          <div className="p-6 space-y-4 flex flex-col h-[calc(100%-12rem)]">
            <div className="flex flex-wrap gap-2 overflow-y-auto flex-1 min-h-0">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs h-fit">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-center pt-4 flex-shrink-0">
              <Button variant="ghost" size="sm" className="pointer-events-none">
                <RotateCw className="w-4 h-4 mr-2" />
                {isMobile ? 'Tap to flip' : 'Hover to flip'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Back Side */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 overflow-hidden shadow-lg"
              data-testid={`card-project-back-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-xl font-bold">
                {title}
              </h3>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto min-h-0">
              <div>
                <h4 className="font-semibold mb-2">About Project</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Features</h4>
                <ul className="space-y-1">
                  {achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t flex-shrink-0">
              {liveUrl && (
                <Button
                  size="sm"
                  onClick={handleLiveClick}
                  data-testid={`button-live-${title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex-1"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              )}
              {githubUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleGithubClick}
                  data-testid={`button-github-${title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex-1"
                >
                  GitHub
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}