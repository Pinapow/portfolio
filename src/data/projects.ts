import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "BooqIn",
    description: `BooqIn is a platform for managing and lending books between users.
         The site allows users to create collections, share their books and borrow those of other users.`,
    image: "/projects/available_soon.jpg",
    technologies: [
      "React",
      "Java 21",
      "Spring 6",
      "Stripe",
      "Google Books API",
      "Thymeleaf",
      "Docker",
    ],
    category: "Full-Stack",
    liveUrl: undefined,
    githubUrl: "https://github.com/phuong-le-tech/booqin",
    metrics: undefined,
    featured: true,
  },
  {
    id: 2,
    title: "Chadow",
    description: `The Chadow Project aims to enable an online chat server to facilitate file sharing between connected users,
         while preserving the anonymity of IP addresses. This protocol aims to offer two download modes: open mode,
         where clients connect directly to each other, and hidden mode, where a proxy system is used to mask IP addresses.`,
    image: "/projects/available_soon.jpg",
    technologies: ["Java 21"],
    category: "Backend",
    liveUrl: undefined,
    githubUrl: "https://github.com/phuong-le-tech/chadow",
    metrics: undefined,
    featured: true,
  },
  {
    id: 3,
    title: "BooqIn - Android Version",
    description: `BooqIn is a platform for managing and lending books between users.
        The site allows users to create collections, share their books and borrow those of other users.
        Adapt to android mobile user.`,
    image: "/projects/android.png",
    technologies: ["Kotlin"],
    category: "Mobile",
    liveUrl: undefined,
    githubUrl: "https://github.com/phuong-le-tech/booqin-android",
    metrics: undefined,
    featured: true,
  },
  {
    id: 4,
    title: "Nasm Compilator",
    description: `The objective of this project is to program a
        compiler that detects semantic errors and produces target code in NASM assembly language for
        the TPC programming language.`,
    image: "/projects/available_soon.jpg",
    technologies: ["C", "Yacc", "Lex"],
    category: "Backend",
    liveUrl: undefined,
    githubUrl: "https://github.com/phuong-le-tech/nasm-compilator",
    metrics: undefined,
    featured: false,
  },
  {
    id: 5,
    title: "GitClout",
    description: `The aim of the GitClout project is to write a web application that analyses the tags in a git repository
        (e.g. on GitHub or GitLab) and displays various information to provide
        a better understanding of each contributor's contributions.`,
    image: "/projects/available_soon.jpg",
    technologies: [
      "Java 21",
      "Spring 6",
      "Vue.js",
      "BulmaCSS",
      "Jgit",
      "HyperSQL",
    ],
    category: "Full-Stack",
    liveUrl: undefined,
    githubUrl: "https://github.com/phuong-le-tech/gitclout",
    metrics: undefined,
    featured: false,
  },
];
