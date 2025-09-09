import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Mail } from "lucide-react";
import Image from "next/image";
import heroWorkspace from "@/assets/hero-workspace.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  const metrics = [
    { value: "5+", label: "Years Experience" },
    { value: "50+", label: "Projects Completed" },
    { value: "15+", label: "Happy Clients" },
    { value: "99%", label: "Uptime Achieved" },
  ];

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroWorkspace}
          alt="Developer workspace"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 hero-gradient opacity-80" />
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        {/* Profile Photo */}
        <div className="mb-8 animate-fade-in">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 relative">
            <Image
              src={profilePhoto}
              alt="Alex Thompson"
              fill
              className="rounded-full object-cover border-4 border-primary/20 shadow-2xl"
            />
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-slow" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h1 className="text-4xl md:text-6xl lg:text-hero font-bold mb-6 leading-tight">
            Hi, I&apos;m{" "}
            <span className="gradient-text">Alex Thompson</span>
          </h1>

          <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8 font-light">
            Senior Full-Stack Developer
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            I craft exceptional digital experiences with modern technologies. 
            Specializing in React, Node.js, and cloud architecture to build 
            scalable, high-performance applications that drive business growth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={scrollToContact}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {metrics.map((metric, index) => (
              <div 
                key={metric.label} 
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                  {metric.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
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