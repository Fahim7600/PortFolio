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
      className="min-h-screen flex items-center justify-center bg-surface-alt py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-border/30"
    >
      {/* Decorative Organic Floating Blob (Visual rhyme with Hero 3D element) */}
      <div className="absolute right-0 top-1/4 w-96 h-96 pointer-events-none opacity-40 mix-blend-multiply filter blur-2xl z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 0.9, 1],
            rotate: [0, 120, 240, 360],
            borderRadius: [
              '40% 60% 60% 40% / 40% 50% 60% 50%',
              '50% 50% 50% 50%',
              '30% 70% 70% 30% / 50% 60% 40% 50%',
              '40% 60% 60% 40% / 40% 50% 60% 50%',
            ],
          }}
          transition={{
            duration: 15,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="w-full h-full bg-gradient-to-tr from-accent/20 to-accent-light/40"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Tab switchers & Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="about-animate space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                About Me
              </h2>
              {/* Refined Indigo marker bar */}
              <div className="w-16 h-1 bg-accent rounded-full"></div>
            </div>

            {/* Tab Pills Segmented Control */}
            <div className="about-animate flex flex-wrap gap-2 p-1.5 bg-surface border border-border/60 rounded-xl max-w-max">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive ? 'text-white' : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeAboutTab"
                        className="absolute inset-0 bg-accent rounded-lg -z-10 shadow-md shadow-accent/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active Content Box */}
            <div className="about-animate min-h-[220px] bg-surface border border-border/40 rounded-2xl p-6 sm:p-8 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-foreground">
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h3>
                  <p className="text-muted text-base leading-relaxed whitespace-pre-line">
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
              <div className="absolute inset-0 rounded-full border border-dashed border-accent/20 animate-[spin_40s_linear_infinite]"></div>

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
                className="w-64 h-64 sm:w-72 sm:h-72 text-accent/80 drop-shadow-md"
              >
                {/* SVG Polyhedral wireframe mesh */}
                <path
                  d="M100,20 L160,70 L140,150 L60,150 L40,70 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <path
                  d="M100,20 L100,75 L140,150"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M40,70 L100,75 L160,70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M60,150 L100,75 L140,150"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle cx="100" cy="20" r="4" fill="var(--color-accent)" />
                <circle cx="160" cy="70" r="4" fill="var(--color-accent-light)" />
                <circle cx="140" cy="150" r="4" fill="var(--color-accent)" />
                <circle cx="60" cy="150" r="4" fill="var(--color-accent-light)" />
                <circle cx="40" cy="70" r="4" fill="var(--color-accent)" />
                <circle cx="100" cy="75" r="5" fill="var(--color-accent-light)" />
              </motion.svg>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
