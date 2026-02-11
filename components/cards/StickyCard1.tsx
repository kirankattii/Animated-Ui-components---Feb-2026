import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowUpRight,
    ChevronRight,
    IndianRupee,
    TrendingUp,
    ShieldCheck,
    BarChart3,
    Globe,
    Truck,
    Zap
} from 'lucide-react';

const SECTIONS = [
    {
        id: 'section-1',
        step: '1/4',
        title: 'Unified domestic shipping',
        bgColor: 'bg-[#a5f3fc]',
        gradient: 'from-[#67e8f9] via-[#22d3ee] to-[#e879f9]',
        icon: <Truck className="w-6 h-6" />,
        baseScale: 0.88, // Smallest
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
        icon: <Globe className="w-6 h-6" />,
        baseScale: 0.92, // Little larger
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
        icon: <Zap className="w-6 h-6" />,
        baseScale: 0.96, // Little more large
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
        baseScale: 1.0, // Largest
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
                img: null // Added to fix type error if any, though TS is loose here
            }
        ]
    }
];

const CreditGauge = () => (
    <div className="relative w-32 h-16 overflow-hidden">
        <div className="absolute w-32 h-32 border-[12px] border-gray-100 rounded-full"></div>
        <div className="absolute w-32 h-32 border-[12px] border-transparent border-t-green-500 border-l-yellow-400 border-r-red-500 rounded-full rotate-[-45deg]"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-10 bg-gray-800 origin-bottom rotate-[20deg] rounded-full"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full border-2 border-white"></div>
    </div>
);

// Custom component for each section to handle individual scroll logic
const StickySection = ({ section, index }: { section: any, index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [isStuck, setIsStuck] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const stickyPoint = 96 + (index * 12); // Same as the 'top' style

            // If the card has reached its sticky position
            if (rect.top <= stickyPoint + 5) {
                setIsStuck(true);
                // Apply the specific target scale for this index
                setScale(section.baseScale);
            } else {
                setIsStuck(false);
                setScale(1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, [index, section.baseScale]);

    return (
        <div
            ref={containerRef}
            id={section.id}
            className="sticky pt-4 transition-all duration-700 ease-out origin-top"
            style={{
                top: `${96 + (index * 12)}px`,
                transform: `scale(${scale})`,
                opacity: isStuck && index < SECTIONS.length - 1 ? 0.95 : 1 // Slight fade for buried cards
            }}
        >
            {/* Tab Header */}
            <div
                className={`
          absolute -top-4 left-4 right-4 h-12 rounded-t-2xl shadow-sm border-t border-x border-white/20
          flex items-center px-6 gap-3 transition-all duration-500
          ${section.bgColor}
          ${isStuck ? 'opacity-100' : 'opacity-80 translate-y-1'}
        `}
                style={{ zIndex: 10 - index }}
            >
                <span className="text-[10px] font-bold bg-white/40 px-2 py-0.5 rounded-full">
                    {section.step}
                </span>
                <span className="text-xs font-semibold truncate">
                    {section.title}
                </span>
            </div>

            {/* Card Body */}
            <div
                className={`
          relative h-[550px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20
          bg-gradient-to-br ${section.gradient}
        `}
            >
                <div className="p-8 md:p-12 h-full flex flex-col">
                    <div className="mb-4">
                        <span className="inline-block text-[10px] font-bold bg-white/30 backdrop-blur-sm px-2 py-1 rounded-md mb-4">
                            {section.step}
                        </span>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                {section.icon}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                                {section.title}
                            </h2>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                        {section.cards.map((card: any, cIdx: number) => (
                            <div
                                key={cIdx}
                                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all border border-white"
                            >
                                {section.id === 'section-4' ? (
                                    <div className="flex flex-col h-full">
                                        <div className="relative bg-slate-50 rounded-2xl h-48 mb-6 overflow-hidden flex items-center justify-center">
                                            {card.type === 'capital' ? (
                                                <>
                                                    <div className="absolute top-4 left-4 z-10 bg-white shadow-lg p-3 rounded-xl scale-90 origin-top-left">
                                                        <p className="text-[10px] text-slate-400 font-medium">Share Documents</p>
                                                        <p className="text-sm font-bold">₹7,00,000</p>
                                                    </div>
                                                    <img src={card.img} alt="Capital" className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-4 right-4 bg-green-500 text-white text-[10px] px-3 py-1 rounded-full flex items-center gap-1">
                                                        <ShieldCheck className="w-3 h-3" /> Secure funds
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
                                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase">Credit Bureau</h4>
                                                    <CreditGauge />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {card.type === 'capital' ? <TrendingUp className="w-5 h-5 text-indigo-500" /> : <BarChart3 className="w-5 h-5 text-green-500" />}
                                                    <h3 className="text-xl font-bold">{card.title}</h3>
                                                </div>
                                                <p className="text-slate-500 text-sm">{card.desc}</p>
                                            </div>
                                            <div className="p-2 bg-slate-100 rounded-full"><ArrowUpRight className="w-4 h-4" /></div>
                                        </div>
                                        <button className="mt-6 flex items-center gap-2 text-indigo-600 font-bold text-sm">
                                            {card.link} <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-xl font-bold">{card.title}</h3>
                                                <div className="p-2 bg-slate-100 rounded-full"><ArrowUpRight className="w-4 h-4" /></div>
                                            </div>
                                            <p className="text-slate-500">{card.desc}</p>
                                        </div>
                                        <button className="mt-8 flex items-center gap-2 text-indigo-600 font-bold text-sm">
                                            {card.link} <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StickyScroll = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl tracking-tighter text-indigo-600">FINSTACK</div>
                    <div className="flex gap-4">
                        <button className="text-sm font-semibold px-4 py-2 hover:bg-slate-50 rounded-full transition-colors">Login</button>
                        <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold">Sign Up</button>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 pt-32 pb-96">
                <div className="mb-24 text-center">
                    <h1 className="text-6xl font-extrabold tracking-tight mb-8">
                        Global business, <br /><span className="text-indigo-600">local expertise.</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Scale your operations with our all-in-one platform for logistics, marketing, and finance.
                    </p>
                </div>

                <div className="relative">
                    {SECTIONS.map((section, idx) => (
                        <StickySection key={section.id} section={section} index={idx} />
                    ))}
                </div>
            </main>

            <div className="h-screen bg-white flex items-center justify-center border-t border-slate-100">
                <p className="text-slate-400 font-medium">Keep scrolling to see the stack effect...</p>
            </div>
        </div>
    );
};

export default StickyScroll;
