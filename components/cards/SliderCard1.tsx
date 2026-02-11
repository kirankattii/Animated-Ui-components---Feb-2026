import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { ChevronLeft, ChevronRight, Globe, Box, Users, Truck } from 'lucide-react';

const STRENGTHS_DATA = [
    {
        id: 1,
        title: "4 Lakhs+",
        subtitle: "Businesses/Sellers",
        color: "bg-blue-50",
        icon: <Users className="text-blue-600" size={48} />,
        illustration: (
            <div className="relative w-full h-40 mt-8 flex items-center justify-center">
                <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-md">
                            <img
                                src={`https://i.pravatar.cc/150?u=${i}`}
                                alt="user"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-0 w-full px-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded" />
                        <div className="flex-1 space-y-2">
                            <div className="h-2 w-3/4 bg-gray-100 rounded" />
                            <div className="h-2 w-1/2 bg-gray-100 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "19,000+",
        subtitle: "Unique Pin codes Nationwide",
        color: "bg-orange-50",
        icon: <Box className="text-orange-600" size={48} />,
        illustration: (
            <div className="relative w-full h-40 mt-8 flex items-center justify-center">
                <div className="relative">
                    <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center">
                        <Box size={60} className="text-orange-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white px-2 py-1 rounded shadow-sm text-[10px] font-bold">Bangalore</div>
                    <div className="absolute bottom-4 -left-6 bg-white px-2 py-1 rounded shadow-sm text-[10px] font-bold">Mumbai</div>
                    <div className="absolute top-1/2 -right-8 bg-white px-2 py-1 rounded shadow-sm text-[10px] font-bold">Gurgaon</div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "220+",
        subtitle: "Countries and Territories Globally",
        color: "bg-green-50",
        icon: <Globe className="text-green-600" size={48} />,
        illustration: (
            <div className="relative w-full h-40 mt-8 flex items-center justify-center overflow-hidden">
                <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="absolute -top-3 w-6 h-6 rounded-full bg-blue-500 border-2 border-white" />
                    <div className="absolute -bottom-3 w-6 h-6 rounded-full bg-red-500 border-2 border-white" />
                    <div className="absolute -left-3 w-6 h-6 rounded-full bg-green-500 border-2 border-white" />
                    <div className="absolute -right-3 w-6 h-6 rounded-full bg-green-500 border-2 border-white" />
                    <Globe size={40} className="text-blue-600 animate-none" />
                </div>
            </div>
        )
    },
    {
        id: 4,
        title: "42+",
        subtitle: "Courier Partners",
        color: "bg-purple-50",
        icon: <Truck className="text-purple-600" size={48} />,
        illustration: (
            <div className="grid grid-cols-2 gap-2 mt-8 w-full px-6">
                {['Express', 'Delivery', 'Shipway', 'Speed'].map((name, i) => (
                    <div key={i} className="bg-white p-3 rounded shadow-sm border border-gray-100 text-center font-bold text-xs">
                        {name}
                    </div>
                ))}
            </div>
        )
    },
    {
        id: 5,
        title: "24/7",
        subtitle: "Dedicated Support",
        color: "bg-teal-50",
        icon: <Users className="text-teal-600" size={48} />,
        illustration: (
            <div className="flex flex-col items-center justify-center h-40 mt-4 space-y-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                    <Users className="text-teal-600" size={32} />
                </div>
                <div className="w-full px-8 space-y-2">
                    <div className="h-2 w-full bg-teal-100 rounded-full" />
                    <div className="h-2 w-2/3 bg-teal-100 rounded-full" />
                </div>
            </div>
        )
    }
];

export default function App() {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 30 });

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }

        // Handle window resize
        const handleResize = () => {
            if (carouselRef.current) {
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const slide = (direction: 'left' | 'right') => {
        const currentX = x.get();
        const slideAmount = 350; // Approx card width + gap
        let newX;

        if (direction === 'left') {
            newX = Math.min(currentX + slideAmount, 0);
        } else {
            newX = Math.max(currentX - slideAmount, -width);
        }

        animate(x, newX, {
            type: "spring",
            stiffness: 300,
            damping: 30
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
            <div className="max-w-7xl w-full">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            Our Core Strengths
                        </h2>
                    </div>

                    <div className="hidden md:flex gap-4">
                        <button
                            onClick={() => slide('left')}
                            className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => slide('right')}
                            className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                            aria-label="Next slide"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <motion.div
                    ref={carouselRef}
                    className="cursor-grab active:cursor-grabbing overflow-visible"
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        style={{ x: springX }}
                        className="flex gap-6"
                    >
                        {STRENGTHS_DATA.map((item) => (
                            <motion.div
                                key={item.id}
                                className="min-w-[300px] md:min-w-[380px] h-[480px] bg-white rounded-[32px] p-8 flex flex-col shadow-xl shadow-gray-200/50 border border-gray-100 flex-shrink-0 relative overflow-hidden group select-none"
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            >
                                {/* Text Content */}
                                <div className="mb-6">
                                    <h3 className="text-3xl font-bold text-slate-900 mb-1">
                                        {item.title} <span className="text-lg font-medium text-gray-500 block md:inline">{item.subtitle}</span>
                                    </h3>
                                </div>

                                {/* Main Illustration Area */}
                                <div className={`flex-grow rounded-2xl ${item.color} transition-colors duration-500 group-hover:bg-opacity-80 flex flex-col items-center justify-center`}>
                                    {item.illustration}
                                </div>

                                {/* Decorative background element */}
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-50 rounded-full blur-3xl opacity-50 group-hover:bg-blue-50 transition-colors" />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Mobile Controls */}
                <div className="flex md:hidden justify-center gap-6 mt-12">
                    <button
                        onClick={() => slide('left')}
                        className="p-4 rounded-full bg-white shadow-lg active:scale-95 transition-transform"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => slide('right')}
                        className="p-4 rounded-full bg-white shadow-lg active:scale-95 transition-transform"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <style>
                {`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 12s linear infinite;
          }
        `}
            </style>
        </div>
    );
}
