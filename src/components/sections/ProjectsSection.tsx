"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { projects } from "@/data/projects";

interface TruncatedDescriptionProps {
  description: string;
  className?: string;
  maxLines?: number;
}

const lineClampClass: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

const TruncatedDescription: React.FC<TruncatedDescriptionProps> = ({
  description,
  className = "",
  maxLines = 3
}) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = textRef.current;
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        const lineHeight = parseInt(computedStyle.lineHeight);
        const maxHeight = lineHeight * maxLines;
        setIsOverflowing(element.scrollHeight > maxHeight);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [description, maxLines]);

  const clampClass = lineClampClass[maxLines] ?? "line-clamp-3";
  const baseClasses = cn(className, clampClass);

  if (!isOverflowing) {
    return (
      <p ref={textRef} className={baseClasses}>
        {description}
      </p>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <p
          ref={textRef}
          className={cn(baseClasses, "cursor-help hover:text-foreground transition-colors")}
        >
          {description}
        </p>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs p-3">
        <p className="text-sm leading-relaxed">{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured";
}

const ProjectCard = ({ project, variant = "default" }: ProjectCardProps) => {
  const isFeatured = variant === "featured";

  return (
    <Card
      className={cn(
        "relative h-full cursor-pointer overflow-hidden border flex flex-col",
        isFeatured
          ? "card-hover border-primary/20 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]"
          : "w-80 border-border/50 bg-card hover:bg-card/80",
      )}
    >
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={isFeatured ? 800 : 320}
          height={192}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge className={cn(
            "text-primary-foreground",
            isFeatured ? "bg-primary shadow-lg" : "bg-primary/90"
          )}>
            {project.category}
          </Badge>
        </div>
        {isFeatured && (
          <div className="absolute top-3 right-3">
            <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-lg">
              ⭐ Featured
            </div>
          </div>
        )}
      </div>

      <CardHeader className="flex-shrink-0">
        <h4 className="text-xl font-semibold line-clamp-2">{project.title}</h4>
        <TruncatedDescription
          description={project.description}
          className="text-muted-foreground text-sm leading-relaxed"
          maxLines={3}
        />
      </CardHeader>

      <CardContent className="pt-0 flex flex-col flex-grow">
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[2.5rem]">
          {(isFeatured ? project.technologies : project.technologies.slice(0, 4)).map(tech => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {!isFeatured && project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-4 mb-4 text-center flex-shrink-0">
            <div>
              <div className="text-lg font-semibold text-primary">
                {project.metrics.performance}
              </div>
              <div className="text-xs text-muted-foreground">
                Performance
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-primary">
                {project.metrics.users}
              </div>
              <div className="text-xs text-muted-foreground">Users</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-primary">
                {project.metrics.uptime}
              </div>
              <div className="text-xs text-muted-foreground">
                Uptime
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          {project.liveUrl && (
            <Button
              size="sm"
              className="flex-1"
              onClick={() => window.open(project.liveUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className={project.liveUrl ? "" : "flex-1"}
            onClick={() => window.open(project.githubUrl, "_blank")}
          >
            <Github className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectsSection: React.FC = () => {
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <TooltipProvider>
      <section id="projects" className="section-padding relative">
        {/* Projects-specific gradient background */}
        <div className="absolute inset-0 gradient-bg-projects"></div>
        <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating expertise across
            different technologies and domains. Each project represents a unique
            challenge and innovative solution.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-20 relative">
          <div className="absolute inset-0 gradient-bg-mesh opacity-40 rounded-3xl -m-8 animate-gradient-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-primary/12 to-primary/8 rounded-3xl -m-8"></div>
          <div className="relative z-10 p-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary uppercase tracking-wider">Featured Work</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="gradient-text">Highlighted</span> Projects
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                My most impactful and innovative projects that showcase advanced technical skills and creative problem-solving.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard project={project} variant="featured" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Projects Marquee */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">
            All Projects
          </h3>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:25s]">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>

      </div>
    </section>
    </TooltipProvider>
  );
};

export default ProjectsSection;
