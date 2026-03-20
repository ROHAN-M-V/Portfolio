import { motion, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';

const projects = [
    {
        title: "NEXUS",
        client: "Fintech Startup",
        type: "Web Experience",
        year: "2024",
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    },
    {
        title: "AURA",
        client: "Luxury Fashion",
        type: "E-Commerce",
        year: "2023",
        img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
    },
    {
        title: "VELOCITY",
        client: "Automotive",
        type: "Marketing Site",
        year: "2023",
        img: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2070&auto=format&fit=crop"
    }
];

export default function Projects() {
    const container = useRef(null);
    const [modal, setModal] = useState({ active: false, index: 0 });

    const isMobile = useMemo(() => {
        return window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }, []);

    return (
        <section ref={container} id="works" className="relative py-32 bg-[#050505] text-[#e0e0e0]">
            <div className="px-6 md:px-10 mb-20 flex justify-between items-end border-b border-zinc-800 pb-10">
                <h2 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-tighter">
                    Selected <br /> Works
                </h2>
                <p className="text-zinc-500 font-alt tracking-widest uppercase text-sm">
                    ( 2025 - 2026 )
                </p>
            </div>

            <div className="w-full flex flex-col items-center justify-center relative">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="w-full flex justify-between items-center px-6 md:px-20 py-10 md:py-16 border-b border-zinc-800 group cursor-pointer hover-target transition-all duration-500 hover:bg-zinc-900"
                        onMouseEnter={isMobile ? undefined : () => setModal({ active: true, index })}
                        onMouseLeave={isMobile ? undefined : () => setModal({ active: false, index })}
                    >
                        <h2 className="text-5xl md:text-8xl font-display uppercase tracking-tighter m-0 font-bold group-hover:-translate-x-4 transition-transform duration-500 text-white">
                            {project.title}
                        </h2>
                        <div className="text-right">
                            <p className="text-sm md:text-lg font-sans text-zinc-400 group-hover:text-white transition-colors duration-300">
                                {project.client}
                            </p>
                            <p className="text-xs md:text-sm font-alt tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors duration-300 uppercase mt-1">
                                {project.type}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Only render the cursor-following modal on desktop */}
            {!isMobile && <ProjectModal modal={modal} projects={projects} />}
        </section>
    );
}

function ProjectModal({ modal, projects }: { modal: any, projects: any[] }) {
    const { active, index } = modal;
    const modalContainer = useRef(null);

    const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };

    const springX = useSpring(0, springConfig);
    const springY = useSpring(0, springConfig);

    useEffect(() => {
        // Only listen for mousemove when modal is relevant
        const moveModal = (e: MouseEvent) => {
            springX.set(e.clientX);
            springY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveModal, { passive: true });
        return () => {
            window.removeEventListener('mousemove', moveModal);
        };
    }, [springX, springY]);

    return (
        <motion.div
            ref={modalContainer}
            className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-[100] overflow-hidden flex items-center justify-center bg-white"
            initial={{ scale: 0 }}
            animate={{ scale: active ? 1 : 0 }}
            style={{
                x: useTransform(springX, value => value - 200),
                y: useTransform(springY, value => value - 150),
                willChange: 'transform',
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        >
            <div
                className="w-full h-full absolute transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                style={{ top: `${index * -100}%` }}
            >
                {projects.map((project, i) => (
                    <div key={i} className="h-full w-full flex items-center justify-center relative">
                        <img
                            src={project.img}
                            alt={project.title}
                            loading="lazy"
                            className="w-full h-full object-cover grayscale brightness-75 mix-blend-multiply"
                        />
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center font-alt text-2xl font-bold uppercase tracking-widest text-black mix-blend-overlay">
                View Project
            </div>
        </motion.div>
    );
}
