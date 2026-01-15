import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, MapPin } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/lib/animations";
import {
  staggerContainer,
  fadeUpVariants,
  scaleInVariants,
  getReducedMotionVariants,
} from "@/lib/animations";

export default function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useInView(0.1);

  const experiences = [
    {
      title: "Cloud AI Engineer",
      company: "RTNextGenAI",
      period: "May 2025 – Present",
      location: "Remote",
      type: "Full-time",
      description:
        "AI-Driven Cloud Infrastructure and Conversational AI Integration",
      achievements: [
        "Engineered REST APIs for AI-driven automation workflows and real-time data exchange",
        "Built chatbot middleware services with OAuth2.0/JWT authentication",
        "Developed serverless functions (AWS Lambda) and data pipelines with BigQuery/DynamoDB",
        "Managed CI/CD pipelines using GitHub Actions and integrated OpenAI/Vertex AI APIs",
      ],
      technologies: [
        "AWS Lambda",
        "OAuth2.0",
        "JWT",
        "BigQuery",
        "DynamoDB",
        "OpenAI",
        "Vertex AI",
        "Docker",
        "GitHub Actions",
      ],
    },
    {
      title: "Software Developer",
      company: "SiAnth Inc",
      period: "May 2024 – Apr 2025",
      location: "Remote",
      type: "Full-time",
      description:
        "Scalable Cloud-Native API Infrastructure with Cursor AI on GCP",
      achievements: [
        "Built scalable backend services with modular, cloud-ready architecture",
        "Developed secure APIs with authentication and role-based access control",
        "Applied user-centered UI/UX principles with accessible, responsive designs",
        "Integrated cloud services and secure payment workflows",
        "Documented, tested, and deployed applications to cloud platforms",
      ],
      technologies: [
        "Python",
        "Flask",
        "GraphQL",
        "PostgreSQL",
        "GCP",
        "Docker",
      ],
    },
    {
      title: "Senior Software Developer",
      company: "Multiplier AI Solutions",
      period: "July 2021 – Dec 2022",
      location: "Remote",
      type: "Full-time",
      description: "Web Development for Healthcare and Pharma Clients",
      achievements: [
        "Collaborated with cross-functional teams to design, optimize, and maintain 100+ responsive web pages, improving accessibility and user experience",
        "Led end-to-end web development, building scalable applications, custom themes, and integrations that improved performance and reduced load times",

        "Automated notifications, integrated payment systems, enhanced SEO using analytics, and managed deployments across multiple domains.",
      ],
      technologies: [
        "React.js",
        "Node.js",
        "JavaScript",
        "WordPress",
        "PHP",
        "Bootstrap",
      ],
    },
    // {
    //   title: "Software Developer Executive",
    //   company: "Multiplier AI Solutions",
    //   period: "Oct 2020 – Dec 2022",
    //   location: "Remote",
    //   type: "Full-time",
    //   description: "Modern JavaScript Development and Dashboard Solutions",
    //   achievements: [
    //     "Developed clean, modular codebases using ES6+, reducing technical debt",
    //     "Built dynamic, real-time dashboards with React.js and backend integrations",
    //     "Engineered custom chatbots using TypeScript for client-specific needs",
    //     "Enhanced website performance by 40% decrease in page load times",
    //   ],
    //   technologies: ["TypeScript", "React.js", "ES6+", "Vtiger CRM"],
    // },
    {
      title: "Software Developer Intern",
      company: "Inmovidu Technologies",
      period: "Aug 2020 – Sept 2020",
      location: "Remote",
      type: "Internship",
      description: "Full-Stack Web Application Development",
      achievements: [
        "Designed full-stack web application for customer profile management",
        "Built RESTful API endpoints for CRUD operations and data processing",
        "Implemented JWT authentication and role-based access control",
        "Connected APIs to Power BI dashboard for data visualization",
      ],
      technologies: ["TypeScript", "Flask", "Python", "PostgreSQL", "Power BI"],
    },
  ];

  // Get variants based on motion preferences
  const headerVariants = prefersReducedMotion
    ? getReducedMotionVariants(staggerContainer)
    : staggerContainer;
  const cardVariants = prefersReducedMotion
    ? getReducedMotionVariants(scaleInVariants)
    : scaleInVariants;

  return (
    <motion.section
      id="experience"
      className="py-24 bg-background relative"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headerVariants}
          >
            <motion.h2
              className="text-4xl font-bold mb-4"
              variants={fadeUpVariants}
            >
              Work Experience
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground"
              variants={fadeUpVariants}
            >
              My professional journey in software development and data analysis
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="relative flex items-start gap-8"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 hidden md:block"></div>

                  {/* Content */}
                  <div className="flex-1 md:ml-16">
                    <motion.div
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : {
                              y: -4,
                              transition: { duration: 0.3 },
                            }
                      }
                    >
                      <Card
                        className="p-6 hover:shadow-lg transition-all duration-300"
                        data-testid={`card-experience-${index}`}
                      >
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <h3 className="text-xl font-bold mb-1">
                                {exp.title}
                              </h3>
                              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <Building className="w-4 h-4" />
                                <span className="font-medium">
                                  {exp.company}
                                </span>
                              </div>
                            </div>
                            <Badge variant="outline" className="self-start">
                              {exp.type}
                            </Badge>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.period}</span>
                            </div>
                            {/* <span className="hidden sm:inline">•</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div> */}
                          </div>

                          <p className="text-primary font-medium">
                            {exp.description}
                          </p>

                          {/* Achievements */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">
                              Key Achievements
                            </h4>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, achIndex) => (
                                <li
                                  key={achIndex}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="text-xs"
                                  data-testid={`badge-exp-tech-${tech.toLowerCase().replace(".", "")}`}
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
