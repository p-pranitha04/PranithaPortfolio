import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Mail,
  Github,
  ExternalLink,
  Linkedin,
  Copy,
  Check,
  Globe,
  Database,
  BarChart3,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/lib/animations";
import {
  staggerContainer,
  fadeUpVariants,
  scaleInVariants,
  getReducedMotionVariants,
} from "@/lib/animations";

export default function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [clickedButtons, setClickedButtons] = useState<Set<string>>(new Set());
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useInView(0.1);

  const email = "p.pranitha0015@gmail.com";

  const contactInfo = [
    {
      icon: Mail,
      label: "Copy Email",
      value: email,
      isCopy: true,
      href: `mailto:${email}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      isCopy: false,
      href: "https://www.linkedin.com/in/p-pranitha/",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "p-pranitha",
      isCopy: false,
      href: "https://github.com/p-pranitha04",
    },
  ];

  const skills = [
    {
      icon: Globe,
      title: "Full-stack web development",
      description:
        "Modern web applications with React, Node.js, and TypeScript",
    },
    {
      icon: Database,
      title: "Cloud-native API development",
      description: "Scalable REST APIs and microservices architecture",
    },
    {
      icon: BarChart3,
      title: "Data analysis and visualization",
      description:
        "Transform data into actionable insights and compelling visuals",
    },
    {
      icon: Settings,
      title: "DevOps and automation solutions",
      description:
        "CI/CD pipelines, containerization, and infrastructure automation",
    },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setClickedButtons((prev) => new Set(prev).add("copy-email"));
      setTimeout(() => {
        setEmailCopied(false);
        setClickedButtons((prev) => {
          const newSet = new Set(prev);
          newSet.delete("copy-email");
          return newSet;
        });
      }, 2000);
      console.log("Email copied to clipboard");
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleContactClick = (href: string | null, label: string) => {
    if (href) {
      setClickedButtons((prev) => new Set(prev).add(label));
      setTimeout(() => {
        setClickedButtons((prev) => {
          const newSet = new Set(prev);
          newSet.delete(label);
          return newSet;
        });
      }, 300);
      console.log(`Contact clicked: ${label} - ${href}`);
      window.open(href, "_blank");
    }
  };

  const handleDownloadResume = () => {
    setClickedButtons((prev) => new Set(prev).add("download-resume"));
    setTimeout(() => {
      setClickedButtons((prev) => {
        const newSet = new Set(prev);
        newSet.delete("download-resume");
        return newSet;
      });
    }, 300);

    const link = document.createElement("a");
    link.href = "/client/public/Pranitha_P.pdf";
    link.download = "Pranitha_P.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Split animation variants
  const leftSlideVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const rightSlideVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contactStaggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const skillStaggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Get variants based on motion preferences
  const headerVariants = prefersReducedMotion
    ? getReducedMotionVariants(staggerContainer)
    : staggerContainer;
  const leftCardVariants = prefersReducedMotion
    ? getReducedMotionVariants(leftSlideVariants)
    : leftSlideVariants;
  const rightCardVariants = prefersReducedMotion
    ? getReducedMotionVariants(rightSlideVariants)
    : rightSlideVariants;
  const contactItemVariants = prefersReducedMotion
    ? getReducedMotionVariants(fadeUpVariants)
    : fadeUpVariants;
  const skillItemVariants = prefersReducedMotion
    ? getReducedMotionVariants(scaleInVariants)
    : scaleInVariants;

  return (
    <motion.section id="contact" className="py-16 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={headerVariants}
          >
            <motion.h2
              className="text-4xl font-bold mb-3"
              variants={fadeUpVariants}
            >
              Get In Touch
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground"
              variants={fadeUpVariants}
            >
              I'm currently open to new opportunities. Reach out via email or
              connect on social media.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Contact Info Card - Slides from Left */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={leftCardVariants}
            >
              <Card className="p-6 space-y-4 hover-elevate border-2 border-primary/10 h-full">
                <motion.div
                  className="text-center mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={
                    isInView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.8, opacity: 0 }
                  }
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                    <img
                      src="/handshake.gif?v=1"
                      alt="Handshake animation"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        console.log("Failed to load handshake gif");
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-3"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={contactStaggerVariants}
                >
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      variants={contactItemVariants}
                    >
                      {contact.isCopy ? (
                        <motion.div
                          whileHover={
                            prefersReducedMotion ? {} : { scale: 1.02 }
                          }
                          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                          animate={
                            clickedButtons.has("copy-email")
                              ? {
                                  scale: [1, 1.05, 1],
                                  transition: { duration: 0.3 },
                                }
                              : {}
                          }
                        >
                          <Button
                            variant="outline"
                            className="w-full flex items-center gap-3 p-4 h-auto border-2 hover:border-primary/50 transition-all duration-200"
                            onClick={handleCopyEmail}
                            data-testid="button-copy-email"
                          >
                            <motion.div
                              className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-blue-600/10 rounded-xl flex items-center justify-center"
                              animate={
                                emailCopied
                                  ? {
                                      scale: [1, 1.2, 1],
                                      backgroundColor: [
                                        "rgba(59, 130, 246, 0.2)",
                                        "rgba(34, 197, 94, 0.3)",
                                        "rgba(59, 130, 246, 0.2)",
                                      ],
                                    }
                                  : {}
                              }
                              transition={{ duration: 0.5 }}
                            >
                              <AnimatePresence mode="wait">
                                {emailCopied ? (
                                  <motion.div
                                    key="check"
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 90 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Check className="w-5 h-5 text-green-600" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="copy"
                                    initial={{ scale: 0, rotate: 90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: -90 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Copy className="w-5 h-5 text-blue-600" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                {contact.label}
                              </p>
                              <p className="font-semibold text-base">
                                {contact.value}
                              </p>
                            </div>
                            <AnimatePresence>
                              {emailCopied && (
                                <motion.span
                                  className="text-sm text-green-600 font-medium"
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  Copied!
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={
                            prefersReducedMotion ? {} : { scale: 1.02 }
                          }
                          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                          animate={
                            clickedButtons.has(contact.label)
                              ? {
                                  scale: [1, 1.05, 1],
                                  transition: { duration: 0.3 },
                                }
                              : {}
                          }
                        >
                          <Button
                            variant="outline"
                            className="w-full flex items-center gap-3 p-4 h-auto border-2 hover:border-primary/50 transition-all duration-200"
                            onClick={() =>
                              handleContactClick(contact.href, contact.label)
                            }
                            data-testid={`button-contact-${contact.label.toLowerCase()}`}
                          >
                            <motion.div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                contact.icon === Linkedin
                                  ? "bg-gradient-to-r from-blue-600/20 to-blue-700/10"
                                  : "bg-gradient-to-r from-gray-800/20 to-gray-900/10"
                              }`}
                              whileHover={
                                prefersReducedMotion
                                  ? {}
                                  : {
                                      rotate: [0, -10, 10, 0],
                                      transition: { duration: 0.4 },
                                    }
                              }
                            >
                              <contact.icon
                                className={`w-5 h-5 ${
                                  contact.icon === Linkedin
                                    ? "text-blue-600"
                                    : "text-gray-700"
                                }`}
                              />
                            </motion.div>
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                {contact.label}
                              </p>
                              <p className="font-semibold text-base">
                                {contact.value}
                              </p>
                            </div>
                            <motion.div
                              animate={
                                prefersReducedMotion
                                  ? {}
                                  : {
                                      x: [0, 3, 0],
                                    }
                              }
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </motion.div>
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </Card>
            </motion.div>

            {/* Skills Card - Slides from Right */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={rightCardVariants}
            >
              <Card className="p-6 space-y-4 hover-elevate border-2 border-primary/10 h-full">
                <motion.div
                  className="text-center mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={
                    isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                  }
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold">Let's Work Together</h3>
                  <p className="text-muted-foreground mt-1">
                    I'm passionate about building scalable applications and
                    solving complex problems through code. Whether you're
                    looking for:
                  </p>
                </motion.div>

                <motion.div
                  className="space-y-2"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={skillStaggerVariants}
                >
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="group p-2 rounded-lg hover:bg-muted/50 transition-all duration-200"
                      variants={skillItemVariants}
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : {
                              x: 8,
                              transition: { duration: 0.2 },
                            }
                      }
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
                          whileHover={
                            prefersReducedMotion
                              ? {}
                              : {
                                  scale: 1.1,
                                  rotate: [0, -5, 5, 0],
                                  transition: { duration: 0.4 },
                                }
                          }
                        >
                          <skill.icon className="w-4 h-4 text-primary" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">
                            {skill.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="pt-2 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <p className="text-center text-muted-foreground font-medium">
                    I'd love to discuss how my expertise can contribute to your
                    team's success.
                  </p>
                </motion.div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                animate={
                  clickedButtons.has("send-email")
                    ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.3 },
                      }
                    : {}
                }
              >
                <Button
                  size="lg"
                  onClick={() => {
                    setClickedButtons((prev) =>
                      new Set(prev).add("send-email"),
                    );
                    setTimeout(() => {
                      setClickedButtons((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete("send-email");
                        return newSet;
                      });
                    }, 300);
                    window.open(`mailto:${email}`, "_blank");
                  }}
                  data-testid="button-contact-primary"
                  className="hover-elevate bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            rotate: [0, -10, 0],
                          }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Mail className="mr-2 h-5 w-5" />
                  </motion.div>
                  Send me an email
                </Button>
              </motion.div>

              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                animate={
                  clickedButtons.has("download-resume")
                    ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.3 },
                      }
                    : {}
                }
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleDownloadResume}
                  data-testid="button-download-resume-contact"
                  className="hover-elevate border-2"
                >
                  Download Resume
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
