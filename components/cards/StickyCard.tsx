import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    baseScale: 0.82,
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
    baseScale: 0.88,
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
    baseScale: 0.94,
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
    baseScale: 1,
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

const CreditGauge = () => (
  <div className="relative w-32 h-16 overflow-hidden">
    <div className="absolute w-32 h-32 border-[12px] border-gray-100 rounded-full"></div>
    <div className="absolute w-32 h-32 border-[12px] border-transparent border-t-green-500 border-l-yellow-400 border-r-red-500 rounded-full rotate-[-45deg]"></div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-10 bg-gray-800 origin-bottom rotate-[20deg] rounded-full"></div>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full border-2 border-white"></div>
  </div>
);

const Card = ({ section, index, progress }: { section: any, index: number, progress: any }) => {
  // We use the scroll progress of the entire container to adjust the scale
  // As the page scrolls, we interpolate the scale for this specific index
  const scale = useTransform(
    progress,
    [index * 0.25, (index + 1) * 0.25], // Triggers as each 25% of the container passes
    [1, section.baseScale]
  );

  return (
    <div
      className="sticky top-6 h-screen flex items-center justify-center overflow-hidden"
      style={{ zIndex: index }}
    >
      <motion.div
        style={{
          scale,
          top: `calc(10% + ${index * 36}px)` // Creates the "tabbed" offset at the top
        }}
        className="relative w-full max-w-7xl mx-6 h-[600px] origin-top transition-shadow duration-500"
      >
        {/* Folder Tab Effect */}
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

        {/* Main Card Content */}
        <div className={`w-full h-full rounded-3xl shadow-2xl overflow-hidden border border-white/20 bg-gradient-to-br ${section.gradient}`}>
          <div className="p-8 md:p-12 h-full flex flex-col">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                {section.icon}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900/40">{section.step} Milestone</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-none">
                  {section.title}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
              {section.cards.map((card: any, cIdx: number) => (
                <div
                  key={cIdx}
                  className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 border border-white"
                >
                  {section.id === 'section-4' ? (
                    <div className="flex flex-col h-full">
                      <div className="relative bg-slate-50/50 rounded-3xl h-48 mb-6 overflow-hidden flex items-center justify-center border border-slate-100">
                        {card.type === 'capital' ? (
                          <>
                            <div className="absolute top-4 left-4 z-10 bg-white shadow-xl p-3 rounded-2xl border border-slate-50">
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Availability</p>
                              <p className="text-lg font-black text-indigo-600">₹7,00,000</p>
                            </div>
                            <img src={card.img} alt="Capital" className="w-full h-full object-cover" />
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
                      <button className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
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

const StickyCard = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <div className="bg-white selection:bg-indigo-100">
      {/* Dynamic Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black italic">F</div>
            <span className="font-black text-xl tracking-tighter text-slate-900">FINSTACK</span>
          </div>
          <div className="hidden md:flex gap-10 text-sm font-bold text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition-colors">Products</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Case Studies</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-slate-200">
            Get early access
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-40 pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100">
            V2.0 is now live
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9]">
            Scale without <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">boundaries.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            The complete financial operating system for global businesses. One platform, total control.
          </p>
        </motion.div>
      </header>

      {/* Stacked Cards Container */}
      <div ref={container} className="relative h-[400vh]">
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
      {/* <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white rounded-t-[5rem] -mt-20 relative z-[100] px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6">Ready to jump in?</h2>
        <p className="text-slate-400 max-w-lg mb-12 font-medium">Join 10,000+ businesses growing faster with Finstack's unified financial infrastructure.</p>
        <button className="px-10 py-5 bg-white text-slate-900 rounded-full font-black text-xl hover:bg-indigo-50 transition-colors shadow-2xl">
          Get Started Today
        </button>
      </div> */}
    </div>
  );
};

export default StickyCard;
