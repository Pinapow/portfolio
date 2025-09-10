import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Database,
  Cloud,
  Smartphone,
  Calendar,
  MapPin,
  GraduationCap,
} from "lucide-react";

const AboutSection = () => {
  const skills = [
    { name: "Java 21/Spring 6", level: 95, category: "Languages" },
    { name: "Php/Symfony", level: 95, category: "Languages" },
    { name: "Python", level: 90, category: "Languages" },
    { name: "C/C++", level: 88, category: "Languages" },
    { name: "React/TypeScript", level: 85, category: "Languages" },
    { name: "PostgreSQL/MySQL", level: 75, category: "Database" },
    { name: "MongoDB", level: 70, category: "Database" },
    { name: "AWS", level: 75, category: "DevOps" },
    { name: "Docker", level: 70, category: "DevOps" },
    { name: "Git", level: 85, category: "DevOps" },
  ];

  const expertiseAreas = [
    {
      icon: Code2,
      title: "Frontend Development",
      description:
        "Modern React applications with TypeScript and state-of-the-art UI libraries.",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
      ],
    },
    {
      icon: Database,
      title: "Backend Architecture",
      description:
        "Scalable server-side solutions with microservices, APIs, and database optimization.",
      technologies: [
          "Java 21",
          "Spring 6",
          "PostgreSQL",
          "MongoDB",
          "Redis"
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description:
        "Cloud-native applications with CI/CD pipelines, containerization, and monitoring.",
      technologies: [
        "AWS",
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "Terraform",
      ],
    },
    /* {
      icon: Smartphone,
      title: "Mobile Development",
      description:
        "Cross-platform mobile applications with React Native and progressive web apps.",
      technologies: ["React Native", "Expo", "PWA", "Firebase", "App Store"],
    }, */
  ];

  const timeline = [
    {
      year: "09/2024 – 09/2025",
      title: "Work-study Full-stack Developer",
      company: "Cash Flow Positif",
      description:
      `— Architecture migration: Migration from Symfony/Twig to API Platform/React
      — Full-stack development: Development of a REST API, front-end and business automations with third-party services
      — DevOps and optimisation: Python scripts for database migration, AWS/Docker deployment
      `,
    },
    {
      year: "05/2024 – 09/2024",
      title: "Research Intern",
      company: "Laboratoire Institut Gustave Eiffel",
      description:
      `— Multi-agent algorithms: Development of trajectory planning (Held-Karp, Q-Learning)
      — Robotic simulation: ROS2/Gazebo testing
      — Embedded programming: Python/C development, inter-drone P2P communication and performance data analysis
      — Computer vision: Object detection and recognition using OpenCV and Nimbus
      `,

    },
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
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

            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I believe in writing clean, maintainable code and staying
              up-to-date with the latest technologies. My approach combines
              technical excellence with user-centered design to create
              applications that not only work flawlessly but also provide
              exceptional user experiences.
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Meaux, Seine-et-Marne</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Available for projects</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>Master Software and Data Engineering, Université Gustave Eiffel</span>
              </div>
            </div>
          </div>

          <div className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6">
              Skills & Technologies
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {skill.category}
                    </Badge>
                  </div>
                  <div className="skill-bar h-2 rounded-full overflow-hidden">
                    <div
                      className="skill-bar-fill h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    />
                  </div>
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
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className="flex gap-6 pb-8 animate-slide-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  {index < timeline.length - 1 && (
                    <div className="w-px h-full bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline">{item.year}</Badge>
                    <h4 className="font-semibold">{item.title}</h4>
                  </div>
                  <p className="text-primary font-medium mb-2">
                    {item.company}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
