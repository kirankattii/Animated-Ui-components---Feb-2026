"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import {
    ArrowUpRight,
    ChevronRight,
    IndianRupee,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    Globe,
    Truck,
    Zap,
    ChevronDown,
    Megaphone,
    CreditCard,
    MapPin,
    Settings,
    Mail,
    Box,
    Layout,
    Printer,
    Smartphone
} from 'lucide-react';

// --- Reusable Navigation Data ---
const PLATFORM_FEATURES = [
    { icon: <CreditCard className="w-5 h-5 text-emerald-400" />, label: "Cash on Delivery" },
    { icon: <MapPin className="w-5 h-5 text-emerald-400" />, label: "Serviceable Pincodes" },
    { icon: <Settings className="w-5 h-5 text-emerald-400" />, label: "API Integration" },
    { icon: <MapPin className="w-5 h-5 text-emerald-400" />, label: "Multiple Pickup Locations" },
    { icon: <Printer className="w-5 h-5 text-emerald-400" />, label: "Print Shipping Labels" },
    { icon: <Mail className="w-5 h-5 text-emerald-400" />, label: "Email SMS Notification" },
    { icon: <Smartphone className="w-5 h-5 text-emerald-400" />, label: "Amazon Self-Ship" },
];

const SECTIONS = [
    {
        id: 'section-1',
        step: '1/4',
        title: 'Unified domestic shipping',
        bgColor: 'bg-[#a5f3fc]',
        gradient: 'from-[#67e8f9] via-[#22d3ee] to-[#e879f9]',
        icon: <Truck className="w-6 h-6 text-cyan-600" />,
        baseScale: 0.88,
        cards: [
            { title: 'Local Delivery', desc: 'Fastest domestic routes.', link: 'Ship Now' },
            { title: 'Warehousing', desc: 'Smart inventory management.', link: 'View Hubs' }
        ]
    },
    {
        id: 'section-2',
        step: '2/4',
        title: 'Full-stack global enablement',
        bgColor: 'bg-[#99f6e4]',
        gradient: 'from-[#5eead4] via-[#2dd4bf] to-[#818cf8]',
        icon: <Globe className="w-6 h-6 text-teal-600" />,
        baseScale: 0.92,
        cards: [
            { title: 'Cross Border', desc: 'Customs cleared shipping.', link: 'Explore' },
            { title: 'Currency', desc: 'Multi-currency settlement.', link: 'Set Up' }
        ]
    },
    {
        id: 'section-3',
        step: '3/4',
        title: 'AI powered tools for marketing growth',
        bgColor: 'bg-[#fef08a]',
        gradient: 'from-[#fde047] via-[#facc15] to-[#f472b6]',
        icon: <Zap className="w-6 h-6 text-yellow-600" />,
        baseScale: 0.96,
        cards: [
            { title: 'Ads Manager', desc: 'Smart spend optimization.', link: 'Start Ads' },
            { title: 'Insights', desc: 'Customer behavior analytics.', link: 'Analyze' }
        ]
    },
    {
        id: 'section-4',
        step: '4/4',
        title: 'Capital and financial tools',
        bgColor: 'bg-[#d8b4fe]',
        gradient: 'from-[#818cf8] via-[#a78bfa] to-[#bef264]',
        icon: <IndianRupee className="w-6 h-6 text-indigo-600" />,
        baseScale: 1.0,
        cards: [
            {
                type: 'capital',
                title: 'Capital',
                desc: 'Financial services for business growth',
                link: 'Sign Up',
                img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
            },
            {
                type: 'credit',
                title: 'Credit score',
                desc: 'Check your credit score for free',
                link: 'Sign Up',
            }
        ]
    }
];

// --- Reusable MegaMenu Component ---
interface MegaMenuItem {
    icon: React.ReactNode;
    label: string;
}

const MegaMenu = ({ isOpen, items }: { isOpen: boolean; items: MegaMenuItem[] }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2, ease: "easeOut" as const }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] mt-4 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden pointer-events-auto"
                >
                    <div className="p-10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Features</h4>
                        <div className="grid grid-cols-4 gap-y-8 gap-x-4">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                                        {item.icon}
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <span className="text-sm font-bold text-indigo-600 group-hover:underline">All Features</span>
                            </div>
                        </div>
                    </div>

                    {/* Promo Section in Dropdown */}
                    <div className="bg-slate-50/80 p-8 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md relative overflow-hidden">
                                <div className="absolute inset-0 bg-indigo-50/50" />
                                <div className="relative flex items-center justify-center p-2">
                                    <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                                </div>
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-900 text-lg">Refer & Earn</h5>
                                <p className="text-sm text-slate-500 max-w-[300px]">Refer sellers to Shiprocket and unlock exciting rewards</p>
                                <button className="text-indigo-600 text-sm font-bold mt-1 hover:underline">Know more</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pointer-events-none">
            {/* Top Banner */}
            <motion.div
                animate={{ height: isScrolled ? 0 : '40px', opacity: isScrolled ? 0 : 1 }}
                className="w-full bg-gradient-to-r from-[#D6BCFA] via-[#FBB6CE] to-[#FEEBC8] overflow-hidden pointer-events-auto border-b border-black/5"
            >
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center gap-4 text-[13px] text-slate-800 font-semibold tracking-tight">
                    <div className="bg-white/40 p-1.5 rounded-full"><Megaphone className="w-3 h-3 text-indigo-600" /></div>
                    <span>Recharge Now for <strong>₹1000</strong> & Get <strong>₹1600*</strong> In Your Wallet. Use Code: <strong className="bg-white/50 px-2 py-0.5 rounded ml-1">FLAT600</strong></span>
                    <span className="opacity-50 font-normal">| I Limited Period Offer On First Recharge</span>
                    <button className="ml-4 bg-white border border-slate-900 text-slate-900 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        Signup Now
                    </button>
                </div>
            </motion.div>

            {/* Morphed Navbar */}
            <motion.div
                layout
                initial={false}
                animate={{
                    width: isScrolled ? '94%' : '100%',
                    marginTop: isScrolled ? '20px' : '0px',
                    borderRadius: isScrolled ? '60px' : '0px',
                    padding: isScrolled ? '12px 32px' : '20px 60px',
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 1)',
                    boxShadow: isScrolled ? '0 20px 40px -15px rgba(0,0,0,0.1)' : '0 0 0 0 rgba(0,0,0,0)',
                    backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                className="relative flex items-center justify-between pointer-events-auto bg-white"
                onMouseLeave={() => setActiveMenu(null)}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative w-10 h-10">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform group-hover:rotate-12 duration-300">
                            <path d="M10 30 L50 10 L90 30 L90 70 L50 90 L10 70 Z" fill="none" stroke="#4C1D95" strokeWidth="8" />
                            <path d="M35 35 L65 50 L35 65 Z" fill="#22C55E" />
                        </svg>
                    </div>
                    <span className="font-black text-3xl tracking-tighter text-slate-900 uppercase italic">Shiprocket</span>
                </div>

                {/* Links */}
                <div className="hidden xl:flex items-center gap-8 text-[15px] font-bold text-slate-800">
                    <div
                        onMouseEnter={() => setActiveMenu('products')}
                        className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors py-4 relative"
                    >
                        Products <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === 'products' ? 'rotate-180' : ''}`} />
                    </div>
                    <div
                        onMouseEnter={() => setActiveMenu('platform')}
                        className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors py-4 relative"
                    >
                        Platform <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === 'platform' ? 'rotate-180' : ''}`} />
                        <MegaMenu isOpen={activeMenu === 'platform'} items={PLATFORM_FEATURES} />
                    </div>
                    <div
                        onMouseEnter={() => setActiveMenu('hero')}
                        className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors py-4 relative"
                    >
                        Hero Sections <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === 'hero' ? 'rotate-180' : ''}`} />
                        <AnimatePresence>
                            {activeMenu === 'hero' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 15 }}
                                    transition={{ duration: 0.2, ease: "easeOut" as const }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-[200px] mt-4 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden pointer-events-auto"
                                >
                                    <div className="p-4 flex flex-col gap-2">
                                        {[1, 2, 3].map((num) => (
                                            <a key={num} href={`/hero/${num}`} className="block px-4 py-2 hover:bg-indigo-50 rounded-lg text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors">
                                                Hero {num}
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div
                        onMouseEnter={() => setActiveMenu('grid')}
                        className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors py-4 relative"
                    >
                        Grids <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === 'grid' ? 'rotate-180' : ''}`} />
                        <AnimatePresence>
                            {activeMenu === 'grid' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 15 }}
                                    transition={{ duration: 0.2, ease: "easeOut" as const }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-[200px] mt-4 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden pointer-events-auto"
                                >
                                    <div className="p-4 flex flex-col gap-2">
                                        {[1, 2, 3, 4].map((num) => (
                                            <a key={num} href={`/grid/${num}`} className="block px-4 py-2 hover:bg-indigo-50 rounded-lg text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors">
                                                Grid {num}
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className="cursor-pointer hover:text-indigo-600 transition-colors py-4">Pricing</div>
                    <div className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors py-4">
                        Partners <ChevronDown className="w-4 h-4 opacity-40" />
                    </div>
                    <div className="cursor-pointer hover:text-indigo-600 transition-colors py-4">Track Order</div>
                    <div className="flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors py-4">
                        Resources <ChevronDown className="w-4 h-4 opacity-40" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <button className="px-8 py-3 rounded-2xl text-indigo-600 font-bold border-2 border-indigo-50 hover:bg-indigo-50 transition-all">
                        Log In
                    </button>
                    <button className="px-8 py-3 rounded-2xl bg-[#6366F1] text-white font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                        Try for Free
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// --- Stacked Card Logic (preserved) ---
interface CardProps {
    section: any;
    index: number;
    progress: MotionValue<number>;
}

const Card = ({ section, index, progress }: CardProps) => {
    const scale = useTransform(
        progress,
        [index * 0.25, (index + 1) * 0.25],
        [1, section.baseScale]
    );

    return (
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ zIndex: index }}>
            <motion.div
                style={{ scale, top: `calc(15% + ${index * 24}px)` }}
                className="relative w-full max-w-5xl h-[580px] origin-top shadow-2xl rounded-[3rem] overflow-visible"
            >
                <div className={`absolute -top-10 left-10 px-8 py-4 rounded-t-[2.5rem] border-t border-x border-white/40 shadow-sm flex items-center gap-4 ${section.bgColor}`}>
                    <span className="text-xs font-black bg-white/50 px-3 py-1 rounded-full uppercase tracking-widest">{section.step}</span>
                    <span className="text-sm font-black text-slate-900 truncate max-w-[200px]">{section.title}</span>
                </div>
                <div className={`w-full h-full rounded-[3rem] overflow-hidden border border-white/30 bg-gradient-to-br ${section.gradient} p-12 flex flex-col`}>
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-2xl">{section.icon}</div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{section.title}</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-8 flex-grow">
                        {section.cards.map((card: any, cIdx: number) => (
                            <div key={cIdx} className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-10 flex flex-col justify-between group hover:shadow-2xl transition-all border border-white">
                                <div>
                                    <h3 className="text-2xl font-black mb-4 text-slate-800">{card.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{card.desc}</p>
                                </div>
                                <button className="mt-8 flex items-center gap-3 text-indigo-600 font-black text-sm uppercase tracking-widest hover:gap-5 transition-all">
                                    {card.link} <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Navbar3 = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

    return (
        <div className="bg-[#F8FAFC] selection:bg-indigo-100 min-h-screen">
            <Navbar />

            <header className="pt-72 pb-40 px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <span className="inline-block px-5 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-indigo-100">
                        India's #1 Shipping Solution
                    </span>
                    <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter text-slate-900 mb-12 leading-[0.8] uppercase italic">
                        Simplify <br /><span className="text-indigo-600">Growth.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-3xl mx-auto leading-relaxed">
                        The complete operating system for modern commerce. Scale faster, ship smarter, and sell globally.
                    </p>
                    <div className="mt-16 flex justify-center gap-6">
                        <button className="px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-transform shadow-2xl">Start for Free</button>
                        <button className="px-12 py-6 bg-white text-slate-900 border-2 border-slate-100 rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all">View Pricing</button>
                    </div>
                </motion.div>
            </header>

            <div ref={container} className="relative h-[450vh] px-10">
                {SECTIONS.map((section, idx) => (
                    <Card key={section.id} section={section} index={idx} progress={scrollYProgress} />
                ))}
            </div>

            <footer className="h-screen bg-slate-900 rounded-t-[6rem] flex flex-col items-center justify-center text-white px-6">
                <h2 className="text-7xl font-black mb-12 italic uppercase tracking-tighter">Ready to Scale?</h2>
                <button className="px-16 py-8 bg-indigo-600 text-white rounded-full font-black text-2xl hover:bg-indigo-500 transition-all shadow-2xl">Create Your Account</button>
            </footer>
        </div>
    );
};

export default Navbar3;
