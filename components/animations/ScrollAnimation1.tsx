import React from 'react';
import { motion } from 'framer-motion';

/**
 * A reusable Text Mask component that reveals lines of text 
 * as they enter the viewport.
 * * @param {string[]} phrases - Array of strings to be displayed as masked lines.
 * @param {string} className - Optional additional classes for the container.
 * @param {number} delay - Base delay for the animation start.
 */
const MaskText = ({
    phrases = [],
    className = "",
    delay = 0
}: {
    phrases: string[],
    className?: string,
    delay?: number
}) => {
    // Animation variants for the text lines
    const animation = {
        initial: { y: "100%" },
        enter: (i: number) => ({
            y: "0",
            transition: {
                duration: 0.75,
                ease: [0.33, 1, 0.68, 1] as const,
                delay: delay + (i * 0.075)
            }
        })
    };

    return (
        <div className={`flex flex-col text-[5vw] leading-tight ${className}`}>
            {phrases.map((phrase, index) => (
                <div key={index} className="overflow-hidden">
                    <motion.p
                        custom={index}
                        variants={animation}
                        initial="initial"
                        whileInView="enter"
                        viewport={{ once: true }}
                        className="m-0 font-bold"
                    >
                        {phrase}
                    </motion.p>
                </div>
            ))}
        </div>
    );
};

export default function ScrollAnimation1() {
    const defaultPhrases = [
        "It is a long established fact",
        "that a reader will be distracted",
        "by the readable content of a page",
        "when looking at its layout."
    ];

    const secondaryPhrases = [
        "Design is not just what it",
        "looks like and feels like.",
        "Design is how it works.",
        "— Steve Jobs"
    ];

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-black selection:text-white">
            {/* Container with spacing as requested */}
            <div className="flex flex-col items-center py-[30vh] gap-[30vh]">

                {/* Component Instances */}
                <section className="w-full px-10">
                    <span className="text-xs uppercase tracking-widest text-neutral-400 mb-4 block">Section 01</span>
                    <MaskText phrases={defaultPhrases} />
                </section>

                <section className="w-full px-10 flex justify-end">
                    <div className="text-right">
                        <span className="text-xs uppercase tracking-widest text-neutral-400 mb-4 block">Section 02</span>
                        <MaskText phrases={secondaryPhrases} />
                    </div>
                </section>

                <section className="w-full px-10">
                    <span className="text-xs uppercase tracking-widest text-neutral-400 mb-4 block">Section 03</span>
                    <MaskText
                        phrases={[
                            "The goal of a designer",
                            "is to listen, observe,",
                            "understand, sympathize,",
                            "empathize, synthesize,",
                            "and glean insights."
                        ]}
                    />
                </section>

                <section className="w-full px-10 flex flex-col items-center">
                    <span className="text-xs uppercase tracking-widest text-neutral-400 mb-4 block text-center">Section 04</span>
                    <MaskText
                        className="text-center"
                        phrases={[
                            "Beautiful code,",
                            "Seamless motion,",
                            "Functional design."
                        ]}
                    />
                </section>

                <footer className="h-[20vh] flex items-center justify-center text-neutral-400 text-sm">
                    Scroll back up to see the reveal again (one-time animation).
                </footer>
            </div>
        </div>
    );
}
