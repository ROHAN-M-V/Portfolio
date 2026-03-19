import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { playAmbientHum, playBurst } from '../utils/sounds';

const PHRASES = [
    'Chasing pixels...',
    'Painting the web...',
    'Aligning perfection...',
    'Crafting visuals...',
    'Designing delight...',
    'Mixing colors...',
    'Sketching ideas...',
    'Shaping imagination...',
];

const CYCLE_MS = 1200;

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const [started, setStarted] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [phase, setPhase] = useState<'loading' | 'burst' | 'done'>('loading');
    const stopHumRef = useRef<(() => void) | null>(null);

    // start ambient hum only after user clicks
    useEffect(() => {
        if (!started) return;
        stopHumRef.current = playAmbientHum();
        return () => stopHumRef.current?.();
    }, [started]);

    const handleComplete = useCallback(() => {
        // stop hum, play burst
        stopHumRef.current?.();
        playBurst();
        // start the burst grow phase
        setPhase('burst');
        // after black hole grows → flash → done
        setTimeout(() => setPhase('done'), 2400);
        setTimeout(onComplete, 2800);
    }, [onComplete]);

    // cycle through phrases only after started
    useEffect(() => {
        if (!started) return;
        const interval = setInterval(() => {
            setPhraseIndex((prev) => {
                const next = prev + 1;
                if (next >= PHRASES.length) {
                    clearInterval(interval);
                    setTimeout(handleComplete, 400);
                    return prev;
                }
                return next;
            });
        }, CYCLE_MS);

        return () => clearInterval(interval);
    }, [started, handleComplete]);

    const progress = Math.min(((phraseIndex + 1) / PHRASES.length) * 100, 100);

    return (
        <AnimatePresence>
            {/* ── Dive In gate ── */}
            {!started && (
                <motion.div
                    key="gate"
                    className="fixed inset-0 z-[201] bg-[#050505] flex flex-col items-center justify-center cursor-pointer select-none"
                    onClick={() => setStarted(true)}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.button
                        className="group relative px-10 py-4 rounded-full border border-zinc-700 text-white font-display text-xl tracking-tight uppercase overflow-hidden hover:border-zinc-500 transition-colors duration-300"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        onClick={() => setStarted(true)}
                    >
                        <span className="relative z-10">Dive In</span>
                        <motion.div
                            className="absolute inset-0 bg-white/5 rounded-full"
                            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.15, 0] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        />
                    </motion.button>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="font-alt text-[10px] tracking-[0.4em] uppercase text-zinc-700 mt-6"
                    >
                        🔊 Sound on for best experience
                    </motion.p>
                </motion.div>
            )}

            {started && phase !== 'done' && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center select-none overflow-hidden"
                    animate={{
                        opacity: phase === 'burst' ? [1, 1, 1, 0] : 1,
                    }}
                    transition={{
                        duration: phase === 'burst' ? 2.4 : 0,
                        times: phase === 'burst' ? [0, 0.5, 0.8, 1] : undefined,
                        ease: 'easeInOut',
                    }}
                >
                    {/* ── white flash on burst ── */}
                    <motion.div
                        className="absolute inset-0 bg-white z-50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: phase === 'burst' ? [0, 0, 0.8, 0] : 0,
                        }}
                        transition={{
                            duration: phase === 'burst' ? 2.4 : 0,
                            times: phase === 'burst' ? [0, 0.6, 0.75, 1] : undefined,
                            ease: 'easeOut',
                        }}
                    />

                    {/* ── black hole ── */}
                    <motion.div
                        className="relative w-44 h-44 md:w-56 md:h-56 mb-14"
                        animate={{
                            scale: phase === 'burst' ? [1, 1.05, 1.15, 1.5, 8] : 1,
                            rotate: phase === 'burst' ? [0, 0, 5, 30, 90] : 0,
                        }}
                        transition={{
                            duration: phase === 'burst' ? 2.2 : 0,
                            times: phase === 'burst' ? [0, 0.25, 0.45, 0.65, 1] : undefined,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {/* outer accretion glow */}
                        <motion.div
                            className="absolute inset-[-20%] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(160,120,255,0.12) 0%, rgba(80,60,180,0.06) 40%, transparent 70%)',
                            }}
                            animate={{
                                scale: phase === 'burst' ? [1, 2] : [1, 1.15, 1],
                                opacity: phase === 'burst' ? [0.6, 0] : [0.6, 1, 0.6],
                            }}
                            transition={{
                                repeat: phase === 'burst' ? 0 : Infinity,
                                duration: phase === 'burst' ? 0.8 : 3,
                                ease: 'easeInOut',
                            }}
                        />

                        {/* ring 1 — outer, slow */}
                        <motion.div
                            className="absolute inset-0 rounded-full border border-zinc-700/40"
                            animate={{
                                rotate: 360,
                                scale: phase === 'burst' ? [1, 0] : 1,
                                opacity: phase === 'burst' ? [1, 0] : 1,
                            }}
                            transition={{
                                rotate: { repeat: Infinity, duration: 12, ease: 'linear' },
                                scale: { duration: 0.6 },
                                opacity: { duration: 0.6 },
                            }}
                            style={{ borderWidth: '1px', borderStyle: 'dashed' }}
                        />

                        {/* ring 2 — mid, opposite direction */}
                        <motion.div
                            className="absolute inset-[14%] rounded-full border border-zinc-600/30"
                            animate={{
                                rotate: -360,
                                scale: phase === 'burst' ? [1, 0] : 1,
                                opacity: phase === 'burst' ? [1, 0] : 1,
                            }}
                            transition={{
                                rotate: { repeat: Infinity, duration: 8, ease: 'linear' },
                                scale: { duration: 0.5, delay: 0.1 },
                                opacity: { duration: 0.5, delay: 0.1 },
                            }}
                        />

                        {/* ring 3 — inner, fast */}
                        <motion.div
                            className="absolute inset-[28%] rounded-full border border-zinc-500/20"
                            animate={{
                                rotate: 360,
                                scale: phase === 'burst' ? [1, 0] : 1,
                                opacity: phase === 'burst' ? [1, 0] : 1,
                            }}
                            transition={{
                                rotate: { repeat: Infinity, duration: 4, ease: 'linear' },
                                scale: { duration: 0.4, delay: 0.2 },
                                opacity: { duration: 0.4, delay: 0.2 },
                            }}
                            style={{ borderWidth: '1px', borderStyle: 'dotted' }}
                        />

                        {/* orbiting particles */}
                        {[
                            { size: '100%', dur: 6, delay: 0, dotSize: 'w-1.5 h-1.5', glow: '0_0_8px_rgba(200,180,255,0.8)' },
                            { size: '78%', dur: 4, delay: 0.5, dotSize: 'w-1 h-1', glow: '0_0_6px_rgba(255,255,255,0.6)' },
                            { size: '56%', dur: 2.5, delay: 1, dotSize: 'w-1 h-1', glow: '0_0_6px_rgba(180,160,255,0.7)' },
                        ].map((ring, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: ring.size,
                                    height: ring.size,
                                    top: `${(100 - parseFloat(ring.size)) / 2}%`,
                                    left: `${(100 - parseFloat(ring.size)) / 2}%`,
                                }}
                                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                                transition={{ repeat: Infinity, duration: ring.dur, ease: 'linear', delay: ring.delay }}
                            >
                                <div
                                    className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${ring.dotSize} rounded-full bg-white`}
                                    style={{ boxShadow: ring.glow }}
                                />
                            </motion.div>
                        ))}

                        {/* event horizon — dark void center */}
                        <motion.div
                            className="absolute inset-[35%] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, #000 40%, rgba(0,0,0,0.9) 60%, rgba(20,10,40,0.4) 80%, transparent 100%)',
                                boxShadow: 'inset 0 0 30px rgba(0,0,0,1), 0 0 40px rgba(100,70,200,0.15)',
                            }}
                            animate={{
                                scale: phase === 'burst' ? [1, 1.5, 3] : 1,
                            }}
                            transition={{
                                duration: phase === 'burst' ? 1.2 : 0,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />

                        {/* gravitational lensing ring */}
                        <motion.div
                            className="absolute inset-[32%] rounded-full"
                            style={{
                                border: '1px solid rgba(180,160,255,0.15)',
                                boxShadow: '0 0 20px rgba(140,100,255,0.08), inset 0 0 20px rgba(140,100,255,0.05)',
                            }}
                            animate={{
                                scale: phase === 'burst' ? [1, 2] : [1, 1.06, 1],
                                opacity: phase === 'burst' ? [1, 0] : [0.5, 1, 0.5],
                            }}
                            transition={{
                                repeat: phase === 'burst' ? 0 : Infinity,
                                duration: phase === 'burst' ? 0.6 : 2,
                                ease: 'easeInOut',
                            }}
                        />
                    </motion.div>

                    {/* ── cycling text ── */}
                    <motion.div
                        className="h-10 overflow-hidden relative flex items-center justify-center"
                        animate={{
                            opacity: phase === 'burst' ? 0 : 1,
                            y: phase === 'burst' ? -20 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={phraseIndex}
                                initial={{ y: 30, opacity: 0, filter: 'blur(6px)' }}
                                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                exit={{ y: -30, opacity: 0, filter: 'blur(6px)' }}
                                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                                className="font-display text-lg md:text-2xl tracking-tight text-white whitespace-nowrap"
                            >
                                {PHRASES[phraseIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </motion.div>

                    {/* ── small progress % ── */}
                    <motion.span
                        className="mt-6 font-alt text-[11px] tracking-[0.4em] uppercase text-zinc-600"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: phase === 'burst' ? 0 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {Math.round(progress)}%
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
