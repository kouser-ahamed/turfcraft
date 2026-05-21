"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div
        className="
          relative w-full overflow-hidden mt-6 shadow-xl
          h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px]
          bg-cover bg-center bg-no-repeat rounded-2xl
        "
        style={{
          backgroundImage: "url('/assets/football.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
          <div className="w-full max-w-3xl px-6 sm:px-12 md:px-16 text-white">
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-black mb-3 md:mb-5 leading-tight tracking-tight">
              Play Without Limits. <br className="hidden sm:inline" />
              <span className="bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
                Book in Seconds.
              </span>
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base mb-6 md:mb-8 max-w-[280px] sm:max-w-md md:max-w-xl text-slate-200 font-normal leading-relaxed">
              Your ultimate sports facility booking platform. Reserve premium football turfs, cricket grounds, badminton courts, tennis courts, and swimming pools in real-time. Get instant confirmation, flexible cancellation, and 24/7 customer support.
            </p>

            <Link href="/all-facilities" passHref>
              <Button
                size="lg"
                className="bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 text-white font-semibold px-8 py-5 rounded-full hover:scale-[1.03] active:scale-[0.98] transition-all text-xs sm:text-sm shadow-lg shadow-emerald-900/20"
              >
                Explore Facilities
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;