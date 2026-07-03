import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  FiGlobe,
  FiHeart,
  FiFilm,
  FiArrowRight,
  FiGithub,
  FiPlus,
} from 'react-icons/fi';
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiFlask,
  SiTailwindcss,
} from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';
import { projects } from '@/data/portfolio-data';
import type { Project } from '@/data/portfolio-data';
import { IconChip } from '../ui';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Map of string icons for tech stack logos
const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  React: SiReact,
  'Node.js': SiNodedotjs,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  Flask: SiFlask,
  'Tailwind CSS': SiTailwindcss,
  MySQL: FaDatabase,
};

// -----------------------------------------------------------
// 3D Tilt Card Wrapper Component
// Larger tilt bounds than skills chips to make it feel extremely premium
// -----------------------------------------------------------
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  accent: 'violet' | 'cyan' | 'magenta';
}

const TiltCard = ({ children, className, accent }: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft spring config for responsive return motion
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const hoverClasses = {
    violet: 'hover:border-purple-500 hover:shadow-[0_0_24px_rgba(168,85,247,0.35)]',
    cyan: 'hover:border-cyan-500 hover:shadow-[0_0_24px_rgba(6,182,212,0.35)]',
    magenta: 'hover:border-pink-500 hover:shadow-[0_0_24px_rgba(236,72,153,0.35)]',
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={className}
    >
      <div
        style={{ transform: 'translateZ(15px)' }}
        className={`h-full bg-[#131826]/75 border border-white/10 rounded-3xl overflow-hidden shadow-md transition-all duration-300 ${hoverClasses[accent]}`}
      >
        {children}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger staggered entrance for project cards
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card-anim',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Helper to get accent color by project ID
  const getProjectAccent = (projectId: string): 'violet' | 'cyan' | 'magenta' => {
    if (projectId === 'migrateright') return 'violet';
    if (projectId === 'petsphere') return 'cyan';
    return 'magenta';
  };

  // Helper to render customized decorative mesh banners with corresponding subject icons
  const renderCardBanner = (projectId: string) => {
    switch (projectId) {
      case 'migrateright':
        return (
          <div className="w-full h-44 bg-gradient-to-tr from-purple-500/10 to-indigo-500/30 relative flex items-center justify-center border-b border-white/5">
            <FiGlobe className="text-5xl text-purple-400 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131826] to-transparent opacity-60"></div>
          </div>
        );
      case 'petsphere':
        return (
          <div className="w-full h-44 bg-gradient-to-tr from-cyan-500/10 to-teal-500/30 relative flex items-center justify-center border-b border-white/5">
            <FiHeart className="text-5xl text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131826] to-transparent opacity-60"></div>
          </div>
        );
      case 'cineplex':
        return (
          <div className="w-full h-44 bg-gradient-to-tr from-pink-500/10 to-rose-500/30 relative flex items-center justify-center border-b border-white/5">
            <FiFilm className="text-5xl text-pink-400" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131826] to-transparent opacity-60"></div>
          </div>
        );
      default:
        return (
          <div className="w-full h-44 bg-gradient-to-tr from-purple-500/10 to-indigo-500/30 relative flex items-center justify-center border-b border-white/5">
            <div className="absolute inset-0 bg-gradient-to-t from-[#131826] to-transparent opacity-60"></div>
          </div>
        );
    }
  };

  const buttonAccentClasses = {
    violet: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/15 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-500/20',
    cyan: 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white shadow-lg shadow-cyan-600/15 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-500/20',
    magenta: 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-600/15 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] border border-pink-500/20',
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-[#0a0e17] py-20 px-4 sm:px-6 lg:px-8 relative border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Heading */}
        <div className="space-y-2 mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Projects
          </h2>
          <div className="w-16 h-1 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => {
            const accent = getProjectAccent(project.id);
            return (
              <TiltCard
                key={project.id}
                accent={accent}
                className="project-card-anim flex flex-col h-[460px] group"
              >
                {/* Graphic Banner */}
                {renderCardBanner(project.id)}

                {/* Card Body */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white line-clamp-1 tracking-tight group-hover:text-white transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech Stack and Button footer */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Stack:
                      </span>
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        {project.techStack.slice(0, 4).map((tech, idx) => {
                          const Icon = techIconMap[tech];
                          return Icon ? (
                            <IconChip
                              key={idx}
                              size="sm"
                              accentColor={accent}
                              className="bg-[#1b2234] border border-white/5"
                              title={tech}
                            >
                              <Icon className="text-xs" />
                            </IconChip>
                          ) : null;
                        })}
                        {project.techStack.length > 4 && (
                          <span className="text-[10px] font-bold text-slate-400 px-1.5 py-0.5 rounded bg-[#1b2234] border border-white/10">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/project/${project.id}`)}
                      className={`group flex items-center justify-center gap-1.5 w-full py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer ${buttonAccentClasses[accent]}`}
                    >
                      <span>View Details</span>
                      <FiArrowRight className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}

          {/* Dash-border Teaser Card */}
          <div className="project-card-anim flex flex-col h-[460px] bg-[#131826]/30 border-2 border-dashed border-white/10 rounded-3xl p-8 items-center justify-center text-center space-y-4 hover:border-purple-500/50 hover:bg-[#131826]/50 transition-all duration-300">
            <div className="p-4 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <FiPlus className="text-3xl" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                More Projects Coming Soon 🚀
              </h3>
              <p className="text-sm text-slate-400 max-w-[200px] leading-relaxed mx-auto">
                Actively engineering new ideas. Follow my progress on GitHub.
              </p>
            </div>
            <a
              href="https://github.com/Fahim7600"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-700 hover:border-purple-500/80 hover:bg-purple-600/10 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm"
            >
              <FiGithub className="text-base" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
