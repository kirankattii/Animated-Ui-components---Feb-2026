"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Truck, CreditCard } from 'lucide-react';

/**
 * TABS DATA: Focused on the three core services.
 */
const TABS = [
    {
        id: 'engage',
        label: 'Engage 360',
        title: 'Engage 360',
        description: 'Connect with your customers across all touchpoints. Segment users and send personalized messages with real-time tracking of ROI.',
        buttonText: 'Live Demo',
        visualizationBg: 'bg-emerald-50',
        icon: <MessageSquare className="w-4 h-4 text-emerald-600" />,
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 'shipping',
        label: 'Shipping',
        title: 'Shipping',
        description: 'Explore our detailed demo to see how our shipping services and solutions can streamline and elevate your logistics operations.',
        buttonText: 'Live Demo',
        visualizationBg: 'bg-amber-50',
        icon: <Truck className="w-4 h-4 text-amber-600" />,
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 'checkout',
        label: 'Checkout',
        title: 'Checkout',
        description: 'Elevate your customers\' shopping experience with our one-click checkout solution. Designed to reduce checkout time to under 40s.',
        buttonText: 'Live Demo',
        visualizationBg: 'bg-indigo-50',
        icon: <CreditCard className="w-4 h-4 text-[#6D5DE7]" />,
        image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800"
    }
];

export default function CardSlider() {
    const [activeTabIdx, setActiveTabIdx] = useState(1); // Default to Shipping (Center)
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const DRAG_THRESHOLD = 50;

    const setTab = (idx: number) => {
        if (idx >= 0 && idx < TABS.length) {
            setActiveTabIdx(idx);
        }
    };

    const handleDragEnd = (event: any, info: any) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -DRAG_THRESHOLD || velocity < -400) {
            setTab(activeTabIdx + 1);
        } else if (offset > DRAG_THRESHOLD || velocity > 400) {
            setTab(activeTabIdx - 1);
        }
    };

    /**
     * ZERO OVERLAP LOGIC:
     * To prevent overlap, the x-offset must be >= the card width.
     */
    const cardWidth = windowWidth < 768 ? windowWidth * 0.8 : 640;
    const getXOffset = (offset: number) => {
        return offset * (cardWidth + 40);
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-hidden bg-white select-none">

            {/* VIBRANT ANIMATED BACKGROUND GRADIENTS */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Slow moving primary blobs */}
                <motion.div
                    animate={{ x: [0, 150, -50, 0], y: [0, -100, 150, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" as const }}
                    className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-orange-200/40 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{ x: [0, -150, 100, 0], y: [0, 150, -100, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" as const }}
                    className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-blue-200/40 blur-[120px] rounded-full"
                />
                {/* Highlighting blob directly behind the cards */}
                <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[40%] bg-purple-100/30 blur-[100px] rounded-full"
                />
            </div>

            {/* COMPACT NAV CONTROLLER */}
            <div className="relative z-30 mb-12 md:mb-20">
                <div className="bg-white/90 backdrop-blur-xl p-1 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center">
                    {TABS.map((tab, idx) => (
                        <button
                            key={tab.id}
                            onClick={() => setTab(idx)}
                            className={`relative px-6 md:px-10 py-2.5 rounded-full text-xs md:text-[13px] font-bold transition-colors duration-300 z-10 ${activeTabIdx === idx ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                                }`}
                        >
                            {activeTabIdx === idx && (
                                <motion.div
                                    layoutId="activeTabPill"
                                    className="absolute inset-0 bg-[#121212] rounded-full -z-10 shadow-lg"
                                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                />
                            )}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* SLIDER CONTAINER */}
            <div className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
                <motion.div
                    className="relative w-full h-[500px] md:h-[420px] flex items-center justify-center"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {TABS.map((tab, idx) => {
                            const offset = idx - activeTabIdx;
                            const isCenter = offset === 0;

                            return (
                                <motion.div
                                    key={tab.id}
                                    initial={false}
                                    animate={{
                                        x: getXOffset(offset),
                                        // Vertical elevation: Center card is higher (y: -30) than side cards (y: 10)
                                        y: isCenter ? -25 : 15,
                                        scale: isCenter ? 1 : 0.88,
                                        zIndex: 10 - Math.abs(offset),
                                        rotateY: offset * 4,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 160, // Lower stiffness for smoother, more fluid motion
                                        damping: 26,    // Higher damping to prevent jitter
                                        mass: 0.8
                                    }}
                                    style={{ width: cardWidth }}
                                    className={`absolute h-full bg-white rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.07)] border border-slate-50 overflow-hidden flex flex-col md:flex-row transition-shadow duration-500 ${isCenter ? 'shadow-indigo-500/5' : ''}`}
                                >
                                    {/* COMPACT TEXT AREA */}
                                    <div className="flex-1 p-7 md:p-12 flex flex-col justify-center text-left">
                                        <div className="mb-5 scale-90 origin-left opacity-90">{tab.icon}</div>
                                        <h2 className="text-xl md:text-[26px] font-bold text-slate-900 mb-4 tracking-tight">
                                            {tab.title}
                                        </h2>
                                        <p className="text-slate-500 text-sm md:text-[15px] leading-relaxed mb-8 md:mb-10 max-w-[280px]">
                                            {tab.description}
                                        </p>
                                        <button className="w-fit bg-[#6D5DE7] hover:bg-[#5B4CC4] text-white px-8 py-3 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-lg shadow-indigo-500/10">
                                            {tab.buttonText}
                                        </button>
                                    </div>

                                    {/* COMPACT VISUALIZATION AREA */}
                                    <div className={`hidden md:flex flex-[1.2] relative overflow-hidden`}>
                                        <div className={`absolute inset-0 ${tab.visualizationBg} opacity-40`} />
                                        <div className="absolute inset-0 p-10 flex items-center justify-center">
                                            <motion.div
                                                animate={isCenter ? { y: [0, -8, 0] } : {}}
                                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" as const }}
                                                className="relative w-full h-[85%] rounded-[24px] bg-white shadow-xl border border-slate-100/50 overflow-hidden"
                                            >
                                                <img
                                                    src={tab.image}
                                                    alt={tab.title}
                                                    className="w-full h-full object-cover scale-110"
                                                />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Mobile Preview Area */}
                                    <div className="md:hidden h-[180px] w-full relative bg-slate-50">
                                        <img
                                            src={tab.image}
                                            alt={tab.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* COMPACT DOTS */}
            <div className="mt-16 flex items-center gap-3">
                {TABS.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setTab(i)}
                        className={`transition-all duration-500 rounded-full ${activeTabIdx === i ? 'w-10 h-2 bg-slate-900' : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
                            }`}
                    />
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .perspective-1000 {
          perspective: 1500px;
        }
      `}} />
        </div>
    );
}
