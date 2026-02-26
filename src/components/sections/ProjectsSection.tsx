"use client";

import React, { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/Marquee";
import { projects } from "@/data/projects";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured";
}

const PLACEHOLDER_IMAGE = "/projects/available_soon.jpg";

const TiltCard = ({ project, variant = "default" }: ProjectCardProps) => {
  const isFeatured = variant === "featured";
  const isPlaceholder = project.image === PLACEHOLDER_IMAGE;
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-3xl cursor-pointer flex flex-col h-full bg-secondary/20 border border-white/5 backdrop-blur-xl transition-all duration-300",
        isFeatured
          ? "shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
          : "w-[340px] shadow-xl",
      )}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background:
            "radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary), 0.06), transparent 40%)",
        }}
      />

      {/* Image Section */}
      <div className="relative p-2" style={{ transform: "translateZ(30px)" }}>
        <div className="relative overflow-hidden rounded-2xl aspect-[16/9] w-full">
          {isPlaceholder ? (
            <div
              className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/80 to-background flex flex-col items-center justify-center gap-3"
              role="img"
              aria-label={`${project.title} preview`}
            >
              <div className="flex gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <span className="font-heading font-bold text-lg text-foreground/30 tracking-tight">
                {project.title}
              </span>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary)/0.08),_transparent_70%)]" />
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="w-full h-full object-cover transition-transform duration-700 ease-out"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md border-none shadow-lg">
              {project.category}
            </Badge>
            {isFeatured && (
              <Badge className="bg-accent/90 text-accent-foreground backdrop-blur-md border-none shadow-lg">
                Featured
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className="p-6 flex flex-col flex-grow"
        style={{ transform: "translateZ(40px)" }}
      >
        <h4 className="font-heading font-bold text-xl md:text-2xl mb-3 text-foreground line-clamp-2">
          {project.title}
        </h4>

        <p className="text-muted-foreground/80 text-sm md:text-base leading-relaxed mb-6 font-light line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {(isFeatured
            ? project.technologies
            : project.technologies.slice(0, 4)
          ).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-background/50 border border-white/5 text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {!isFeatured && project.technologies.length > 4 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-background/50 border border-white/5 text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary/50 text-foreground hover:bg-secondary hover:text-foreground transition-colors text-sm font-medium border border-white/5",
              project.liveUrl ? "px-4" : "flex-1",
            )}
          >
            <Github className="h-4 w-4" />{" "}
            {project.liveUrl ? "" : "Source Code"}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection: React.FC = () => {
  const featuredProjects = projects.filter((project) => project.featured);
  const nonFeaturedProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="relative py-20 lg:py-24 overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-white/5 text-muted-foreground text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Portfolio
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Selected{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground/80 font-light">
            A showcase of my recent engineering projects, demonstrating scalable
            architecture, elegant interfaces, and real-world impact.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          style={{ perspective: "1000px" }}
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="h-full"
            >
              <TiltCard project={project} variant="featured" />
            </motion.div>
          ))}
        </div>

        {/* Continuous Projects Marquee */}
        {nonFeaturedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative w-[100vw] left-1/2 -translate-x-1/2 pt-16 pb-20 border-t border-white/5 bg-secondary/10"
          >
            <div className="text-center mb-12">
              <h3 className="font-heading text-2xl font-semibold opacity-80">
                More Explorations
              </h3>
            </div>

            <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <div style={{ perspective: "1000px" }}>
              <Marquee pauseOnHover className="[--duration:40s] py-4">
                {nonFeaturedProjects.map((project) => (
                  <div key={project.id} className="mx-4 h-full">
                    <TiltCard project={project} />
                  </div>
                ))}
              </Marquee>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
