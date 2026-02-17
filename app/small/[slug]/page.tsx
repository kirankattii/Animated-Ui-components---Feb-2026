"use client";

import React from "react";
import { useParams } from "next/navigation";
import SmallAnimation1 from "@/components/animations/SmallAnimation1";
import SmallAnimation2 from "@/components/animations/SmallAnimation2";
import SmallAnimation3 from "@/components/animations/SmallAnimation3";
import SmallAnimation5 from "@/components/animations/SmallAnimation5";

export default function SmallAnimationPage() {
    const { slug } = useParams();

    if (slug === '1') {
        return <SmallAnimation1 />;
    }

    if (slug === '2') {
        return <SmallAnimation2 />;
    }


    if (slug === '3') {
        return <SmallAnimation3 />;
    }

    if (slug === 'smallanimation5' || slug === '5') {
        return <SmallAnimation5 />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Small Animation {slug}</h1>
                <p className="text-gray-600">This is a placeholder for small animation {slug}. Content is coming soon.</p>
            </div>
        </div>
    );
}
