"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Reusable Phrase component
 * Displays text and an associated image in a pill-shaped container
 */
const Phrase = ({ src, text }: { src: string, text: string }) => {
    return (
        <div className="px-4 md:px-10 flex gap-4 md:gap-8 items-center shrink-0">
            <p className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-[0.85]">
                {text}
            </p>
            <div className="relative h-[8vw] md:h-[6vw] aspect-[16/9] md:aspect-[21/9] rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl">
                <img
                    className="w-full h-full object-cover"
                    src={src}
                    alt="Work showcase"
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x450?text=Work+Image";
                    }}
                />
            </div>
        </div>
    );
};

/**
 * Reusable Slide component
 * Handles the parallax logic based on scroll progress and direction
 */
const Slide = ({ src, direction, left, progress, text }: { src: string, direction: 'left' | 'right', left: string, progress: any, text: string }) => {
    const dirMultiplier = direction === 'left' ? -1 : 1;

    // Base movement range
    const baseTranslation = useTransform(progress, [0, 1], [400 * dirMultiplier, -400 * dirMultiplier]);

    // UseSpring adds a physics-based lag that feels great with Lenis smooth scroll
    const translateX = useSpring(baseTranslation, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            style={{ x: translateX, left }}
            className="relative flex whitespace-nowrap py-1 md:py-2"
        >
            <Phrase src={src} text={text} />
            <Phrase src={src} text={text} />
            <Phrase src={src} text={text} />
        </motion.div>
    );
};

export default function ScrollAnimation8() {
    const containerRef = useRef(null);

    // Initialize Lenis Smooth Scroll via CDN script to avoid resolution errors
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

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const slides = [
        {
            id: 1,
            text: "Creative Design",
            src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
            direction: "left" as const,
            left: "-10%"
        },
        {
            id: 2,
            text: "Modern Coding",
            src: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
            direction: "right" as const,
            left: "-35%"
        },
        {
            id: 3,
            text: "Fast Performance",
            src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
            direction: "left" as const,
            left: "-15%"
        }
    ];

    return (
        <main className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans selection:bg-indigo-500 selection:text-white">
            {/* Intro section */}
            <section className="h-[100vh] flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
                        SCROLL <br /> <span className="text-indigo-600">DOWN</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium tracking-wide uppercase">
                        Smooth Scroll + Parallax
                    </p>
                </motion.div>
            </section>

            {/* Parallax Slider Container */}
            <div ref={containerRef} className="relative py-20 md:py-40 overflow-hidden">
                <div className="flex flex-col gap-1 md:gap-2">
                    {slides.map((slide) => (
                        <Slide
                            key={slide.id}
                            src={slide.src}
                            direction={slide.direction}
                            left={slide.left}
                            progress={scrollYProgress}
                            text={slide.text}
                        />
                    ))}
                </div>
            </div>

            {/* Outro section */}
            <section className="h-[100vh] flex items-center justify-center bg-slate-900 text-white px-6">
                <div className="max-w-4xl text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-8xl font-black mb-8 italic text-indigo-400"
                    >
                        THE END.
                    </motion.h2>
                    <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
                        This experience combines inertia-based smooth scrolling with high-performance Framer Motion transformations.
                    </p>
                </div>
            </section>
        </main>
    );
}
