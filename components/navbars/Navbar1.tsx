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
    Megaphone
} from 'lucide-react';

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

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pointer-events-none">
            {/* Top Announcement Bar - Only visible initially */}
            <motion.div
                animate={{ height: isScrolled ? 0 : 'auto', opacity: isScrolled ? 0 : 1 }}
                className="w-full bg-gradient-to-r from-[#C7D2FE] via-[#FBCFE8] to-[#FFEDD5] overflow-hidden pointer-events-auto"
            >
                <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-center gap-4 text-[13px] text-slate-800 font-medium">
                    <div className="bg-white/50 p-1 rounded-full"><Megaphone className="w-3 h-3 text-indigo-600" /></div>
                    <span>Recharge Now for <strong>₹1000</strong> & Get <strong>₹1600*</strong> In Your Wallet. Use Code: <strong>FLAT600</strong></span>
                    <span className="hidden md:inline opacity-60 text-xs border-b border-black/20">| Limited Period Offer</span>
                    <button className="ml-4 bg-white border border-slate-900 text-slate-900 px-3 py-0.5 rounded-lg text-xs font-bold hover:bg-slate-900 hover:text-white transition-colors">
                        Signup Now
                    </button>
                </div>
            </motion.div>

            {/* Main Navbar Container */}
            <motion.div
                layout
                initial={false}
                animate={{
                    width: isScrolled ? '92%' : '100%',
                    marginTop: isScrolled ? '16px' : '0px',
                    borderRadius: isScrolled ? '100px' : '0px',
                    padding: isScrolled ? '8px 24px' : '16px 48px',
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 1)',
                    boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.1)' : '0 0 0 0 rgba(0,0,0,0)',
                    backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
                    borderWidth: isScrolled ? '1px' : '0px',
                    borderColor: 'rgba(0,0,0,0.05)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="flex items-center justify-between pointer-events-auto bg-white"
            >
                {/* Logo Section */}
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative w-8 h-8">
                        <div className="absolute inset-0 bg-indigo-600 rotate-45 rounded-lg transform transition-transform group-hover:rotate-90 duration-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-[#00FF00] rounded-sm transform rotate-45"></div>
                        </div>
                    </div>
                    <span className="font-bold text-2xl tracking-tighter text-slate-900">Shiprocket</span>
                </div>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-700">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition-colors">
                        Products <ChevronDown className="w-4 h-4 opacity-50" />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition-colors">
                        Platform <ChevronDown className="w-4 h-4 opacity-50" />
                    </div>
                    <div className="cursor-pointer hover:text-indigo-600 transition-colors">Pricing</div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition-colors">
                        Partners <ChevronDown className="w-4 h-4 opacity-50" />
                    </div>
                    <div className="cursor-pointer hover:text-indigo-600 transition-colors">Track Order</div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition-colors">
                        Resources <ChevronDown className="w-4 h-4 opacity-50" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button className="px-6 py-2.5 rounded-xl text-indigo-600 font-bold border border-indigo-100 hover:bg-indigo-50 transition-colors">
                        Log In
                    </button>
                    <button className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">
                        Try for Free
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

interface CardData {
    title: string;
    desc: string;
    link: string;
    type?: string;
    img?: string;
}

interface Section {
    id: string;
    step: string;
    title: string;
    bgColor: string;
    gradient: string;
    icon: React.ReactNode;
    baseScale: number;
    cards: CardData[];
}

const CreditGauge = () => (
    <div className="relative w-32 h-16 overflow-hidden">
        <div className="absolute w-32 h-32 border-[12px] border-gray-100 rounded-full"></div>
        <div className="absolute w-32 h-32 border-[12px] border-transparent border-t-green-500 border-l-yellow-400 border-r-red-500 rounded-full rotate-[-45deg]"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-10 bg-gray-800 origin-bottom rotate-[20deg] rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full border-2 border-white"></div>
    </div>
);



const Card = ({ section, index, progress }: { section: Section; index: number; progress: MotionValue<number> }) => {
    const scale = useTransform(
        progress,
        [index * 0.25, (index + 1) * 0.25],
        [1, section.baseScale]
    );

    return (
        <div
            className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
            style={{ zIndex: index }}
        >
            <motion.div
                style={{
                    scale,
                    top: `calc(12% + ${index * 24}px)`
                }}
                className="relative w-full max-w-5xl h-[580px] origin-top transition-shadow duration-500"
            >
                <div
                    className={`
            absolute -top-10 left-8 px-6 py-3 rounded-t-3xl border-t border-x border-white/30 shadow-sm
            flex items-center gap-3 ${section.bgColor}
          `}
                >
                    <span className="text-[10px] font-bold bg-white/40 px-2 py-0.5 rounded-full">
                        {section.step}
                    </span>
                    <span className="text-xs font-bold tracking-tight truncate max-w-[150px]">
                        {section.title}
                    </span>
                </div>

                <div className={`w-full h-full rounded-3xl shadow-2xl overflow-hidden border border-white/20 bg-gradient-to-br ${section.gradient}`}>
                    <div className="p-8 md:p-12 h-full flex flex-col">
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                                {section.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900/40">{section.step} Solution</p>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-none">
                                    {section.title}
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                            {section.cards.map((card, cIdx) => (
                                <div
                                    key={cIdx}
                                    className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 border border-white"
                                >
                                    {section.id === 'section-4' ? (
                                        <div className="flex flex-col h-full">
                                            <div className="relative bg-slate-50/50 rounded-3xl h-44 mb-6 overflow-hidden flex items-center justify-center border border-slate-100">
                                                {card.type === 'capital' ? (
                                                    <>
                                                        <div className="absolute top-4 left-4 z-10 bg-white shadow-xl p-3 rounded-2xl border border-slate-50">
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Availability</p>
                                                            <p className="text-lg font-black text-indigo-600">₹7,00,000</p>
                                                        </div>
                                                        <img src={card.img} alt="Capital" className="w-full h-full object-cover opacity-80" />
                                                        <div className="absolute bottom-4 right-4 bg-green-500 text-white text-[10px] px-4 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow-lg">
                                                            <ShieldCheck className="w-3.5 h-3.5" /> Instant Approval
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 border border-slate-50">
                                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Credit Bureau API</h4>
                                                        <CreditGauge />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        {card.type === 'capital' ? <TrendingUp className="w-6 h-6 text-indigo-500" /> : <BarChart3 className="w-6 h-6 text-green-500" />}
                                                        <h3 className="text-2xl font-black tracking-tight text-slate-800">{card.title}</h3>
                                                    </div>
                                                    <p className="text-slate-500 font-medium leading-relaxed">{card.desc}</p>
                                                </div>
                                            </div>
                                            <button className="mt-6 flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                                                {card.link} <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-2xl font-black tracking-tight text-slate-800">{card.title}</h3>
                                                    <div className="p-2.5 bg-slate-100 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                                        <ArrowUpRight className="w-5 h-5" />
                                                    </div>
                                                </div>
                                                <p className="text-slate-500 font-medium leading-relaxed">{card.desc}</p>
                                            </div>
                                            <button className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                                                {card.link} <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Navbar1 = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div className="bg-white selection:bg-indigo-100 min-h-screen">
            <Navbar />

            {/* Hero Header */}
            <header className="pt-60 pb-32 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100">
                        India's #1 Shipping Partner
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
                        Simplify shipping, <br /><span className="text-indigo-600">amplify growth.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        From checkout to delivery, we provide the tools to build a brand people love. Over 270,000 sellers trust us.
                    </p>

                    <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
                        <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                            Get Started for Free
                        </button>
                        <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                            Watch Demo
                        </button>
                    </div>
                </motion.div>
            </header>

            {/* Stacked Cards Container */}
            <div ref={container} className="relative h-[400vh] px-6">
                {SECTIONS.map((section, idx) => (
                    <Card
                        key={section.id}
                        section={section}
                        index={idx}
                        progress={scrollYProgress}
                    />
                ))}
            </div>

            {/* Footer Buffer */}
            <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white rounded-t-[5rem] -mt-20 relative z-[100] px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black mb-6">Built for scale.</h2>
                <p className="text-slate-400 max-w-lg mb-12 font-medium">Join the logistics revolution and see why brands are switching to Shiprocket every single day.</p>
                <button className="px-10 py-5 bg-indigo-600 text-white rounded-full font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl">
                    Start Shipping Now
                </button>
            </div>
        </div>
    );
};

export default Navbar1;
