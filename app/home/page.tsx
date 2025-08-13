import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/hero";
import React from "react";

export default function HomePage(){
    return(
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Navbar />
            <Hero />
        </main>
    )
}