import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-sm ${className}`}>
        {children}
    </div>
);

const FeatureItem = ({ text }: { text: string }) => (
    <div className="flex items-start gap-3">
        <div className="mt-1">
            <Sparkles className="w-5 h-5 text-indigo-500 fill-indigo-100" />
        </div>
        <p className="text-gray-600 text-sm font-medium leading-tight">{text}</p>
    </div>
);

const Grid2 = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans selection:bg-indigo-100">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Section 1: Photo Production Workflow */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Outdated Way */}
                    <Card className="lg:col-span-4 flex flex-col">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Outdated Photo Production Way</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Expensive, time-heavy, and slow — costing real business opportunities.
                        </p>
                        <div className="relative mt-auto rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100 border border-gray-200">
                            {/* Mock Photography Studio Setup */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-full bg-[#f8f8f8] flex flex-col items-center justify-end pb-12">
                                    {/* Yellow Backdrop */}
                                    <div className="absolute top-8 w-4/5 h-3/5 bg-amber-400 rounded-t-lg shadow-inner"></div>
                                    {/* Studio Lights */}
                                    <div className="absolute left-4 bottom-24 w-12 h-20 bg-slate-800 rounded-full flex items-center justify-center">
                                        <div className="w-8 h-16 bg-white rounded-full blur-sm opacity-80"></div>
                                    </div>
                                    <div className="absolute right-4 bottom-24 w-12 h-20 bg-slate-800 rounded-full flex items-center justify-center">
                                        <div className="w-8 h-16 bg-white rounded-full blur-sm opacity-80"></div>
                                    </div>
                                    {/* Stool */}
                                    <div className="relative z-10 w-16 h-24 border-x-4 border-t-8 border-slate-300 rounded-t-md"></div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Right: ShopOS Modern Way */}
                    <Card className="lg:col-span-8">
                        <div className="flex flex-col h-full">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">ShopOS brings it up to the speed</h2>
                            <p className="text-gray-500 mb-8">
                                No shipping. No reshoots. No waiting.<br />
                                Upload your products, ShopOS delivers results in hours.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                                <FeatureItem text="Process an entire catalog in a single sweep" />
                                <FeatureItem text="Ready to go-live assets in under 48 hours" />
                                <FeatureItem text="Get any look, location or pose at a fraction of cost" />
                                <FeatureItem text="Production-grade accuracy that feels real" />
                            </div>

                            {/* Animated Image Stack */}
                            <div className="relative h-64 mt-4 flex items-center justify-center md:justify-start">
                                {/* Source Product */}
                                <div className="z-10 bg-white p-2 rounded-xl shadow-lg border border-gray-200 w-32 h-40 flex flex-col items-center justify-center">
                                    <div className="w-20 h-24 bg-rose-50 rounded-lg flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" className="w-12 h-12 text-rose-300" fill="none" stroke="currentColor"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" /><path d="M3 6h18M16 10a4 4 0 01-8 0" /></svg>
                                    </div>
                                    <div className="mt-2 text-[8px] text-gray-400 bg-gray-50 p-1 rounded leading-tight w-full">
                                        Generate an editorial-style catalog image...
                                    </div>
                                    {/* Small Arrow to stack */}
                                    <div className="absolute -right-6 top-1/2 -translate-y-1/2">
                                        <ArrowRight className="w-4 h-4 text-gray-300" />
                                    </div>
                                </div>

                                {/* Stacked Results */}
                                <div className="ml-16 relative flex items-center">
                                    {[1, 2, 3, 4, 5].map((idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ x: 0, rotate: 0 }}
                                            animate={{
                                                x: idx * 30,
                                                rotate: (idx - 3) * 4,
                                                y: Math.sin(idx) * 10
                                            }}
                                            whileHover={{ y: -20, transition: { duration: 0.2 } }}
                                            className="absolute bg-white p-1 rounded-lg shadow-md border border-gray-100 w-28 h-36 overflow-hidden cursor-pointer"
                                            style={{ zIndex: 5 - idx }}
                                        >
                                            <div className={`w-full h-full rounded-md flex items-center justify-center ${idx % 2 === 0 ? 'bg-indigo-50' : 'bg-slate-100'}`}>
                                                {/* Mock Model Assets */}
                                                <div className="text-gray-300 opacity-50">
                                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M12 14c-4.4 0-8 2-8 5v1h16v-1c0-3-3.6-5-8-5z" /></svg>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Section 2: AI Quality Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: AI Slop */}
                    <Card className="lg:col-span-4 flex flex-col">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">The AI slop is real</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Inconsistent with your brand and misses the finer product details.
                        </p>
                        <div className="relative mt-auto rounded-2xl overflow-hidden aspect-square bg-purple-50 flex items-center justify-center p-8">
                            <div className="w-32 h-48 bg-indigo-900 rounded-lg shadow-2xl relative overflow-hidden">
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-bold">BRAND</div>
                                {/* Subtle blur effect to signify "slop" */}
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-rose-500 shadow-sm border border-rose-100">
                                Low Quality Output
                            </div>
                        </div>
                    </Card>

                    {/* Right: Production Grade */}
                    <Card className="lg:col-span-8">
                        <div className="flex flex-col h-full">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">ShopOS delivers production-grade content</h2>
                            <p className="text-gray-500 mb-8">
                                Pixel-perfect visuals, powered by AI and perfected by humans.<br />
                                No compromises, just results.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                                <FeatureItem text="AI agents to create, edit & ship assets altogether" />
                                <FeatureItem text="Human refiners & creative directors to meet utmost quality" />
                                <FeatureItem text="Trained for commerce specific precision" />
                                <FeatureItem text="100% on-brand results to match your brand vibe" />
                            </div>

                            {/* Transformation Visualization */}
                            <div className="relative flex items-center justify-center md:justify-start gap-8 h-48">
                                {/* Iterations */}
                                <div className="flex -space-x-12">
                                    {[1, 2, 3].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                x: [0, i * 5, 0],
                                                rotate: [i * 2, i * 3, i * 2]
                                            }}
                                            transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                                            className="w-24 h-32 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden transform"
                                            style={{ opacity: 0.4 + (i * 0.2) }}
                                        >
                                            <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                                                <div className="w-10 h-16 bg-indigo-800 rounded opacity-30"></div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex flex-col items-center">
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        <ArrowRight className="w-6 h-6 text-gray-300" />
                                    </motion.div>
                                    <div className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-tighter">Human Refined</div>
                                </div>

                                {/* Final Result */}
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="relative w-32 h-44 bg-white p-1 rounded-xl shadow-2xl border-2 border-indigo-100 ring-4 ring-indigo-50/50"
                                >
                                    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg flex flex-col items-center justify-center relative overflow-hidden">
                                        <div className="w-12 h-24 bg-indigo-900 rounded-md shadow-lg mb-2 relative z-10">
                                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-[1px] bg-white/20"></div>
                                        </div>
                                        <div className="absolute top-2 right-2">
                                            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                                        </div>
                                        {/* Fabric background effect */}
                                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                                            <svg width="100%" height="100%"><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="indigo" strokeWidth="0.5" /></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Grid2;
