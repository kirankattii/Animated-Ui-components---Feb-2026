"use client";

import React from "react";
import { useParams } from "next/navigation";
import Hero1 from "@/components/heros/Hero1";
import Hero2 from "@/components/heros/Hero2";
import Hero3 from "@/components/heros/Hero3";

export default function HeroPage() {
    const { slug } = useParams();

    if (slug === '1') {
        return <Hero1 />;
    }
    if (slug === '2') {
        return <Hero2 />;
    }
    if (slug === '3') {
        return <Hero3 />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Hero {slug}</h1>
                <p className="text-gray-600">This is a placeholder for hero {slug}. content is coming soon.</p>
            </div>
        </div>
    );
}
