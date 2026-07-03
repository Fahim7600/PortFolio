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
// Hero Stats
// -----------------------------------------------------------
export interface HeroStat {
  label: string;
  value: string;
  suffix: string;
}

export const heroStats: HeroStat[] = [
  { label: 'CGPA', value: '3.72', suffix: '/4.00' },
  { label: 'Thesis Published', value: '1', suffix: '' },
  { label: 'Projects Built', value: '3', suffix: '+' },
  { label: 'Years Coding', value: '3', suffix: '+' },
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
export interface ThesisStat {
  label: string;
  value: string;
}

export interface EducationInfo {
  institution: string;
  degree: string;
  graduationYear: string;
  cgpa: string;
  thesisTitle: string;
  thesisAbstract: string;
  thesisHighlights: ThesisStat[];
}

export const educationInfo: EducationInfo = {
  institution: 'BRAC University',
  degree: 'B.Sc. in Computer Science and Engineering',
  graduationYear: '2026',
  cgpa: '3.72 / 4.00',
  thesisTitle: 'Computer Vision Based Deep Learning Approaches for Automated Visual Inspection and Defect Detection in Industrial Environments',
  thesisAbstract: 'Industrial defect inspection on modern production lines must simultaneously determine whether a product is defective, what type of defect is present, and which product is being inspected. Single-task classifiers solve only one of these problems and cannot share visual computation across the three decisions. This work proposes EdgeNetV4, a multi-task convolutional architecture that produces all three outputs in a single forward pass. A unified multi-domain dataset is constructed by merging MVTec AD, Casting Product, and Magnetic Tile under a common eight-class defect taxonomy and a seventeen-class product taxonomy. EdgeNetV4 employs an EfficientNet-B2 backbone with identity-initialised Coordinate Attention modules, a shared semantic neck for the binary and product heads, and a multi-scale defect head that concatenates pooled features from three backbone scales into a single descriptor before classification. The training protocol combines masked focal loss with per-class inverse-frequency weighting, homoscedastic uncertainty balancing, and cosine annealing with warm restarts under exponential moving average of weights. On the held-out validation set, EdgeNetV4 attains a defect-type macro F1 of 0.966, binary accuracy of 99.3%, and product accuracy of 100.0%, surpassing the strongest single-task baseline by a clear margin. On the held-out test set, the model achieves defect-type macro F1 of 0.957 and binary AUC-ROC of 0.996, confirming that validation performance generalises to unseen data. Controlled ablations isolate the contribution of each component, with the multi-scale defect head and the loss reweighting strategy identified as the two largest contributors to the overall gain. Per-dataset evaluation confirms stable cross-domain behaviour across all three source domains. The model fits within a practical parameter budget and supports deployment on edge hardware.',
  thesisHighlights: [
    { label: 'Defect-Type Macro F1', value: '0.966' },
    { label: 'Binary Accuracy', value: '99.3%' },
    { label: 'Product Accuracy', value: '100.0%' },
    { label: 'Binary AUC-ROC', value: '0.996' },
  ],
};

// -----------------------------------------------------------
// Projects
// -----------------------------------------------------------
export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  keyFeatures: string[];
  liveLink: string | null;
  githubLink: string;
  challenges: string;
  futureImprovements: string;
}

export const projects: Project[] = [
  {
    id: 'migrateright',
    name: 'MigrateRight — Safe Migration & Overseas Worker Support Network',
    shortDescription: 'A MERN platform tackling fraudulent recruitment agencies, wage theft, and lack of emergency support for migrant workers — agency verification, geospatial search, and transparent fee tracking.',
    fullDescription: 'MigrateRight is a full-stack MERN application built to make overseas labor migration safer and more transparent. It lets workers verify recruitment agencies, search agencies geospatially, track fees and reviews transparently, and reduces exposure to fraudulent recruiters and wage exploitation.',
    techStack: ['React', 'React Router', 'Axios', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'Cloudinary'],
    keyFeatures: [
      'Verified agency database with ratings and reviews to flag fraudulent recruiters',
      'Geospatial search to find nearby verified agencies',
      'Role-based access control for workers, agencies, and admins on shared API routes',
      'Transparent fee and document tracking with Cloudinary-backed uploads',
    ],
    liveLink: null,
    githubLink: 'https://github.com/rahim2025/MigrateRight---Safe-Migration-and-Overseas-Worker-Support-Network',
    challenges: 'Implementing secure role-based JWT authentication across worker, agency, and admin roles was one of the trickiest parts — each role needed different permissions on the same API routes. Geospatial search for nearby verified agencies also required careful MongoDB indexing to keep queries fast, and handling Cloudinary image uploads reliably (agency documents, profile photos) added another layer of error handling to get right.',
    futureImprovements: 'Planned improvements include a real-time SOS/emergency alert system for workers abroad, multilingual support (Bengali, Hindi, Arabic) since the target users span multiple regions, and an escrow-style payment tracking feature to add another layer of financial transparency.',
  },
  {
    id: 'petsphere',
    name: 'PetSphere',
    shortDescription: 'An all-in-one pet adoption, care, and lost-and-found platform with real-time chat and notifications.',
    fullDescription: 'PetSphere simplifies pet adoption and care coordination — adopters can register, discover pets with filtered search, view detailed pet profiles, submit adoption applications, chat in real time with shelters/owners, and get notified on application status updates.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    keyFeatures: [
      'Real-time chat between adopters and shelters/owners',
      'Smart filtered pet search by species, breed, age, and location',
      'Instant notifications on adoption application status updates',
      'Lost-and-found reporting system for missing pets',
    ],
    liveLink: null,
    githubLink: 'https://github.com/2ManyFaces/PetSphere_CSE471_Section06_Group07',
    challenges: 'Building the real-time chat and notification system was the biggest technical challenge — keeping message delivery and notification state in sync across users without constant polling required careful socket-based architecture. Designing a flexible pet-filtering system (species, breed, age, location) that stayed fast as listings grew was another key problem to solve on the MongoDB side.',
    futureImprovements: 'Future plans include AI-assisted adopter-pet matching based on lifestyle and preferences, a video-call feature for virtual meet-and-greets before adoption, and a geolocation map view for the lost-and-found feature so nearby sightings are easier to spot.',
  },
  {
    id: 'cineplex',
    name: 'Cineplex Project',
    shortDescription: 'A cinema ticketing and management website built as a relational database systems project.',
    fullDescription: 'Cineplex is a Flask and MySQL-based web application for browsing movies, showtimes, and booking cinema seats — built as a database systems course project with a strong focus on relational schema design and query correctness.',
    techStack: ['Python', 'Flask', 'MySQL', 'HTML', 'CSS'],
    keyFeatures: [
      'Movie and showtime browsing with interactive seat selection',
      'Relational schema design that prevents double-booking conflicts',
      'Admin-side tools for managing movies and showtimes',
      'SQL-driven reporting for occupancy and booking data',
    ],
    liveLink: null,
    githubLink: 'https://github.com/Hr-D-LuffY/Cineplex-Project',
    challenges: 'Designing a normalized relational schema that correctly modeled movies, showtimes, seats, and bookings — while preventing double-booking race conditions on popular showtimes — was the core challenge. Writing efficient SQL joins for seat availability checks and reporting queries also took real iteration to get right without a full ORM layer to lean on.',
    futureImprovements: 'Would like to add payment gateway integration, rebuild the frontend in React with a proper REST API layer instead of server-rendered Flask templates, and add an admin analytics dashboard for occupancy and revenue trends.',
  },
];
