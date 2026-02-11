import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Truck,
    Package,
    Zap,
    Globe,
    CreditCard,
    MessageSquare,
    ChevronRight,
    CheckCircle2,
    Star,
    ShoppingBag,
    Clock,
    Navigation
} from 'lucide-react';

// --- Mock Components for Visuals ---

const DomesticShippingVisual = () => (
    <div className="relative w-full h-64 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-6">
        <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><ShoppingBag size={16} className="text-orange-600" /></div>
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Package size={16} className="text-blue-600" /></div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-100 w-full max-w-[240px] z-10">
            <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-400">TRACKING #SHIP-2024</span>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">In Transit</span>
            </div>
            <div className="space-y-3">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '75%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-indigo-600"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-600" />
                    <div className="text-[11px] font-medium text-slate-600">Arrived at Delhi Hub</div>
                </div>
            </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-60" />
    </div>
);

const FulfillmentVisual = () => (
    <div className="relative w-full h-64 bg-indigo-900 rounded-2xl overflow-hidden flex items-center justify-center p-6 text-white">
        <div className="z-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl w-full max-w-[220px]">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-green-500 rounded-lg"><CheckCircle2 size={16} /></div>
                <div className="text-sm font-bold">Order Fulfilled</div>
            </div>
            <div className="space-y-2 opacity-80">
                <div className="h-2 w-24 bg-white/30 rounded" />
                <div className="h-2 w-full bg-white/20 rounded" />
                <div className="h-2 w-3/4 bg-white/20 rounded" />
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs">SKU: #882-AB</span>
                <span className="text-xs font-bold">$129.00</span>
            </div>
        </div>
        {/* Animated particles */}
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5
                }}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 20}%`
                }}
            />
        ))}
    </div>
);

const QuickVisual = () => (
    <div className="relative w-full h-64 bg-yellow-50 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6">
        <motion.div
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="z-10"
        >
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-yellow-100 relative">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-400 rounded-full"><Navigation size={18} className="text-white" /></div>
                    <div>
                        <div className="text-xs font-bold text-slate-800">Quick Delivery</div>
                        <div className="text-[10px] text-slate-500">2.4km • 12 mins</div>
                    </div>
                </div>
                <div className="w-full h-24 bg-slate-100 rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.05)_100%)]" />
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-yellow-400 opacity-30" />
                    <motion.div
                        animate={{ x: [0, 100], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1/2 left-0 -translate-y-1/2"
                    >
                        <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    </div>
);

// --- Main Data Structure ---

const services = [
    {
        id: "domestic",
        title: "Domestic Shipping",
        tagline: "Nationwide reach, localized care.",
        description: "Serving 29,000+ unique pin codes. Our automated platform features specialized offerings like AI courier recommendations, bulk order creation, and branded tracking pages.",
        icon: <Truck className="text-indigo-600" />,
        color: "indigo",
        visual: <DomesticShippingVisual />
    },
    {
        id: "fulfillment",
        title: "Smart Fulfillment",
        tagline: "Zero-weight discrepancy fulfillment.",
        description: "25+ strategically placed last-mile enabled warehouses. Reduce RTO by 20% with accurate operations and seamless inventory control systems.",
        icon: <Package className="text-green-600" />,
        color: "green",
        visual: <FulfillmentVisual />
    },
    {
        id: "quick",
        title: "Shiprocket Quick",
        tagline: "Local delivery, lightning speed.",
        description: "Deliver locally faster than you can imagine. Reliable means for businesses to send parcels to single or multiple destinations within the same day.",
        icon: <Clock className="text-yellow-600" />,
        color: "yellow",
        visual: <QuickVisual />
    },
    {
        id: "crossborder",
        title: "Cross Border Trade",
        tagline: "The world is your marketplace.",
        description: "Empowering brands to establish robust global export networks covering 220+ countries and territories. Leverage our expertise in international shipping.",
        icon: <Globe className="text-blue-600" />,
        color: "blue",
        visual: (
            <div className="relative w-full h-64 bg-blue-50 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="z-10 flex flex-col items-center">
                    <div className="flex gap-2 mb-4">
                        {['🇺🇸', '🇬🇧', '🇩🇪', '🇦🇺'].map((f, i) => (
                            <motion.span
                                key={i}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-2xl shadow-sm"
                            >{f}</motion.span>
                        ))}
                    </div>
                    <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-4 bg-white rounded-2xl shadow-2xl border border-blue-100 flex items-center gap-4"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><Globe size={20} /></div>
                        <div>
                            <div className="text-xs font-bold">Global Export</div>
                            <div className="text-[10px] text-blue-500 font-semibold uppercase tracking-wider">Active in 220+ Countries</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        )
    },
    {
        id: "checkout",
        title: "Smart Checkout",
        tagline: "Conversion, optimized.",
        description: "Our AI-powered checkout tool reduces time-to-pay to less than 10 seconds. Experience 30% increase in conversions and significant RTO reduction.",
        icon: <CreditCard className="text-rose-600" />,
        color: "rose",
        visual: (
            <div className="relative w-full h-64 bg-rose-50 rounded-2xl overflow-hidden flex items-center justify-center p-8">
                <div className="bg-white rounded-2xl shadow-xl border border-rose-100 w-full h-full overflow-hidden flex flex-col">
                    <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="w-20 h-2 bg-slate-200 rounded" />
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-center gap-3">
                        <div className="flex gap-2">
                            <div className="w-full h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center px-3 text-[10px] text-slate-400 italic">Name on card...</div>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="w-full py-2 bg-rose-600 rounded-lg text-white text-[11px] font-bold text-center cursor-pointer"
                        >
                            Pay Now ($49.00)
                        </motion.div>
                        <div className="flex justify-center gap-2">
                            <Star size={8} className="text-yellow-400 fill-yellow-400" />
                            <Star size={8} className="text-yellow-400 fill-yellow-400" />
                            <Star size={8} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-[8px] text-slate-400 italic font-medium">Trusted by 2M+ users</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "engage",
        title: "Engage 360",
        tagline: "Conversations that convert.",
        description: "AI-enabled, WhatsApp-centric marketing platform. Help your business connect better with customers via automated, personalized, and data-backed communication.",
        icon: <MessageSquare className="text-emerald-600" />,
        color: "emerald",
        visual: (
            <div className="relative w-full h-64 bg-emerald-50 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                <div className="w-full max-w-[200px] space-y-3">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="bg-white p-3 rounded-2xl rounded-bl-none shadow-md border border-emerald-100 mr-8"
                    >
                        <div className="text-[10px] text-slate-600 leading-tight">Your order #7712 has been shipped! View tracking?</div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-emerald-600 p-3 rounded-2xl rounded-br-none shadow-md ml-8 text-white"
                    >
                        <div className="text-[10px] leading-tight font-medium">Yes, please! ✨</div>
                    </motion.div>
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur rounded-full border border-emerald-200">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-tighter">AI Assistant Typing...</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
];

// --- App Component ---

const App = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100">

            {/* Header Section */}
            <section className="relative pt-24 pb-16 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-6">
                            <Star size={14} className="fill-indigo-600" />
                            <span>Industry Leading Solutions</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
                            Our Services & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Solutions Portfolio</span>
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
                            We provide an integrated ecosystem of logistics and marketing tools designed to help modern brands scale without friction.
                        </p>
                    </motion.div>
                </div>

                {/* Abstract Background Decoration */}
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-50 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/4" />
            </section>

            {/* Services Grid */}
            <section className="pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 gap-32">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
                            >
                                {/* Text Content */}
                                <div className="flex-1 space-y-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-${service.color}-50 flex items-center justify-center shadow-sm`}>
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                                            {service.title}
                                        </h3>
                                        <p className={`text-lg font-semibold text-${service.color}-600/80 mb-4`}>
                                            {service.tagline}
                                        </p>
                                        <p className="text-lg text-slate-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 flex flex-wrap gap-4">
                                        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                                            Explore {service.title}
                                            <ChevronRight size={16} />
                                        </button>
                                        <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">
                                            View Demo
                                        </button>
                                    </div>
                                </div>

                                {/* Visual Asset Container */}
                                <div className="flex-1 w-full max-w-lg group">
                                    <motion.div
                                        whileHover={{ scale: 1.02, rotateY: index % 2 === 0 ? 2 : -2 }}
                                        className="relative transition-all duration-500"
                                    >
                                        {/* Shadow Decor */}
                                        <div className="absolute inset-0 bg-slate-200 rounded-2xl translate-x-3 translate-y-3 -z-10 opacity-30 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform" />

                                        {service.visual}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer / CTA Section */}
            <section className="px-6 py-24 bg-slate-50 border-t border-slate-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to transform your business?</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1">
                            Start Free Trial
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all">
                            Talk to Sales
                        </button>
                    </div>
                    <p className="mt-8 text-slate-400 text-sm font-medium">
                        No credit card required • Setup in 5 minutes • Dedicated support
                    </p>
                </div>
            </section>

            {/* CSS Utilities for colors (Tailwind might need them explicitly if JIT isn't seeing the dynamic templates) */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .bg-indigo-50 { background-color: rgb(238 242 255); }
        .text-indigo-600 { color: rgb(79 70 229); }
        .bg-green-50 { background-color: rgb(240 253 244); }
        .text-green-600 { color: rgb(22 163 74); }
        .bg-yellow-50 { background-color: rgb(254 252 232); }
        .text-yellow-600 { color: rgb(202 138 4); }
        .bg-blue-50 { background-color: rgb(239 246 255); }
        .text-blue-600 { color: rgb(37 99 235); }
        .bg-rose-50 { background-color: rgb(255 241 242); }
        .text-rose-600 { color: rgb(225 29 72); }
        .bg-emerald-50 { background-color: rgb(236 253 245); }
        .text-emerald-600 { color: rgb(5 150 105); }
      `}} />

        </div>
    );
};

export default App;
