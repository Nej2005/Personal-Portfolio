export const portfolioData = {
  personal: {
    name: "Jenny Hernandez",
    initials: "JH",
    role: "Information Technology Student",
    headline: "Browse through projects I’ve built, the tools I use, and my journey in tech.",
    location: "Pasig City, Philippines",
    timezone: "Asia/Manila",
    email: "jennypatanag@gmail.com",
    phone: "+63 9175045559",
    secondaryPhone: "+63 9603829786",
    github: "https://github.com/Nej2005",
    githubUsername: "Nej2005",
    githubAccounts: {
      personal: {
        label: "Personal GitHub",
        username: "Nej2005",
        url: "https://github.com/Nej2005",
        description: "Personal builds & capstone systems",
        type: "Personal"
      },
      school: {
        label: "School / Academic GitHub",
        username: "jennyH25",
        url: "https://github.com/jennyH25",
        description: "Academic coursework & university projects",
        type: "School / Academic"
      }
    },
    linkedin: "https://linkedin.com/in/jenny-hernandez-ph/",
    linkedinUsername: "jennyhernandez",
    resumeUrl: "/Jenny_Hernandez_Resume.pdf",
    profileImage: "/images/profile.jpg",
  },

  about: {
    sectionLabel: "ABOUT ME",
    heading: "Get to know me",
    paragraph: "I'm a 21-year-old 4th-year BSIT student at Pamantasan ng Lungsod ng Pasig, working toward becoming a back-end developer. Alongside maintaining strong academic standing, I'm passionate about exploring new tools, building functional systems, and continuously leveling up my technical skills.",
    achievements: [
      {
        title: "President's Lister",
        subtitle: "College of Computer Studies",
        date: "2023 – Present",
        icon: "Award"
      },
      {
        title: "Pasig City Scholar Student",
        subtitle: "Full College Tenure",
        date: "2023 – Present",
        icon: "Award"
      },
      {
        title: "with Honors",
        subtitle: "Senior High School (STEM)",
        date: "2021",
        icon: "Award"
      }
    ],
    softSkills: [
      { name: "Communication & Documentation", desc: "Writing clear technical docs, and project updates" },
      { name: "Leadership", desc: "Providing direction on projects, coordinating team efforts, and ensuring sprint objectives are met." },
      { name: "Problem Solving & Troubleshooting", desc: "Applying logical thinking to identify issues, analyze root causes, and develop effective solutions for processes." },
      { name: "Adaptability", desc: "Quickly learning new tech stacks, tools, and shifting project needs" },
      { name: "Time Management", desc: "Organizing priorities effectively and completing tasks within set deadlines." }
    ]
  },

  projects: [
    {
      id: "personal-portfolio",
      title: "Personal Developer Portfolio",
      description: "Interactive portfolio showcase with dark mode, system builds, skill matrix, and custom AI assistant integration.",
      technologies: ["React", "Vite", "Tailwind CSS", "JavaScript", "Gemini API"],
      image: "/projects_thumbnail/hernandez-portfolio.png",
      githubUrl: "https://github.com/Nej2005/Personal-Portfolio.git",
      githubAccount: "Personal GitHub",
      accountType: "personal",
      demoUrl: "#",
      featured: true
    },
    {
      id: "barbeque-ni-bebang",
      title: "Barbeque ni Bebang | Official Website",
      description: "Digital storefront for a local Pasig barbecue business featuring an interactive BBQ order calculator and Messenger integration.",
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      image: "/projects_thumbnail/BBQ-ni-Bebang.png",
      githubUrl: "https://github.com/Nej2005/Barbeque-ni-Bebang",
      githubAccount: "Personal GitHub",
      accountType: "personal",
      demoUrl: "https://barbeque-ni-bebang.vercel.app/",
      featured: true
    },
    {
      id: "plp-examguard",
      title: "PLP ExamGuard — Capstone Project",
      description: "Secure online examination platform designed to monitor suspicious student activities, record violations, and maintain audit trails during digital assessments.",
      role: "Back-end",
      technologies: ["Next.js", "React", "TypeScript", "Node.js", "Supabase", "Tailwind CSS"],
      image: null,
      githubUrl: "https://github.com/JohnDanielCabusas/plp-examguard",
      githubAccount: "School GitHub",
      accountType: "school",
      demoUrl: null,
      featured: true
    },
    {
      id: "plp-lost-and-found",
      title: "PLP Lost and Found System",
      description: "A web application for the PLP campus community to streamline reporting, item matching, verification questionnaires, and claim recovery oversight.",
      role: "Back-end",
      technologies: ["React", "Vite", "Node.js", "Express", "Supabase", "Tailwind CSS"],
      image: null,
      githubUrl: "https://github.com/edvtle/lforls-system",
      githubAccount: "School GitHub",
      accountType: "school",
      demoUrl: null,
      featured: true
    },
    {
      id: "svms-system",
      title: "Student Violation Monitoring System",
      description: "A comprehensive platform for recording student disciplinary violations, generating PDF/Excel reports, and managing role-based portal access.",
      role: "Back-end",
      technologies: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
      image: null,
      githubUrl: "https://github.com/jennyH25/svms-system",
      githubAccount: "School GitHub",
      accountType: "school",
      demoUrl: "https://student-violation-management.vercel.app/",
      featured: true
    }
  ],

  skills: {
    programmingLanguages: [
      {
        name: "JavaScript",
        logo: "javascript",
        usedIn: "Personal Developer Portfolio, Barbeque ni Bebang, PLP Lost and Found System, SVMS System"
      },
      {
        name: "TypeScript",
        logo: "typescript",
        usedIn: "Barbeque ni Bebang, PLP ExamGuard Capstone Project"
      },
      {
        name: "React",
        logo: "react",
        usedIn: "Personal Developer Portfolio, Barbeque ni Bebang, PLP ExamGuard, SVMS System"
      },
      {
        name: "Node.js",
        logo: "nodejs",
        usedIn: "PLP ExamGuard, PLP Lost and Found System, SVMS System"
      },
      {
        name: "Next.js",
        logo: "nextjs",
        usedIn: "PLP ExamGuard Capstone Project"
      },
      {
        name: "Express.js",
        logo: "express",
        usedIn: "PLP Lost and Found System, SVMS System"
      },
      {
        name: "HTML5",
        logo: "html5",
        usedIn: "Personal Portfolio, Barbeque ni Bebang, Academic Projects"
      },
      {
        name: "CSS3",
        logo: "css3",
        usedIn: "Personal Portfolio, Barbeque ni Bebang, Academic Projects"
      },
      {
        name: "Tailwind CSS",
        logo: "tailwindcss",
        usedIn: "Personal Portfolio, Barbeque ni Bebang, PLP ExamGuard, SVMS System"
      },
      {
        name: "PostgreSQL",
        logo: "postgresql",
        usedIn: "PLP ExamGuard, PLP Lost and Found System, SVMS System"
      },
      {
        name: "PHP",
        logo: "php",
        usedIn: "Academic Coursework & Web Systems"
      },
      {
        name: "Java",
        logo: "java",
        usedIn: "Academic Coursework & Object-Oriented Systems"
      }
    ],
    developerTools: [
      {
        name: "VS Code",
        usedIn: "Primary IDE for full-stack and web development",
        icon: "Code",
        category: "Primary IDE"
      },
      {
        name: "Git & GitHub",
        usedIn: "Version control, repositories, and collaboration",
        icon: "GitBranch",
        category: "Version Control"
      },
      {
        name: "MySQL & Supabase",
        usedIn: "Relational database modeling, SQL queries & cloud storage",
        icon: "Database",
        category: "Database Systems"
      },
      {
        name: "Figma, Canva, & Draw.io",
        usedIn: "UI/UX Design Projects, Wireframing, and flowcharting",
        icon: "Layout",
        category: "Design & Diagramming"
      },
      {
        name: "ChatGPT, Codex & Antigravity (Gemini/Claude models)",
        usedIn: "AI-assisted engineering, prompt workflows & model integrations",
        icon: "Sparkles",
        category: "AI & LLM Tools"
      },
      {
        name: "Notion & Discord",
        usedIn: "Task management, project documentation, and team collaboration",
        icon: "FolderKanban",
        category: "Productivity"
      }
    ]
  },

  certifications: [
    {
      id: "alibaba-vibe-coding",
      name: "Vibe Coding Pro: Elevate Your Skills with AI-Driven Coding",
      issuer: "Alibaba Cloud Academy",
      year: "2025 – 2028",
      badge: "AI & Cloud Coding",
      imagePreview: "/Certifications/Alibaba-vibecoding.jpg",
      fileUrl: "/Certifications/Alibaba-vibecoding.jpg",
      verifyUrl: "#"
    },
    {
      id: "she-plus-alibaba-cloud",
      name: "SHE++ Masterclass on Alibaba Cloud System",
      issuer: "PhilDev, Wells Fargo & Alibaba Cloud",
      year: "2025",
      badge: "Cloud Infrastructure",
      imagePreview: "/Certifications/Alibaba Masterclass Certificate.jpg",
      fileUrl: "/Certifications/Alibaba Masterclass Certificate.pdf",
      verifyUrl: "#"
    },
    {
      id: "isite-digital-era",
      name: "The Future of the Digital Era",
      issuer: "Integrated Society of Information Technology Enthusiasts (iSITE)",
      year: "2025",
      badge: "Digital Innovation",
      imagePreview: "/Certifications/iSite-participation.jpg",
      fileUrl: "/Certifications/iSite-participation.jpg",
      verifyUrl: "#"
    },
    {
      id: "she-plus-linkedin-presence",
      name: "Stand Out in the Digital Crowd: LinkedIn & Online Presence Essentials",
      issuer: "PhilDev & Wells Fargo (SHE++)",
      year: "2025",
      badge: "Career Development",
      imagePreview: "/Certifications/Certificate of Participation.jpg",
      fileUrl: "/Certifications/Certificate of Participation.pdf",
      verifyUrl: "#"
    },
    {
      id: "she-plus-workshop-series",
      name: "SHE++ Workshop Series (Sessions 1–3)",
      issuer: "PhilDev, Wells Fargo & Partners",
      year: "2025",
      badge: "Leadership & Innovation",
      isMultiSession: true,
      sessions: [
        {
          sessionNumber: 1,
          title: "Session 1: Leadership & Technopreneurial Mindset",
          issuer: "PhilDev, Wells Fargo & Agyle Brands",
          year: "2025",
          imagePreview: "/Certifications/[Session 1] Certificate of Completion.jpg",
          fileUrl: "/Certifications/[Session 1] Certificate of Completion.pdf"
        },
        {
          sessionNumber: 2,
          title: "Session 2: Design Thinking Workshop",
          issuer: "PhilDev, Wells Fargo & Limitless Lab",
          year: "2025",
          imagePreview: "/Certifications/[Session 2] Certificate of Completion.jpg",
          fileUrl: "/Certifications/[Session 2] Certificate of Completion.pdf"
        },
        {
          sessionNumber: 3,
          title: "Session 3: Strategic Foresight & Technopreneurship",
          issuer: "PhilDev, Wells Fargo & Limitless Lab",
          year: "2025",
          imagePreview: "/Certifications/[Session 3] Certificate of Completion.jpg",
          fileUrl: "/Certifications/[Session 3] Certificate of Completion.pdf"
        }
      ]
    },
    {
      id: "packetworx-iot-series",
      name: "Packetworx LoRaWAN & IoT Workshop Series (Sessions 1–3)",
      issuer: "Packetworx Inc. & KadaKareer",
      year: "2026",
      badge: "IoT & LoRaWAN",
      isMultiSession: true,
      sessions: [
        {
          sessionNumber: 1,
          title: "Session 1: IoT & LoRaWAN Basics & Protocols",
          issuer: "Packetworx Inc. & KadaKareer",
          year: "2026",
          imagePreview: "/Certifications/Jenny  Hernandez Packetworx Workshop 1 Certificate.jpg",
          fileUrl: "/Certifications/Jenny  Hernandez Packetworx Workshop 1 Certificate.pdf"
        },
        {
          sessionNumber: 2,
          title: "Session 2: LoRa & LoRaWAN Frameworks & Deployment",
          issuer: "Packetworx Inc. & KadaKareer",
          year: "2026",
          imagePreview: "/Certifications/Jenny  Hernandez Packetworx Workshop 2 Certificate.jpg",
          fileUrl: "/Certifications/Jenny  Hernandez Packetworx Workshop 2 Certificate.pdf"
        },
        {
          sessionNumber: 3,
          title: "Session 3: Practical Applications of IoT & LoRaWAN",
          issuer: "Packetworx Inc. & KadaKareer",
          year: "2026",
          imagePreview: "/Certifications/Jenny Hernandez Packetworx Workshop 3 Certificate.jpg",
          fileUrl: "/Certifications/Jenny Hernandez Packetworx Workshop 3 Certificate.pdf"
        }
      ]
    }
  ],

  suggestedQuestions: [
    "What projects has she built?",
    "What technologies does she know?",
    "Tell me about her best project.",
    "What skills did she use in her projects?",
    "What certifications does she have?",
    "What is she currently learning?"
  ]
};
