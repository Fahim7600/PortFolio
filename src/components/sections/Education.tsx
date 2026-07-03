import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiChevronDown, FiChevronUp, FiCalendar, FiAward } from 'react-icons/fi';
import { educationInfo } from '@/data/portfolio-data';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger entrance animation for the section
    const ctx = gsap.context(() => {
      // Animate the main card
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stagger stats badge entrance
      gsap.fromTo(
        '.edu-stat-card',
        { opacity: 0, scale: 0.9, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.edu-stats-trigger',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-[#0a0e17] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-white/5"
    >
      {/* Decorative Organic Floating Blob (Matches About Me style) */}
      <div className="absolute left-0 bottom-10 w-96 h-96 pointer-events-none opacity-20 filter blur-3xl z-0">
        <motion.div
          animate={{
            scale: [1, 1.12, 0.92, 1],
            rotate: [0, -120, -240, -360],
            borderRadius: [
              '30% 70% 70% 30% / 50% 60% 40% 50%',
              '50% 50% 50% 50%',
              '40% 60% 60% 40% / 40% 50% 60% 50%',
              '30% 70% 70% 30% / 50% 60% 40% 50%',
            ],
          }}
          transition={{
            duration: 16,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="w-full h-full bg-gradient-to-br from-purple-500/10 to-indigo-500/20"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Heading */}
        <div className="space-y-2 mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <div className="w-16 h-1 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></div>
        </div>

        {/* Main Education Container */}
        <div
          ref={cardRef}
          className="bg-[#131826]/75 border border-white/10 hover:border-purple-500/80 hover:shadow-[0_0_24px_rgba(168,85,247,0.3)] rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl transition-all duration-300 group"
        >
          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/10 pb-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex-shrink-0">
                <FiBookOpen className="text-2xl sm:text-3xl" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E6E9F0] group-hover:text-white tracking-tight leading-tight transition-colors">
                  {educationInfo.degree}
                </h3>
                <h4 className="text-lg font-semibold text-slate-400 tracking-tight">
                  {educationInfo.institution}
                </h4>
              </div>
            </div>

            {/* Badges Container */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold">
                <FiAward className="text-base" />
                <span>CGPA: {educationInfo.cgpa}</span>
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1b2234] border border-white/10 text-slate-300 text-sm font-semibold">
                <FiCalendar className="text-base" />
                <span>Class of {educationInfo.graduationYear}</span>
              </span>
            </div>
          </div>

          {/* Thesis Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
                Undergraduate Thesis
              </span>
              <blockquote className="border-l-4 border-purple-500 pl-4 py-1.5">
                <h4 className="text-xl font-bold text-white leading-snug tracking-tight">
                  {educationInfo.thesisTitle}
                </h4>
              </blockquote>
            </div>

            {/* Thesis Stats Badge Grid (Staggered Entrance) */}
            <div className="edu-stats-trigger grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {educationInfo.thesisHighlights.map((stat, idx) => (
                <div
                  key={idx}
                  className="edu-stat-card flex flex-col justify-center p-4 bg-[#1b2234]/70 border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] rounded-2xl transition-all duration-300 group/stat"
                >
                  <span className="text-2xl sm:text-3xl font-black text-cyan-400 group-hover/stat:text-cyan-300 tracking-tight transition-colors">
                    {stat.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Collapsible Abstract Panel */}
            <div className="pt-4 border-t border-white/10">
              <div className="relative overflow-hidden">
                
                {/* Framer motion height animation */}
                <motion.div
                  animate={{ height: isExpanded ? 'auto' : 72 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="relative overflow-hidden text-slate-300 text-base leading-relaxed"
                >
                  <p className="whitespace-pre-line">
                    {educationInfo.thesisAbstract}
                  </p>
                  
                  {/* Bottom fade shadow mask when collapsed */}
                  <AnimatePresence>
                    {!isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#131826] to-transparent pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                
              </div>

              {/* Expand Toggle Button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                type="button"
                className="mt-3 inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-bold text-sm tracking-tight focus:outline-none focus:ring-1 focus:ring-purple-500 rounded px-2 py-1 transition-colors cursor-pointer"
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? 'Collapse Abstract' : 'Read Full Abstract'}</span>
                {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;
