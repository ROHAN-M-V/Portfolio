import { useEffect, useRef, useCallback } from 'react';

// Detect touch devices to skip cursor entirely
function isTouchDevice(): boolean {
    return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
    );
}

export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const posRef = useRef({ x: 0, y: 0 });
    const targetRef = useRef({ x: 0, y: 0 });
    const hoveredRef = useRef(false);
    const rafRef = useRef<number>(0);
    const isMountedRef = useRef(false);

    const animate = useCallback(() => {
        const dot = dotRef.current;
        if (!dot) return;

        // Smooth spring-like interpolation
        const lerp = 0.15;
        posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
        posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

        const scale = hoveredRef.current ? 3.5 : 1;
        dot.style.transform = `translate3d(${posRef.current.x - 8}px, ${posRef.current.y - 8}px, 0) scale(${scale})`;

        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        // Skip everything on mobile/touch devices
        if (isTouchDevice()) return;
        isMountedRef.current = true;

        const onMove = (e: MouseEvent) => {
            targetRef.current.x = e.clientX;
            targetRef.current.y = e.clientY;
        };

        const onOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            hoveredRef.current = !!(
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('hover-target')
            );
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mouseover', onOver, { passive: true });

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            isMountedRef.current = false;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            cancelAnimationFrame(rafRef.current);
        };
    }, [animate]);

    return (
        <div
            ref={dotRef}
            className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[100] mix-blend-difference hidden md:block"
            style={{
                willChange: 'transform',
                transition: 'width 0.3s, height 0.3s',
            }}
        />
    );
}
