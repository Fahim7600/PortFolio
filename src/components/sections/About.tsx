import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutInfo } from '@/data/portfolio-data';

// Register ScrollTrigger plugin for GSAP scroll-triggered animations
gsap.registerPlugin(ScrollTrigger);

type TabType = 'journey' | 'building' | 'beyond';

const About = () => {
  const [activeTab, setActiveTab] = useState<TabType>('journey');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger animation for the entire section
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-animate',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // starts when the top of the section is 80% down from viewport top
            toggleActions: 'play none none none', // play once
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tabs = [
    { id: 'journey' as TabType, label: 'My Journey' },
    { id: 'building' as TabType, label: 'What I Love Building' },
    { id: 'beyond' as TabType, label: 'Beyond The Code' },
  ];

  const getActiveContent = () => {
    switch (activeTab) {
      case 'journey':
        return aboutInfo.journeyIntro;
      case 'building':
        return aboutInfo.whatILoveBuilding;
      case 'beyond':
        return aboutInfo.beyondTheCode;
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#94d2bd]/15 via-emerald-50/10 to-teal-50/20 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-border/30"
    >
      {/* Decorative Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#94d2bd_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25 pointer-events-none z-0"></div>

      {/* Floating Blob 1 - Top Right */}
      <div className="absolute right-[-10%] top-[-10%] w-[450px] h-[450px] pointer-events-none opacity-45 filter blur-3xl z-0">
        <motion.div
          animate={{
            scale: [1, 1.25, 0.9, 1],
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 22,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="w-full h-full rounded-full bg-gradient-to-tr from-[#94d2bd] to-teal-200"
        />
      </div>

      {/* Floating Blob 2 - Bottom Left */}
      <div className="absolute left-[-10%] bottom-[-10%] w-[450px] h-[450px] pointer-events-none opacity-35 filter blur-3xl z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1.3, 1],
            x: [0, -30, 40, 0],
            y: [0, 50, -30, 0],
            rotate: [360, 270, 90, 0],
          }}
          transition={{
            duration: 28,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="w-full h-full rounded-full bg-gradient-to-bl from-emerald-100 to-[#94d2bd]"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Tab switchers & Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="about-animate space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1c3f35] tracking-tight">
                About Me
              </h2>
              {/* Custom Colored Marker Bar */}
              <div className="w-16 h-1 bg-[#94d2bd] rounded-full shadow-[0_0_8px_#94d2bd]"></div>
            </div>

            {/* Tab Pills Segmented Control */}
            <div className="about-animate flex flex-wrap gap-2 p-1.5 bg-white/70 backdrop-blur-md border border-[#94d2bd]/35 rounded-2xl max-w-max shadow-sm">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 focus:outline-none ${
                      isActive ? 'text-[#1c3f35]' : 'text-[#2d5c4e] hover:text-[#1c3f35] hover:bg-[#94d2bd]/10'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeAboutTab"
                        className="absolute inset-0 bg-[#94d2bd] rounded-xl -z-10 shadow-md shadow-[#94d2bd]/35"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active Content Box */}
            <div className="about-animate min-h-[220px] bg-white/90 backdrop-blur-md border border-[#94d2bd]/30 rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#94d2bd]/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-extrabold text-[#1c3f35]">
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h3>
                  <p className="text-[#2d5c4e] text-base font-medium leading-relaxed whitespace-pre-line">
                    {getActiveContent()}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Decorative wireframe geometry */}
          <div className="about-animate lg:col-span-5 flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              
              {/* Floating tech background grid ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#94d2bd]/30 animate-[spin_40s_linear_infinite]"></div>

              {/* Animated abstract SVG wireframe shape (Rhymes with torus knot 3D visualizer) */}
              <motion.svg
                animate={{
                  y: [-10, 10, -10],
                  rotate: 360,
                }}
                transition={{
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                }}
                viewBox="0 0 200 200"
                className="w-64 h-64 sm:w-72 sm:h-72 text-[#94d2bd] drop-shadow-[0_8px_16px_rgba(148,210,189,0.2)]"
              >
                <defs>
                  <radialGradient id="sphereGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#e8f8f5" />
                    <stop offset="60%" stopColor="#94d2bd" />
                    <stop offset="100%" stopColor="#6ea794" />
                  </radialGradient>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#94d2bd" />
                    <stop offset="100%" stopColor="#48a386" />
                  </linearGradient>
                </defs>

                {/* SVG Polyhedral wireframe mesh */}
                <path
                  d="M100,20 L160,70 L140,150 L60,150 L40,70 Z"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />
                <path
                  d="M100,20 L100,75 L140,150"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                />
                <path
                  d="M40,70 L100,75 L160,70"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                />
                <path
                  d="M60,150 L100,75 L140,150"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                />
                
                {/* Glowing Vertices */}
                <circle cx="100" cy="20" r="5" fill="#1c3f35" stroke="#94d2bd" strokeWidth="2" />
                <circle cx="160" cy="70" r="5" fill="#1c3f35" stroke="#94d2bd" strokeWidth="2" />
                <circle cx="140" cy="150" r="5" fill="#1c3f35" stroke="#94d2bd" strokeWidth="2" />
                <circle cx="60" cy="150" r="5" fill="#1c3f35" stroke="#94d2bd" strokeWidth="2" />
                <circle cx="40" cy="70" r="5" fill="#1c3f35" stroke="#94d2bd" strokeWidth="2" />
                
                {/* Central Pulsing Sphere */}
                <motion.circle
                  cx="100"
                  cy="75"
                  r="16"
                  fill="url(#sphereGradient)"
                  animate={{
                    scale: [0.92, 1.08, 0.92],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.svg>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
