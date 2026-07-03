import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  FiArrowLeft,
  FiGithub,
  FiStar,
  FiCheckCircle,
  FiCpu,
  FiAward,
} from 'react-icons/fi';
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiFlask,
  SiTailwindcss,
  SiAxios,
  SiPrisma,
  SiCloudinary,
  SiMongoose,
  SiJsonwebtokens,
  SiHtml5,
  SiCss,
} from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';
import { PageWrapper } from '@/components/layout';
import { projects } from '@/data/portfolio-data';

// Map of string icons for tech stack logos
const techIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  React: SiReact,
  'React Router': SiReact,
  Axios: SiAxios,
  Prisma: SiPrisma,
  Mongoose: SiMongoose,
  JWT: SiJsonwebtokens,
  Cloudinary: SiCloudinary,
  'Node.js': SiNodedotjs,
  Express: SiNodedotjs,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  Flask: SiFlask,
  'Tailwind CSS': SiTailwindcss,
  MySQL: FaDatabase,
  HTML: SiHtml5,
  CSS: SiCss,
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top on load

    if (project) {
      // Staggered entrance animation for sub-sections
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.proj-anim-fade',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [project]);

  // Back navigation handler (scrolls directly to projects section on home page)
  const handleBackToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/', { replace: true });
    // Allow the routing change to complete, then scroll smoothly
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#projects');
      }
    }, 150);
  };

  // Safe check if project exists
  if (!project) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-[#0a0e17]">
          <div className="p-4 rounded-full bg-red-950/30 border border-red-500/20 text-red-400">
            <FiCpu className="text-4xl" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Project Not Found
            </h1>
            <p className="text-slate-400 text-base max-w-sm leading-relaxed">
              We couldn&apos;t find the project with identifier &quot;{projectId}&quot;. It may have been moved or renamed.
            </p>
          </div>
          <a
            href="/"
            onClick={handleBackToPortfolio}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
          >
            <FiArrowLeft />
            <span>Back to Portfolio</span>
          </a>
        </div>
      </PageWrapper>
    );
  }

  // Get project accent color
  const getProjectAccent = (id: string): 'violet' | 'cyan' | 'magenta' => {
    if (id === 'migrateright') return 'violet';
    if (id === 'petsphere') return 'cyan';
    return 'magenta';
  };

  const accent = getProjectAccent(project.id);

  const hoverClasses = {
    violet: 'hover:border-purple-500/80 hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]',
    cyan: 'hover:border-cyan-500/80 hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]',
    magenta: 'hover:border-pink-500/80 hover:shadow-[0_0_24px_rgba(236,72,153,0.25)]',
  };

  const textAccent = {
    violet: 'text-purple-400',
    cyan: 'text-cyan-400',
    magenta: 'text-pink-400',
  };

  const badgeAccent = {
    violet: 'bg-purple-500/10 text-purple-400',
    cyan: 'bg-cyan-500/10 text-cyan-400',
    magenta: 'bg-pink-500/10 text-pink-400',
  };

  const buttonAccent = {
    violet: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/25 hover:shadow-[0_0_20px_rgba(168,85,247,0.45)] border border-purple-500/20',
    cyan: 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white shadow-lg shadow-cyan-600/25 hover:shadow-[0_0_20px_rgba(6,182,212,0.45)] border border-cyan-500/20',
    magenta: 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-lg shadow-pink-600/25 hover:shadow-[0_0_20px_rgba(236,72,153,0.45)] border border-pink-500/20',
  };

  return (
    <PageWrapper>
      {/* Simplified Glassmorphic Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e17]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="/"
            onClick={handleBackToPortfolio}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="text-base" />
            <span>Back to Portfolio</span>
          </a>
          <span className="text-base font-extrabold text-white tracking-tight">
            Arfan Ahmed Fahim
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        ref={containerRef}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0a0e17] min-h-screen relative"
      >
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-950/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          
          {/* Hero Sub-section */}
          <div className="proj-anim-fade space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {project.name}
            </h1>

            {/* Tech Chips */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => {
                const Icon = techIconMap[tech];
                return (
                  <span
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#131826] border border-white/10 text-slate-300 text-xs font-semibold transition-all duration-200"
                  >
                    {Icon && <Icon className={`text-sm ${textAccent[accent]}`} />}
                    <span>{tech}</span>
                  </span>
                );
              })}
            </div>

            {/* CTA Button Link */}
            <div className="pt-2">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${buttonAccent[accent]}`}
              >
                <FiGithub className="text-lg" />
                <span>View GitHub Repo</span>
              </a>
            </div>
          </div>

          {/* Subsection 1: Overview */}
          <div className={`proj-anim-fade bg-[#131826]/75 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-4 transition-all duration-300 ${hoverClasses[accent]}`}>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <FiStar className={`text-lg ${textAccent[accent]}`} />
              <span>Project Overview</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>

          {/* Subsection 2: Key Features */}
          <div className={`proj-anim-fade bg-[#131826]/75 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-4 transition-all duration-300 ${hoverClasses[accent]}`}>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <FiCheckCircle className={`text-lg ${textAccent[accent]}`} />
              <span>Key Features</span>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed"
                >
                  <span className={`p-1 rounded-full flex-shrink-0 mt-0.5 ${badgeAccent[accent]}`}>
                    <FiCheckCircle className="text-[10px]" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Subsection 3: Challenges Faced */}
          <div className={`proj-anim-fade bg-[#131826]/75 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-4 transition-all duration-300 ${hoverClasses[accent]}`}>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <FiCpu className={`text-lg ${textAccent[accent]}`} />
              <span>Challenges Faced</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {project.challenges}
            </p>
          </div>

          {/* Subsection 4: Future Improvements */}
          <div className={`proj-anim-fade bg-[#131826]/75 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-4 transition-all duration-300 ${hoverClasses[accent]}`}>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <FiAward className={`text-lg ${textAccent[accent]}`} />
              <span>Future Improvements</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {project.futureImprovements}
            </p>
          </div>

        </div>
      </main>
    </PageWrapper>
  );
};

export default ProjectDetail;
