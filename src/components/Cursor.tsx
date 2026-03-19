import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('hover-target')
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[100] mix-blend-difference hidden md:block"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: isHovered ? 3.5 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 28,
                    mass: 0.5,
                }}
            />
        </>
    );
}
