import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const NAV_ITEMS = ['Works', 'About', 'Contact'];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-10 mix-blend-difference text-white pointer-events-none"
            >
                <div className="font-display font-bold text-xl tracking-tighter pointer-events-auto cursor-pointer">
                    ROHAN VERNEKAR
                </div>

                <nav className="hidden md:flex gap-8 text-sm font-medium tracking-tight pointer-events-auto">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="hover:italic hover-target uppercase relative group overflow-hidden"
                        >
                            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                                {item}
                            </span>
                            <span className="inline-block absolute left-0 top-full transition-transform duration-300 group-hover:-translate-y-full">
                                {item}
                            </span>
                        </a>
                    ))}
                </nav>

                <button
                    className="md:hidden font-medium text-sm uppercase pointer-events-auto hover-target"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? 'Close' : 'Menu'}
                </button>
            </motion.header>

            {/* ── Mobile fullscreen menu ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[49] bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center gap-10 md:hidden"
                    >
                        {NAV_ITEMS.map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setMenuOpen(false)}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
                                className="font-display text-4xl font-bold uppercase tracking-tighter text-white hover:text-zinc-400 transition-colors duration-300"
                            >
                                {item}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
