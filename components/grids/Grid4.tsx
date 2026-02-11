import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Brain,
    Sparkles,
    Users,
    Repeat,
    MessageSquare,
    ArrowRight,
    Monitor,
    Database
} from 'lucide-react';

const Grid4 = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" as const }
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-neutral-200">
            <main className="max-w-6xl mx-auto px-6 py-16 md:py-24">

                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900"
                    >
                        Make, Market & Manage your brand using AI
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-neutral-500 text-lg max-w-2xl mx-auto"
                    >
                        AI workflows designed specifically to solve specific commerce problems.
                    </motion.p>
                </div>

                {/* Grid Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-12 gap-6"
                >

                    {/* Top Left Card: Memory */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-7 bg-white border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative"
                    >
                        <div className="relative h-48 mb-8 flex items-center justify-center">
                            {/* Decorative AI Graphics */}
                            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                                <span className="text-9xl font-serif">Aa</span>
                                <div className="w-24 h-24 bg-neutral-200 rounded-full blur-3xl absolute -top-10 -right-10"></div>
                            </div>

                            {/* Interactive Mock UI Component */}
                            <div className="relative z-10 flex items-center space-x-4 bg-white shadow-xl shadow-neutral-100 rounded-full px-6 py-4 border border-neutral-100">
                                <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-6 bg-neutral-200 rounded-full relative p-1 flex items-center">
                                        <motion.div
                                            animate={{ x: [0, 24, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-4 h-4 bg-white rounded-full shadow-sm"
                                        />
                                    </div>
                                    <span className="font-medium text-neutral-600">Memory</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-semibold uppercase tracking-wider">Memory</span>
                            <h3 className="text-2xl font-bold">Build your brand DNA that tells a story</h3>
                            <p className="text-neutral-500 max-w-md">Tailor your brand's identity to reflect every generation using ShopOS.</p>
                        </div>
                    </motion.div>

                    {/* Top Right Card: Refine */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-5 bg-white border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden"
                    >
                        <div className="relative h-48 mb-8 flex items-center justify-center">
                            <div className="relative">
                                {/* Earbuds Mockup with Tooltip */}
                                <div className="w-40 h-40 bg-neutral-900 rounded-3xl flex items-center justify-center relative shadow-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black"></div>
                                    <Sparkles className="text-purple-400 w-12 h-12 relative z-10" />
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    className="absolute -bottom-4 -right-4 bg-white border border-neutral-100 shadow-xl p-4 rounded-xl max-w-[180px]"
                                >
                                    <p className="text-[10px] text-neutral-400 mb-1">AI Suggestion</p>
                                    <p className="text-xs font-semibold mb-2">Fix inner lid pattern</p>
                                    <div className="flex justify-end">
                                        <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center">
                                            <ArrowRight className="text-white w-3 h-3" />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-semibold uppercase tracking-wider">Refine</span>
                            <h3 className="text-2xl font-bold">Eliminate AI slop in a few clicks</h3>
                            <p className="text-neutral-500">Achieve high-quality outputs with AI and human refinement.</p>
                        </div>
                    </motion.div>

                    {/* Bottom Left Card: Collaborate */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-4 bg-white border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden"
                    >
                        <div className="relative h-48 mb-8 flex items-center justify-center">
                            <div className="w-full flex items-center justify-center gap-1">
                                {[...Array(15)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [12, 40, 12] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "easeInOut"
                                        }}
                                        className={`w-1 rounded-full ${i === 4 ? 'bg-orange-300' : 'bg-neutral-200'}`}
                                    />
                                ))}
                            </div>
                            <motion.div
                                animate={{ x: [-20, 20, -20], rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="absolute bottom-10 left-10 w-8 h-8 text-orange-400"
                            >
                                <Sparkles />
                            </motion.div>
                        </div>

                        <div className="space-y-3">
                            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-semibold uppercase tracking-wider">Collaborate</span>
                            <h3 className="text-2xl font-bold">Shape your imagination with ideas</h3>
                            <p className="text-neutral-500">Bring ideas to life by talking to an AI Creative Director.</p>
                        </div>
                    </motion.div>

                    {/* Bottom Right Card: Loops */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-8 bg-white border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden"
                    >
                        <div className="relative h-48 mb-8 flex items-center justify-center">
                            <div className="relative w-full max-w-md bg-neutral-50 border border-neutral-100 rounded-xl p-4 flex gap-4">
                                {/* Mock Product Card */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="w-24 h-24 bg-white rounded-lg shadow-sm p-2 flex items-center justify-center relative overflow-hidden"
                                >
                                    <div className="absolute top-1 left-1 bg-emerald-100 text-[8px] px-1 rounded text-emerald-700 font-bold uppercase tracking-tight">AI Optimized</div>
                                    <div className="w-16 h-16 bg-neutral-100 rounded-md flex items-center justify-center text-neutral-300 italic">
                                        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200" className="object-cover h-full w-full rounded" alt="product" />
                                    </div>
                                </motion.div>

                                {/* Mock Content Structure */}
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-3/4 bg-neutral-200 rounded-full" />
                                    <div className="grid grid-cols-3 gap-2 pt-2">
                                        <div className="h-10 bg-neutral-200 rounded-md" />
                                        <div className="h-10 bg-neutral-200 rounded-md" />
                                        <div className="h-10 bg-neutral-200 rounded-md" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-semibold uppercase tracking-wider">Loops</span>
                            <h3 className="text-2xl font-bold">Create stores that learn from itself</h3>
                            <p className="text-neutral-500 max-w-lg">Autonomous AI agents that work 24x7, learn from feedback & continuously improve store performance.</p>
                        </div>
                    </motion.div>

                </motion.div>

                {/* Footer Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 text-center text-neutral-400 text-sm"
                >
                    Built for modern commerce • Powered by ShopOS AI
                </motion.div>
            </main>
        </div>
    );
};

export default Grid4;
