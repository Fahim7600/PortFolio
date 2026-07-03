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
  name: 'Arfan Ahmed Fahim',
  title: 'Full Stack Developer',
  tagline: 'A Computer Science graduate and Full Stack Developer dedicated to building responsive MERN applications and exploring the intersections of AI, machine learning, and computer vision.',
  email: 'arfanahmedfahim832@gmail.com',
  phone: '01330044020',
  location: 'Aftabnagar, Dhaka, Bangladesh',
  bio: 'Recent Computer Science graduate specializing in building robust, interactive web applications with the MERN stack. Actively exploring integrations of AI, machine learning models, and computer vision algorithms into modern software platforms.',
  resumeUrl: '/resume.pdf',
  avatarUrl: '/assets/avatar.jpg',
};

// -----------------------------------------------------------
// About Me Info
// -----------------------------------------------------------
export interface AboutInfo {
  journeyIntro: string;
  whatILoveBuilding: string;
  beyondTheCode: string;
}

export const aboutInfo: AboutInfo = {
  journeyIntro: 'My fascination with programming began early in my undergraduate journey, sparked by something simple: watching websites work. I was captivated by how a page could load in a split second, quietly solving a real human problem — how it stored user data, retrieved it instantly, and made complex information feel effortless to access. That invisible engine behind a smooth user experience is what first pulled me toward web development, and I knew I wanted to master it. My interest in AI traces back even further, to a childhood love of mathematics. Watching that math translate into systems that could recognize patterns and make sense of the unknown felt like a natural extension of that early curiosity. This crystallized during my CSE421 (Artificial Intelligence) course, where I saw firsthand how elegant math could power genuinely intelligent behavior. That fascination carried directly into my thesis, where I work on computer vision for industrial defect detection.',
  whatILoveBuilding: 'If you ask me where my heart truly lies in development, it\'s backend. There\'s something deeply satisfying about designing the logic that nobody sees but everything depends on — the APIs that respond correctly under pressure, the database schemas that hold up as data grows, the systems that quietly make sure everything upstream just works. That same instinct is what draws me to machine learning and AI. I love building models from the ground up — not just using pretrained tools, but actually understanding what\'s happening under the hood, training and tuning them, and watching them learn to recognize patterns that aren\'t obvious to the human eye. I\'ve also started exploring AI agents, which feels like a natural next step: systems that don\'t just respond, but reason and act. My undergraduate thesis, where I built a multi-task computer vision model for industrial defect detection, gave me a real taste of research-driven engineering. Between backend systems and AI/ML, I\'ve found the intersection where structured logic meets intelligent behavior — and that\'s where I want to keep growing.',
  beyondTheCode: 'When I\'m away from the keyboard, cricket takes over — I\'ve followed the sport for as long as I can remember, playing whenever I get the chance and keeping track of series, stats, and storylines across the cricketing world. The other thing that genuinely fascinates me is stadium architecture — how these massive structures are engineered not just to hold thousands of people, but to create an atmosphere. I find myself reading about stadiums around the world, admiring how design and engineering come together to build something both functional and awe-inspiring — the stadiums built for the 2026 FIFA World Cup are a great recent example. It\'s a curiosity that mirrors what draws me to engineering itself: taking something complex and making it work beautifully.',
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
    url: 'https://github.com/Fahim7600',
    icon: 'FaGithub',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/arfan-ahmed-fahim',
    icon: 'FaLinkedin',
  },
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:arfanahmedfahim832@gmail.com',
    icon: 'FiMail',
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
export interface SkillItem {
  name: string;
  icon: string; // React icon name
}

export interface SkillCategoryGroup {
  category: string;
  skills: SkillItem[];
}

export const skills: SkillCategoryGroup[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', icon: 'SiPython' },
      { name: 'C', icon: 'SiC' },
      { name: 'JavaScript', icon: 'SiJavascript' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML5', icon: 'SiHtml5' },
      { name: 'CSS3', icon: 'SiCss' },
      { name: 'React', icon: 'SiReact' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'SiNodedotjs' },
      { name: 'Express', icon: 'SiExpress' },
      { name: 'Prisma', icon: 'SiPrisma' },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MongoDB', icon: 'SiMongodb' },
      { name: 'PostgreSQL', icon: 'SiPostgresql' },
      { name: 'SQL', icon: 'FaDatabase' },
    ],
  },
  {
    category: 'Architecture & Concepts',
    skills: [
      { name: 'OOP', icon: 'FiCpu' },
      { name: 'MVC Design Pattern', icon: 'FiLayers' },
      { name: 'Modular Design Pattern', icon: 'FiBox' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', icon: 'SiGit' },
    ],
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
