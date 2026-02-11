import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

/**
 * Reusable Smooth Scroll Reveal Component
 * Uses Framer Motion's useSpring for a buttery smooth transition
 * similar to high-end creative portfolios.
 */

interface LetterProps {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
}

const Letter: React.FC<LetterProps> = ({ children, progress, range }) => {
    // Map scroll progress range to opacity
    // We use a slightly wider range for letters to avoid "flickering" 
    const opacity = useTransform(progress, range, [0.2, 1]);

    return (
        <motion.span style={{ opacity }} className="inline-block">
            {children}
        </motion.span>
    );
};

interface WordProps {
    children: string;
    progress: MotionValue<number>;
    range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
    const letters = children.split("");
    const amount = range[1] - range[0];
    const step = amount / letters.length;

    return (
        <span className="mr-[1.5vw] flex flex-nowrap">
            {letters.map((char, i) => {
                const start = range[0] + (i * step);
                const end = range[0] + ((i + 1) * step);
                return (
                    <Letter
                        key={`${char}-${i}`}
                        progress={progress}
                        range={[start, end]}
                    >
                        {char}
                    </Letter>
                );
            })}
        </span>
    );
};

interface ScrollRevealTextProps {
    value: string;
    className?: string;
}

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ value, className = "" }) => {
    const container = useRef<HTMLDivElement>(null);

    // Track scroll progress
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start 0.2"]
    });

    // Apply spring physics to the scroll progress for smoothness
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 20,
        stiffness: 100,
        restDelta: 0.001
    });

    const words = useMemo(() => value.split(" "), [value]);

    return (
        <div
            ref={container}
            className={`flex flex-wrap text-[3.5vw] font-bold leading-[1.2] ${className}`}
        >
            {words.map((word, i) => {
                const start = i / words.length;
                const end = (i + 1) / words.length;
                return (
                    <Word
                        key={`${word}-${i}`}
                        progress={smoothProgress}
                        range={[start, end]}
                    >
                        {word}
                    </Word>
                );
            })}
        </div>
    );
};

// --- Main Application Wrapper (Matches user's layout intent) ---

export default function ScrollAnimation2() {
    const phrase = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.";

    return (
        <div className="bg-black text-[#d3d3d3] selection:bg-white selection:text-black font-sans min-h-screen">
            {/* Scrollable container setup to replicate the original layout */}
            <section className="h-[100vh] flex items-center justify-center">
                <p className="text-gray-500 animate-pulse uppercase tracking-[0.2em] text-sm">Scroll down slowly</p>
            </section>

            {/* Main Animation Section: Aligned to bottom like the original */}
            <main className="min-h-screen flex items-end justify-center pb-[20vh]">
                <div className="w-[90%] max-w-[1400px]">
                    <ScrollRevealText value={phrase} />
                </div>
            </main>

            {/* Padding at the bottom to ensure user can scroll past the text */}
            <section className="h-[100vh]" />
        </div>
    );
}
