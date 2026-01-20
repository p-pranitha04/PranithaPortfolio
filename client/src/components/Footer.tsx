import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInView } from "@/lib/animations";
import { fadeUpVariants, getReducedMotionVariants } from "@/lib/animations";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useInView(0.1);

  // Simple footer animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Get variants based on motion preferences
  const containerVariants = prefersReducedMotion
    ? getReducedMotionVariants(footerVariants)
    : footerVariants;

  return (
    <motion.footer
      className="border-t bg-muted/30 relative overflow-hidden"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Subtle background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={
          prefersReducedMotion
            ? {}
            : {
                backgroundPosition: ["0% 0%", "100% 100%"],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="container mx-auto px-6 py-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, -2, 0],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.p
              className="text-sm text-muted-foreground"
              whileHover={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }
              }
            >
              © {currentYear} Pranitha P. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
