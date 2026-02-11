import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Check,
    TrendingUp,
    Zap,
    Briefcase,
    Smartphone,
    CheckCircle2,
    Globe,
    MessageSquare,
    BarChart3,
    Box,
    Truck,
    ShieldCheck,
    CreditCard
} from 'lucide-react';

const AUTO_PLAY_DURATION = 5000; // 5 seconds per slide

const SLIDES = [
    {
        id: 1,
        type: "shipping",
        title: "Redefining Domestic Shipping—Seamless in Every Way",
        subtitle: "Go big with growth, we'll handle nationwide shipping—anywhere, anytime.",
        buttonText: "Sign Up for Free",
    },
    {
        id: 2,
        type: "financial",
        title: "Financial Solutions, Driving your Goals",
        subtitle: "Explore Capital and Credit Score with instant approvals for entrepreneurs.",
        buttonText: "Get Funded Now",
    },
    {
        id: 3,
        type: "international",
        title: "Take Your Brand Global with Ease",
        subtitle: "Deliver to 220+ countries with simplified customs and real-time tracking.",
        buttonText: "Start Shipping Global",
    },
    {
        id: 4,
        type: "marketing",
        title: "Automate Growth with WhatsApp Marketing",
        subtitle: "Engage customers 24/7 and recover abandoned carts automatically with AI.",
        buttonText: "Explore Engage 360",
    },
    {
        id: 5,
        type: "warehouse",
        title: "Smart Warehousing & Next-Day Delivery",
        subtitle: "Store inventory closer to your customers for lightning-fast fulfillment.",
        buttonText: "Check Warehouse Rates",
    }
];

const Hero2 = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const startTime = useRef(Date.now());
    const requestRef = useRef<number | null>(null);

    // Function to move to next slide
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        setProgress(0);
        startTime.current = Date.now();
    }, []);

    // Function to move to previous slide
    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
        setProgress(0);
        startTime.current = Date.now();
    }, []);

    // High-frequency animation loop for smooth progress bar
    const animate = useCallback(() => {
        if (isAutoPlaying) {
            const elapsed = Date.now() - startTime.current;
            const newProgress = Math.min((elapsed / AUTO_PLAY_DURATION) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                nextSlide();
            }
        }
        requestRef.current = requestAnimationFrame(animate);
    }, [isAutoPlaying, nextSlide]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current as number);
    }, [animate]);

    const handleManualNav = (direction: 'next' | 'prev') => {
        setIsAutoPlaying(false);
        if (direction === 'next') nextSlide();
        else prevSlide();
    };

    const jumpToSlide = (idx: number) => {
        setIsAutoPlaying(false);
        setCurrentSlide(idx);
        setProgress(0);
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#FBFBFB] font-sans flex flex-col selection:bg-indigo-100">

            {/* --- BACKGROUND BLOOMS --- */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] bg-indigo-100/50 rounded-full blur-[140px]" />
                <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px]" />
            </div>

            {/* --- NAV --- */}
            <nav className="relative z-50 flex items-center justify-between px-6 md:px-8 py-4 md:py-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2 font-black text-2xl text-slate-900 tracking-tighter">
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                        <Zap className="text-white w-5 h-5" fill="currentColor" />
                    </div>
                    Shiprocket
                </div>
                <div className="hidden lg:flex gap-10 text-slate-600 font-bold text-sm">
                    <a href="#" className="hover:text-indigo-600 transition-colors">Products</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
                </div>
                <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all">
                    Get Started
                </button>
            </nav>

            {/* --- HERO MAIN - FIXED HEIGHT TO PREVENT JUMPING --- */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center flex-grow min-h-[750px] md:min-h-[800px] lg:min-h-[650px]">

                {/* LEFT: CONTENT SLIDER */}
                <div className="flex flex-col justify-center h-full w-full py-8 lg:py-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                            className="space-y-6 md:space-y-8"
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight max-w-xl">
                                {SLIDES[currentSlide].title}
                            </h1>
                            <p className="text-base md:text-xl text-slate-500 max-w-md leading-relaxed">
                                {SLIDES[currentSlide].subtitle}
                            </p>
                            <div className="pt-2">
                                <button className="px-8 md:px-10 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95">
                                    {SLIDES[currentSlide].buttonText}
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT: DYNAMIC WIDGETS */}
                <div className="relative w-full h-[450px] md:h-full flex items-center justify-center overflow-visible">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.05, y: -10 }}
                            transition={{ duration: 0.6 }}
                            className="relative w-full h-full"
                        >
                            {/* SLIDE 1: DOMESTIC SHIPPING */}
                            {SLIDES[currentSlide].type === "shipping" && (
                                <>
                                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[10%] left-0 w-48 md:w-60 bg-white rounded-2xl shadow-2xl p-4 border border-slate-50 z-20">
                                        <div className="text-[11px] font-bold text-slate-800 mb-3">Top Courier Partners</div>
                                        <div className="space-y-2">
                                            {['Amazon Shipping', 'Blue Dart', 'Delhivery'].map((n, i) => (
                                                <div key={i} className={`flex items-center justify-between p-2.5 border rounded-xl text-[10px] font-bold ${i === 1 ? 'border-indigo-100 bg-indigo-50/30 text-indigo-600' : 'border-slate-100 text-slate-400'}`}>
                                                    {n} {i === 1 && <Check size={12} className="text-green-500" />}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-[15%] right-0 w-48 md:w-64 bg-white rounded-2xl shadow-2xl p-5 border border-slate-50 z-30 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><TrendingUp size={20} /></div>
                                        <div>
                                            <div className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Total Revenue</div>
                                            <div className="text-xl font-black text-slate-800">₹60,000 <span className="text-[9px] text-green-500 font-bold ml-1">+290%</span></div>
                                        </div>
                                    </motion.div>
                                    <div className="absolute inset-0 flex items-end justify-center z-10">
                                        <img
                                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                                            className="h-[85%] object-contain brightness-110 contrast-105"
                                            style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent)' }}
                                        />
                                    </div>
                                </>
                            )}

                            {/* SLIDE 2: FINANCIAL SOLUTIONS */}
                            {SLIDES[currentSlide].type === "financial" && (
                                <div className="flex items-center justify-center h-full">
                                    <motion.div className="w-[90%] md:w-[420px] bg-white rounded-3xl shadow-2xl p-8 border border-slate-100 z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600"><Briefcase /></div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 tracking-tight">Financial Solutions</div>
                                                <div className="text-xs text-slate-400 font-medium">Unlock capital for your goals</div>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Pre-Approved Capital</div>
                                                <div className="text-4xl font-black text-slate-800">₹7,00,000</div>
                                            </div>
                                            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                                                <span className="flex items-center gap-2"><CreditCard size={14} className="text-indigo-500" /> Low Interest</span>
                                                <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-500" /> Secure</span>
                                            </div>
                                            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100">Get Funded Now</button>
                                        </div>
                                    </motion.div>
                                    {/* Persona Overlay */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 bg-green-100 rounded-full border-4 border-white shadow-2xl overflow-hidden -z-10 opacity-50">
                                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover grayscale" />
                                    </div>
                                </div>
                            )}

                            {/* SLIDE 3: INTERNATIONAL SHIPPING */}
                            {SLIDES[currentSlide].type === "international" && (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" as const }} className="absolute w-[300px] md:w-[400px] h-[300px] md:h-[400px] border-2 border-dashed border-indigo-100 rounded-full">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center"><Globe size={20} className="text-blue-500" /></div>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-xl flex items-center justify-center"><Truck size={20} className="text-indigo-500" /></div>
                                    </motion.div>
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-40 h-40 bg-white rounded-[40px] shadow-2xl flex flex-col items-center justify-center gap-3 border border-slate-50 z-10 relative">
                                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center"><Globe size={32} className="text-indigo-600" /></div>
                                        <span className="text-xs font-black text-slate-800 uppercase tracking-widest">220+ Countries</span>
                                    </motion.div>
                                </div>
                            )}

                            {/* SLIDE 4: MARKETING AUTOMATION */}
                            {SLIDES[currentSlide].type === "marketing" && (
                                <div className="flex items-center justify-center h-full">
                                    <div className="relative w-full max-w-sm">
                                        <motion.div animate={{ x: [-15, 0, -15] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-[-20%] left-0 w-56 bg-white rounded-2xl shadow-2xl p-4 border border-slate-50 z-20">
                                            <div className="flex gap-2 items-center mb-3">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white"><MessageSquare size={16} /></div>
                                                <div className="text-xs font-bold text-slate-800">WhatsApp Marketing</div>
                                            </div>
                                            <div className="text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium italic">"Hi Sarah! We saved your items. Here's a 15% discount just for you."</div>
                                        </motion.div>
                                        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-0 right-0 w-60 bg-white rounded-3xl shadow-2xl p-6 border border-slate-50 z-10">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-wider">Campaign Performance</div>
                                            <div className="flex items-end gap-2 h-16">
                                                {[35, 65, 45, 95, 75, 55].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-indigo-100 rounded-t-lg transition-all" style={{ height: `${h}%` }} />
                                                ))}
                                            </div>
                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="text-sm font-black text-indigo-600">92% Conversions</div>
                                                <div className="text-[10px] font-bold text-green-500">+12% vs LY</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            )}

                            {/* SLIDE 5: WAREHOUSING */}
                            {SLIDES[currentSlide].type === "warehouse" && (
                                <div className="flex items-center justify-center h-full">
                                    <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="w-72 md:w-96 bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100">
                                        <div className="flex justify-between items-center mb-8">
                                            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center"><Box size={28} /></div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Inventory Management</div>
                                                <div className="text-lg font-black text-slate-800">Smart Hubs</div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {['Delhi NCR Fulfillment Center', 'Mumbai Logistics Park', 'Bangalore Tech Hub'].map((h, i) => (
                                                <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${i === 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'}`}>
                                                    <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-indigo-600' : 'bg-slate-300'} shadow-sm`} />
                                                    <div className="text-xs font-bold text-slate-700">{h}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* --- PAGINATION & NAV (CENTERED & FIXED HEIGHT) --- */}
            <div className="relative z-50 py-10 px-6 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8">

                    {/* Controls Group */}
                    <div className="flex items-center justify-center gap-4 w-full md:w-auto order-2 md:order-1">
                        <button
                            onClick={() => handleManualNav('prev')}
                            className="w-11 h-11 md:w-14 md:h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600 active:scale-90"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* PROGRESS BARS */}
                        <div className="flex gap-2 md:gap-3 flex-grow md:flex-grow-0 justify-center">
                            {SLIDES.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => jumpToSlide(idx)}
                                    className="group relative h-1.5 md:h-2 rounded-full bg-slate-200 overflow-hidden w-full md:w-20 max-w-[100px] transition-all"
                                >
                                    <div
                                        className={`absolute inset-0 bg-indigo-600 rounded-full origin-left ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
                                        style={{
                                            width: currentSlide === idx ? `${progress}%` : '0%',
                                            transition: currentSlide === idx ? 'none' : 'width 0.4s ease-out'
                                        }}
                                    />
                                    {idx < currentSlide && <div className="absolute inset-0 bg-indigo-600/40 rounded-full" />}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handleManualNav('next')}
                            className="w-11 h-11 md:w-14 md:h-14 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600 active:scale-90"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Desktop Branding Badge */}
                    <div className="hidden md:flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] order-3">
                        <BarChart3 size={16} className="text-indigo-400" /> All-In-One Commerce Suite
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero2;
