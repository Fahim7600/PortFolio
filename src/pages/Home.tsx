import { Navbar, Footer, PageWrapper } from '@/components/layout';
import {
  Hero,
  About,
  Skills,
  Education,
  Projects,
  Contact,
} from '@/components/sections';

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
      </main>

      <Footer />
    </PageWrapper>
  );
};

export default Home;
