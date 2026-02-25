"use client";

import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, Download, Mail, MapPin, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/Spotlight";
import profilePhoto from "@/assets/profile.jpeg";
import { socialLinks, techIcons } from "@/data/hero";

const HeroSection: React.FC = () => {
  const scrollToAbout = useCallback((): void => {
    const section = document.getElementById("about");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToContact = useCallback((): void => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Hi, I'm\nPhuong LE";

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;

    const timeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          currentText += fullText[currentIndex];
          setDisplayedText(currentText);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const textParts = displayedText.split("\n");
  const line1 = textParts[0];
  const line2 = textParts.length > 1 ? textParts[1] : "";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--primary))"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col-reverse lg:flex-row gap-16 lg:gap-8 items-center justify-between">
          {/* Left Side: Typography & CTAs */}
          <motion.div
            className="flex-1 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for new opportunities
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-5xl sm:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight mb-6 text-foreground min-h-[120px] sm:min-h-[160px] lg:min-h-[200px]"
            >
              {line1}
              {textParts.length > 1 && <br />}
              {line2 && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient-shift">
                  {line2}
                </span>
              )}
              {isTyping && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block w-[4px] h-[0.9em] bg-primary ml-1 align-baseline"
                />
              )}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground/90 max-w-xl mb-10 leading-relaxed font-light"
            >
              A full-stack craftsman engineering digital experiences. I merge
              scalable architectures with stunning interfaces to build software
              that feels as good as it functions.
            </motion.p>

            {/* Quick Status Cards */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Card className="bg-secondary/40 backdrop-blur-md border-white/5 shadow-xl">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="p-2 rounded-md bg-background/50 text-accent">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">
                    Paris, France
                  </span>
                </CardContent>
              </Card>
              <Card className="bg-secondary/40 backdrop-blur-md border-white/5 shadow-xl">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="p-2 rounded-md bg-background/50 text-accent">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground/80">
                    Immediate Start
                  </span>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 mb-10 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 font-medium px-8 py-6 rounded-xl transition-all w-full sm:w-auto text-base"
                onClick={scrollToContact}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <Mail className="mr-2 h-5 w-5" />
                Let&apos;s talk
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border border-border/50 bg-secondary/30 backdrop-blur-md hover:bg-secondary/60 text-foreground font-medium px-8 py-6 rounded-xl transition-all w-full sm:w-auto text-base"
                asChild
              >
                <a href="/Phuong_LE_CV.pdf" download="Phuong_LE_CV.pdf">
                  <Download className="mr-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-secondary/40 backdrop-blur-md border border-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: Photo & Tech Orbit */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end relative w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] xl:w-[480px] xl:h-[480px]">
              {/* Outer glowing rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-accent/20 animate-[spin_15s_linear_infinite_reverse]" />

              {/* Profile Image container */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-white/10 bg-secondary/50 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <Image
                  src={profilePhoto}
                  alt="Phuong LE"
                  fill
                  className="object-cover sepia-[0.2] hover:sepia-0 hover:scale-105 transition-all duration-700 ease-out z-10"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-20" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors group"
            aria-label="Scroll to about section"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium">
              Scroll
            </span>
            <div className="w-[1px] h-12 bg-border relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-[bounce_2s_infinite]" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
