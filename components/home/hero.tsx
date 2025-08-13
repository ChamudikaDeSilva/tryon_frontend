import Link from "next/link";
import React from "react";

export default function Hero(){
    return(
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Welcome to MyApp</h1>
            <p className="mb-6">Your one-stop solution for all your needs.</p>
            <Link href="/get-started" className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200">
                Get Started
            </Link>
        </div>
    )
}