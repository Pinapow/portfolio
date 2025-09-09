import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Filter } from "lucide-react";
import Image from "next/image";

const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard. Built for scalability with microservices architecture.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
      category: "Full-Stack",
      liveUrl: "https://ecommerce-demo.com",
      githubUrl: "https://github.com/alexthompson/ecommerce",
      metrics: {
        performance: 96,
        users: "10K+",
        uptime: "99.9%"
      },
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, team collaboration features, and advanced reporting capabilities.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io", "Vercel"],
      category: "Frontend",
      liveUrl: "https://taskmaster-app.com",
      githubUrl: "https://github.com/alexthompson/taskmaster",
      metrics: {
        performance: 98,
        users: "5K+",
        uptime: "99.8%"
      },
      featured: true
    },
    {
      id: 3,
      title: "AI Content Generator",
      description: "SaaS platform leveraging OpenAI APIs for content generation with user authentication, subscription management, and usage analytics.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Express", "MongoDB", "OpenAI", "Stripe"],
      category: "Full-Stack",
      liveUrl: "https://ai-content-gen.com",
      githubUrl: "https://github.com/alexthompson/ai-content",
      metrics: {
        performance: 94,
        users: "2K+",
        uptime: "99.7%"
      },
      featured: false
    },
    {
      id: 4,
      title: "Real Estate Dashboard",
      description: "Analytics dashboard for real estate professionals with property listings, market trends, and client management features.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Charts.js"],
      category: "Frontend",
      liveUrl: "https://realestate-dashboard.com",
      githubUrl: "https://github.com/alexthompson/realestate",
      metrics: {
        performance: 92,
        users: "800+",
        uptime: "99.5%"
      },
      featured: false
    },
    {
      id: 5,
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication, transaction history, and budget tracking features.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Plaid"],
      category: "Mobile",
      liveUrl: "https://secure-banking-app.com",
      githubUrl: "https://github.com/alexthompson/banking-app",
      metrics: {
        performance: 95,
        users: "15K+",
        uptime: "99.9%"
      },
      featured: true
    },
    {
      id: 6,
      title: "DevOps Monitoring Suite",
      description: "Comprehensive monitoring and alerting system for DevOps teams with custom dashboards and automated incident response.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Python", "Docker", "Kubernetes", "Grafana", "Prometheus"],
      category: "Backend",
      liveUrl: "https://devops-monitor.com",
      githubUrl: "https://github.com/alexthompson/devops-suite",
      metrics: {
        performance: 97,
        users: "500+",
        uptime: "99.9%"
      },
      featured: false
    }
  ];

  const categories = ["All", "Full-Stack", "Frontend", "Backend", "Mobile"];

  const filteredProjects = selectedFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of my recent work, demonstrating expertise across different 
            technologies and domains. Each project represents a unique challenge 
            and innovative solution.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Highlighted Work</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="card-hover overflow-hidden animate-fade-up"
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
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <h4 className="text-xl font-semibold">{project.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-primary">
                        {project.metrics.performance}
                      </div>
                      <div className="text-xs text-muted-foreground">Performance</div>
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
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
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

        {/* All Projects with Filter */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold">All Projects</h3>
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedFilter === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="card-hover overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={160}
                    className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">{project.title}</h4>
                  <p className="text-muted-foreground text-sm mb-3 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;