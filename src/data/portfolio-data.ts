// ============================================================
// Portfolio Data — All content in one place
// ============================================================
// Replace PLACEHOLDER values with your real content.
// Each section has a typed interface for type safety.
// ============================================================

// -----------------------------------------------------------
// Personal / Bio Info
// -----------------------------------------------------------
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  resumeUrl: string;
  avatarUrl: string;
}

export const personalInfo: PersonalInfo = {
  name: 'PLACEHOLDER_NAME',
  title: 'PLACEHOLDER_TITLE', // e.g. "Full-Stack Developer"
  tagline: 'PLACEHOLDER_TAGLINE', // e.g. "Building elegant solutions..."
  email: 'placeholder@email.com',
  phone: '+1-000-000-0000',
  location: 'PLACEHOLDER_CITY, PLACEHOLDER_COUNTRY',
  bio: 'PLACEHOLDER_BIO — Write 2-3 sentences about yourself.',
  resumeUrl: '/assets/resume.pdf',
  avatarUrl: '/assets/avatar.jpg',
};

// -----------------------------------------------------------
// Social Links
// -----------------------------------------------------------
export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string; // react-icons icon name, e.g. "FaGithub"
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/PLACEHOLDER',
    icon: 'FaGithub',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/PLACEHOLDER',
    icon: 'FaLinkedin',
  },
  {
    id: 'twitter',
    label: 'Twitter',
    url: 'https://twitter.com/PLACEHOLDER',
    icon: 'FaTwitter',
  },
];

// -----------------------------------------------------------
// Navigation
// -----------------------------------------------------------
export interface NavItem {
  id: string;
  label: string;
  href: string; // anchor link like "#about"
}

export const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// -----------------------------------------------------------
// Skills
// -----------------------------------------------------------
export interface Skill {
  id: string;
  name: string;
  icon: string; // react-icons icon name
  category: SkillCategory;
  proficiency: number; // 0-100
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'tools'
  | 'languages';

export const skills: Skill[] = [
  {
    id: 'skill-react',
    name: 'React',
    icon: 'SiReact',
    category: 'frontend',
    proficiency: 90,
  },
  {
    id: 'skill-typescript',
    name: 'TypeScript',
    icon: 'SiTypescript',
    category: 'languages',
    proficiency: 85,
  },
  {
    id: 'skill-node',
    name: 'Node.js',
    icon: 'SiNodedotjs',
    category: 'backend',
    proficiency: 80,
  },
  {
    id: 'skill-python',
    name: 'Python',
    icon: 'SiPython',
    category: 'languages',
    proficiency: 75,
  },
  {
    id: 'skill-docker',
    name: 'Docker',
    icon: 'SiDocker',
    category: 'devops',
    proficiency: 70,
  },
  {
    id: 'skill-git',
    name: 'Git',
    icon: 'SiGit',
    category: 'tools',
    proficiency: 85,
  },
];

// -----------------------------------------------------------
// Education
// -----------------------------------------------------------
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string; // "YYYY-MM" or "YYYY"
  endDate: string; // "YYYY-MM", "YYYY", or "Present"
  gpa?: string;
  description?: string;
  logoUrl?: string;
}

export const education: Education[] = [
  {
    id: 'edu-1',
    institution: 'PLACEHOLDER University',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2020',
    endDate: '2024',
    gpa: '3.8/4.0',
    description:
      'PLACEHOLDER — Briefly describe relevant coursework, honors, or activities.',
  },
];

// -----------------------------------------------------------
// Experience
// -----------------------------------------------------------
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string; // or "Present"
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
  logoUrl?: string;
}

export const experience: Experience[] = [
  {
    id: 'exp-1',
    company: 'PLACEHOLDER Company',
    position: 'PLACEHOLDER Position',
    startDate: '2023-06',
    endDate: 'Present',
    location: 'PLACEHOLDER City',
    description:
      'PLACEHOLDER — Describe your role and key contributions in 1-2 sentences.',
    highlights: [
      'PLACEHOLDER_HIGHLIGHT_1',
      'PLACEHOLDER_HIGHLIGHT_2',
      'PLACEHOLDER_HIGHLIGHT_3',
    ],
    technologies: ['React', 'TypeScript', 'Node.js'],
  },
];

// -----------------------------------------------------------
// Projects
// -----------------------------------------------------------
export interface Project {
  id: string; // also used as the route slug: /project/:id
  title: string;
  shortDescription: string; // for the card on the home page
  longDescription: string; // for the detail page
  thumbnailUrl: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  category: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'PLACEHOLDER Project One',
    shortDescription:
      'PLACEHOLDER — A one-liner describing the project for the card.',
    longDescription:
      'PLACEHOLDER — A detailed description for the project detail page. Include the problem, approach, and outcome.',
    thumbnailUrl: '/assets/projects/project-1-thumb.jpg',
    images: [
      '/assets/projects/project-1-1.jpg',
      '/assets/projects/project-1-2.jpg',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://placeholder.com',
    repoUrl: 'https://github.com/placeholder/project-1',
    featured: true,
    category: 'Web App',
  },
  {
    id: 'project-2',
    title: 'PLACEHOLDER Project Two',
    shortDescription: 'PLACEHOLDER — Another project card description.',
    longDescription: 'PLACEHOLDER — Detailed description for project two.',
    thumbnailUrl: '/assets/projects/project-2-thumb.jpg',
    images: ['/assets/projects/project-2-1.jpg'],
    technologies: ['Python', 'FastAPI', 'PostgreSQL'],
    liveUrl: 'https://placeholder.com',
    repoUrl: 'https://github.com/placeholder/project-2',
    featured: true,
    category: 'Backend',
  },
  {
    id: 'project-3',
    title: 'PLACEHOLDER Project Three',
    shortDescription: 'PLACEHOLDER — Third project card description.',
    longDescription: 'PLACEHOLDER — Detailed description for project three.',
    thumbnailUrl: '/assets/projects/project-3-thumb.jpg',
    images: ['/assets/projects/project-3-1.jpg'],
    technologies: ['Three.js', 'WebGL', 'GLSL'],
    repoUrl: 'https://github.com/placeholder/project-3',
    featured: false,
    category: '3D / Creative',
  },
];
