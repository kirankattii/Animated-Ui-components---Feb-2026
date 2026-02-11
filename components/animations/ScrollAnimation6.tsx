import React from 'react';
import { motion } from 'framer-motion';

const OurResponsibility = () => {
    // Animation variants for entering cards
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const }
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-300 selection:text-blue-900">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 lg:py-24">
                {/* Main Layout Container: flex-col on mobile, flex-row on md+ */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">

                    {/* Left Section: Sticky Image on Desktop, Standard Flow on Mobile */}
                    <div className="w-full md:w-1/2 md:sticky md:top-12 h-auto aspect-square md:aspect-auto md:h-[calc(100vh-6rem)] mb-2 md:mb-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop"
                                alt="Brand visual"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                    </div>

                    {/* Right Section: Scrolling Cards */}
                    <div className="w-full md:w-1/2 flex flex-col gap-6">

                        {/* Card 1: Original Responsibility */}
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="bg-[#8CB7F5] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 lg:p-12 min-h-[400px] md:min-h-[450px] lg:min-h-[500px] flex flex-col justify-between"
                        >
                            <h2 className="text-4xl md:text-4xl lg:text-6xl font-black text-black tracking-tight leading-none mb-8 md:mb-10 lg:mb-12">
                                Our responsibility
                            </h2>
                            <div className="space-y-4 md:space-y-5 lg:space-y-6 text-black/80 font-medium text-lg md:text-lg lg:text-xl leading-snug">
                                <p>
                                    The climate crisis is one of the most pressing issues of our time. It's something that affects us all, no matter where you are or what you listen to.
                                </p>
                                <p>
                                    We have committed to reaching net zero greenhouse gas (GHG) emissions by 2030, leveraging our platform to raise awareness and drive engagement.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 2: Sustainable Future */}
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="bg-[#1DB954] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 lg:p-12 min-h-[400px] md:min-h-[450px] lg:min-h-[500px] flex flex-col justify-between"
                        >
                            <h2 className="text-4xl md:text-4xl lg:text-6xl font-black text-black tracking-tight leading-none mb-8 md:mb-10 lg:mb-12">
                                Sustainable future
                            </h2>
                            <div className="space-y-4 md:space-y-5 lg:space-y-6 text-black/80 font-medium text-lg md:text-lg lg:text-xl leading-snug">
                                <p>
                                    Our commitment goes beyond emissions. We are rethinking our entire supply chain, from the energy powering our data centers to the hardware in our listeners' hands.
                                </p>
                                <p>
                                    By 2025, we aim to power 100% of our global operations with renewable energy, ensuring that every stream contributes to a greener world.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 3: Community Impact */}
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 lg:p-12 min-h-[400px] md:min-h-[450px] lg:min-h-[500px] flex flex-col justify-between"
                        >
                            <h2 className="text-4xl md:text-4xl lg:text-6xl font-black text-black tracking-tight leading-none mb-8 md:mb-10 lg:mb-12">
                                Community impact
                            </h2>
                            <div className="space-y-4 md:space-y-5 lg:space-y-6 text-black/80 font-medium text-lg md:text-lg lg:text-xl leading-snug">
                                <p>
                                    We believe in the power of audio to change lives. Our Equity Programs support underrepresented creators, providing them with the tools and funding needed to tell their stories.
                                </p>
                                <p>
                                    In the last year, we've invested over $20M in local community initiatives and creator grants, fostering a more inclusive and diverse global soundscape.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ScrollAnimation6() {
    return <OurResponsibility />;
}
