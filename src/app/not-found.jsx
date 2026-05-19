"use client";

import React from "react";
import { Button } from "@heroui/react";
import { HiOutlineHome, HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-radial from-slate-50 to-slate-100/80 px-4 py-12 selection:bg-emerald-500/10 selection:text-emerald-600">
      <div className="max-w-xl w-full text-center space-y-8 relative">
        
        {/* Background Decorative Blur Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl -z-10 animate-pulse duration-3000" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-teal-400/5 rounded-full blur-2xl -z-10 animate-bounce duration-4000" />

        {/* Big 404 Badge with Premium Shadow */}
        <div className="relative inline-block select-none">
          <h1 className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-slate-800 to-slate-900 drop-shadow-sm">
            404
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold uppercase tracking-widest text-emerald-600 shadow-xs">
            Page Not Found
          </div>
        </div>

        {/* Friendly Error Message */}
        <div className="space-y-3 max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Oops! You've gone off-side.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back in the game!
          </p>
        </div>

        {/* Visual Cue / Icon Grid Placeholder */}
        <div className="flex justify-center items-center gap-4 text-slate-300 py-2">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-slate-200" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40 animate-ping" />
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-slate-200" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-sm mx-auto">
          {/* Go Back Button */}
          <Button
            onClick={() => router.back()}
            variant="bordered"
            className="w-full sm:w-auto h-12 px-6 rounded-xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.98]"
            startContent={<HiOutlineArrowLeft className="text-base" />}
          >
            Go Back
          </Button>

          {/* Back Home Button */}
          <Link href="/" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-emerald-600/10 active:scale-[0.98]"
              startContent={<HiOutlineHome className="text-base" />}
            >
              Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}