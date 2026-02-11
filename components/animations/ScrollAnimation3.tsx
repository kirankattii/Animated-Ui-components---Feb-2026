"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    ChevronDown,
    Instagram,
    Youtube,
    Music,
    ArrowRight
} from 'lucide-react';

// --- Assets & Icons ---
const SpotifyIcon = () => (
    <div className="w-12 h-12 bg-[#1DB954] rounded-xl flex items-center justify-center text-white shadow-lg">
        <Music size={28} fill="currentColor" />
    </div>
);

const DuolingoIcon = () => (
    <div className="w-12 h-12 bg-[#58CC02] rounded-xl flex items-center justify-center shadow-lg">
        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <div className="w-4 h-4 bg-orange-400 rounded-full" />
        </div>
    </div>
);

const CustomArrow = () => (
    <span className="text-pink-500 font-bold mr-3 text-2xl flex-shrink-0">→</span>
);

// --- Reusable Components ---
const SectionTag = ({ text }: { text: string }) => (
    <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-8">
        {text}
    </div>
);

interface ListItemProps {
    children: React.ReactNode;
}

const ListItem = ({ children }: ListItemProps) => (
    <motion.li
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center text-lg md:text-xl font-bold leading-tight mb-4"
    >
        <CustomArrow />
        <span className="text-black/90">{children}</span>
    </motion.li>
);

interface AccordionItemProps {
    title: string;
    isOpen: boolean;
    onClick: () => void;
}

const AccordionItem = ({ title, isOpen, onClick }: AccordionItemProps) => (
    <div className="border-b border-black/10">
        <button
            onClick={onClick}
            className="w-full py-8 flex justify-between items-center text-left hover:opacity-70 transition-opacity group"
        >
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase">{title}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                <ChevronDown size={28} />
            </motion.div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="pb-8 text-lg text-black/50 font-medium">
                        Master the core principles of professional motion design through project-based learning.
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function ScrollAnimation3() {
    const [openAccordion, setOpenAccordion] = useState(0);

    const float = (delay = 0) => ({
        y: [0, -20, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay }
    });

    return (
        <div className="bg-[#FAF9F6] text-[#111] font-sans selection:bg-pink-200">

            {/* Section 01: Emotional Design */}
            <section className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-between px-8 py-20 lg:p-24 sticky top-0 bg-[#FAF9F6] z-10">
                <div className="max-w-3xl z-20">
                    <SectionTag text="Emotional Design" />
                    <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.85] tracking-tighter mb-10">
                        Build Animations <br /> Businesses Pay For
                    </h1>
                    <p className="text-xl md:text-2xl text-black/70 mb-8 max-w-xl font-medium">
                        From silky-smooth scroll effects to dopamine-triggering micro-interactions, you'll master the tools and strategy real companies use.
                    </p>
                    <p className="text-xl font-bold mb-10">
                        It's called <span className="text-pink-500 border-b-4 border-pink-500 pb-1">emotional design.</span>
                    </p>
                    <ul className="space-y-2">
                        <ListItem>Go beyond code and learn how to use animation to:</ListItem>
                        <ListItem>Build trust like Stripe</ListItem>
                        <ListItem>Retain users like Duolingo</ListItem>
                    </ul>
                </div>

                <div className="relative w-full lg:w-1/2 h-[500px] mt-12 lg:mt-0 flex items-center justify-center">
                    <motion.div animate={float(0)} className="absolute top-10 right-10 z-30">
                        <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-2xl">
                            <Instagram size={32} />
                        </div>
                    </motion.div>
                    <motion.div animate={float(0.5)} className="absolute bottom-20 left-10 z-30">
                        <SpotifyIcon />
                    </motion.div>
                    <motion.div
                        className="relative z-20 w-64 h-80 bg-[#FF4B33] rounded-[2.5rem] shadow-2xl flex items-center justify-center overflow-hidden"
                    >
                        <Youtube size={80} color="white" fill="white" />
                    </motion.div>
                    <motion.div animate={float(0.2)} className="absolute bottom-10 right-20 z-30">
                        <DuolingoIcon />
                    </motion.div>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-black text-black/[0.04] leading-none pointer-events-none select-none">01</span>
                </div>
            </section>

            {/* Section 02: Capstone Project (Pink) */}
            <section className="sticky top-0 z-20">
                <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-between px-8 py-20 lg:p-24 bg-[#FF99E2]">
                    <div className="max-w-2xl z-20">
                        <SectionTag text="Capstone Project" />
                        <h2 className="text-6xl md:text-8xl lg:text-[100px] font-black leading-[0.85] tracking-tighter mb-10">
                            Build the GTA VI <br /> Landing Page
                        </h2>
                        <p className="text-xl md:text-2xl text-black/80 mb-10 font-medium">
                            You'll rebuild the GTA VI landing page and learn how to:
                        </p>
                        <ul className="space-y-2">
                            <ListItem>Design motion that tells a story</ListItem>
                            <ListItem>Build interactive sections that feel like a premium product</ListItem>
                            <ListItem>Scroll-controlled video transitions</ListItem>
                            <ListItem>Layered animations and parallax effects</ListItem>
                        </ul>
                    </div>
                    <div className="relative w-full lg:w-1/2 aspect-video mt-12 lg:mt-0 rounded-3xl overflow-hidden shadow-2xl bg-black border-[10px] border-black">
                        <div className="absolute inset-0 bg-[url('https://media.rockstargames.com/rockstargames-new/img/global/news/7a7315a/7a7315a.jpg')] bg-cover bg-center opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                <Play fill="white" color="white" size={32} />
                            </div>
                        </div>
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-black text-white/10 leading-none pointer-events-none select-none">02</span>
                    </div>
                </div>
            </section>

            {/* Section 03: Animation Projects (Green) */}
            <section className="sticky top-0 z-30">
                <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-between px-8 py-20 lg:p-24 bg-[#4ADE80]">
                    <div className="max-w-2xl z-20">
                        <SectionTag text="Animation Projects" />
                        <h2 className="text-6xl md:text-8xl lg:text-[100px] font-black leading-[0.85] tracking-tighter mb-10">
                            Real Projects, <br /> Real Animations
                        </h2>
                        <p className="text-xl md:text-2xl text-black/80 mb-10 font-medium">
                            Forget abstract demos. You'll build real-world UI animations you've actually seen (and admired).
                        </p>
                        <ul className="space-y-2">
                            <ListItem>MacOS-style animated dock</ListItem>
                            <ListItem>Dynamic sidebar navigation</ListItem>
                            <ListItem>Bento grid reveals</ListItem>
                        </ul>
                    </div>
                    <div className="relative w-full lg:w-1/3 aspect-[4/5] bg-white/30 backdrop-blur-xl rounded-[3rem] p-6 shadow-2xl flex flex-col">
                        <div className="w-full h-full bg-[#FAF9F6] rounded-[2rem] p-8 flex flex-col justify-center gap-4">
                            <div className="w-full h-12 bg-black/5 rounded-xl" />
                            <div className="w-3/4 h-12 bg-black/5 rounded-xl" />
                            <div className="w-full h-12 bg-black/5 rounded-xl" />
                        </div>
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-black text-black/5 leading-none pointer-events-none select-none">03</span>
                    </div>
                </div>
            </section>

            {/* Section 04: Custom Components (Blue) */}
            <section className="sticky top-0 z-40">
                <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-between px-8 py-20 lg:p-24 bg-[#3B82F6] text-white">
                    <div className="max-w-2xl z-20">
                        <SectionTag text="Custom Components" />
                        <h2 className="text-6xl md:text-8xl lg:text-[100px] font-black leading-[0.85] tracking-tighter mb-10">
                            Learn by Doing. <br /> Experiment in <br /> Real Time.
                        </h2>
                        <p className="text-xl md:text-2xl text-white/80 mb-10 font-medium">
                            Inside each lesson, you'll find more than just videos. You'll get hands-on interaction with live components.
                        </p>
                        <ul className="space-y-2">
                            <ListItem><span className="text-white">Built-in interactive playgrounds</span></ListItem>
                            <ListItem><span className="text-white">Visual easing demos + live sliders</span></ListItem>
                            <ListItem><span className="text-white">Edit GSAP animations and see results</span></ListItem>
                            <ListItem><span className="text-white">Reinforce each concept through repetition</span></ListItem>
                        </ul>
                    </div>

                    <div className="relative w-full lg:w-1/2 aspect-video bg-[#111] rounded-3xl p-8 shadow-2xl border border-white/10">
                        <div className="flex gap-2 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="font-mono text-sm space-y-2">
                            <div className="text-pink-400">gsap.fromTo(".ball", &#123;</div>
                            <div className="pl-6 text-blue-300">opacity: 0, y: 200</div>
                            <div className="text-pink-400">&#125;, &#123;</div>
                            <div className="pl-6 text-blue-300">duration: 1.2, ease: "power4.out"</div>
                            <div className="text-pink-400">&#125;);</div>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-2">
                            {['power1.in', 'power1.out', 'power3.in', 'power3.out'].map(e => (
                                <button key={e} className="px-4 py-2 bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-white/20">{e}</button>
                            ))}
                        </div>
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-black text-white/5 leading-none pointer-events-none select-none">04</span>
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section className="relative min-h-screen w-full px-8 py-24 lg:p-32 bg-[#FAF9F6] z-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-[0.85]">
                        Your Learning <br /> Roadmap
                    </h2>
                    <p className="text-xl md:text-2xl text-black/50 font-bold mb-16 max-w-2xl">
                        This isn't a list of tutorials. It's a progressive animation system designed to take you from zero to Awwwards-level motion.
                    </p>

                    <div className="border-t border-black/10">
                        {[
                            "Welcome to the Ultimate GSAP Course",
                            "How to get the most out of this course",
                            "Getting Started with GSAP",
                            "Advanced Scroll Interactions",
                            "The GTA VI Capstone"
                        ].map((title, idx) => (
                            <AccordionItem
                                key={idx}
                                title={title}
                                isOpen={openAccordion === idx}
                                onClick={() => setOpenAccordion(openAccordion === idx ? -1 : idx)}
                            />
                        ))}
                    </div>

                    <div className="mt-20 flex justify-center">
                        <button className="px-12 py-6 bg-black text-white rounded-full text-xl font-black hover:scale-105 transition-transform flex items-center gap-4">
                            Enroll Now <ArrowRight />
                        </button>
                    </div>
                </div>
            </section>

            <footer className="p-8 text-center text-black/20 font-black tracking-widest uppercase text-xs z-50 relative bg-[#FAF9F6]">
                &copy; 2026 ANIMATION SYSTEM &bull; NO DEMOS, ONLY RESULTS
            </footer>
        </div>
    );
}
