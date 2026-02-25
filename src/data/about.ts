import { Code2, Database } from "lucide-react";
import {
  SiSpring,
  SiPhp,
  SiSymfony,
  SiPython,
  SiC,
  SiReact,
  SiTypescript,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiAmazon,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { Skill, ExpertiseArea, TimelineItem } from "@/types";

export const skills: Skill[] = [
  { name: "Java", icon: DiJava, category: "Languages", color: "#ED8B00" },
  { name: "Spring", icon: SiSpring, category: "Backend", color: "#6DB33F" },
  { name: "PHP", icon: SiPhp, category: "Languages", color: "#777BB4" },
  { name: "Symfony", icon: SiSymfony, category: "Backend", color: "#000000" },
  { name: "Python", icon: SiPython, category: "Languages", color: "#3776AB" },
  { name: "C/C++", icon: SiC, category: "Languages", color: "#A8B9CC" },
  { name: "React", icon: SiReact, category: "Frontend", color: "#61DAFB" },
  {
    name: "TypeScript",
    icon: SiTypescript,
    category: "Frontend",
    color: "#007ACC",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    category: "Database",
    color: "#4169E1",
  },
  { name: "MySQL", icon: SiMysql, category: "Database", color: "#4479A1" },
  {
    name: "MongoDB",
    icon: SiMongodb,
    category: "Database",
    color: "#47A248",
  },
  { name: "AWS", icon: SiAmazon, category: "DevOps", color: "#FF9900" },
  { name: "Docker", icon: SiDocker, category: "DevOps", color: "#2496ED" },
  { name: "Git", icon: SiGit, category: "DevOps", color: "#F05032" },
];

export const expertiseAreas: ExpertiseArea[] = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Modern React applications with TypeScript and state-of-the-art UI libraries.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
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
      "Php/Symfony",
      "MySQL",
      "MongoDB",
      "Redis",
    ],
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "09/2024 - 09/2025",
    title: "Full-stack Developer",
    company: "Cash Flow Positif",
    description: `- Design and migration of application architecture from Symfony/Twig
        to a REST API architecture with API Platform and React
        - Development of secure REST APIs in Symfony/Twig, React front-end integration,
        and business process automation
        - Writing Python scripts for database migration and deployment of
        containerised applications with Docker on AWS`,
    companyLogo: "/companies/cfp.jpeg",
    companyWebsite: "https://www.cashflowpositif.fr",
  },
  {
    year: "05/2024 - 09/2024",
    title: "Research Intern",
    company: "Laboratoire Institut Gustave Eiffel",
    description: `— Multi-agent algorithms: Development of trajectory planning (Held-Karp, Q-Learning)
— Robotic simulation: ROS2/Gazebo testing
— Embedded programming: Python/C development, inter-drone P2P communication and performance data analysis
— Computer vision: Object detection and recognition using OpenCV and Nimbus`,
    companyLogo: "/companies/igm.png",
    companyWebsite: "https://www.univ-gustave-eiffel.fr",
  },
];
