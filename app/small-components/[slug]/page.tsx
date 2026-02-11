"use client";

import React from "react";
import { useParams } from "next/navigation";
import Footer1 from "@/components/footers/Footer1";
import Accordian from "@/components/Accordian";
import SmallAnimation4 from "@/components/animations/SmallAnimation4";

export default function SmallComponentsPage() {
    const { slug } = useParams();

    if (slug === 'footer' || slug === '1') {
        return <Footer1 />;
    }

    if (slug === 'accordian' || slug === '2') {
        return <Accordian />;
    }

    if (slug === 'smallanimation4' || slug === '4') {
        return <SmallAnimation4 />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Small Components: {slug}</h1>
                <p className="text-gray-600">This is a placeholder for {slug}. Content is coming soon.</p>
            </div>
        </div>
    );
}
