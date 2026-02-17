import React, { useState } from 'react';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import {
    ArrowRight,
} from 'lucide-react';

/**
 * ULTRA-SMOOTH STAGGERED COLLECTION
 * Focus: High-performance spring physics and fluid exit transitions.
 */

const SPRING_CONFIG: Transition = { type: "spring", stiffness: 220, damping: 20, mass: 0.5 };
const STAGGER = 0.015;

// Global helper for staggered letter animations
interface SmoothSplitTextProps {
    text: string;
    variants: Variants;
    transition?: Transition;
}

const SmoothSplitText: React.FC<SmoothSplitTextProps> = ({ text, variants, transition = {} }) => (
    <div className="flex overflow-hidden">
        {text.split("").map((char, i) => (
            <motion.span
                key={i}
                variants={variants}
                transition={{
                    ...SPRING_CONFIG,
                    delay: i * STAGGER,
                    ...transition
                }}
                className="inline-block whitespace-pre"
            >
                {char}
            </motion.span>
        ))}
    </div>
);

// 1. Fluid Vertical Flip
const FluidFlip = () => (
    <motion.button initial="initial" whileHover="hover" className="relative group px-8 py-3 bg-white text-black font-bold rounded-xl overflow-hidden border-b-4 border-zinc-300 active:border-b-0 active:translate-y-1 transition-all">
        <div className="relative z-10">
            <SmoothSplitText text="VERTICAL ROLL" variants={{ initial: { y: 0 }, hover: { y: "-100%" } }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-indigo-600 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
            <SmoothSplitText text="VERTICAL ROLL" variants={{ initial: { y: "100%" }, hover: { y: 0 } }} />
        </div>
    </motion.button>
);

// 2. The Elastic Slide
const ElasticSlide = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-900 text-white rounded-full border border-zinc-800 flex items-center gap-2">
        <SmoothSplitText text="ELASTIC SLIDE" variants={{ initial: { x: 0 }, hover: { x: 10 } }} transition={{ damping: 8, stiffness: 300 }} />
        <motion.div variants={{ initial: { x: -5, opacity: 0 }, hover: { x: 0, opacity: 1 } }} transition={SPRING_CONFIG}>
            <ArrowRight className="w-4 h-4" />
        </motion.div>
    </motion.button>
);

// 3. 3D Swing
const Swing3D = () => (
    <motion.button initial="initial" whileHover="hover" className="px-10 py-4 bg-indigo-600 text-white font-black rounded-lg [perspective:1000px]">
        <SmoothSplitText text="3D SWING" variants={{ initial: { rotateX: 0, y: 0 }, hover: { rotateX: -90, y: -10, opacity: 0 } }} />
        <div className="absolute inset-0 flex items-center justify-center">
            <SmoothSplitText text="3D SWING" variants={{ initial: { rotateX: 90, y: 10, opacity: 0 }, hover: { rotateX: 0, y: 0, opacity: 1 } }} />
        </div>
    </motion.button>
);

// 4. Ghost Hover
const GhostHover = () => (
    <motion.button initial="initial" whileHover="hover" className="relative px-8 py-3 text-white font-bold group">
        <SmoothSplitText text="GHOST DRIFT" variants={{ initial: { opacity: 0.3, y: 0 }, hover: { opacity: 1, y: -2, scale: 1.05 } }} />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.button>
);

// 5. Letter Blur Flow
const BlurFlow = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-800 text-white rounded-md">
        <SmoothSplitText text="SOFT BLUR" variants={{ initial: { filter: "blur(0px)", opacity: 1 }, hover: { filter: "blur(8px)", opacity: 0 } }} />
        <div className="absolute inset-0 flex items-center justify-center">
            <SmoothSplitText text="SOFT BLUR" variants={{ initial: { filter: "blur(8px)", opacity: 0 }, hover: { filter: "blur(0px)", opacity: 1 } }} />
        </div>
    </motion.button>
);

// 6. Magnetic Letters
const MagneticLetters = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20">
        <SmoothSplitText text="MAGNETIC" variants={{ initial: { y: 0, rotate: 0 }, hover: { y: -5, rotate: [0, -10, 10, 0] } }} transition={{ damping: 5, stiffness: 200 }} />
    </motion.button>
);

// 7. Reveal Underline
const RevealUnderline = () => (
    <motion.button initial="initial" whileHover="hover" className="relative px-4 py-2 text-zinc-400 font-medium">
        <SmoothSplitText text="REVEAL LINE" variants={{ initial: { color: "#a1a1aa" }, hover: { color: "#ffffff" } }} />
        <motion.div variants={{ initial: { scaleX: 0 }, hover: { scaleX: 1 } }} className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 origin-left" transition={SPRING_CONFIG} />
    </motion.button>
);

// 8. Squish & Stretch
const SquishStretch = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-rose-500 text-white font-black rounded-lg">
        <SmoothSplitText text="SQUISHY" variants={{ initial: { scaleY: 1 }, hover: { scaleY: 0.5, scaleX: 1.5, y: 5 } }} />
    </motion.button>
);

// 9. Diagonal Drift
const DiagonalDrift = () => (
    <motion.button initial="initial" whileHover="hover" className="relative px-8 py-3 bg-zinc-900 text-yellow-400 border border-yellow-400 rounded overflow-hidden">
        <div className="relative z-10">
            <SmoothSplitText text="DIAGONAL" variants={{ initial: { x: 0, y: 0 }, hover: { x: 50, y: -50, opacity: 0 } }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <SmoothSplitText text="DIAGONAL" variants={{ initial: { x: -50, y: 50, opacity: 0 }, hover: { x: 0, y: 0, opacity: 1 } }} />
        </div>
    </motion.button>
);

// 10. Depth Pulse
const DepthPulse = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-white text-black font-black rounded-lg [perspective:500px]">
        <SmoothSplitText text="DEPTH PULSE" variants={{ initial: { z: 0 }, hover: { z: 50, opacity: 0, scale: 1.5 } }} />
        <div className="absolute inset-0 flex items-center justify-center">
            <SmoothSplitText text="DEPTH PULSE" variants={{ initial: { z: -50, opacity: 0, scale: 0.5 }, hover: { z: 0, opacity: 1, scale: 1 } }} />
        </div>
    </motion.button>
);

// 11. Staggered Jump
const StaggeredJump = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-100 text-black font-bold rounded-full">
        <SmoothSplitText text="JUMPING" variants={{ initial: { y: 0 }, hover: { y: -12 } }} transition={{ damping: 10, stiffness: 300 }} />
    </motion.button>
);

// 12. Character Shuffle
const CharShuffle = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-4 bg-black text-lime-400 font-mono text-xl border border-lime-900 rounded">
        <SmoothSplitText text="DECRYPTING" variants={{ initial: { opacity: 1 }, hover: { opacity: [1, 0.4, 1], scale: [1, 0.9, 1] } }} transition={{ repeat: Infinity, duration: 0.4 }} />
    </motion.button>
);

// 13. Smooth Skew
const SmoothSkew = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-orange-600 text-white font-bold italic rounded">
        <SmoothSplitText text="SKEW FLOW" variants={{ initial: { skewX: 0 }, hover: { skewX: -20, x: 5 } }} />
    </motion.button>
);

// 14. Expand Spacing
const ExpandSpacing = () => (
    <motion.button initial="initial" whileHover="hover" className="px-10 py-3 bg-zinc-900 text-white font-light tracking-tighter uppercase rounded-full">
        <motion.div variants={{ initial: { letterSpacing: "-0.05em" }, hover: { letterSpacing: "0.4em" } }} transition={SPRING_CONFIG}>
            EXPAND
        </motion.div>
    </motion.button>
);

// 15. Liquid Rise
const LiquidRise = () => (
    <motion.button initial="initial" whileHover="hover" className="relative px-8 py-3 bg-blue-900 text-blue-200 font-bold rounded-lg overflow-hidden group">
        <div className="relative z-10 group-hover:text-white transition-colors duration-500">
            <SmoothSplitText text="LIQUID RISE" variants={{ initial: { y: 0 }, hover: { y: -2 } }} />
        </div>
        <motion.div variants={{ initial: { y: "100%" }, hover: { y: "0%" } }} transition={SPRING_CONFIG} className="absolute inset-0 bg-blue-500" />
    </motion.button>
);

// 16. Color Stagger
const ColorStagger = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-100 text-black font-black rounded-lg">
        <SmoothSplitText text="COLOR MORPH" variants={{ initial: { color: "#000" }, hover: { color: "#6366f1" } }} />
    </motion.button>
);

// 17. Rotation Cascade
const RotationCascade = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full">
        <SmoothSplitText text="CASCADE" variants={{ initial: { rotate: 0 }, hover: { rotate: 180 } }} />
    </motion.button>
);

// 18. Shine Stagger
const ShineStagger = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-900 text-zinc-500 font-bold rounded-lg">
        <SmoothSplitText text="SHINE LIGHT" variants={{ initial: { color: "#52525b" }, hover: { color: ["#52525b", "#ffffff", "#52525b"] } }} transition={{ duration: 1.5, repeat: Infinity }} />
    </motion.button>
);

// 19. Bounce Reveal
const BounceReveal = () => (
    <motion.button initial="initial" whileHover="hover" className="relative h-12 px-12 bg-pink-500 text-white font-black rounded-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
            <SmoothSplitText text="BOUNCY" variants={{ initial: { y: 40 }, hover: { y: 0 } }} transition={{ type: "spring", bounce: 0.6 }} />
        </div>
    </motion.button>
);

// 20. Hollow Trace
const HollowTrace = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 text-white font-black text-xl italic uppercase">
        <SmoothSplitText text="HOLLOW" variants={{ initial: { WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" } as any, hover: { WebkitTextStroke: "1px white", color: "white" } as any }} />
    </motion.button>
);

// 21. Magnetic Pulse
const MagneticPulse = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow-xl hover:shadow-indigo-500/20 transition-shadow">
        <SmoothSplitText text="PULSING" variants={{ initial: { scale: 1 }, hover: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 1 } } }} />
    </motion.button>
);

// 22. Wave Drift
const WaveDrift = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-800 text-cyan-400 font-bold rounded-lg">
        <SmoothSplitText text="WAVE DRIFT" variants={{ initial: { y: 0 }, hover: { y: [0, -5, 5, 0] } }} transition={{ repeat: Infinity, duration: 1.2 }} />
    </motion.button>
);

// 23. Flip Corners
const FlipCorners = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-900 text-white font-bold border-2 border-zinc-700 rounded-lg group">
        <SmoothSplitText text="CORNERS" variants={{ initial: { rotateY: 0 }, hover: { rotateY: 360 } }} transition={{ duration: 1 }} />
    </motion.button>
);

// 24. Drift & Fade
const DriftFade = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-100 text-zinc-900 font-bold rounded-md">
        <SmoothSplitText text="DRIFT FADE" variants={{ initial: { x: 0, opacity: 1 }, hover: { x: 20, opacity: 0 } }} />
        <div className="absolute inset-0 flex items-center justify-center">
            <SmoothSplitText text="DRIFT FADE" variants={{ initial: { x: -20, opacity: 0 }, hover: { x: 0, opacity: 1 } }} />
        </div>
    </motion.button>
);

// 25. Spiral In
const SpiralIn = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-indigo-500 text-white font-black rounded-full overflow-hidden">
        <SmoothSplitText text="SPIRAL" variants={{ initial: { rotate: -180, scale: 0, opacity: 0 }, hover: { rotate: 0, scale: 1, opacity: 1 } }} />
    </motion.button>
);

// 26. Glitch Smooth
const GlitchSmooth = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-900 text-white font-mono border border-white/20">
        <SmoothSplitText text="GLITCH" variants={{ initial: { x: 0 }, hover: { x: [0, -2, 2, 0], opacity: [1, 0.5, 1] } }} transition={{ repeat: Infinity, duration: 0.2 }} />
    </motion.button>
);

// 27. Arc Swing
const ArcSwing = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-white text-black font-bold rounded-xl">
        <SmoothSplitText text="ARC SWING" variants={{ initial: { rotate: 0, y: 0 }, hover: { rotate: 10, y: -5 } }} />
    </motion.button>
);

// 28. Scale Burst
const ScaleBurst = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-900 text-white font-black uppercase rounded">
        <SmoothSplitText text="BURST" variants={{ initial: { scale: 1 }, hover: { scale: 1.5, opacity: 0 } }} />
        <div className="absolute inset-0 flex items-center justify-center">
            <SmoothSplitText text="BURST" variants={{ initial: { scale: 0.5, opacity: 0 }, hover: { scale: 1, opacity: 1 } }} />
        </div>
    </motion.button>
);

// 29. Z-Axis Slide
const ZAxisSlide = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-800 text-white font-bold rounded-lg [perspective:500px]">
        <SmoothSplitText text="PUNCH IN" variants={{ initial: { z: 0 }, hover: { z: 100 } }} />
    </motion.button>
);

// 30. Rainbow Ripple
const RainbowRipple = () => (
    <motion.button initial="initial" whileHover="hover" className="px-8 py-3 bg-zinc-900 text-white font-black rounded-full">
        <SmoothSplitText text="RAINBOW" variants={{ initial: { color: "#fff" }, hover: { color: ["#ff0000", "#00ff00", "#0000ff", "#fff"] } }} transition={{ duration: 2, repeat: Infinity }} />
    </motion.button>
);

const SmallAnimation3 = () => {
    const [filter, setFilter] = useState('all');

    const components = [
        { id: 1, component: <FluidFlip />, title: "Fluid Flip", type: "clean" },
        { id: 2, component: <ElasticSlide />, title: "Elastic Slide", type: "clean" },
        { id: 3, component: <Swing3D />, title: "3D Swing", type: "creative" },
        { id: 4, component: <GhostHover />, title: "Ghost Drift", type: "minimal" },
        { id: 5, component: <BlurFlow />, title: "Blur Flow", type: "minimal" },
        { id: 6, component: <MagneticLetters />, title: "Magnetic", type: "creative" },
        { id: 7, component: <RevealUnderline />, title: "Reveal Line", type: "minimal" },
        { id: 8, component: <SquishStretch />, title: "Squish & Stretch", type: "creative" },
        { id: 9, component: <DiagonalDrift />, title: "Diagonal Drift", type: "clean" },
        { id: 10, component: <DepthPulse />, title: "Depth Pulse", type: "creative" },
        { id: 11, component: <StaggeredJump />, title: "Staggered Jump", type: "clean" },
        { id: 12, component: <CharShuffle />, title: "Decryption", type: "creative" },
        { id: 13, component: <SmoothSkew />, title: "Skew Flow", type: "clean" },
        { id: 14, component: <ExpandSpacing />, title: "Tracking Expand", type: "minimal" },
        { id: 15, component: <LiquidRise />, title: "Liquid Rise", type: "clean" },
        { id: 16, component: <ColorStagger />, title: "Color Morph", type: "minimal" },
        { id: 17, component: <RotationCascade />, title: "Rotation Cascade", type: "creative" },
        { id: 18, component: <ShineStagger />, title: "Shine Light", type: "minimal" },
        { id: 19, component: <BounceReveal />, title: "Bouncy Reveal", type: "creative" },
        { id: 20, component: <HollowTrace />, title: "Hollow Trace", type: "minimal" },
        { id: 21, component: <MagneticPulse />, title: "Magnetic Pulse", type: "clean" },
        { id: 22, component: <WaveDrift />, title: "Wave Drift", type: "creative" },
        { id: 23, component: <FlipCorners />, title: "Flip Corners", type: "clean" },
        { id: 24, component: <DriftFade />, title: "Drift & Fade", type: "minimal" },
        { id: 25, component: <SpiralIn />, title: "Spiral In", type: "creative" },
        { id: 26, component: <GlitchSmooth />, title: "Glitch Smooth", type: "creative" },
        { id: 27, component: <ArcSwing />, title: "Arc Swing", type: "clean" },
        { id: 28, component: <ScaleBurst />, title: "Scale Burst", type: "clean" },
        { id: 29, component: <ZAxisSlide />, title: "Punch In", type: "creative" },
        { id: 30, component: <RainbowRipple />, title: "Rainbow Ripple", type: "creative" },
    ];

    const filteredComponents = filter === 'all'
        ? components
        : components.filter(c => c.type === filter);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans selection:bg-indigo-500/30">
            <header className="max-w-7xl mx-auto mb-16 space-y-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-indigo-400 font-mono tracking-widest text-xs uppercase">
                    <div className="h-px w-8 bg-indigo-500" />
                    Ultra-Smooth Collection
                </motion.div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">FLUID</span> <br />
                        LIBRARY
                    </h1>

                    <div className="flex flex-wrap gap-2 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
                        {['all', 'minimal', 'clean', 'creative'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filter === f ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredComponents.map((item, idx) => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative group h-64 bg-zinc-900/20 border border-zinc-800/40 rounded-3xl flex flex-col items-center justify-center p-8 hover:border-zinc-700/60 hover:bg-zinc-900/40 transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-4 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="font-mono text-4xl">0{item.id}</span>
                            </div>

                            <div className="mb-4">
                                {item.component}
                            </div>

                            <div className="absolute bottom-6 left-0 w-full text-center">
                                <h3 className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em] group-hover:text-zinc-400 transition-colors">
                                    {item.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </main>

            <footer className="max-w-7xl mx-auto mt-24 py-12 border-t border-zinc-900 text-zinc-600 text-[10px] uppercase tracking-widest flex justify-between">
                <span>© 2025 High Performance UI</span>
                <span>Built with Framer Motion Spring Engine</span>
            </footer>
        </div>
    );
};

export default SmallAnimation3;