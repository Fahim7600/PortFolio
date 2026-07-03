import { Navbar, Footer, PageWrapper } from '@/components/layout';
import {
  Hero,
  About,
  Skills,
  Education,
  Projects,
  Contact,
} from '@/components/sections';
import { ThreeScene } from '@/components/three';

const Home = () => {
  return (
    <PageWrapper>
      <Navbar />

      {/* Offset for fixed navbar */}
      <main className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Contact />

        {/* R3F test — confirms Three.js pipeline works. Remove later. */}
        <section
          id="three-test"
          className="py-16 flex flex-col items-center gap-4"
        >
          <h2 className="text-2xl font-semibold text-muted">
            3D Test (remove later)
          </h2>
          <ThreeScene className="w-full max-w-xl h-[350px]" />
        </section>
      </main>

      <Footer />
    </PageWrapper>
  );
};

export default Home;
