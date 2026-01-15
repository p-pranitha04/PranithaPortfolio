import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight } from "lucide-react";
import profileImage from "@assets/generated_images/Professional_developer_headshot_3fd66208.png";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  heroVariants,
  heroTextVariants,
  heroImageVariants,
  staggerContainer,
  fadeUpVariants,
  getReducedMotionVariants,
} from "@/lib/animations";
import { useRef } from "react";
import TypingAnimation from "./TypingAnimation";

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Parallax scroll effect for image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Pranitha_P.pdf";
    link.download = "Pranitha_P.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get variants based on motion preferences
  const containerVariants = prefersReducedMotion
    ? getReducedMotionVariants(heroVariants)
    : heroVariants;
  const textVariants = prefersReducedMotion
    ? getReducedMotionVariants(heroTextVariants)
    : heroTextVariants;
  const imageVariants = prefersReducedMotion
    ? getReducedMotionVariants(heroImageVariants)
    : heroImageVariants;
  const buttonContainerVariants = prefersReducedMotion
    ? getReducedMotionVariants(staggerContainer)
    : staggerContainer;
  const buttonVariants = prefersReducedMotion
    ? getReducedMotionVariants(fadeUpVariants)
    : fadeUpVariants;

  return (
    <motion.section
      id="hero"
      ref={ref}
      className="min-h-screen flex items-center justify-center pt-20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-8" variants={textVariants}>
            <div className="space-y-4">
              <motion.p
                className="text-primary font-medium text-lg"
                variants={fadeUpVariants}
              >
                Hello, I'm
              </motion.p>
              <motion.h1
                className="text-5xl lg:text-6xl font-bold"
                variants={fadeUpVariants}
              >
                Pranitha P
              </motion.h1>
              <motion.div
                className="text-xl lg:text-2xl text-muted-foreground"
                variants={fadeUpVariants}
              >
                <TypingAnimation
                  text="I build scalable applications, APIs, and cloud-native solutions with over 3+ years of experience"
                  delay={800}
                  speed={30}
                  showCursor={false}
                />
              </motion.div>
              <motion.div
                className="text-lg text-muted-foreground max-w-2xl"
                variants={fadeUpVariants}
              >
                <TypingAnimation
                  text="Software Developer and Data Analyst specializing in full-stack development, cloud architecture, and data-driven solutions. Experienced in Java, Python, JavaScript, and modern cloud platforms."
                  delay={3500}
                  speed={25}
                  showCursor={false}
                />
              </motion.div>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={buttonContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={buttonVariants}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  data-testid="button-view-work"
                  className="group hover-elevate transition-all duration-300"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div
                variants={buttonVariants}
                whileHover={{
                  scale: prefersReducedMotion ? 1 : 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleDownloadResume}
                  data-testid="button-download-resume"
                  className="hover-elevate transition-all duration-300"
                >
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            rotate: [0, -10, 10, 0],
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: "easeInOut",
                            },
                          }
                    }
                  >
                    <Download className="mr-2 h-4 w-4" />
                  </motion.div>
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end"
            variants={imageVariants}
          >
            <div className="relative">
              <motion.div
                className="w-80 h-80 rounded-2xl overflow-hidden border-2 border-border hover-elevate transition-all duration-300"
                style={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: imageY,
                        rotateY: imageRotate,
                      }
                }
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.05,
                        rotateY: 8,
                        rotateX: 5,
                        transition: { duration: 0.3 },
                      }
                }
              >
                <img
                  src={profileImage}
                  alt="Pranitha P - Professional headshot"
                  className="w-full h-full object-cover"
                  data-testid="img-profile"
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }
                }
                transition={
                  prefersReducedMotion
                    ? {}
                    : {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
