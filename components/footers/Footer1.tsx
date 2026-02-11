import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Linkedin,
    Mail,
    MapPin,
    ChevronDown
} from 'lucide-react';

/**
 * Shiprocket Inspired Responsive Footer Component
 * Features an accordion layout for mobile and grid layout for desktop
 */

const footerData = {
    products: [
        "Shiprocket Shipping", "ShiprocketX", "Shiprocket Fulfillment",
        "Shiprocket Engage 360", "Shiprocket Capital", "Shiprocket Packaging",
        "Shiprocket Checkout", "Shiprocket Cargo", "Shiprocket Omuni",
        "Shiprocket Promise", "Shiprocket Amplify", "Shiprocket Quick",
        "Delivery Boost", "Shiprocket Sense", "Shiprocket Trends"
    ],
    features: [
        "Cash on Delivery", "Serviceable Pin Codes", "API Integration",
        "Multiple Pickup Locations", "Print Shipping Labels",
        "Email & SMS Notifications", "Amazon Self-Ship", "All Features"
    ],
    partner: ["Carrier", "Technology", "Become a Partner"],
    resources: [
        "Shipping Rate Calculator", "Volumetric Weight Calculator",
        "Free eCommerce Tools", "Knowledge Base", "Coupons", "FAQ's",
        "Developers", "Blog", "Web Stories", "Ebook", "Encyclopedia",
        "Videos and Podcast", "Showcase Your Brand", "Tech Sphere"
    ],
    company: ["About Us", "Contact Us", "Customers", "Careers", "Company Updates"],
    support: ["Help Center"]
};

const SocialIcon = ({ Icon, href }: { Icon: any, href: string }) => (
    <motion.a
        href={href}
        whileHover={{ y: -3, scale: 1.1 }}
        className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-black hover:bg-gray-200 transition-colors"
    >
        <Icon size={18} />
    </motion.a>
);

const FooterLink = ({ children }: { children: React.ReactNode }) => (
    <motion.li
        whileHover={{ x: 4 }}
        className="mb-2"
    >
        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors block">
            {children}
        </a>
    </motion.li>
);

const MobileAccordion = ({ title, items }: { title: string, items: string[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-zinc-800 lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 flex justify-between items-center text-white font-semibold text-lg"
            >
                <span>{title}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown size={20} className="text-gray-400" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <ul className="pb-5 pl-2">
                            {items.map(item => <FooterLink key={item}>{item}</FooterLink>)}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-white font-semibold text-lg mb-4 hidden lg:block">{children}</h3>
);

export default function App() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white pt-10">
            {/* Main Dark Footer Container with Rounded Corners */}
            <div className="bg-black text-white rounded-t-[30px] md:rounded-t-[40px] px-6 md:px-12 lg:px-20 pt-16 pb-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Column 1: Brand & Contact (Static on all screens) */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-purple-600 rounded-sm transform rotate-45 flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>
                            <span className="text-2xl font-bold tracking-tight">Shiprocket</span>
                        </div>

                        <div className="flex gap-4 mb-10">
                            <SocialIcon Icon={Facebook} href="#" />
                            <SocialIcon Icon={Twitter} href="#" />
                            <SocialIcon Icon={Instagram} href="#" />
                            <SocialIcon Icon={Youtube} href="#" />
                            <SocialIcon Icon={Linkedin} href="#" />
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-lg font-semibold border-b border-gray-800 pb-2 inline-block">Reach Us At</h4>

                            <div className="flex items-start gap-3 group cursor-pointer">
                                <Mail size={18} className="text-gray-400 mt-1 group-hover:text-purple-400" />
                                <p className="text-gray-400 text-sm group-hover:text-white transition-colors">support@shiprocket.com</p>
                            </div>

                            <div className="flex items-start gap-3 group cursor-pointer">
                                <Mail size={18} className="text-gray-400 mt-1 group-hover:text-purple-400" />
                                <p className="text-gray-400 text-sm group-hover:text-white transition-colors">sales@shiprocket.com</p>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                                <div className="text-sm text-gray-400">
                                    <div className="mb-4">
                                        <span className="text-white block font-medium mb-1">Registered Office Address:</span>
                                        <p>Plot No. B, Khasra No. 360, M.G. Road, Sultanpur, Gadaipur, Mehrauli, South Delhi 110030</p>
                                    </div>
                                    <div>
                                        <span className="text-white block font-medium mb-1">Corporate Office Address:</span>
                                        <p>Shiprocket 416, Udyog Vihar III, Sector 20, Gurugram, Haryana 122008</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 mb-10 lg:mb-0">
                            <h4 className="text-lg font-semibold mb-4">Download App</h4>
                            <div className="flex flex-wrap gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-zinc-800 transition-colors"
                                >
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-6" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-zinc-800 transition-colors"
                                >
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-6 invert" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Divider for mobile to separate info from links */}
                        <div className="border-t border-dashed border-zinc-700 my-8 lg:hidden"></div>
                    </div>

                    {/* Links Section - Accordion on Mobile, Grid on Desktop */}
                    <div className="lg:col-span-9">
                        {/* Mobile View: Accordion List */}
                        <div className="lg:hidden">
                            <MobileAccordion title="Products" items={footerData.products} />
                            <MobileAccordion title="Features" items={footerData.features} />
                            <MobileAccordion title="Partner" items={footerData.partner} />
                            <MobileAccordion title="Resources" items={footerData.resources} />
                            <MobileAccordion title="Company" items={footerData.company} />
                            <MobileAccordion title="Support" items={footerData.support} />
                        </div>

                        {/* Desktop View: Multi-column Grid */}
                        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
                            {/* Products */}
                            <div>
                                <SectionHeader>Products</SectionHeader>
                                <ul>
                                    {footerData.products.map(item => <FooterLink key={item}>{item}</FooterLink>)}
                                </ul>
                            </div>

                            {/* Features & Partner */}
                            <div>
                                <div className="mb-10">
                                    <SectionHeader>Features</SectionHeader>
                                    <ul>
                                        {footerData.features.map(item => <FooterLink key={item}>{item}</FooterLink>)}
                                    </ul>
                                </div>
                                <div>
                                    <SectionHeader>Partner</SectionHeader>
                                    <ul>
                                        {footerData.partner.map(item => <FooterLink key={item}>{item}</FooterLink>)}
                                    </ul>
                                </div>
                            </div>

                            {/* Resources */}
                            <div>
                                <SectionHeader>Resources</SectionHeader>
                                <ul>
                                    {footerData.resources.map(item => <FooterLink key={item}>{item}</FooterLink>)}
                                </ul>
                            </div>

                            {/* Company & Support */}
                            <div>
                                <div className="mb-10">
                                    <SectionHeader>Company</SectionHeader>
                                    <ul>
                                        {footerData.company.map(item => <FooterLink key={item}>{item}</FooterLink>)}
                                    </ul>
                                </div>
                                <div>
                                    <SectionHeader>Support</SectionHeader>
                                    <ul>
                                        {footerData.support.map(item => <FooterLink key={item}>{item}</FooterLink>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer Section */}
                <div className="mt-16 lg:mt-20 pt-8 border-t border-gray-800 flex flex-col items-center gap-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[13px] text-gray-500 text-center">
                        <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                        <span className="hidden md:inline text-gray-800">|</span>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <span className="hidden md:inline text-gray-800">|</span>
                        <a href="#" className="hover:text-white transition-colors">Compliance</a>
                        <span className="hidden md:inline text-gray-800">|</span>
                        <a href="#" className="hover:text-white transition-colors">Refund & Cancellation Policy</a>
                    </div>
                    <div className="text-gray-500 text-sm">
                        © {currentYear} Shiprocket. All rights reserved.
                    </div>
                </div>

            </div>
        </footer>
    );
}
