"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { TimelineItem } from "@/types";
import { skills, expertiseAreas, timeline } from "@/data/about";
import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/utils";

const TimelineCard = ({ item }: { item: TimelineItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 bg-secondary/20 backdrop-blur-xl border-white/5 shadow-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50",
          isExpanded
            ? "bg-secondary/40 shadow-[0_8px_30px_rgb(0,0,0,0.5)] border-white/10"
            : "hover:bg-secondary/30",
        )}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${item.title} at ${item.company}, ${item.year}. ${isExpanded ? "Collapse" : "Expand"} for details.`}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            {/* Company Logo in a modern glass box */}
            <div className="flex-shrink-0 w-14 h-14 relative z-10">
              <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl" />
              {item.companyLogo ? (
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 bg-background/50 backdrop-blur-md p-1">
                  <Image
                    src={item.companyLogo}
                    alt={`${item.company} logo`}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <div className="text-primary font-heading font-bold text-xl">
                    {item.company.charAt(0)}
                  </div>
                </div>
              )}
            </div>

            {/* Content Header */}
            <div className="flex-grow min-w-0 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-4 mb-2">
                <h4 className="font-heading font-bold text-lg md:text-xl text-foreground line-clamp-1">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="hidden sm:inline-flex text-xs bg-black/20 border-white/10 text-primary whitespace-nowrap px-3 py-1"
                  >
                    {item.year}
                  </Badge>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                    <ChevronDown
                      className="h-5 w-5 text-muted-foreground/60"
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-primary/90 font-medium text-sm md:text-base">
                  {item.company}
                </p>
                {item.companyWebsite && (
                  <a
                    href={item.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground/50 hover:text-primary transition-colors p-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <span className="sm:hidden text-muted-foreground/50 text-xs ml-auto">
                  {item.year}
                </span>
              </div>
            </div>
          </div>

          {/* Expandable Details */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-5 border-t border-white/5">
                  <div className="sm:ml-[76px]">
                    <p className="text-muted-foreground/80 leading-relaxed whitespace-pre-line text-sm md:text-base font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-white/5 text-muted-foreground text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-accent"></span>
            Profile
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Engineering digital{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              experiences
            </span>
          </h2>
        </motion.div>

        {/* Floating Story Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-32 relative">
          <motion.div
            className="lg:col-span-5 relative z-20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="sticky top-32">
              <h3 className="font-heading text-2xl font-semibold mb-6">
                My Story
              </h3>
              <p className="text-muted-foreground/90 mb-6 leading-relaxed font-light text-lg">
                I'm a graduate with a Master&apos;s degree in Software and Data
                Engineering, driven by the challenge of bridging complex backend
                architectures with seamless frontend interfaces.
              </p>
              <p className="text-muted-foreground/80 mb-8 leading-relaxed font-light">
                My approach combines technical excellence with user-centered
                design to create applications that not only work flawlessly but
                provide exceptional user experiences. I thrive on building
                scalable, maintainable systems that solve real-world problems.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-sm text-foreground/80 bg-secondary/20 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Paris, France</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-foreground/80 bg-secondary/20 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <span className="font-medium">
                    Master's Degree in Software & Data Engineering
                    <br />
                    <a
                      href="https://formations.univ-gustave-eiffel.fr/master/detail/logiciel-et-ingenierie-des-donnees-273"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground/60 text-xs hover:text-primary transition-colors hover:underline"
                    >
                      Université Gustave Eiffel
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 relative z-10 w-full">
            {/* The transparent overlapping cards layout for Expertise */}
            <div className="grid sm:grid-cols-2 gap-4 lg:pl-10">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "p-6 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl transition-transform hover:-translate-y-2",
                    index % 2 === 0
                      ? "bg-secondary/40 lg:mt-12"
                      : "bg-primary/5 lg:-mt-12",
                  )}
                >
                  <div className="w-12 h-12 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center border border-primary/20">
                    <area.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-heading font-bold text-xl mb-3">
                    {area.title}
                  </h4>
                  <p className="text-sm text-muted-foreground/80 mb-6 font-light leading-relaxed">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {area.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full bg-background/50 border border-white/5 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {area.technologies.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-background/50 border border-white/5 text-muted-foreground opacity-50">
                        +{area.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Marquee Skills Section */}
            <motion.div
              className="mt-12 w-full relative overflow-hidden rounded-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <div className="py-6 bg-secondary/10 backdrop-blur-sm border border-white/5">
                <Marquee pauseOnHover className="[--duration:40s]">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="mx-3 flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/40 border border-white/5 backdrop-blur-md grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 hover:bg-secondary/80"
                    >
                      <div style={{ color: skill.color || "currentColor" }}>
                        <skill.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium whitespace-nowrap text-foreground/80 text-sm">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </Marquee>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Career Timeline */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading text-3xl font-bold mb-4">
              Career{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Journey
              </span>
            </h3>
            <p className="text-muted-foreground/80 font-light">
              My professional experience path.
            </p>
          </motion.div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TimelineCard item={item} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
