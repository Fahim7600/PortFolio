import type { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {children}
    </div>
  );
};

export default PageWrapper;
