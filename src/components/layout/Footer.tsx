import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiPhone, FiHeart } from 'react-icons/fi';
import { personalInfo, socialLinks, navItems } from '@/data/portfolio-data';
import { IconChip } from '../ui/IconChip';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Lazy load the R3F FooterScene
const FooterScene = lazy(() => import('../three/FooterScene'));

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Responsive: track window width dynamically in JS to mount/unmount R3F Canvas
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // GSAP scroll trigger fade and slide up on enter
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaGithub':
        return <FiGithub className="text-base" />;
      case 'FaLinkedin':
        return <FiLinkedin className="text-base" />;
      default:
        return <FiMail className="text-base" />;
    }
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#05070a] text-[#8B92A8] py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden text-left"
    >
      {/* Ambient 3D canvas positioned absolutely behind the brand column */}
      {isLargeScreen && (
        <div className="absolute left-8 bottom-12 w-64 h-64 pointer-events-none z-0 opacity-20">
          <Suspense fallback={null}>
            <FooterScene />
          </Suspense>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-12 border-b border-white/5">
          
          {/* Column 1: Brand details */}
          <div className="footer-anim space-y-4">
            <h3 className="text-xl font-extrabold text-[#E6E9F0] tracking-tight">
              Arfan Ahmed Fahim
            </h3>
            <p className="text-[#8B92A8] text-sm leading-relaxed max-w-xs">
              CSE Graduate & Full Stack Developer building clean user experiences and intelligent pipelines.
            </p>
            {/* Social Connection Row */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none"
                  aria-label={`Visit my ${social.label}`}
                >
                  <IconChip
                    size="sm"
                    accentColor={idx % 3 === 0 ? 'violet' : idx % 3 === 1 ? 'cyan' : 'magenta'}
                  >
                    {getSocialIcon(social.icon)}
                  </IconChip>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-anim space-y-4">
            <h4 className="text-sm font-bold text-[#E6E9F0] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.href)}
                    className="text-[#8B92A8] hover:text-[#E6E9F0] text-sm font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-anim space-y-4">
            <h4 className="text-sm font-bold text-[#E6E9F0] uppercase tracking-wider">
              Contact Info
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <FiMail className="text-purple-400 flex-shrink-0 text-base" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-[#8B92A8] hover:text-[#E6E9F0] transition-colors break-all"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-cyan-400 flex-shrink-0 text-base" />
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="text-[#8B92A8] hover:text-[#E6E9F0] transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </li>
              <li className="text-[#8B92A8] flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0"></span>
                <span>{personalInfo.location}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & build details bar */}
        <div className="footer-anim pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8B92A8]/70">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} Arfan Ahmed Fahim. All rights reserved.</p>
            <p className="flex items-center justify-center md:justify-start gap-1">
              <span>Built with React, Three.js & a lot of</span>
              <FiHeart className="text-pink-500 animate-pulse fill-pink-500 text-[10px]" />
            </p>
          </div>

          {/* Back to top button */}
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, '#hero')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#131826] hover:bg-[#1b2234] text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-cyan-500/25 hover:border-cyan-400 shadow-md hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <FiArrowUp className="text-sm" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
