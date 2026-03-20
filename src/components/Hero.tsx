import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo } from 'react';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const isMobile = useMemo(() => window.innerWidth < 768, []);
    const parallaxAmount = isMobile ? 80 : 200;

    const y1 = useTransform(scrollYProgress, [0, 1], [0, parallaxAmount]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -parallaxAmount]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-20"
        >
            <motion.div
                style={{ y: y1, opacity, willChange: 'transform' }}
                className="w-full px-6 md:px-10 flex flex-col items-start gap-4 z-10"
            >
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "110%", rotate: 5 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                        className="font-display text-[13vw] md:text-[14vw] leading-[0.8] tracking-[-0.04em] uppercase font-bold text-white drop-shadow-2xl"
                    >
                        CREATIVE
                    </motion.h1>
                </div>
            </motion.div>

            <motion.div
                style={{ y: y2, opacity, willChange: 'transform' }}
                className="w-full px-6 md:px-10 flex justify-end z-10"
            >
                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "110%", rotate: -5 }}
                        animate={{ y: 0, rotate: 0 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
                        className="font-display text-[13vw] md:text-[14vw] leading-[0.8] tracking-[-0.04em] uppercase font-bold text-transparent"
                        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}
                    >
                        DEVELOPER
                    </motion.h1>
                </div>
            </motion.div>

            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-20 left-10 hidden md:flex items-center gap-4"
            >
                <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center animate-spin-slow">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-400 font-alt text-xs uppercase tracking-widest fill-current">
                        <path id="curve" fill="transparent" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                        <text width="500">
                            <textPath href="#curve">
                                Scroll down • Discover • Scroll down • Discover •
                            </textPath>
                        </text>
                    </svg>
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-20 right-6 md:right-10 text-zinc-400 max-w-xs text-sm font-medium tracking-wide font-sans text-right"
            >
                Crafting digital experiences that merge high aesthetics with robust engineering. Based globally.
            </motion.p>

            {/* Marquee — reduced from 8 to 4 spans */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-zinc-900 bg-[#050505] py-2 md:py-3 z-20">
                <motion.div
                    className="whitespace-nowrap flex font-alt text-xs md:text-sm tracking-widest uppercase text-zinc-600"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    style={{ willChange: 'transform' }}
                >
                    <span className="pr-10">OPEN FOR NEW PROJECTS • AVAILABLE WORLDWIDE • </span>
                    <span className="pr-10">OPEN FOR NEW PROJECTS • AVAILABLE WORLDWIDE • </span>
                    <span className="pr-10">OPEN FOR NEW PROJECTS • AVAILABLE WORLDWIDE • </span>
                    <span className="pr-10">OPEN FOR NEW PROJECTS • AVAILABLE WORLDWIDE • </span>
                </motion.div>
            </div>
        </section>
    );
}
