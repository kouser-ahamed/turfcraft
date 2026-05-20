"use client";

import React from "react";
import { Button } from "@heroui/react";
import {
  HiOutlineHome,
  HiOutlineArrowLeft,
  HiOutlineSparkles,
} from "react-icons/hi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-[-120px] left-[-120px] h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-teal-300/10 blur-3xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-emerald-300/10 blur-2xl animate-bounce" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb20_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb20_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/60 bg-white/70 p-8 sm:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
        
        {/* Top Badge */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 shadow-sm">
            <HiOutlineSparkles className="text-sm" />
            Error 404
          </div>
        </div>

        {/* 404 Text */}
        <div className="relative text-center">
          <h1 className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-[110px] font-black leading-none tracking-[-8px] text-transparent sm:text-[170px]">
            404
          </h1>

          {/* Glow Effect */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
        </div>

        {/* Message */}
        <div className="mx-auto mt-6 max-w-xl text-center">
          <h2 className="text-2xl font-black tracking-tight text-slate-800 sm:text-4xl">
            Oops! This page disappeared.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
            The page you are trying to access may have been removed,
            renamed, or temporarily unavailable. Don't worry — you can
            easily return to the homepage or go back to the previous page.
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-slate-200" />
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-slate-200" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          
          {/* Go Back */}
          <Button
            onClick={() => router.back()}
            variant="bordered"
            className="h-12 w-full rounded-2xl border-slate-200 bg-white px-7 text-xs font-bold uppercase tracking-wider text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 sm:w-auto"
            startContent={<HiOutlineArrowLeft className="text-lg" />}
          >
            Go Back
          </Button>

          {/* Home */}
          <Link href="/" className="w-full sm:w-auto">
            <Button
              className="h-12 w-full rounded-2xl bg-emerald-600 px-7 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 sm:w-auto"
              startContent={<HiOutlineHome className="text-lg" />}
            >
              Back Home
            </Button>
          </Link>
        </div>

        {/* Bottom Tiny Text */}
        <p className="mt-10 text-center text-xs font-medium tracking-wide text-slate-400">
          Lost in the field? We’ll guide you back ⚽
        </p>
      </div>
    </div>
  );
}