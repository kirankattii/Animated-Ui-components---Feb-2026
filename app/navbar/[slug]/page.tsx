"use client";

import React from "react";
import { useParams } from "next/navigation";
import Navbar1 from "@/components/navbars/Navbar1";
import Navbar2 from "@/components/navbars/Navbar2";
import Navbar3 from "@/components/navbars/Navbar3";

export default function NavbarDynamicPage() {
    const { slug } = useParams();

    if (slug === '1') {
        return <Navbar1 />;
    }

    if (slug === '2') {
        return <Navbar2 />;
    }

    if (slug === '3') {
        return <Navbar3 />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-xl shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Navbar {slug}</h1>
                <p className="text-gray-600">This is a placeholder for navbar {slug}. content is coming soon.</p>
            </div>
        </div>
    );
}

