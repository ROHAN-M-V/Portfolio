import { motion } from 'framer-motion';

export default function Header() {
    return (
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
                {['Works', 'About', 'Contact'].map((item) => (
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

            <button className="md:hidden font-medium text-sm uppercase pointer-events-auto hover-target">
                Menu
            </button>
        </motion.header>
    );
}
