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
}

const PerspectiveSection: React.FC<SectionProps> = ({
    title,
    image,
    color,
    progress,
    range,
    targetScale,
    index
}) => {
    // Animation transformations based on the specific scroll range of this section
    const scale = useTransform(progress, range, [1, targetScale]);
    const rotate = useTransform(progress, range, [0, -5]);

    return (
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <motion.div
                style={{
                    scale,
                    rotate,
                    backgroundColor: color,
                    top: `calc(-10% + ${index * 25}px)` // Slight offset for stacked look
                }}
                className="relative h-[80vh] w-[90vw] rounded-3xl origin-top p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden"
            >
                <div className="flex-1 text-white space-y-4 z-10">
                    <h2 className="text-[8vw] md:text-[5vw] font-bold leading-none uppercase">
                        {title}
                    </h2>
                    <p className="text-sm md:text-lg opacity-80 max-w-md">
                        Experience smooth perspective transitions using Framer Motion and Lenis scroll.
                    </p>
                </div>

                <div className="relative w-full md:w-[40%] h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden mt-8 md:mt-0 shadow-xl">
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
export default function ScrollAnimation9() {
    const container = useRef<HTMLDivElement>(null);

    // 1. Initialize Lenis for Smooth Scrolling via CDN to avoid resolution errors
    useEffect(() => {
        const script = document.createElement('script');
        // Using the official browser bundle from JSDelivr which puts Lenis on window.Lenis
        script.src = "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js";
        script.async = true;

        script.onload = () => {
            // Use the global Lenis constructor attached to the window
            // @ts-ignore
            const LenisConstructor = window.Lenis || (window.default && window.default.Lenis);

            if (!LenisConstructor) {
                console.error("Lenis failed to load correctly from CDN.");
                return;
            }

            const lenis = new LenisConstructor({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
            });

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            return () => {
                lenis.destroy();
            };
        };

        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
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
        { title: "Interact", color: "#8E26C7", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000" },
    ];

    return (
        <main ref={container} className="relative bg-[#0f0f0f] min-h-screen">
            {/* Intro Space */}
            <section className="h-[60vh] flex flex-col items-center justify-center text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tighter">Perspective Stacks</h1>
                <p className="text-xl uppercase tracking-widest opacity-50">Scroll to Explore</p>
            </section>

            {/* Animated Sections */}
            <div className="relative">
                {sections.map((section, i) => {
                    // Calculate the range for each section
                    const start = i * (1 / sections.length);
                    const end = (i + 1) * (1 / sections.length);

                    // Determine target scale for the "stacking" effect
                    const isLast = i === sections.length - 1;
                    const targetScale = isLast ? 1 : 0.85 + (i * 0.02);

                    return (
                        <PerspectiveSection
                            key={i}
                            index={i}
                            {...section}
                            progress={scrollYProgress}
                            range={[start, end]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>

            {/* Outro Space */}
            <section className="h-screen bg-[#0f0f0f] flex items-center justify-center">
                <h2 className="text-white text-3xl opacity-20 uppercase tracking-[1em]">The End</h2>
            </section>
        </main>
    );
}
