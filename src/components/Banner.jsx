"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="container mx-auto">
      <div
        className="
          relative w-full overflow-hidden mt-8 shadow-2xl
          h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]
          bg-cover bg-center bg-no-repeat rounded-md
        "
        style={{
          backgroundImage: "url('/assets/football.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent flex items-center">
          <div className="w-full px-6 sm:px-12 md:px-16 text-white">
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold mb-3 md:mb-6 max-w-full leading-[1.1] tracking-tight whitespace-nowrap">
              Play Without Limits. Book in Seconds.
            </h1>
            <p className="text-sm sm:text-lg md:text-xl mb-6 md:mb-8 max-w-[250px] sm:max-w-sm md:max-w-xl text-gray-300 leading-relaxed">
              Discover and reserve premium football turfs, indoor badminton courts, swimming lanes, and tennis courts near you. Experience seamless scheduling, instant slot confirmation, and hassle-free booking management—all in one premium platform.
            </p>

            <Link href="/all-facilities" passHref>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#1da3b8] to-[#b29642] text-white font-bold px-8 py-6 rounded-full hover:scale-105 transition-transform text-sm sm:text-base shadow-xl"
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