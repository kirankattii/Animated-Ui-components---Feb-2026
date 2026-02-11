"use client";
import React, { useRef } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from 'framer-motion';

/**
 * VelocityScroll Component
 * A reusable marquee that reacts to scroll velocity and direction.
 */
interface VelocityScrollProps {
    children: React.ReactNode;
    baseVelocity?: number;
    className?: string;
    containerClassName?: string;
}

const VelocityScroll = ({
    children,
    baseVelocity = 100,
    className = "",
    containerClassName = ""
}: VelocityScrollProps) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const wrap = (min: number, max: number, v: number) => {
        const rangeSize = max - min;
        return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    // Adjusted wrapping range for tighter text loops
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={`overflow-hidden whitespace-nowrap flex flex-nowrap ${containerClassName}`}>
            <motion.div className={`flex whitespace-nowrap flex-nowrap ${className}`} style={{ x }}>
                <span className="block mr-12">{children} </span>
                <span className="block mr-12">{children} </span>
                <span className="block mr-12">{children} </span>
                <span className="block mr-12">{children} </span>
            </motion.div>
        </div>
    );
};

export default function SmallAnimation3() {
    const items1 = ["PARALLAX", "SCROLL", "INTERACTIVE"];
    const items2 = ["TEXT ANIMATION", "SPLINE", "MOTION"];
    const items3 = ["SVG ANIMATION", "GSAP", "FRAMER"];

    const PurpleIcon = () => (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="inline-block mx-3 align-middle">
            <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="url(#grad1)" />
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
        </svg>
    );

    const OrangeIcon = () => (
        <div className="inline-grid grid-cols-2 gap-1 mx-3 align-middle">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-2.5 h-2.5 rounded-sm bg-gradient-to-br from-orange-400 to-rose-500" />
            ))}
        </div>
    );

    const GreenIcon = () => (
        <div className="inline-flex gap-1 mx-3 align-middle">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 opacity-80" />
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 -ml-3" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#faf8f1] flex flex-col justify-center items-center overflow-hidden py-10 font-sans selection:bg-purple-200">

            {/* Reduced space-y and adjusted scales/rotations. 
          Using rotate-6 and rotate-[-8] for a more aggressive angle.
      */}
            <div className="w-full space-y-4 md:space-y-8">

                {/* Row 1: PurpleStrip / Tilted Down */}
                <div className="relative z-10 -rotate-6 scale-105 md:scale-110 origin-center">
                    <VelocityScroll
                        baseVelocity={-1.2}
                        containerClassName="bg-[#d9d9ff] py-3 md:py-5 border-y-[3px] border-black shadow-lg"
                        className="text-2xl md:text-6xl font-black text-black tracking-tighter"
                    >
                        {items1.map((text, i) => (
                            <React.Fragment key={i}>
                                <PurpleIcon /> {text}
                            </React.Fragment>
                        ))}
                    </VelocityScroll>
                </div>

                {/* Row 2: CyanStrip / Tilted Up */}
                <div className="relative z-20 rotate-[8deg] scale-105 md:scale-110 origin-center translate-y-2">
                    <VelocityScroll
                        baseVelocity={1.5}
                        containerClassName="bg-[#b7e4e8] py-3 md:py-5 border-y-[3px] border-black shadow-lg"
                        className="text-2xl md:text-6xl font-black text-black tracking-tighter"
                    >
                        {items2.map((text, i) => (
                            <React.Fragment key={i}>
                                <OrangeIcon /> {text}
                            </React.Fragment>
                        ))}
                    </VelocityScroll>
                </div>

                {/* Row 3: PinkStrip / Tilted Down */}
                <div className="relative z-30 -rotate-[5deg] scale-105 md:scale-110 origin-center translate-y-4">
                    <VelocityScroll
                        baseVelocity={-1}
                        containerClassName="bg-[#ff8a8a] py-3 md:py-5 border-y-[3px] border-black shadow-lg"
                        className="text-2xl md:text-6xl font-black text-black tracking-tighter"
                    >
                        {items3.map((text, i) => (
                            <React.Fragment key={i}>
                                <GreenIcon /> {text}
                            </React.Fragment>
                        ))}
                    </VelocityScroll>
                </div>

            </div>

            <div className="fixed bottom-10 text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] pointer-events-none">
                Scroll Velocity Interaction Active
            </div>
        </div>
    );
}
