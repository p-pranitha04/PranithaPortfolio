import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  headerVariants,
  staggerContainer,
  fadeUpVariants,
  getReducedMotionVariants,
} from "@/lib/animations";

interface HeaderProps {
  scrollToSection: (section: string) => void;
}

export default function Header({ scrollToSection }: HeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About", section: "about" },
    { label: "Experience", section: "experience" },
    { label: "Projects", section: "projects" },
    { label: "Skills", section: "skills" },
    { label: "Contact", section: "contact" },
  ];

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setIsOpen(false);
  };

  const variants = prefersReducedMotion
    ? getReducedMotionVariants(headerVariants)
    : headerVariants;
  const navVariants = prefersReducedMotion
    ? getReducedMotionVariants(staggerContainer)
    : staggerContainer;
  const itemVariants = prefersReducedMotion
    ? getReducedMotionVariants(fadeUpVariants)
    : fadeUpVariants;

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div variants={itemVariants}>
            <img
              src="/logo.png"
              alt="PP Logo"
              className="logo-width logo-height logo-fit"
              data-testid="logo-image"
            />
          </motion.div>

          <motion.nav
            className="hidden md:flex items-center gap-1"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <motion.div key={item.section} variants={itemVariants}>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection(item.section)}
                  data-testid={`button-nav-${item.section}`}
                  className="hover-elevate transition-all duration-200 hover:scale-105 hover:text-primary"
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </motion.nav>

          <div className="flex items-center gap-2">
            <motion.div variants={itemVariants}>
              <ThemeToggle />
            </motion.div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  data-testid="button-menu-toggle"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.section}
                      variant="ghost"
                      onClick={() => handleNavClick(item.section)}
                      data-testid={`button-mobile-nav-${item.section}`}
                      className="justify-start text-lg hover-elevate transition-all duration-200"
                    >
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
