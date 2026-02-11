"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// --- HELPERS ---
const useMousePosition = (ref: React.RefObject<HTMLElement | null>) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            x.set(e.clientX - rect.left);
            y.set(e.clientY - rect.top);
        };
        const node = ref.current;
        node?.addEventListener('mousemove', handleMouseMove);
        return () => node?.removeEventListener('mousemove', handleMouseMove);
    }, [ref, x, y]);
    return { x, y };
};

// --- 1-6: EXISTING COMPONENTS (REFINED) ---

const MaskedRevealButton = ({ text = "Hover Reveal", hoverText = "Let's Go!" }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { x, y } = useMousePosition(ref);
    const [isHovered, setIsHovered] = useState(false);
    const size = isHovered ? 150 : 0;
    const smoothX = useSpring(x, { damping: 20, stiffness: 200 });
    const smoothY = useSpring(y, { damping: 20, stiffness: 200 });
    const maskImage = useTransform([smoothX, smoothY], ([sx, sy]) =>
        `radial-gradient(circle ${size}px at ${sx}px ${sy}px, black 100%, transparent 100%)`
    );

    return (
        <button ref={ref} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            className="relative h-14 w-52 rounded-xl border border-white/10 bg-neutral-900 text-neutral-500 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center font-medium">{text}</div>
            <motion.div style={{ WebkitMaskImage: maskImage, maskImage }}
                className="absolute inset-0 flex items-center justify-center bg-white text-black font-bold">
                {hoverText}
            </motion.div>
        </button>
    );
};

interface ButtonProps {
    children?: React.ReactNode;
}

const GooeyBlobButton = ({ children = "Gooey" }: ButtonProps) => (
    <div className="relative group">
        <svg className="absolute hidden"><defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /><feComposite in="SourceGraphic" in2="goo" operator="atop" /></filter></defs></svg>
        <div className="filter-[url(#goo)] relative">
            <motion.button whileHover={{ scale: 1.05 }} className="relative z-10 px-8 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-xl">{children}</motion.button>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 group-hover:scale-150 transition-transform duration-500">
                <div className="absolute -top-4 left-4 w-8 h-8 bg-orange-400 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -bottom-4 right-4 w-10 h-10 bg-orange-600 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </div>
    </div>
);

const SnakeBorderButton = ({ children = "Snake Border" }: ButtonProps) => (
    <button className="relative group px-10 py-4 text-white font-bold uppercase tracking-widest">
        <span className="relative z-10 group-hover:text-cyan-400 transition-colors duration-300">{children}</span>
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="2" rx="8" />
            <motion.rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#22d3ee" strokeWidth="3" rx="8"
                strokeDasharray="100, 300" initial={{ strokeDashoffset: 0 }} animate={{ strokeDashoffset: -400 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="opacity-0 group-hover:opacity-100" />
        </svg>
    </button>
);

const ParticleButton = ({ children = "Burst" }: ButtonProps) => {
    const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);
    const spawn = () => setParticles(Array.from({ length: 10 }).map(() => ({ id: Math.random(), x: (Math.random() - 0.5) * 120, y: (Math.random() - 0.5) * 120 })));
    return (
        <div className="relative">
            <AnimatePresence>{particles.map(p => <motion.div key={p.id} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: p.x, y: p.y, opacity: 0 }} className="absolute left-1/2 top-1/2 w-2 h-2 bg-yellow-400 rounded-full" />)}</AnimatePresence>
            <motion.button onMouseEnter={spawn} whileTap={{ scale: 0.95 }} className="relative z-10 px-8 py-3 bg-white text-black font-bold rounded-lg shadow-[4px_4px_0px_#facc15] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                {children}
            </motion.button>
        </div>
    );
};

const VelocityTextButton = ({ children = "Discover" }: ButtonProps) => (
    <button className="group relative h-12 w-44 overflow-hidden bg-white text-black font-black uppercase italic border-b-4 border-black">
        <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
            <span className="h-12 flex items-center justify-center group-hover:skew-x-12 transition-transform">{children}</span>
            <span className="h-12 flex items-center justify-center bg-black text-white skew-x-12 group-hover:skew-x-0 transition-transform">{children}</span>
        </div>
    </button>
);

const ReactiveGridButton = ({ children = "Matrix" }: ButtonProps) => (
    <button className="group relative px-12 py-4 bg-indigo-600 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-6 gap-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {Array.from({ length: 24 }).map((_, i) => <motion.div key={i} whileHover={{ scale: 1.5, backgroundColor: "#fff" }} className="w-full h-full bg-indigo-400/30 rounded-sm" />)}
        </div>
        <span className="relative z-10 text-white font-bold">{children}</span>
    </button>
);

// --- 7-22: NEW ADVANCED COMPONENTS ---

const TextScrambleButton = ({ label = "SCRAMBLE" }) => {
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    const [text, setText] = useState(label);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = () => {
        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setText(label.split("").map((letter, index) => {
                if (index < iteration) return label[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));
            if (iteration >= label.length && intervalRef.current) clearInterval(intervalRef.current);
            iteration += 1 / 3;
        }, 30);
    };

    return (
        <button onMouseEnter={scramble} className="font-mono text-xl font-bold text-green-500 border-2 border-green-500/30 px-8 py-3 rounded hover:bg-green-500/10 transition-colors min-w-[180px]">
            {text}
        </button>
    );
};

const BorderBeamButton = ({ children = "Beam Pro" }: ButtonProps) => (
    <button className="relative px-8 py-3 bg-neutral-900 rounded-full text-white font-medium overflow-hidden group">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <motion.div
            initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute -inset-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'conic-gradient(from 0deg, transparent 0 340deg, white 360deg)' }}
        />
        <span className="relative z-10">{children}</span>
    </button>
);

const MagneticTiltButton = ({ children = "3D Tilt" }: ButtonProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    return (
        <motion.div style={{ perspective: 1000 }} onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - (rect.left + rect.width / 2));
            y.set(e.clientY - (rect.top + rect.height / 2));
        }} onMouseLeave={() => { x.set(0); y.set(0); }}>
            <motion.button style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="px-10 py-4 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl text-white font-black shadow-2xl">
                <span style={{ transform: "translateZ(40px)" }} className="block">{children}</span>
            </motion.button>
        </motion.div>
    );
};

const LiquidFillButton = ({ children = "Fill Me" }: ButtonProps) => (
    <button className="group relative px-8 py-3 border-2 border-sky-400 text-sky-400 font-bold rounded-lg overflow-hidden transition-colors hover:text-white">
        <span className="relative z-10">{children}</span>
        <motion.div initial={{ y: "100%" }} whileHover={{ y: "0%" }} transition={{ type: "spring", damping: 15 }}
            className="absolute inset-0 bg-sky-400 rounded-t-[100%]" style={{ borderRadius: '50% 50% 0 0', scale: 1.5 }} />
    </button>
);

const StaggeredTextButton = ({ children = "STAGGER" }: { children?: string }) => (
    <button className="group overflow-hidden px-8 py-3 bg-neutral-800 rounded-lg text-white font-bold flex gap-1">
        {(children || "").split("").map((char, i) => (
            <motion.span key={i} transition={{ delay: i * 0.03 }} className="inline-block group-hover:-translate-y-1 text-lg">
                {char}
            </motion.span>
        ))}
    </button>
);

const GlitchShiftButton = ({ children = "SYSTEM ERROR" }: ButtonProps) => (
    <button className="group relative px-10 py-4 bg-white text-black font-black uppercase italic border-4 border-black overflow-hidden hover:bg-black hover:text-white transition-colors">
        <span className="relative z-10">{children}</span>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
            <motion.span animate={{ x: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 0.1 }} className="absolute inset-0 flex items-center justify-center text-red-500 translate-x-1">{children}</motion.span>
            <motion.span animate={{ x: [2, -2, 2] }} transition={{ repeat: Infinity, duration: 0.1 }} className="absolute inset-0 flex items-center justify-center text-blue-500 -translate-x-1">{children}</motion.span>
        </div>
    </button>
);

const IconSlideButton = ({ children = "Next Step" }: ButtonProps) => (
    <button className="group relative px-8 py-3 bg-violet-600 text-white font-bold rounded-full overflow-hidden flex items-center gap-2 pr-12">
        <span>{children}</span>
        <motion.div className="absolute right-4" initial={{ x: -20, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </motion.div>
    </button>
);

const NeonShadowButton = ({ children = "Glow" }: ButtonProps) => (
    <button className="px-8 py-3 bg-black text-white rounded-md font-bold border border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:bg-white hover:text-black transition-all duration-300">
        {children}
    </button>
);

const LensFlareButton = ({ children = "Flare" }: ButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { x, y } = useMousePosition(ref);
    return (
        <button ref={ref} className="relative px-8 py-3 bg-neutral-900 text-neutral-400 rounded-lg overflow-hidden group hover:text-white transition-colors border border-white/5">
            <motion.div style={{ left: x, top: y }} className="absolute -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 blur-3xl pointer-events-none opacity-0 group-hover:opacity-100" />
            <span className="relative z-10">{children}</span>
        </button>
    );
};

const PathMorphButton = ({ children = "Morph" }: ButtonProps) => (
    <button className="group relative px-10 py-4 text-white font-bold">
        <span className="relative z-10">{children}</span>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <motion.path d="M0,0 L100,0 L100,40 L0,40 Z" fill="#4f46e5" variants={{
                hover: { d: "M0,10 Q50,0 100,10 L100,30 Q50,40 0,30 Z" }
            }} transition={{ type: 'spring', stiffness: 300, damping: 10 }} className="group-hover:fill-indigo-500" />
        </svg>
    </button>
);

const DoubleLayerButton = ({ text = "Primary", sub = "Secondary" }) => (
    <button className="group relative h-12 w-40 bg-white text-black font-bold overflow-hidden rounded-md">
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">{text}</div>
        <div className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-black text-white">{sub}</div>
    </button>
);

const RippleButton = ({ children = "Ripple" }: ButtonProps) => {
    const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);
    const addRipple = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setRipples([...ripples, { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    };
    return (
        <button onMouseDown={addRipple} className="relative px-8 py-3 bg-zinc-800 text-white rounded-lg overflow-hidden">
            {ripples.map(r => <motion.span key={r.id} initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 0.6 }} style={{ left: r.x, top: r.y }} className="absolute w-10 h-10 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />)}
            <span className="relative z-10">{children}</span>
        </button>
    );
};

const GlassHighlightButton = ({ children = "Glass" }: ButtonProps) => (
    <button className="relative px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        {children}
    </button>
);

const Flip3DButton = ({ front = "Front", back = "Back" }) => (
    <div className="group h-12 w-40 [perspective:1000px]">
        <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
            <div className="absolute inset-0 flex items-center justify-center bg-indigo-500 text-white rounded-lg [backface-visibility:hidden]">{front}</div>
            <div className="absolute inset-0 flex items-center justify-center bg-rose-500 text-white rounded-lg [backface-visibility:hidden] [transform:rotateX(180deg)]">{back}</div>
        </div>
    </div>
);

const SpotlightButton = ({ children = "Spotlight" }: ButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { x, y } = useMousePosition(ref);
    return (
        <button ref={ref} className="relative px-8 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-400 overflow-hidden hover:text-white transition-colors">
            <motion.div style={{ background: `radial-gradient(100px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 80%)` }} className="absolute inset-0 pointer-events-none" />
            {children}
        </button>
    );
};

const ElasticStretchButton = ({ children = "Elastic" }: ButtonProps) => (
    <motion.button whileHover={{ scaleX: 1.2, scaleY: 0.8 }} transition={{ type: 'spring', stiffness: 500, damping: 10 }}
        className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-full shadow-lg">
        {children}
    </motion.button>
);

// --- MAIN SHOWCASE ---

function Card({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-8 w-full">
            <div className="h-24 flex items-center justify-center">
                {children}
            </div>
            <p className="text-[10px] font-bold text-neutral-700 uppercase tracking-[0.2em] text-center">{label}</p>
        </div>
    );
}

export default function SmallAnimation2() {
    return (
        <div className="min-h-screen bg-[#020202] text-white p-10 font-sans selection:bg-indigo-500/30">
            <header className="max-w-6xl mx-auto mb-20 text-center">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-indigo-400 text-xs font-bold tracking-[0.4em] uppercase mb-4 block">Interaction Library v3.0</motion.span>
                <h1 className="text-6xl font-black mb-6 tracking-tight bg-gradient-to-b from-white to-neutral-600 bg-clip-text text-transparent">The Ultimate Button Collection</h1>
                <p className="text-neutral-500 max-w-xl mx-auto text-lg">22 ultra-modern, reusable button components crafted with Framer Motion and Tailwind CSS.</p>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 gap-y-24 items-center justify-items-center">

                <Card label="Masked Reveal"><MaskedRevealButton /></Card>
                <Card label="Gooey Liquid"><GooeyBlobButton /></Card>
                <Card label="Snake Perimeter"><SnakeBorderButton /></Card>
                <Card label="Particle Explosion"><ParticleButton /></Card>
                <Card label="Velocity Kinetic"><VelocityTextButton /></Card>
                <Card label="Reactive Grid"><ReactiveGridButton /></Card>
                <Card label="Matrix Scramble"><TextScrambleButton /></Card>
                <Card label="Orbiting Beam"><BorderBeamButton /></Card>
                <Card label="3D Parallax"><MagneticTiltButton /></Card>
                <Card label="Organic Liquid Fill"><LiquidFillButton /></Card>
                <Card label="Character Stagger"><StaggeredTextButton /></Card>
                <Card label="System Glitch"><GlitchShiftButton /></Card>
                <Card label="Dynamic Icon Slide"><IconSlideButton /></Card>
                <Card label="Minimalist Glow"><NeonShadowButton /></Card>
                <Card label="Soft Light Leak"><LensFlareButton /></Card>
                <Card label="SVG Path Morph"><PathMorphButton /></Card>
                <Card label="Vertical Split Slide"><DoubleLayerButton /></Card>
                <Card label="Dynamic Ripple Click"><RippleButton /></Card>
                <Card label="Glass Reflection"><GlassHighlightButton /></Card>
                <Card label="3D Perspective Flip"><Flip3DButton /></Card>
                <Card label="Mouse Tracker Spotlight"><SpotlightButton /></Card>
                <Card label="Elastic Physics"><ElasticStretchButton /></Card>

            </main>

            <footer className="mt-40 pt-10 border-t border-white/5 text-center text-neutral-600 text-sm">
                Designed for High-End Creative Applications • 2026
            </footer>
        </div>
    );
}
