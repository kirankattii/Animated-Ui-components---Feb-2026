import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Package,
    ShoppingCart,
    CheckCircle2,
    Instagram,
    Facebook,
    Store,
    Globe,
    BarChart3,
    Smartphone,
    MapPin,
    ShieldCheck
} from 'lucide-react';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const }
    }
};

// Precise Tag Component matching the image
const ProductTag = ({ text, iconColor }: { text: string; iconColor: string }) => {
    return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm hover:border-gray-300 transition-colors cursor-default">
            <div className={`w-2 h-2 rotate-45 ${iconColor}`} />
            <span className="text-[11px] font-medium text-gray-700">{text}</span>
            <ArrowRight size={10} className="text-blue-500 ml-0.5" />
        </div>
    );
};

const Card = ({ title, description, products, stats, children, bgColor }: { title: string; description: string; products: { name: string; iconColor: string }[]; stats: { label: string; value: string; isText?: boolean }[]; children: React.ReactNode; bgColor?: string }) => {
    return (
        <motion.div
            variants={cardVariants}
            className={`relative flex flex-col bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm h-full overflow-hidden ${bgColor || ''}`}
        >
            <div className="flex-1">
                <h2 className="text-[32px] font-bold text-gray-900 mb-3 tracking-tight leading-none">{title}</h2>
                <p className="text-gray-500 text-[15px] mb-8 leading-relaxed font-medium">
                    {description}
                </p>

                <div className="mb-8">
                    <p className="text-[13px] font-semibold text-gray-400 mb-4">Products used frequently</p>
                    <div className="flex flex-wrap gap-2">
                        {products.map((p, idx) => (
                            <ProductTag key={idx} text={p.name} iconColor={p.iconColor} />
                        ))}
                    </div>
                </div>

                <div className="flex items-start gap-12 mb-10">
                    {stats.map((stat, idx) => (
                        <React.Fragment key={idx}>
                            <div className="flex flex-col">
                                <p className="text-[13px] text-gray-400 font-semibold mb-2 leading-tight max-w-[150px]">{stat.label}</p>
                                <p className={`text-[36px] font-semibold text-gray-800 tracking-tight leading-tight ${stat.isText ? 'text-[28px] mt-1' : ''}`}>
                                    {stat.value}
                                </p>
                            </div>
                            {idx === 0 && <div className="w-[1px] h-16 bg-gray-100 mt-2" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="mt-auto relative w-full h-[280px] rounded-2xl overflow-hidden bg-gradient-to-b from-white to-transparent flex items-end justify-center">
                {children}
            </div>
        </motion.div>
    );
};

export default function Grid1() {
    return (
        <div className="min-h-screen bg-[#fcfcfc] p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Card 1: SMB Online Retailers */}
                    <Card
                        title="SMB Online retailers"
                        description="D2C brands, traders & drop shippers selling through their own website"
                        products={[
                            { name: "Shipping", iconColor: "bg-green-400" },
                            { name: "ShipX", iconColor: "bg-blue-400" },
                            { name: "Checkout", iconColor: "bg-purple-400" },
                            { name: "Engage360", iconColor: "bg-indigo-400" }
                        ]}
                        stats={[
                            { label: "Conversion increase of upto", value: "20%" },
                            { label: "Shipping cost reduction upto", value: "10-12%" }
                        ]}
                    >
                        <div className="relative w-full h-full flex items-end justify-center">
                            <div className="absolute left-6 top-8 z-20 bg-white rounded-xl p-3 shadow-2xl border border-gray-50 w-36">
                                <div className="aspect-[4/5] bg-orange-500 rounded-lg mb-3 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200" alt="tshirt" className="w-full h-full object-cover opacity-80" />
                                </div>
                                <p className="text-[10px] font-bold text-gray-800 mb-1">Men Graphic Tshirt</p>
                                <div className="w-full py-1.5 bg-indigo-600 rounded-md flex items-center justify-center">
                                    <span className="text-[8px] text-white font-bold">Sell</span>
                                </div>
                            </div>
                            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600" alt="retailer" className="w-[85%] object-contain z-10 translate-y-4" />
                            <div className="absolute right-4 top-24 z-20 flex flex-col gap-3">
                                <div className="bg-white px-4 py-2.5 rounded-xl shadow-lg border border-gray-50 flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-green-500" />
                                    <span className="text-[11px] font-bold text-gray-800">Accept New Order</span>
                                </div>
                                <div className="bg-white px-5 py-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-4">
                                    <span className="text-3xl font-bold text-indigo-600">63</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Card 2: Social Sellers */}
                    <Card
                        title="Social sellers"
                        description="Entrepreneurs selling on Instagram, WhatsApp, Facebook etc."
                        products={[
                            { name: "Shipping", iconColor: "bg-green-400" },
                            { name: "Quick", iconColor: "bg-blue-400" },
                            { name: "Engage360", iconColor: "bg-indigo-400" }
                        ]}
                        stats={[
                            { label: "Shipping cost reduction upto", value: "10-12%" },
                            { label: "Uplift end to end buyer", value: "experience", isText: true }
                        ]}
                    >
                        <div className="relative w-full h-full flex items-end justify-center">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600" alt="social seller" className="w-[80%] object-contain z-10 translate-y-4" />
                            <div className="absolute right-8 top-12 z-20 flex flex-col gap-4">
                                <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-pink-600"><Instagram size={20} /></div>
                                <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center translate-x-6">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">W</div>
                                </div>
                            </div>
                            <div className="absolute right-12 bottom-12 z-20 bg-white rounded-2xl p-4 shadow-2xl border border-gray-50 w-44">
                                <div className="aspect-square bg-emerald-50 rounded-xl mb-3 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300" alt="shoes" className="w-full h-full object-contain" />
                                </div>
                                <p className="text-xs font-bold text-gray-800">Running Shoes</p>
                                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-indigo-50 rounded-2xl shadow-lg border border-white flex items-center justify-center text-indigo-600">
                                    <ShoppingCart size={20} />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Card 3: Offline Stores */}
                    <Card
                        title="Offline stores"
                        description="Retailers and brand stores looking to digitize their storefront and inventory."
                        products={[
                            { name: "Quick", iconColor: "bg-cyan-400" },
                            { name: "Shipping", iconColor: "bg-green-400" },
                            { name: "StoreSync", iconColor: "bg-orange-400" }
                        ]}
                        stats={[
                            { label: "Inventory accuracy increase", value: "35%" },
                            { label: "Omnichannel growth", value: "superior", isText: true }
                        ]}
                    >
                        <div className="relative w-full h-full flex items-end justify-center">
                            <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=600" alt="store owner" className="w-[85%] object-contain z-10 translate-y-4" />
                            <div className="absolute left-6 top-10 z-20 flex flex-col gap-3">
                                <div className="bg-white p-3 rounded-xl shadow-xl border border-gray-50 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600"><Store size={20} /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-800">Downtown Branch</p>
                                        <p className="text-[8px] text-green-500 font-bold">Online & Active</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-10 top-20 z-20 bg-white p-4 rounded-2xl shadow-2xl border border-gray-50">
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPin size={12} className="text-blue-500" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase">Ready for Pickup</span>
                                </div>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />)}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">+12</div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Card 4: Enterprise Brands */}
                    <Card
                        title="Large businesses"
                        description="Brands & sellers managing complex omnichannel high-volume operations."
                        products={[
                            { name: "ShipX", iconColor: "bg-blue-400" },
                            { name: "API Docs", iconColor: "bg-gray-400" },
                            { name: "Logistics", iconColor: "bg-indigo-400" }
                        ]}
                        stats={[
                            { label: "Shipping performance", value: "99.2%" },
                            { label: "Operational cost saved", value: "22%" }
                        ]}
                    >
                        <div className="relative w-full h-full flex items-end justify-center p-6">
                            <div className="w-full h-full bg-slate-50 rounded-3xl border border-slate-100 p-6 relative overflow-hidden">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    <ShieldCheck size={18} className="text-slate-300" />
                                </div>
                                <div className="space-y-4">
                                    <div className="h-4 w-3/4 bg-slate-200 rounded-full animate-pulse" />
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                                            <BarChart3 size={16} className="text-blue-500 mb-1" />
                                            <div className="h-1 w-8 bg-slate-100 rounded-full" />
                                        </div>
                                        <div className="h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                                            <Globe size={16} className="text-indigo-500 mb-1" />
                                            <div className="h-1 w-8 bg-slate-100 rounded-full" />
                                        </div>
                                        <div className="h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                                            <Smartphone size={16} className="text-purple-500 mb-1" />
                                            <div className="h-1 w-8 bg-slate-100 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="h-20 bg-indigo-600 rounded-2xl flex items-center justify-between px-6 text-white">
                                        <div>
                                            <p className="text-[10px] opacity-70">Active Shipments</p>
                                            <p className="text-xl font-bold">12,482</p>
                                        </div>
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
