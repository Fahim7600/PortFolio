import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  SiPython,
  SiC,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiMongodb,
  SiPostgresql,
  SiGit,
} from 'react-icons/si';
import { FiCpu, FiLayers, FiBox } from 'react-icons/fi';
import { FaDatabase } from 'react-icons/fa';
import { skills } from '@/data/portfolio-data';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Map of string icon identifiers to React Icon components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  SiPython,
  SiC,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiMongodb,
  SiPostgresql,
  SiGit,
  FiCpu,
  FiLayers,
  FiBox,
  FaDatabase,
};

// -----------------------------------------------------------
// 3D Tilt Chip Component
// Provides a dynamic, hardware-accelerated 3D tilt-on-hover effect
// -----------------------------------------------------------
interface TiltChipProps {
  children: React.ReactNode;
}

const TiltChip = ({ children }: TiltChipProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft spring physics to smooth the rotation shifts
  const springConfig = { damping: 15, stiffness: 180 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates around center (from -0.5 to 0.5)
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
      className="w-full"
    >
      {/* 
        Inner container needs to support translation for 3D depth separation.
        Hovering causes a shadow drop and accent highlight.
      */}
      <div 
        style={{ transform: 'translateZ(10px)' }}
        className="flex items-center gap-3 px-4 py-3 bg-surface border border-border/80 hover:border-accent hover:shadow-md rounded-xl transition-all duration-200"
      >
        {children}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger staggered entrance for categories
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-category-card',
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-background py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-border/30"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Heading */}
        <div className="space-y-2 mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full"></div>
        </div>

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((group, index) => (
            <div
              key={index}
              className="skills-category-card bg-surface border border-border/40 hover:border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Category Subheading */}
              <h3 className="text-lg font-bold text-foreground mb-4 border-b border-border/40 pb-2">
                {group.category}
              </h3>

              {/* Chips wrap layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.skills.map((skill, sIdx) => {
                  const Icon = iconMap[skill.icon] || FiCpu;
                  return (
                    <div key={sIdx} className="flex">
                      <TiltChip>
                        <Icon className="text-xl text-accent group-hover:text-accent-hover transition-colors duration-200 flex-shrink-0" />
                        <span className="text-sm font-semibold text-foreground tracking-tight select-none">
                          {skill.name}
                        </span>
                      </TiltChip>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
