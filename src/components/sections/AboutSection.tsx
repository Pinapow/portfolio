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
import { TimelineItem } from "@/types";
import { skills, expertiseAreas, timeline } from "@/data/about";

const TimelineCard = ({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-up focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-background"
      style={{ animationDelay: `${index * 0.1}s` }}
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
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="flex-shrink-0 w-12 h-12 relative">
            {item.companyLogo ? (
              <div className="w-full h-full rounded-lg overflow-hidden border">
                <Image
                  src={item.companyLogo}
                  alt={`${item.company} logo`}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center border">
                <div className="text-primary font-semibold text-lg">
                  {item.company.charAt(0)}
                </div>
              </div>
            )}
          </div>

          {/* Company Info */}
          <div className="flex-grow min-w-0">
            <div className="flex items-start gap-8 mb-1">
              <h4 className="font-semibold text-lg line-clamp-1 flex-grow">
                {item.title}
              </h4>
              <div className="flex-shrink-0 w-28 pt-1">
                <Badge variant="outline" className="text-xs whitespace-nowrap">
                  {item.year}
                </Badge>
              </div>
              {/* Expand/Collapse Icon - Right after the role */}
              <div className="flex-shrink-0 pt-0.5">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-primary font-medium">{item.company}</p>
              {item.companyWebsite && (
                <a
                  href={item.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Description */}
        {isExpanded && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="ml-40">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-muted/30 relative">
      {/* About-specific gradient background */}
      <div className="absolute inset-0 gradient-bg-about"></div>
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Passionate about creating digital solutions that make a difference.
            I combine technical expertise with creative problem-solving to
            deliver exceptional user experiences.
          </p>
        </div>

        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="animate-slide-in">
            <h3 className="text-2xl font-semibold mb-6">My Story</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Graduate with a Master&apos;s degree in Software and Data
              Engineering, seeking a position as a Software Developer or Full
              Stack Developer on a permanent contract. Passionate about
              application development and technical challenges, with solid
              development experience gained through a work-study programme.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I believe in writing clean, maintainable code and staying
              up-to-date with the latest technologies. As a recent university
              graduate with a master&apos;s degree, I bring fresh perspectives
              and cutting-edge knowledge to software development. My approach
              combines technical excellence with user-centered design to create
              applications that not only work flawlessly but also provide
              exceptional user experiences.
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Paris, France</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Available for projects</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>
                  Master Software and Data Engineering, Université Gustave
                  Eiffel
                </span>
              </div>
            </div>
          </div>

          <div className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6">
              Skills & Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="w-12 h-12 mb-3 flex items-center justify-center"
                    style={{ color: skill.color || "currentColor" }}
                  >
                    <skill.icon className="w-8 h-8" />
                  </div>
                  <span className="font-medium text-sm text-center mb-2">
                    {skill.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {skill.category}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expertise Areas */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Areas of Expertise
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {expertiseAreas.map((area, index) => (
              <Card
                key={area.title}
                className="card-hover border-border/50 animate-fade-up w-full max-w-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                      <area.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{area.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {area.description}
                  </p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {area.technologies.map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Timeline */}
        <div>
          <h3 className="text-2xl font-semibold text-center mb-8">
            Career Journey
          </h3>
          <div className="max-w-4xl mx-auto space-y-4">
            {timeline.map((item, index) => (
              <TimelineCard key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
