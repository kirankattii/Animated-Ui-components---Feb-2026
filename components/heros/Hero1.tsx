import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Check,
    TrendingUp,
    Zap,
    Briefcase,
    CheckCircle2,
    Globe,
    MessageSquare,
    BarChart3,
    Box,
    Truck,
    ShieldCheck,
    CreditCard,
    MapPin,
    Send
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

const Hero1 = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const startTime = useRef(Date.now());
    const requestRef = useRef<number | null>(null);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        setProgress(0);
        startTime.current = Date.now();
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
        setProgress(0);
        startTime.current = Date.now();
    }, []);

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
        startTime.current = Date.now();
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#FBFBFB] font-sans flex flex-col selection:bg-indigo-100">

            {/* --- DYNAMIC BACKGROUND BLOOMS --- */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" as const }}
                    className="absolute top-[5%] left-[5%] w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-purple-200/30 rounded-full blur-[100px] md:blur-[160px]"
                />
                <motion.div
                    animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" as const }}
                    className="absolute bottom-[5%] right-[5%] w-[450px] md:w-[800px] h-[450px] md:h-[800px] bg-indigo-100/40 rounded-full blur-[100px] md:blur-[160px]"
                />
            </div>

            {/* --- HEADER --- */}
            <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 max-w-[1600px] mx-auto w-full">
                <div className="flex items-center gap-2.5 font-black text-2xl text-slate-900 tracking-tighter">
                    <div className="w-10 h-10 bg-indigo-600 rounded-[14px] flex items-center justify-center shadow-lg shadow-indigo-100">
                        <Zap className="text-white w-5 h-5" fill="currentColor" />
                    </div>
                    Shiprocket
                </div>
                <div className="hidden lg:flex gap-10 text-slate-600 font-bold text-sm">
                    <a href="#" className="hover:text-indigo-600 transition-colors">Products</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
                </div>
                <button className="px-7 py-3 bg-white border border-slate-200 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all">
                    Get Started
                </button>
            </nav>

            {/* --- HERO MAIN - STABLE FIXED HEIGHT --- */}
            <main className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col lg:grid lg:grid-cols-2 gap-8 items-center flex-grow min-h-[750px] md:min-h-[850px] lg:min-h-[700px]">

                {/* LEFT: TEXT CONTENT */}
                <div className="flex flex-col justify-center h-full w-full py-12 lg:py-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 40 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                            className="space-y-6 md:space-y-10"
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight max-w-xl">
                                {SLIDES[currentSlide].title}
                            </h1>
                            <p className="text-base md:text-xl text-slate-500 max-w-md leading-relaxed">
                                {SLIDES[currentSlide].subtitle}
                            </p>
                            <div className="pt-4">
                                <button className="px-10 py-4.5 md:py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95">
                                    {SLIDES[currentSlide].buttonText}
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RIGHT: DYNAMIC WIDGETS */}
                <div className="relative w-full h-[500px] md:h-full flex items-center justify-center overflow-visible">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.1, y: -30 }}
                            transition={{ duration: 0.7 }}
                            className="relative w-full h-full"
                        >
                            {/* SLIDE 1: DOMESTIC SHIPPING */}
                            {SLIDES[currentSlide].type === "shipping" && (
                                <>
                                    <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-[10%] left-0 w-56 md:w-64 bg-white rounded-3xl shadow-2xl p-6 border border-slate-50 z-20">
                                        <div className="text-xs font-bold text-slate-800 mb-4 tracking-tight">Top Courier Partners</div>
                                        <div className="space-y-2.5">
                                            {['Amazon Shipping', 'Blue Dart', 'Delhivery'].map((n, i) => (
                                                <div key={i} className={`flex items-center justify-between p-3 border rounded-2xl text-[11px] font-bold ${i === 1 ? 'border-indigo-100 bg-indigo-50/30 text-indigo-600' : 'border-slate-100 text-slate-400'}`}>
                                                    {n} {i === 1 && <Check size={14} className="text-green-500" />}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                    <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-[20%] right-0 w-56 md:w-72 bg-white rounded-3xl shadow-2xl p-6 border border-slate-50 z-30 flex items-center gap-5">
                                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shadow-inner"><TrendingUp size={24} /></div>
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Total Revenue</div>
                                            <div className="text-2xl font-black text-slate-800">₹60,000</div>
                                            <div className="text-[10px] font-bold text-green-500">+290% growth</div>
                                        </div>
                                    </motion.div>
                                    <div className="absolute inset-0 flex items-end justify-center z-10">
                                        <img
                                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                                            className="h-[90%] w-auto object-contain brightness-110"
                                            style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent)' }}
                                        />
                                    </div>
                                </>
                            )}

                            {/* SLIDE 2: FINANCIAL SOLUTIONS */}
                            {SLIDES[currentSlide].type === "financial" && (
                                <div className="flex items-center justify-center h-full">
                                    <motion.div className="w-[90%] md:w-[460px] bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100 z-10">
                                        <div className="flex items-center gap-5 mb-10">
                                            <div className="w-14 h-14 bg-indigo-50 rounded-[20px] flex items-center justify-center text-indigo-600"><Briefcase size={28} /></div>
                                            <div>
                                                <div className="text-lg font-bold text-slate-800 tracking-tight">Financial Hub</div>
                                                <div className="text-sm text-slate-400 font-medium">Empowering your capital growth</div>
                                            </div>
                                        </div>
                                        <div className="space-y-8">
                                            <div className="p-7 bg-slate-50/50 rounded-3xl border border-slate-100">
                                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Loan Approved</div>
                                                <div className="text-5xl font-black text-slate-900 tracking-tighter">₹7,00,000</div>
                                            </div>
                                            <div className="flex items-center justify-between text-sm font-bold text-slate-600">
                                                <span className="flex items-center gap-2"><CreditCard size={18} className="text-indigo-500" /> Instant Payout</span>
                                                <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> Verified</span>
                                            </div>
                                            <button className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-bold shadow-2xl shadow-indigo-100 hover:shadow-indigo-200 transition-all">Get Funded</button>
                                        </div>
                                    </motion.div>
                                    <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-green-50 rounded-full blur-[80px] -z-10" />
                                </div>
                            )}

                            {/* SLIDE 3: INTERNATIONAL SHIPPING */}
                            {SLIDES[currentSlide].type === "international" && (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" as const }} className="absolute w-[350px] md:w-[500px] h-[350px] md:h-[500px] border-2 border-dashed border-indigo-100 rounded-full">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-xl rounded-2xl flex items-center justify-center"><Globe size={24} className="text-blue-500" /></div>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white shadow-xl rounded-2xl flex items-center justify-center"><Truck size={24} className="text-indigo-500" /></div>
                                    </motion.div>
                                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-48 h-48 bg-white rounded-[48px] shadow-2xl flex flex-col items-center justify-center gap-4 border border-slate-50 z-10">
                                        <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600"><Globe size={40} /></div>
                                        <span className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Global 220+</span>
                                    </motion.div>
                                </div>
                            )}

                            {/* SLIDE 4: MARKETING AUTOMATION */}
                            {SLIDES[currentSlide].type === "marketing" && (
                                <div className="flex items-center justify-center h-full">
                                    <div className="relative w-full max-w-sm">
                                        <motion.div animate={{ x: [-20, 0, -20], rotate: [-2, 0, -2] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-[-30%] left-[-10%] w-64 bg-white rounded-3xl shadow-2xl p-5 border border-slate-50 z-20">
                                            <div className="flex gap-3 items-center mb-4">
                                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"><MessageSquare size={20} /></div>
                                                <div className="text-sm font-bold text-slate-800">Smart Engage</div>
                                            </div>
                                            <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium leading-relaxed italic">"Hi Sarah! Your cart is almost ready. Use GROW10 for a special discount!"</div>
                                        </motion.div>
                                        <motion.div animate={{ scale: [1, 1.05, 1], y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-[-10%] right-[-10%] w-64 bg-white rounded-[32px] shadow-2xl p-8 border border-slate-50 z-10">
                                            <div className="text-[11px] font-bold text-slate-400 uppercase mb-6 tracking-widest">Analytics Dashboard</div>
                                            <div className="flex items-end gap-2.5 h-20">
                                                {[40, 75, 55, 100, 85, 65, 45].map((h, i) => (
                                                    <div key={i} className="flex-1 bg-indigo-100 rounded-t-xl hover:bg-indigo-600 transition-colors" style={{ height: `${h}%` }} />
                                                ))}
                                            </div>
                                            <div className="mt-6 flex justify-between items-center">
                                                <div className="text-lg font-black text-indigo-600">92.4% <span className="text-[10px] block font-bold text-slate-400">Conversion Rate</span></div>
                                                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500"><TrendingUp size={18} /></div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            )}

                            {/* SLIDE 5: WAREHOUSING */}
                            {SLIDES[currentSlide].type === "warehouse" && (
                                <div className="flex items-center justify-center h-full">
                                    <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity }} className="w-80 md:w-full max-w-md bg-white rounded-[48px] shadow-2xl p-10 border border-slate-100">
                                        <div className="flex justify-between items-center mb-10">
                                            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center shadow-inner"><Box size={32} /></div>
                                            <div className="text-right">
                                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Smart Logistics</div>
                                                <div className="text-xl font-black text-slate-900">Inventory Hubs</div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { name: 'Delhi NCR Fulfillment', status: 'Optimal' },
                                                { name: 'Mumbai Mega Hub', status: 'High Volume' },
                                                { name: 'Bangalore Tech Park', status: 'Optimal' }
                                            ].map((h, i) => (
                                                <div key={i} className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${i === 0 ? 'bg-indigo-50/50 border-indigo-100 shadow-sm' : 'bg-slate-50/50 border-slate-100 hover:bg-white'}`}>
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-3.5 h-3.5 rounded-full ${i === 0 ? 'bg-indigo-600' : 'bg-slate-300'} shadow-sm`} />
                                                        <div className="text-sm font-bold text-slate-700">{h.name}</div>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{h.status}</span>
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

            {/* --- PAGINATION & NAVIGATION --- */}
            <div className="relative z-50 py-12 px-6 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">

                    {/* Controls: Centered on Mobile */}
                    <div className="flex items-center justify-center gap-5 w-full md:w-auto order-2 md:order-1">
                        <button
                            onClick={() => handleManualNav('prev')}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600 active:scale-90"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        {/* PROGRESS BAR PAGINATION */}
                        <div className="flex gap-2.5 md:gap-4 flex-grow md:flex-grow-0 justify-center">
                            {SLIDES.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => jumpToSlide(idx)}
                                    className="group relative h-2 md:h-2.5 rounded-full bg-slate-200 overflow-hidden w-full md:w-24 max-w-[120px] transition-all"
                                >
                                    {/* Dynamic Progress Indicator */}
                                    <div
                                        className={`absolute inset-0 bg-indigo-600 rounded-full origin-left ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
                                        style={{
                                            width: currentSlide === idx ? `${progress}%` : '0%',
                                            transition: currentSlide === idx ? 'none' : 'width 0.4s ease-out'
                                        }}
                                    />
                                    {/* Past Slide State */}
                                    {idx < currentSlide && <div className="absolute inset-0 bg-indigo-600/30 rounded-full" />}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handleManualNav('next')}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600 active:scale-90"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>

                    {/* Desktop Badge */}
                    <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] order-3">
                        <BarChart3 size={18} className="text-indigo-400" /> Enterprise Logistics Suite
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero1;
