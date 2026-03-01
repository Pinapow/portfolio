"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Home,
  User,
  Briefcase,
  MessageCircle,
  Sun,
  Moon,
} from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const navigationItems = useMemo(
    () => [
      { id: "home", label: "Home", icon: Home },
      { id: "about", label: "About", icon: User },
      { id: "projects", label: "Projects", icon: Briefcase },
      { id: "contact", label: "Contact", icon: MessageCircle },
    ],
    [],
  );

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/phuong-le-tech",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/phuong-le77100",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:phuong.le77100@gmail.com", label: "Email" },
  ];

  const handleScroll = useCallback(() => {
    const sections = navigationItems.map((item) =>
      document.getElementById(item.id),
    );
    const scrollPosition = window.scrollY + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(navigationItems[i].id);
        break;
      }
    }
  }, [navigationItems]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Dock Navigation at Top */}
      <div className="fixed top-8 left-0 right-0 z-50 hidden md:block px-4 py-2">
        <TooltipProvider delayDuration={200}>
          <Dock
            className="bg-background/60 backdrop-blur-lg border-border/30 gradient-overlay-subtle"
            iconSize={45}
            iconMagnification={65}
          >
            {/* Logo/Home Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon
                  onClick={() => scrollToSection("home")}
                  className={`group transition-colors ${
                    activeSection === "home"
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="gradient-text font-bold text-sm">PL</div>
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent side="bottom">Home</TooltipContent>
            </Tooltip>

            {/* Divider */}
            <div className="w-px h-8 bg-border/50 mx-1"></div>

            {/* Navigation Items */}
            {navigationItems.slice(1).map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <DockIcon
                    onClick={() => scrollToSection(item.id)}
                    className={`group transition-colors ${
                      activeSection === item.id
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 transition-colors ${
                        activeSection === item.id
                          ? "text-primary"
                          : "group-hover:text-foreground"
                      }`}
                    />
                  </DockIcon>
                </TooltipTrigger>
                <TooltipContent side="bottom">{item.label}</TooltipContent>
              </Tooltip>
            ))}

            {/* Divider */}
            <div className="w-px h-8 bg-border/50 mx-1"></div>

            {/* Social Links */}
            {socialLinks.map((link) => (
              <Tooltip key={link.label}>
                <TooltipTrigger asChild>
                  <DockIcon
                    className="group transition-colors hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer relative"
                    onClick={() => {
                      window.open(
                        link.href,
                        link.href.startsWith("mailto:") ? "_self" : "_blank",
                      );
                    }}
                  >
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("mailto:") ? "_self" : "_blank"
                      }
                      rel={
                        link.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="absolute inset-0 z-10"
                      aria-label={link.label}
                      onClick={(e) => e.preventDefault()}
                    />
                    <link.icon className="h-4 w-4 transition-colors group-hover:text-foreground pointer-events-none" />
                  </DockIcon>
                </TooltipTrigger>
                <TooltipContent side="bottom">{link.label}</TooltipContent>
              </Tooltip>
            ))}

            {/* Divider */}
            <div className="w-px h-8 bg-border/50 mx-1"></div>

            {/* Theme Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon
                  onClick={() =>
                    mounted && setTheme(theme === "dark" ? "light" : "dark")
                  }
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if ((e.key === "Enter" || e.key === " ") && mounted) {
                      e.preventDefault();
                      setTheme(theme === "dark" ? "light" : "dark");
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="group transition-colors hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label={
                    mounted
                      ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
                      : "Toggle theme"
                  }
                >
                  {!mounted || theme === "dark" ? (
                    <Sun className="h-4 w-4 transition-colors group-hover:text-foreground" />
                  ) : (
                    <Moon className="h-4 w-4 transition-colors group-hover:text-foreground" />
                  )}
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {mounted
                  ? theme === "dark"
                    ? "Light mode"
                    : "Dark mode"
                  : "Toggle theme"}
              </TooltipContent>
            </Tooltip>
          </Dock>
        </TooltipProvider>
      </div>

      {/* Mobile Menu Button - Floating */}
      <div className="fixed top-6 right-6 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-background/60 backdrop-blur-md border border-border/50 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-all duration-300 hover:scale-110 shadow-lg gradient-overlay-subtle"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm gradient-bg-mesh opacity-90"
              onClick={() => setIsOpen(false)}
            />
            <div className="relative flex flex-col items-center justify-center min-h-screen p-8">
              <motion.div
                className="bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl p-6 w-full max-w-sm shadow-2xl gradient-overlay-subtle"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-center mb-6">
                  <button
                    onClick={() => scrollToSection("home")}
                    className="gradient-text font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity"
                  >
                    Phuong LE
                  </button>
                </div>

                <div className="space-y-2 mb-6">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${
                        activeSection === item.id
                          ? "text-primary bg-primary/10 scale-105"
                          : "text-muted-foreground hover:text-primary hover:bg-muted hover:scale-105"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={
                        link.href.startsWith("mailto:") ? "_self" : "_blank"
                      }
                      rel={
                        link.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                      aria-label={link.label}
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                  {mounted && (
                    <button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                      {theme === "dark" ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
