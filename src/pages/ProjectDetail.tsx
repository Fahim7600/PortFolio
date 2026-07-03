import { useParams, Link } from 'react-router-dom';
import { PageWrapper } from '@/components/layout';
import { projects } from '@/data/portfolio-data';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-background">
        <h1 className="text-4xl font-bold text-foreground">
          Project Detail Page
        </h1>
        <p className="text-lg text-muted">
          Viewing project: <span className="text-accent font-mono">{projectId}</span>
        </p>
        {project ? (
          <div className="text-center space-y-2">
            <h2 className="text-2xl text-foreground font-semibold">{project.title}</h2>
            <p className="text-muted max-w-md">{project.shortDescription}</p>
          </div>
        ) : (
          <p className="text-red-600 font-medium">
            No project found with id &quot;{projectId}&quot;
          </p>
        )}
        <Link
          to="/"
          className="text-accent hover:text-accent-hover hover:underline transition-colors font-medium"
        >
          &larr; Back to Home
        </Link>
      </div>
    </PageWrapper>
  );
};

export default ProjectDetail;
