import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const faqData = [
    {
        id: '01',
        question: 'WHY SHOULD I PAY FOR THIS GSAP COURSE WHEN THERE ARE FREE YOUTUBE VIDEOS BY JS MASTERY?',
        answer: 'While YouTube is a great resource, this course provides a structured, comprehensive curriculum that takes you from zero to advanced. You get curated projects, community support, and insights that aren\'t shared in standalone tutorials.',
    },
    {
        id: '02',
        question: 'IS THIS GSAP COURSE BEGINNER-FRIENDLY?',
        answer: 'Absolutely. We start with the absolute basics of GSAP and motion principles before moving into complex animations. You don\'t need to be a math wizard or a senior dev to start.',
    },
    {
        id: '03',
        question: 'DO I NEED TO KNOW REACT OR ANY SPECIFIC FRAMEWORK?',
        answer: 'Not at all. While some examples use modern tools like Next.js, everything is explained step-by-step. You\'ll learn GSAP and motion design principles you can apply in any frontend stack.',
        listItems: ['React', 'Vanilla JavaScript', 'Webflow']
    },
    {
        id: '04',
        question: 'WHAT IF I GET STUCK DURING THE COURSE?',
        answer: 'You have access to a dedicated community channel where you can ask questions, share your progress, and get help from both instructors and fellow students.',
    },
];

const AccordionItem = ({ id, question, answer, listItems, isOpen, onClick }: any) => {
    return (
        <div
            className={`border-2 border-zinc-300 border-dashed rounded-2xl md:rounded-[1.5rem] overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-[#e7eee6]' : 'bg-transparent'
                }`}
        >
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left focus:outline-none group"
            >
                <div className="flex items-start gap-3 sm:gap-5">
                    <span className="text-sm sm:text-lg font-medium text-zinc-500 mt-1 shrink-0">
                        {id}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-gray-900 pr-2 leading-tight">
                        {question}
                    </h3>
                </div>
                <div className="flex-shrink-0 ml-2">
                    {isOpen ? (
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" strokeWidth={2} />
                    ) : (
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2} />
                    )}
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-4 sm:px-6 pb-6 ml-7 sm:ml-12 md:ml-14">
                            <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed mb-4 max-w-3xl">
                                {answer}
                            </p>
                            {listItems && (
                                <ul className="list-disc ml-5 space-y-2">
                                    {listItems.map((item: any, idx: number) => (
                                        <li key={idx} className="text-sm sm:text-base md:text-lg text-gray-800">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Accordian() {
    const [openId, setOpenId] = useState('03');

    const toggleAccordion = (id: any) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#e7eee6] py-12 md:py-24 px-4 sm:px-8 font-sans selection:bg-black selection:text-white">
            <div className="max-w-4xl mx-auto w-full">
                {/* Title Section */}
                <header className="text-center mb-10 md:mb-20">
                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-gray-950 uppercase leading-[0.9] md:leading-[0.8]">
                        Frequently Asked<br className="hidden sm:block" /> Questions
                    </h1>
                </header>

                {/* Accordion List with Equal Spacing */}
                <div className="flex flex-col space-y-4 md:space-y-6">
                    {faqData.map((item) => (
                        <AccordionItem
                            key={item.id}
                            {...item}
                            isOpen={openId === item.id}
                            onClick={() => toggleAccordion(item.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
