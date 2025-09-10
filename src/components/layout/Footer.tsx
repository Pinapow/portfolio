import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Back to Top Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="rounded-full w-10 h-10 p-0 hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>

          {/* Logo */}
          <div className="text-center">
            <h3 className="gradient-text font-bold text-xl mb-2">
              Phuong LE
            </h3>
            <p className="text-muted-foreground text-sm">
              Full-Stack Developer
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-1">
              © {currentYear} Phuong LE. Built with React & TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
