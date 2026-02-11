"use client";

import React from "react";
import { useParams } from "next/navigation";
import StickyCard from "@/components/cards/StickyCard";
import StickyScroll from "@/components/cards/StickyCard1";
import CardSlider from "@/components/cards/CardSlider";
import SliderCard1 from "@/components/cards/SliderCard1";

export default function CardPage() {
    const { slug } = useParams();

    if (slug === '1') {
        return <StickyCard />;
    }

    if (slug === '2') {
        return <StickyScroll />;
    }

    if (slug === '3') {
        return <CardSlider />;
    }

    if (slug === '4') {
        return <SliderCard1 />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Card {slug}</h1>
                <p className="text-gray-600">This is a placeholder for card {slug}. content is coming soon.</p>
            </div>
        </div>
    );
}
