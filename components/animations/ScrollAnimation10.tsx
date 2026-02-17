"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// --- Reusable Section Component ---
interface SectionProps {
    title: string;
    image: string;
    color: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    index: number;
    isLast: boolean;
}

const PerspectiveSection: React.FC<SectionProps> = ({
    title,
    image,
    color,
    progress,
    range,
    targetScale,
    index,
    isLast
}) => {
    // We only transform scale and rotation if it's NOT the last section.
    // This ensures the last section stays "straight" and feels like a normal scroll entry.
    const scale = useTransform(progress, range, [1, targetScale]);
    const rotate = useTransform(progress, range, [0, isLast ? 0 : -5]);

    return (
        <div className={`sticky top-0 h-screen flex items-center justify-center overflow-hidden`}>
            <motion.div
                style={{
                    scale: isLast ? 1 : scale,
                    rotate: isLast ? 0 : rotate,
                    backgroundColor: color,
                    top: `calc(0% + ${index * 20}px)`
                }}
                className="relative h-screen w-full origin-top p-10 md:p-20 flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden"
            >
                <div className="flex-1 text-white space-y-4 z-10">
                    <h2 className="text-[10vw] md:text-[8vw] font-bold leading-none uppercase tracking-tighter">
                        {title}
                    </h2>
                    <p className="text-base md:text-xl opacity-80 max-w-xl">
                        {isLast
                            ? "The final chapter. This section remains grounded and straight, transitioning seamlessly into the rest of the page layout."
                            : "Experience smooth perspective transitions using Framer Motion and Lenis scroll, utilizing the full width of your display."}
                    </p>
                </div>

                <div className="relative w-full md:w-[50%] h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden mt-8 md:mt-0 shadow-2xl border border-white/10">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            </motion.div>
        </div>
    );
};

// --- Main Page Component ---
export default function ScrollAnimation10() {
    const container = useRef<HTMLDivElement>(null);
    const [lenisLoaded, setLenisLoaded] = useState(false);

    // 1. Initialize Lenis for Smooth Scrolling via CDN
    useEffect(() => {
        let lenisInstance: any;

        const initLenis = async () => {
            try {
                const LenisModule = await import("https://cdn.jsdelivr.net/npm/lenis@1.1.18/+esm");
                const Lenis = LenisModule.default;

                lenisInstance = new Lenis();

                function raf(time: number) {
                    lenisInstance.raf(time);
                    requestAnimationFrame(raf);
                }

                requestAnimationFrame(raf);
                setLenisLoaded(true);
            } catch (error) {
                console.error("Failed to load Lenis:", error);
            }
        };

        initLenis();

        return () => {
            if (lenisInstance) lenisInstance.destroy();
        };
    }, []);

    // 2. Track Scroll Progress
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    const sections = [
        { title: "Design", color: "#C72626", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000" },
        { title: "Motion", color: "#2646C7", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000" },
        { title: "Layout", color: "#26C765", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000" },
        { title: "Static", color: "#8E26C7", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000" },
    ];

    return (
        <main ref={container} className="relative bg-[#0f0f0f] min-h-screen">
            {/* Intro Space */}
            <section className="h-[70vh] flex flex-col items-center justify-center text-white text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-[12vw] font-bold mb-4 uppercase tracking-tighter leading-[0.8]"
                >
                    Perspective
                </motion.h1>
                <p className="text-xl md:text-2xl uppercase tracking-[0.3em] opacity-50">Smooth Transitions</p>
            </section>

            {/* Animated Sections */}
            <div className="relative">
                {sections.map((section, i) => {
                    const start = i * (1 / sections.length);
                    const end = (i + 1) * (1 / sections.length);

                    const isLast = i === sections.length - 1;
                    // Only the sections BEFORE the last one scale down
                    const targetScale = isLast ? 1 : 0.8 + (i * 0.04);

                    return (
                        <PerspectiveSection
                            key={i}
                            index={i}
                            {...section}
                            isLast={isLast}
                            progress={scrollYProgress}
                            range={[start, end]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>

            {/* Outro Space - Standard Vertical Scroll Content */}
            <section className="relative z-50 bg-white min-h-screen py-20 px-10">
                <div className="max-w-4xl mx-auto space-y-10">
                    <h2 className="text-5xl md:text-7xl font-bold text-black uppercase tracking-tighter">Normal Scroll Starts Here</h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        The perspective effect has ended. This section follows a standard document flow.
                        You can continue adding your footer, contact forms, or additional content here
                        without the sticky perspective constraints.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="h-64 bg-gray-100 rounded-xl" />
                        <div className="h-64 bg-gray-100 rounded-xl" />
                        <div className="h-64 bg-gray-100 rounded-xl" />
                        <div className="h-64 bg-gray-100 rounded-xl" />
                    </div>
                </div>
            </section>
        </main>
    );
}
