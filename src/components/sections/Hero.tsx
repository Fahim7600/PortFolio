const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-[80vh] flex flex-col items-center justify-center bg-background px-6 border-b border-border/40"
    >
      <h2 className="text-5xl font-extrabold text-foreground tracking-tight text-center">
        Hero Section
      </h2>
      <p className="mt-4 text-muted text-lg text-center max-w-md">
        Placeholder for 3D elements, headings, bio intro, and call-to-actions.
      </p>
    </section>
  );
};

export default Hero;
