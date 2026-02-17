import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

/**
 * PROJECT DATA
 * Using high-quality Unsplash placeholders for a professional look.
 */
const PROJECTS = [
    {
        name: "Dyal Thak",
        handle: "dyal_thak",
        bg: "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=1200",
        vignette: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&q=80&w=600"
    },
    {
        name: "Leidinger Matthias",
        handle: "leidinger_matthias",
        bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
        vignette: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600"
    },
    {
        name: "Mark Rammers",
        handle: "mark_rammers",
        bg: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200",
        vignette: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600"
    },
    {
        name: "Landon Speers",
        handle: "landon_speers",
        bg: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=1200",
        vignette: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600"
    }
];

/**
 * REUSABLE GALLERY ITEM COMPONENT
 * Each section has its own clip-path "window".
 */
const GalleryItem = ({ project, mousePosition, isMobile }: { project: any, mousePosition: any, isMobile: boolean }) => {
    const { x, y } = mousePosition;

    return (
        <section
            className="relative h-[120vh] w-full overflow-hidden bg-zinc-950"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        >
            {/* Background Image Layer */}
            <div className="relative h-full w-full">
                <img
                    src={project.bg}
                    alt={project.name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Floating Vignette Layer - Hidden on mobile to ensure usability */}
            {!isMobile && (
                <motion.div
                    className="fixed top-0 left-0 z-10 pointer-events-none overflow-hidden rounded-[1.5vw] shadow-2xl border border-white/10"
                    style={{
                        x,
                        y,
                        width: '25vw',
                        height: '30vw',
                    }}
                >
                    <img
                        src={project.vignette}
                        alt="vignette"
                        className="h-full w-full object-cover scale-110"
                    />
                </motion.div>
            )}
        </section>
    );
};

/**
 * REUSABLE DESCRIPTION COMPONENT
 * Interactive list that swaps the floating image based on hover.
 */
const DescriptionSection = ({ projects, mousePosition, isMobile }: { projects: any[], mousePosition: any, isMobile: boolean }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const { x, y } = mousePosition;

    return (
        <section
            className="relative h-[120vh] w-full flex flex-col items-center justify-center bg-zinc-900 overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        >
            <div className="z-20 flex flex-col items-center gap-4 px-4 text-center">
                {projects.map((project, i) => (
                    <p
                        key={i}
                        onMouseEnter={() => setActiveIndex(i)}
                        className="text-[10vw] md:text-[7vw] uppercase font-black leading-[0.9] cursor-default text-white/20 transition-colors duration-300 hover:text-white"
                    >
                        {project.name}
                    </p>
                ))}
            </div>

            {!isMobile && (
                <motion.div
                    className="fixed top-0 left-0 z-10 pointer-events-none overflow-hidden rounded-[1.5vw] shadow-2xl border border-white/10"
                    style={{
                        x,
                        y,
                        width: '25vw',
                        height: '30vw',
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeIndex}
                            src={projects[activeIndex].vignette}
                            initial={{ opacity: 0, scale: 1.2 }}
                            animate={{ opacity: 1, scale: 1.1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            alt="description-vignette"
                            className="h-full w-full object-cover"
                        />
                    </AnimatePresence>
                </motion.div>
            )}
        </section>
    );
};

/**
 * MAIN APP COMPONENT
 * Manages spring-based mouse tracking and fallback smooth behavior.
 */
export default function SplitGalleryScrollAnimation() {
    const [isMobile, setIsMobile] = useState(false);

    // Spring settings for the smooth follow effect
    const spring = {
        stiffness: 150,
        damping: 15,
        mass: 0.1
    };

    const mouseX = useSpring(0, spring);
    const mouseY = useSpring(0, spring);

    useEffect(() => {
        // Detect mobile/touch device
        const checkMobile = () => {
            setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Update mouse springs on move
    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile) return;

        const { clientX, clientY } = e;
        // Offset targets so the cursor is centered in the 25vw x 30vw vignette
        const targetX = clientX - (window.innerWidth * 0.125);
        const targetY = clientY - (window.innerWidth * 0.15);

        mouseX.set(targetX);
        mouseY.set(targetY);
    };

    const mousePosition = { x: mouseX, y: mouseY };

    return (
        <main
            onMouseMove={handleMouseMove}
            className="bg-zinc-950 text-white selection:bg-white selection:text-black overflow-x-hidden scroll-smooth"
        >
            {/* Hero Header */}
            <div className="h-screen flex items-center justify-center flex-col p-10 text-center relative z-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-8xl font-serif mb-6 tracking-tight"
                >
                    Split Perspective
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-md text-sm md:text-base"
                >
                    {isMobile
                        ? "Scroll to reveal the gallery."
                        : "Scroll to explore. Move your mouse to reveal the hidden vignettes."
                    }
                </motion.p>
                <div className="mt-20 animate-bounce opacity-20">↓</div>
            </div>

            {/* Gallery Sections */}
            {PROJECTS.map((project, i) => (
                <GalleryItem
                    key={i}
                    project={project}
                    mousePosition={mousePosition}
                    isMobile={isMobile}
                />
            ))}

            {/* List/Description Section */}
            <DescriptionSection
                projects={PROJECTS}
                mousePosition={mousePosition}
                isMobile={isMobile}
            />

            {/* Minimal Footer */}
            <footer className="h-[60vh] flex items-center justify-center px-10 text-center">
                <div className="opacity-20 flex flex-col gap-2">
                    <p className="text-sm font-mono uppercase tracking-widest">End of Series</p>
                    <p className="italic">Exploring the intersection of motion and focus.</p>
                </div>
            </footer>
        </main>
    );
}
