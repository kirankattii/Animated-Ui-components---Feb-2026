"use client";

import React from "react";
import { useParams } from "next/navigation";
import Grid1 from "@/components/grids/Grid1";
import Grid2 from "@/components/grids/Grid2";
import Grid3 from "@/components/grids/Grid3";
import Grid4 from "@/components/grids/Grid4";

export default function GridPage() {
    const { slug } = useParams();

    if (slug === '1') {
        return <Grid1 />;
    }
    if (slug === '2') {
        return <Grid2 />;
    }
    if (slug === '3') {
        return <Grid3 />;
    }
    if (slug === '4') {
        return <Grid4 />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Grid {slug}</h1>
                <p className="text-gray-600">This is a placeholder for grid {slug}. content is coming soon.</p>
            </div>
        </div>
    );
}
