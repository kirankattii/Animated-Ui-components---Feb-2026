"use client";

import React from "react";
import { useParams } from "next/navigation";
import ScrollAnimation1 from "@/components/animations/ScrollAnimation1";

import ScrollAnimation2 from "@/components/animations/ScrollAnimation2";

import ScrollAnimation3 from "@/components/animations/ScrollAnimation3";
import ScrollAnimation6 from "@/components/animations/ScrollAnimation6";
import ScrollAnimation7 from "@/components/animations/ScrollAnimation7";
import ScrollAnimation8 from "@/components/animations/ScrollAnimation8";
import ScrollAnimation9 from "@/components/animations/ScrollAnimation9";
import ScrollAnimation10 from "@/components/animations/ScrollAnimation10";
import SplitGalleryScrollAnimation from "@/components/animations/SplitGalleryScrollAnimation";

export default function AnimationPage() {
    const { slug } = useParams();

    if (slug === '1') {
        return <ScrollAnimation1 />;
    }

    if (slug === '2') {
        return <ScrollAnimation2 />;
    }

    if (slug === '3') {
        return <ScrollAnimation3 />;
    }

    if (slug === '6') {
        return <ScrollAnimation6 />;
    }

    if (slug === '7') {
        return <ScrollAnimation7 />;
    }

    if (slug === '8') {
        return <ScrollAnimation8 />;
    }

    if (slug === '9') {
        return <ScrollAnimation9 />;
    }

    if (slug === '10') {
        return <ScrollAnimation10 />;
    }

    if (slug === '11') {
        return <SplitGalleryScrollAnimation />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Animation {slug}</h1>
                <p className="text-gray-600">This is a placeholder for animation {slug}. Content is coming soon.</p>
            </div>
        </div>
    );
}
