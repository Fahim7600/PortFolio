import { useEffect, useRef, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import { personalInfo, socialLinks } from '@/data/portfolio-data';

// Lazy-load the R3F 3D component to ensure fast initial page paint
const HeroScene = lazy(() => import('../three/HeroScene'));

// Shimmer placeholder for the 3D canvas loader
const ThreeFallback = () => (
  <div className="w-full h-[300px] md:h-[450px] flex items-center justify-center bg-surface-alt/40 rounded-2xl border border-border/60 animate-pulse">
    <div className="text-center space-y-2">
      <div className="w-12 h-12 rounded-full border-4 border-accent/25 border-t-accent animate-spin mx-auto"></div>
      <p className="text-sm text-muted">Loading 3D Visualizer...</p>
    </div>
  </div>
);

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

      // Entrance animation for the 3D visualizer and avatar placeholder
      gsap.fromTo(
        '.hero-visual-fade',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          delay: 0.6,
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

  // Helper to map social link icons
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

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-[90vh] md:min-h-[100vh] flex items-start md:items-center bg-background px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:py-24 overflow-hidden border-b border-border/30"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center pt-8 md:pt-0">
        
        {/* Left Column: Bio / Text content */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-left">
          <div className="space-y-3">
            <span className="hero-fade-in inline-block text-accent font-semibold tracking-wider uppercase text-sm md:text-base">
              Hello, I&apos;m
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

        {/* Right Column: 3D Scene + Avatar Silhouette overlay */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative w-full">
          <div className="hero-visual-fade w-full relative max-w-md aspect-square flex items-center justify-center">
            
            {/* Background 3D Canvas Canvas Scene */}
            <div className="absolute inset-0 z-0">
              <Suspense fallback={<ThreeFallback />}>
                <HeroScene />
              </Suspense>
            </div>

            {/* Foreground Avatar Frame overlay */}
            <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-white/90 bg-background/50 backdrop-blur-md shadow-xl flex items-center justify-center overflow-hidden z-10 transition-transform duration-300 hover:scale-105 select-none pointer-events-none">
              {/* Silhouette Placeholder skeleton */}
              <div className="relative w-full h-full bg-gradient-to-b from-surface-alt to-border/40 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-muted/60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {/* Visual depth rings */}
                <div className="absolute inset-2 rounded-full border border-dashed border-accent/20 animate-[spin_20s_linear_infinite]"></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
