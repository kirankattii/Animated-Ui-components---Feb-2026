"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    ChevronDown,
    Wallet,
    MapPin,
    Terminal,
    Users,
    Package,
    Bell,
    ShoppingBag,
    ArrowRight,
    Menu,
    X
} from 'lucide-react';

// --- Types ---
interface SubMenuItem {
    title: string;
    icon: React.ReactNode;
    description?: string;
}

interface NavItem {
    label: string;
    href: string;
    dropdownItems?: SubMenuItem[];
    isMega?: boolean;
}

// --- Mock Data ---
const NAV_DATA: NavItem[] = [
    { label: 'Products', href: '#', dropdownItems: [], isMega: true },
    {
        label: 'Platform',
        href: '#',
        isMega: true,
        dropdownItems: [
            { title: 'Cash on Delivery', icon: <Wallet className="text-emerald-500" /> },
            { title: 'Serviceable Pincodes', icon: <MapPin className="text-emerald-500" /> },
            { title: 'API Integration', icon: <Terminal className="text-emerald-500" /> },
            { title: 'Multiple Pickup Locations', icon: <Package className="text-emerald-500" /> },
            { title: 'Print Shipping Labels', icon: <ShoppingBag className="text-emerald-500" /> },
            { title: 'Email SMS Notification', icon: <Bell className="text-emerald-500" /> },
            { title: 'Amazon Self-Ship', icon: <Package className="text-emerald-500" /> },
        ]
    },
    { label: 'Pricing', href: '#' },
    { label: 'Partners', href: '#', dropdownItems: [] },
    { label: 'Track Order', href: '#' },
    { label: 'Resources', href: '#', dropdownItems: [] },
];

// --- Components ---

const MegaMenu = ({ items, isOpen, onClose }: { items: SubMenuItem[], isOpen: boolean, onClose: () => void }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" as const }}
            className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[85vw] max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50"
            onMouseLeave={onClose}
        >
            <div className="p-8">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-6">Features</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8 gap-x-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 group cursor-pointer">
                            <div className="p-2 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                                {item.icon}
                            </div>
                            <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">
                                {item.title}
                            </span>
                        </div>
                    ))}
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <span className="text-sm font-semibold text-indigo-600 group-hover:underline">All Features</span>
                    </div>
                </div>
            </div>

            {/* Refer & Earn Section */}
            <div className="bg-slate-50 p-6 flex items-center gap-6 border-t border-slate-100">
                <div className="relative w-16 h-16 flex-shrink-0">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full animate-pulse" />
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="Avatar"
                        className="relative z-10 w-full h-full rounded-full"
                    />
                </div>
                <div className="flex-1">
                    <h4 className="text-md font-bold text-slate-800">Refer & Earn</h4>
                    <p className="text-xs text-slate-500 max-w-md">
                        Refer sellers to Shiprocket and unlock exciting rewards
                    </p>
                    <button className="mt-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                        Know more <ArrowRight size={12} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Navbar2 = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-[200vh] bg-slate-50 font-sans">
            {/* Navbar Wrapper */}
            <header className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none p-4">
                <motion.nav
                    initial={false}
                    animate={{
                        width: isScrolled ? 'min(95%, 1200px)' : '100%',
                        borderRadius: isScrolled ? '100px' : '0px',
                        y: isScrolled ? 10 : 0,
                        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)',
                        boxShadow: isScrolled ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="pointer-events-auto relative flex items-center justify-between px-6 md:px-10 py-3 backdrop-blur-md border border-white/20"
                >
                    {/* Logo */}
                    <div className="flex items-center gap-2 shrink-0 cursor-pointer">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white rotate-12 group hover:rotate-0 transition-transform">
                            <Package size={24} />
                        </div>
                        <span className="font-black text-xl tracking-tighter text-slate-800 hidden sm:block">SHIPROCKET</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {NAV_DATA.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => setActiveMenu(item.label)}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <a
                                    href={item.href}
                                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 rounded-full transition-colors flex items-center gap-1 group"
                                >
                                    {item.label}
                                    {item.dropdownItems && (
                                        <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`} />
                                    )}
                                </a>

                                {/* Submenu Logic */}
                                <AnimatePresence>
                                    {item.dropdownItems && item.dropdownItems.length > 0 && activeMenu === item.label && (
                                        <MegaMenu
                                            items={item.dropdownItems}
                                            isOpen={true}
                                            onClose={() => setActiveMenu(null)}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button className="hidden sm:block px-6 py-2.5 text-sm font-bold text-indigo-600 border border-indigo-100 rounded-full hover:bg-indigo-50 transition-colors">
                            Log In
                        </button>
                        <button className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">
                            Try for Free
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            className="lg:hidden p-2 text-slate-600"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </motion.nav>
            </header>

            {/* Placeholder Content to demonstrate scroll */}
            <main className="pt-32 px-4 flex flex-col items-center">
                <section className="max-w-4xl w-full py-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8"
                    >
                        Smooth Transitions for <span className="text-indigo-600 underline decoration-indigo-200">Modern Interfaces</span>
                    </motion.h1>
                    <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
                        Scroll down to see the navbar transform from a full-width header to a sleek, floating pill-shaped menu.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-white rounded-3xl shadow-sm border border-slate-100 animate-pulse" />
                        ))}
                    </div>
                </section>

                <section className="max-w-6xl w-full py-20">
                    <div className="h-[400px] w-full bg-indigo-600 rounded-[3rem] shadow-2xl flex items-center justify-center">
                        <h2 className="text-3xl font-bold text-white">Content Section</h2>
                    </div>
                </section>

                <section className="max-w-4xl w-full py-20 text-center">
                    <p className="text-slate-400">Keep scrolling...</p>
                    <div className="mt-10 h-[800px] w-full bg-slate-200 rounded-3xl opacity-50 border-2 border-dashed border-slate-300" />
                </section>
            </main>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-black text-2xl text-indigo-600">SHIPROCKET</span>
                            <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
                        </div>
                        <div className="flex flex-col gap-6">
                            {NAV_DATA.map(item => (
                                <a key={item.label} href={item.href} className="text-2xl font-bold text-slate-800">{item.label}</a>
                            ))}
                            <hr className="my-4 border-slate-100" />
                            <button className="w-full py-4 text-lg font-bold text-white bg-indigo-600 rounded-2xl">Try for Free</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar2;
