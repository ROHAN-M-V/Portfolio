import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} id="about" className="relative py-32 bg-[#e0e0e0] text-[#050505] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      <div className="px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
        <div className="md:col-span-5">
          <motion.h2
            style={{ x }}
            className="font-display text-5xl md:text-[8vw] leading-[0.85] font-bold uppercase tracking-tighter mix-blend-difference"
          >
            Digital<br />Crafter.
          </motion.h2>
        </div>

        <div className="md:col-start-7 md:col-span-5 flex flex-col gap-10 mt-10 md:mt-0">
          <p className="font-sans text-xl md:text-3xl font-medium leading-snug tracking-tight">
            I am a creative developer who bridges the gap between design and engineering. I specialize in building immersive web experiences that not only look incredible but feel effortless to use.
          </p>
          <p className="font-sans text-lg md:text-xl text-zinc-700 leading-relaxed">
            With a background in both visual design and frontend architecture, I focus on the micro-interactions, the typography, and the performance that make digital products stand out in a crowded landscape.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            {['React', 'WebGL', 'Three.js', 'GSAP', 'Next.js', 'Framer Motion', 'Tailwind'].map((tech) => (
              <span key={tech} className="px-5 py-2 rounded-full border border-black font-alt text-sm uppercase tracking-widest hover-target hover:bg-black hover:text-white transition-colors duration-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
