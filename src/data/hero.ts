import { Github, Linkedin } from "lucide-react";
import { SiReact, SiSpring, SiDocker } from "react-icons/si";
import { DiJava } from "react-icons/di";
import { SocialLink } from "@/types";

export interface TechIcon {
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
    title?: string;
  }>;
  color: string;
  name: string;
  angle: number;
}

export const socialLinks: SocialLink[] = [
  { icon: Github, href: "https://github.com/Pinapow", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/phuong-le77100/",
    label: "LinkedIn",
  },
];

export const techIcons: TechIcon[] = [
  { icon: SiReact, color: "#61DAFB", name: "React", angle: 0 },
  { icon: DiJava, color: "#ED8B00", name: "Java", angle: 90 },
  { icon: SiSpring, color: "#6DB33F", name: "Spring", angle: 180 },
  { icon: SiDocker, color: "#2496ED", name: "Docker", angle: 270 },
];
