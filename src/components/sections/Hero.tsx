import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiGit,
  SiMongodb,
} from 'react-icons/si';
import { personalInfo, socialLinks, heroStats } from '@/data/portfolio-data';

// -----------------------------------------------------------
// CountUp Component
// Counts numeric values from 0 with decimal configuration
// -----------------------------------------------------------
interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
}

const CountUp = ({ to, duration = 1.8, decimals = 0 }: CountUpProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));

  useEffect(() => {
    // Soft delay to coordinate count-up with hero stagger entrances
    const delayTimer = setTimeout(() => {
      animate(count, to, {
        duration,
        ease: 'easeOut',
      });
    }, 400);

    return () => {
      clearTimeout(delayTimer);
    };
  }, [to, duration, count]);

  useEffect(() => {
    return rounded.on('change', (latest) => {
      setDisplayValue(Number(latest));
    });
  }, [rounded]);

  return <span>{displayValue.toFixed(decimals)}</span>;
};

// -----------------------------------------------------------
// Hero Section Component
// -----------------------------------------------------------
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered entrance animation on page load using GSAP
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-fade-in',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Entrance animation for the profile visual frame and backdrop
      gsap.fromTo(
        '.hero-visual-fade',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 0.5,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '#contact');
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaGithub':
        return <FaGithub className="text-xl" />;
      case 'FaLinkedin':
        return <FaLinkedin className="text-xl" />;
      case 'FiMail':
        return <FiMail className="text-xl" />;
      default:
        return <FiMail className="text-xl" />;
    }
  };

  // Helper to split decimal parts for count-up
  const parseStatValue = (valStr: string) => {
    const num = parseFloat(valStr);
    const dec = valStr.includes('.') ? valStr.split('.')[1].length : 0;
    return { num, dec };
  };

  // Badges data mapping icons and animation timing offsets
  const techBadges = [
    {
      icon: SiReact,
      color: '#61dafb',
      className: 'top-[10%] left-[8%] xs:top-[12%] xs:left-[12%] sm:top-[8%] sm:left-[8%]',
      delay: 0,
      bobDuration: 3,
      bobDelay: 0,
      label: 'React',
    },
    {
      icon: SiNodedotjs,
      color: '#339933',
      className: 'top-[10%] right-[8%] xs:top-[12%] xs:right-[12%] sm:top-[8%] sm:right-[8%]',
      delay: 0.1,
      bobDuration: 3.5,
      bobDelay: 0.5,
      label: 'Node.js',
    },
    {
      icon: SiPython,
      color: '#3776ab',
      className: 'bottom-[12%] left-[6%] xs:bottom-[15%] xs:left-[10%] sm:bottom-[12%] sm:left-[6%]',
      delay: 0.2,
      bobDuration: 3.2,
      bobDelay: 0.2,
      label: 'Python',
    },
    {
      icon: SiGit,
      color: '#f05032',
      className: 'bottom-[12%] right-[6%] xs:bottom-[15%] xs:right-[10%] sm:bottom-[12%] sm:right-[6%]',
      delay: 0.3,
      bobDuration: 3.4,
      bobDelay: 0.7,
      label: 'Git',
    },
    {
      icon: SiMongodb,
      color: '#47a248',
      className: 'top-[48%] right-[-5%] xs:right-[-2%] sm:right-[-5%]',
      delay: 0.4,
      bobDuration: 3.6,
      bobDelay: 0.4,
      label: 'MongoDB',
    },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-between bg-background px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:py-24 overflow-hidden border-b border-border/30"
    >
      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center gap-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center pt-8 md:pt-0">
          
          {/* Left Column: Bio / Text content */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-left order-2 md:order-1">
            <div className="space-y-3">
              <span className="hero-fade-in inline-block text-accent font-semibold tracking-wider uppercase text-sm md:text-base">
                Welcome! 👋
              </span>
              <h1 className="hero-fade-in text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-none">
                {personalInfo.name}
              </h1>
              <div className="hero-fade-in inline-block text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                {personalInfo.title}
              </div>
            </div>

            <p className="hero-fade-in text-muted text-lg leading-relaxed max-w-2xl">
              {personalInfo.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="hero-fade-in flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={personalInfo.resumeUrl}
                download
                className="flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl shadow-md shadow-accent/25 hover:shadow-lg transition-all duration-200"
                aria-label="Download Resume PDF"
              >
                <FiDownload className="text-lg" />
                <span>Download Resume</span>
              </a>
              <a
                href="#contact"
                onClick={handleContactClick}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-border hover:border-accent text-foreground font-semibold rounded-xl bg-surface hover:bg-surface-alt transition-all duration-200"
              >
                <span>Contact Me</span>
                <FiArrowRight className="text-lg" />
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-fade-in flex items-center gap-4 pt-4">
              <span className="text-sm font-semibold tracking-wide text-muted uppercase">
                Connect:
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-border/80 text-muted hover:text-accent hover:border-accent hover:shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
                    aria-label={`Visit my ${social.label}`}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Redesigned Photo + Floating Badges */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative w-full order-1 md:order-2">
            <div className="hero-visual-fade w-full relative max-w-sm aspect-square flex items-center justify-center">
              
              {/* Soft Gradient CSS glow blob behind the avatar */}
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-accent/15 to-accent-light/10 blur-3xl rounded-full z-0 pointer-events-none"></div>

              {/* Central Photo Placeholder with shimmer skeletal reflection */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-white bg-background/60 backdrop-blur-md shadow-xl flex items-center justify-center overflow-hidden z-10 transition-transform duration-300 hover:scale-[1.03] select-none pointer-events-none">
                <div className="relative w-full h-full bg-gradient-to-b from-surface-alt to-border/40 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-muted/60"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {/* Subtle decorative inner dash border */}
                  <div className="absolute inset-2.5 rounded-full border border-dashed border-accent/20 animate-[spin_60s_linear_infinite]"></div>
                  
                  {/* Shimmer overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none"></div>
                </div>
              </div>

              {/* Floating tech badge chips */}
              {techBadges.map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <motion.div
                    key={idx}
                    custom={badge.delay}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: [0, -8, 0],
                    }}
                    transition={{
                      scale: {
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        delay: 0.4 + badge.delay,
                      },
                      opacity: {
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        delay: 0.4 + badge.delay,
                      },
                      y: {
                        duration: badge.bobDuration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: badge.bobDelay,
                      },
                    }}
                    className={`absolute z-20 w-11 h-11 rounded-full bg-white shadow-md border border-border/40 flex items-center justify-center ${badge.className}`}
                    title={badge.label}
                  >
                    <IconComponent style={{ color: badge.color }} className="text-xl" />
                  </motion.div>
                );
              })}

            </div>
          </div>

        </div>

        {/* Stat Counter Row */}
        <div className="hero-fade-in w-full bg-surface border border-border/40 rounded-3xl p-6 sm:p-8 shadow-xs relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y divide-border/20 md:divide-y-0 md:divide-x divide-solid">
            {heroStats.map((stat, idx) => {
              const { num, dec } = parseStatValue(stat.value);
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center px-4 ${
                    idx >= 2 ? 'pt-6 md:pt-0' : 'pt-0'
                  } ${idx % 2 === 1 ? 'border-t-0' : ''}`}
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-baseline">
                    <CountUp to={num} decimals={dec} />
                    {stat.suffix && (
                      <span className="text-accent text-lg font-bold ml-0.5">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-muted uppercase tracking-wider mt-1.5 text-center">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
