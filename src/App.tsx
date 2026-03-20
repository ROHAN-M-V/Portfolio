import { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll.tsx';
import Cursor from './components/Cursor.tsx';
import Loader from './components/Loader.tsx';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Projects from './components/Projects.tsx';
import About from './components/About.tsx';
import Footer from './components/Footer.tsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset scroll after loader to ensure page starts at top
  useEffect(() => {
    if (!loading) {
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <SmoothScroll enabled={!loading}>
      <Cursor />
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Always render content — hidden behind loader to avoid mount spike */}
      <div
        className="relative z-10 min-h-screen bg-[#050505] text-[#e0e0e0] font-sans selection:bg-white selection:text-black"
        style={{
          visibility: loading ? 'hidden' : 'visible',
          pointerEvents: loading ? 'none' : 'auto',
        }}
      >
        <Header />
        <main>
          <Hero />
          <Projects />
          <About />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
