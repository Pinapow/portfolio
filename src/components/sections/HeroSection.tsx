"use client";

import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowDown,
  Download,
  Mail,
  MapPin,
  Calendar,
  Code2,
  Database,
} from "lucide-react";
import heroWorkspace from "@/assets/hero-workspace.jpg";
import { socialLinks, techIcons } from "@/data/hero";
import profilePhoto from "@/assets/profile.jpeg";

// Constants
const FULL_TEXT = "Hi, I'm Phuong LE";
const TYPING_SPEED = 100;
const PARTICLE_POSITIONS = [25, 65, 15, 85];

const HeroSection: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < FULL_TEXT.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + FULL_TEXT[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Navigation functions
  const scrollToSection = useCallback((sectionId: string): void => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToAbout = useCallback((): void => {
    scrollToSection("about");
  }, [scrollToSection]);

  const scrollToContact = useCallback((): void => {
    scrollToSection("contact");
  }, [scrollToSection]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg-hero animate-gradient-pulse"
    >
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroWorkspace}
          alt="Developer workspace"
          fill
          className="object-cover opacity-10"
          priority
        />

        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 gradient-bg-mesh animate-gradient-shift" />

        {/* Dynamic Gradient Orbs */}
        {/* Dynamic gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl animate-pulse-slow"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-accent/15 to-transparent rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
          aria-hidden="true"
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {PARTICLE_POSITIONS.map((left, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-particles"
              style={{
                left: `${left}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${10 + i * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main Content - Left Side */}
          <div className="animate-fade-up flex flex-col items-start text-left order-2 lg:order-1">
            <h1 className="text-4xl md:text-6xl lg:text-hero font-bold mb-6 leading-tight">
              <span className="gradient-text">{displayedText}</span>
              <span className="animate-cursor-blink">|</span>
            </h1>

            <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 font-light flex items-center gap-2">
              <Code2 className="h-6 w-6" />
              Full-Stack Developer
              <Database className="h-6 w-6" />
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Passionate full-stack developer crafting digital solutions that
              make a difference. I combine technical expertise with creative
              problem-solving to deliver exceptional experiences.
            </p>

            {/* Status Cards */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Card className="bg-background/40 backdrop-blur-sm border-border/50 hover:bg-background/60 transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Paris, France</span>
                </CardContent>
              </Card>
              <Card className="bg-background/40 backdrop-blur-sm border-border/50 hover:bg-background/60 transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    Available immediately
                  </span>
                </CardContent>
              </Card>
              <Card className="bg-background/40 backdrop-blur-sm border-green-500/30 hover:bg-background/60 transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 flex items-center gap-2">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">
                    Open to opportunities
                  </span>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                onClick={scrollToContact}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
              <a href="/CV.pdf" download="Phuong_LE_CV.pdf">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-background/30 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Profile Photo - Right Side */}
          <div className="animate-fade-in order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
                <Image
                  src={profilePhoto}
                  alt="Phuong LE"
                  fill
                  className="rounded-full object-cover border-4 border-primary/20 shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-slow" />
              </div>

              {/* Floating Tech Icons around profile */}
              {techIcons.map((tech, index) => {
                const baseRadius = 220; // Distance from center of photo
                const radius = baseRadius + (index % 2) * 20; // Vary radius for more organic look
                const angle = tech.angle;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <div
                    key={tech.name}
                    className="absolute w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center animate-float shadow-lg hover:scale-110 transition-all duration-300"
                    style={{
                      left: `calc(50% + ${x}px - 24px)`, // Center + offset - half width
                      top: `calc(50% + ${y}px - 24px)`, // Center + offset - half height
                      animationDelay: `${index * 0.3}s`,
                      animationDuration: `${3 + index * 0.1}s`,
                    }}
                  >
                    <tech.icon
                      className="w-6 h-6"
                      style={{ color: tech.color }}
                      title={tech.name}
                    />
                  </div>
                );
              })}

              {/* Subtle decorative elements around photo */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary/10 rounded-full animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-4 h-4 bg-accent/15 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/4 -left-6 w-3 h-3 bg-primary/20 rounded-full animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label="Scroll to about section"
          >
            <ArrowDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
