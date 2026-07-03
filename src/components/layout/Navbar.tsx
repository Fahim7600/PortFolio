import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiFileText } from 'react-icons/fi';
import { useScrollSpy } from '@/hooks';
import { navItems, personalInfo } from '@/data/portfolio-data';
import { ResumeModal } from './ResumeModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Get active section ID for scroll-spy highlighting
  const activeSection = useScrollSpy(
    navItems.map((item) => item.id),
    { rootMargin: '-20% 0px -60% 0px' }
  );

  // Monitor scroll height to apply active background/blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize if viewport expands beyond md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll handler for in-page anchors
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    if (isHomePage) {
      e.preventDefault();
      setIsOpen(false);
      
      // Delay the scroll slightly to allow the mobile drawer collapse to trigger/complete
      // and prevent layout shifting from hijacking the scroll target
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          // Update URL hash without causing a page reload/jump
          window.history.pushState(null, '', `#${targetId}`);
        }
      }, 150);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 transition-all duration-300 border backdrop-blur-md px-6 ${
          isOpen ? 'rounded-2xl' : 'rounded-full'
        } ${
          isScrolled
            ? 'bg-[#131826]/90 border-white/10 shadow-lg py-2.5'
            : 'bg-[#131826]/70 border-white/5 shadow-sm py-3.5'
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            {/* Logo / Brand Name */}
            <a
              href={isHomePage ? '#hero' : '/#hero'}
              onClick={(e) => handleNavClick(e, 'hero')}
              className="group flex flex-col focus:outline-none rounded"
              aria-label="Arfan Ahmed Fahim Portfolio Home"
            >
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-purple-400 transition-colors duration-200">
                Arfan Ahmed Fahim
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 group-hover:text-purple-300 transition-colors duration-200">
                Developer Portfolio
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Desktop Navigation">
              {navItems.map((item) => {
                const isActive = isHomePage && activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={isHomePage ? item.href : `/${item.href}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none ${
                      isActive
                        ? 'text-white bg-purple-500/20 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                        : 'text-slate-300 hover:text-purple-400 hover:bg-white/5'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
              
              {/* Resume Button - Opens Modal */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsResumeOpen(true);
                }}
                className="ml-4 flex items-center gap-2 px-4 py-2 border border-purple-500/30 text-purple-400 hover:text-white hover:bg-purple-600 hover:border-purple-600 bg-purple-600/10 hover:shadow-[0_0_15px_rgba(168,85,247,0.45)] font-medium text-sm rounded-full transition-all duration-200 focus:outline-none cursor-pointer"
                aria-label="View Resume"
              >
                <FiFileText className="text-base" />
                <span>Resume</span>
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
                aria-label="Toggle main menu"
              >
                {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden mt-2 bg-[#131826]/95 border-t border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="px-2 pt-2 pb-6 space-y-1">
                {navItems.map((item) => {
                  const isActive = isHomePage && activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={isHomePage ? item.href : `/${item.href}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-white bg-purple-500/20 font-semibold'
                          : 'text-slate-300 hover:text-purple-400 hover:bg-white/5'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsResumeOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-600 text-purple-400 hover:text-white text-center font-medium rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
                    aria-label="View Resume"
                  >
                    <FiFileText className="text-lg" />
                    <span>Resume</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Resume Preview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={personalInfo.resumeUrl}
      />
    </>
  );
};

export default Navbar;
