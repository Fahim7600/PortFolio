import { useEffect, useRef, useState, lazy, Suspense } from 'react';
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

// Lazy load the R3F SkillsScene
const SkillsScene = lazy(() => import('../three/SkillsScene'));

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

interface TiltChipProps {
  children: React.ReactNode;
  accent: 'violet' | 'cyan' | 'magenta';
}

const TiltChip = ({ children, accent }: TiltChipProps) => {
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

  const chipAccentClasses = {
    violet: 'hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.45)]',
    cyan: 'hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.45)]',
    magenta: 'hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.45)]',
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
      className="w-full group"
    >
      <div 
        style={{ transform: 'translateZ(10px)' }}
        className={`flex items-center gap-3 px-4 py-3 bg-[#131826] border border-white/5 rounded-xl transition-all duration-300 ${chipAccentClasses[accent]}`}
      >
        {children}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  const accents: ('violet' | 'cyan' | 'magenta')[] = ['violet', 'cyan', 'magenta'];

  const cardAccentClasses = {
    violet: 'border-purple-500/20 hover:border-purple-500/80 hover:shadow-[0_0_24px_rgba(168,85,247,0.3)]',
    cyan: 'border-cyan-500/20 hover:border-cyan-500/80 hover:shadow-[0_0_24px_rgba(6,182,212,0.3)]',
    magenta: 'border-pink-500/20 hover:border-pink-500/80 hover:shadow-[0_0_24px_rgba(236,72,153,0.3)]',
  };

  const headerAccentClasses = {
    violet: 'border-purple-500/20 text-purple-400',
    cyan: 'border-cyan-500/20 text-cyan-400',
    magenta: 'border-pink-500/20 text-pink-400',
  };

  const iconColorClass = {
    violet: 'text-purple-400 group-hover:text-purple-300',
    cyan: 'text-cyan-400 group-hover:text-cyan-300',
    magenta: 'text-pink-400 group-hover:text-pink-300',
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-[#0a0e17] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/5"
    >
      {/* R3F Ambient Background Element */}
      {isLargeScreen && (
        <div className="absolute right-4 bottom-4 w-64 h-64 pointer-events-none z-0 opacity-20">
          <Suspense fallback={null}>
            <SkillsScene />
          </Suspense>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Heading */}
        <div className="space-y-2 mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></div>
        </div>

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((group, index) => {
            const accent = accents[index % accents.length];
            return (
              <div
                key={index}
                className={`skills-category-card bg-[#131826]/75 border rounded-2xl p-6 shadow-md transition-all duration-300 ${cardAccentClasses[accent]}`}
              >
                {/* Category Subheading */}
                <h3 className={`text-lg font-bold mb-4 border-b pb-2 ${headerAccentClasses[accent]}`}>
                  {group.category}
                </h3>

                {/* Chips wrap layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {group.skills.map((skill, sIdx) => {
                    const Icon = iconMap[skill.icon] || FiCpu;
                    return (
                      <div key={sIdx} className="flex">
                        <TiltChip accent={accent}>
                          {/* Neutral circular backing so light logos remain legible on dark background */}
                          <div className="w-8 h-8 rounded-full bg-[#1b2234] border border-white/10 flex items-center justify-center flex-shrink-0">
                            <Icon className={`text-base ${iconColorClass[accent]} transition-colors duration-200`} />
                          </div>
                          <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-200 select-none">
                            {skill.name}
                          </span>
                        </TiltChip>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
