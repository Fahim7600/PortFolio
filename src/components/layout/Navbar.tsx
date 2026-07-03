import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiFileText } from 'react-icons/fi';
import { useScrollSpy } from '@/hooks';
import { navItems } from '@/data/portfolio-data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/80 backdrop-blur-md shadow-sm border-b border-border/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href={isHomePage ? '#hero' : '/#hero'}
            onClick={(e) => handleNavClick(e, 'hero')}
            className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
            aria-label="Arfan Ahmed Fahim Portfolio Home"
          >
            <span className="text-xl font-extrabold tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
              Arfan Ahmed Fahim
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted font-semibold group-hover:text-accent-light transition-colors duration-200">
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
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? 'text-accent bg-accent-light/50'
                      : 'text-muted hover:text-foreground hover:bg-surface-alt'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
            
            {/* Resume Button */}
            <a
              href="#resume"
              className="ml-4 flex items-center gap-2 px-4 py-2 border border-accent text-accent font-medium text-sm rounded-lg hover:bg-accent hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Download Resume"
            >
              <FiFileText className="text-base" />
              <span>Resume</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-alt focus:outline-none focus:ring-2 focus:ring-accent"
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
            className="md:hidden border-t border-border bg-surface shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => {
                const isActive = isHomePage && activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={isHomePage ? item.href : `/${item.href}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-accent bg-accent-light/50 font-semibold'
                        : 'text-muted hover:text-foreground hover:bg-surface-alt'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-border/60">
                <a
                  href="#resume"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-accent hover:bg-accent-hover text-white text-center font-medium rounded-lg transition-colors duration-200 shadow-sm"
                  aria-label="Download Resume"
                  onClick={() => setIsOpen(false)}
                >
                  <FiFileText className="text-lg" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
