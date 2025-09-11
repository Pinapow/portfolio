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

interface TruncatedDescriptionProps {
  description: string;
  className?: string;
  maxLines?: number;
}

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

  const baseClasses = `${className} line-clamp-${maxLines}`;

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
          className={`${baseClasses} cursor-help hover:text-foreground transition-colors`}
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

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden border flex flex-col",
        // light styles
        "border-border/50 bg-card hover:bg-card/80",
        // dark styles
        "dark:border-border/50 dark:bg-card dark:hover:bg-card/80",
      )}
    >
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={320}
          height={192}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary/90 text-primary-foreground">
            {project.category}
          </Badge>
        </div>
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
          {project.technologies.slice(0, 4).map(tech => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
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

  const projects: Project[] = [
    {
      id: 1,
      title: "BooqIn",
      description:
        `BooqIn is a platform for managing and lending books between users.
         The site allows users to create collections, share their books and borrow those of other users.`,
      image: "/projects/available_soon.jpg",
      technologies: ["React", "Java 21", "Spring 6", "Stripe", "Google Books API", "Thymeleaf", "Docker"],
      category: "Full-Stack",
      liveUrl: undefined,
      githubUrl: "https://github.com/Pinapow/booqin",
      metrics: undefined,
      featured: true,
    },
    {
      id: 2,
      title: "Chadow",
      description:
        `
         The Chadow Project aims to enable an online chat server to facilitate file sharing between connected users,
         while preserving the anonymity of IP addresses. This protocol aims to offer two download modes: open mode,
         where clients connect directly to each other, and hidden mode, where a proxy system is used to mask IP addresses.
        `,
      image: "/projects/available_soon.jpg",
      technologies: ["Java 21"],
      category: "Backend",
      liveUrl: undefined,
      githubUrl: "https://github.com/Pinapow/chadow",
      metrics: undefined,
      featured: true,
    },
    {
      id: 3,
      title: "BooqIn - Android Version",
      description:
        `
        BooqIn is a platform for managing and lending books between users.
        The site allows users to create collections, share their books and borrow those of other users.
        Adapt to android mobile user.
        `,
      image: "/projects/android.png",
      technologies: ["Kotlin"],
      category: "Mobile",
      liveUrl: undefined,
      githubUrl: "https://github.com/Pinapow/booqin-android",
      metrics: undefined,
      featured: true,
    },
    {
      id: 4,
      title: "Nasm Compilator",
      description:
        `
        The objective of this project is to program a
        compiler that detects semantic errors and produces target code in NASM assembly language for
        the TPC programming language.
        `,
      image:
        "/projects/available_soon.jpg",
      technologies: ["C", "Yacc", "Lex"],
      category: "Backend",
      liveUrl: undefined,
      githubUrl: "https://github.com/Pinapow/nasm-compilator",
      metrics: undefined,
      featured: false,
    },
    {
      id: 5,
      title: "GitClout",
      description:
        `
        The aim of the GitClout project is to write a web application that analyses the tags in a git repository
        (e.g. on GitHub or GitLab) and displays various information to provide
        a better understanding of each contributor's contributions.
        `,
      image:
        "/projects/available_soon.jpg",
      technologies: ["Java 21", "Spring 6", "Vue.js", "BulmaCSS", "Jgit", "HyperSQL"],
      category: "Full-Stack",
      liveUrl: undefined,
      githubUrl: "https://github.com/Pinapow/gitclout",
      metrics: undefined,
      featured: false,
    },
  ];

  // Helper functions
  const getFeaturedProjects = (): Project[] => {
    return projects.filter(project => project.featured);
  };

  const featuredProjects = getFeaturedProjects();

  return (
    <TooltipProvider>
      <section id="projects" className="section-padding">
        <div className="container-custom">
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
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl -m-8"></div>
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
                <Card
                  key={project.id}
                  className="card-hover overflow-hidden animate-fade-up flex flex-col h-full border-primary/20 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={192}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary text-primary-foreground shadow-lg">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                      ⭐ Featured
                    </div>
                  </div>
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
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
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
