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
}

const TiltCard = ({ children, className }: TiltCardProps) => {
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
        className="h-full bg-surface border border-border/40 hover:border-accent/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
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

  // Helper to render customized decorative mesh banners with corresponding subject icons
  const renderCardBanner = (projectId: string) => {
    switch (projectId) {
      case 'migrateright':
        return (
          <div className="w-full h-44 bg-gradient-to-tr from-accent/15 to-violet-500/35 relative flex items-center justify-center border-b border-border/20">
            <FiGlobe className="text-5xl text-accent animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-surface/20"></div>
          </div>
        );
      case 'petsphere':
        return (
          <div className="w-full h-44 bg-gradient-to-tr from-teal-400/15 to-indigo-500/30 relative flex items-center justify-center border-b border-border/20">
            <FiHeart className="text-5xl text-teal-600 animate-pulse" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-surface/20"></div>
          </div>
        );
      case 'cineplex':
        return (
          <div className="w-full h-44 bg-gradient-to-tr from-indigo-500/15 to-pink-500/30 relative flex items-center justify-center border-b border-border/20">
            <FiFilm className="text-5xl text-pink-600" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-surface/20"></div>
          </div>
        );
      default:
        return (
          <div className="w-full h-44 bg-gradient-to-tr from-accent/10 to-accent-light/30 relative flex items-center justify-center border-b border-border/20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-surface/20"></div>
          </div>
        );
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-background py-20 px-4 sm:px-6 lg:px-8 relative border-b border-border/30"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Heading */}
        <div className="space-y-2 mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Projects
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: Project) => (
            <TiltCard
              key={project.id}
              className="project-card-anim flex flex-col h-[460px]"
            >
              {/* Graphic Banner */}
              {renderCardBanner(project.id)}

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground line-clamp-1 tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted line-clamp-3 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech Stack and Button footer */}
                <div className="space-y-4 pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                      Stack:
                    </span>
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      {project.techStack.slice(0, 4).map((tech, idx) => {
                        const Icon = techIconMap[tech];
                        return Icon ? (
                          <span
                            key={idx}
                            className="p-1 rounded-md bg-surface-alt border border-border/60 text-muted"
                            title={tech}
                          >
                            <Icon className="text-sm" />
                          </span>
                        ) : null;
                      })}
                      {project.techStack.length > 4 && (
                        <span className="text-[10px] font-bold text-muted px-1.5 py-0.5 rounded bg-surface-alt border border-border/50">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="group flex items-center justify-center gap-1.5 w-full py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm"
                  >
                    <span>View Details</span>
                    <FiArrowRight className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}

          {/* Dash-border Teaser Card */}
          <div className="project-card-anim flex flex-col h-[460px] bg-surface-alt/30 border-2 border-dashed border-border/80 rounded-3xl p-8 items-center justify-center text-center space-y-4 hover:border-accent hover:bg-surface-alt/50 transition-all duration-300">
            <div className="p-4 rounded-full bg-accent-light/40 text-accent">
              <FiPlus className="text-3xl" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground">
                More Projects Coming Soon 🚀
              </h3>
              <p className="text-sm text-muted max-w-[200px] leading-relaxed mx-auto">
                Actively engineering new ideas. Follow my progress on GitHub.
              </p>
            </div>
            <a
              href="https://github.com/Fahim7600"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-accent text-foreground hover:bg-surface text-sm font-semibold rounded-xl transition-all duration-200 shadow-xs"
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
