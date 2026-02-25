"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-background overflow-hidden pt-16 pb-8">
      {/* Decorative blurred background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-secondary/30 border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
            aria-label="Back to top"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors" />
            <div
              className="absolute inset-0 rounded-full animate-ping bg-primary/20 opacity-0 group-hover:opacity-100"
              style={{ animationDuration: "2s" }}
            />
          </motion.button>

          {/* Brand / Logo */}
          <div className="text-center">
            <h3 className="font-heading font-bold text-2xl mb-2 tracking-tight">
              Phuong{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                LE
              </span>
            </h3>
            <p className="text-muted-foreground/80 text-sm font-light tracking-wide">
              Engineering digital experiences
            </p>
          </div>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground/60 font-light flex flex-col sm:flex-row items-center gap-2">
            <span>© {currentYear} Phuong LE.</span>
            <span className="hidden sm:inline-block">•</span>
            <span>Built with React, Next.js & Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
