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
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-background">
          <div className="p-4 rounded-full bg-red-100 text-red-600">
            <FiCpu className="text-4xl" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              Project Not Found
            </h1>
            <p className="text-muted text-base max-w-sm leading-relaxed">
              We couldn&apos;t find the project with identifier &quot;{projectId}&quot;. It may have been moved or renamed.
            </p>
          </div>
          <a
            href="/"
            onClick={handleBackToPortfolio}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl shadow-md transition-colors"
          >
            <FiArrowLeft />
            <span>Back to Portfolio</span>
          </a>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Simplified Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border/50 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a
            href="/"
            onClick={handleBackToPortfolio}
            className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent transition-colors"
          >
            <FiArrowLeft className="text-base" />
            <span>Back to Portfolio</span>
          </a>
          <span className="text-base font-extrabold text-foreground tracking-tight">
            Arfan Ahmed Fahim
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        ref={containerRef}
        className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-background min-h-screen"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Hero Sub-section */}
          <div className="proj-anim-fade space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
              {project.name}
            </h1>

            {/* Tech Chips */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => {
                const Icon = techIconMap[tech];
                return (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-surface border border-border/60 text-muted text-xs font-semibold"
                  >
                    {Icon && <Icon className="text-accent text-sm" />}
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl shadow-md shadow-accent/25 transition-all duration-200"
              >
                <FiGithub className="text-lg" />
                <span>View GitHub Repo</span>
              </a>
            </div>
          </div>

          {/* Subsection 1: Overview */}
          <div className="proj-anim-fade bg-surface border border-border/40 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <FiStar className="text-accent text-lg" />
              <span>Project Overview</span>
            </h2>
            <p className="text-muted text-base leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>

          {/* Subsection 2: Key Features */}
          <div className="proj-anim-fade bg-surface border border-border/40 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <FiCheckCircle className="text-accent text-lg" />
              <span>Key Features</span>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-muted text-sm leading-relaxed"
                >
                  <span className="p-0.5 rounded-full bg-accent-light/50 text-accent flex-shrink-0 mt-0.5">
                    <FiCheckCircle className="text-xs" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Subsection 3: Challenges Faced */}
          <div className="proj-anim-fade bg-surface border border-border/40 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <FiCpu className="text-accent text-lg" />
              <span>Challenges Faced</span>
            </h2>
            <p className="text-muted text-base leading-relaxed whitespace-pre-line">
              {project.challenges}
            </p>
          </div>

          {/* Subsection 4: Future Improvements */}
          <div className="proj-anim-fade bg-surface border border-border/40 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
              <FiAward className="text-accent text-lg" />
              <span>Future Improvements</span>
            </h2>
            <p className="text-muted text-base leading-relaxed whitespace-pre-line">
              {project.futureImprovements}
            </p>
          </div>

        </div>
      </main>
    </PageWrapper>
  );
};

export default ProjectDetail;
