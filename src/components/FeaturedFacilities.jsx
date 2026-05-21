"use client";

import React, { useEffect, useState } from "react";
import AllFacilitiesCard from "./shared/AllFacilitiesCard";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const FeaturedFacilities = () => {
  const [topFeaturedFacilities, setTopFeaturedFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchFacilities = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`);
        if (!res.ok) throw new Error("fetch failed");
        const all = await res.json();
        if (!mounted) return;
        setTopFeaturedFacilities(all.slice(0, 6));
      } catch (err) {
        console.error("Failed to load facilities:", err);
        if (mounted) setTopFeaturedFacilities([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchFacilities();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black mb-3 bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
          Featured Facilities
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          Discover our top-rated sports facilities, hand-picked for exceptional quality and amenities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <div className="col-span-full">
            <div className="animate-pulse space-y-6">
              <div className="mx-auto max-w-xl rounded-2xl border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <div className="h-6 w-48 rounded-full bg-linear-to-r from-emerald-200 via-sky-200 to-amber-200" />
                <div className="mt-4 h-4 w-3/4 rounded-full bg-linear-to-r from-slate-200 to-emerald-100" />
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl"
                  >
                    <div className="h-44 animate-pulse bg-linear-to-br from-emerald-100 via-sky-100 to-amber-100" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 w-3/4 rounded-full bg-linear-to-r from-emerald-200 to-sky-200" />
                      <div className="h-7 w-5/6 rounded-2xl bg-linear-to-r from-slate-200 to-emerald-100" />
                      <div className="h-10 rounded-2xl bg-linear-to-br from-slate-100 via-white to-sky-50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : topFeaturedFacilities.length > 0 ? (
          topFeaturedFacilities.map((facility) => (
            <AllFacilitiesCard key={facility._id || facility.id} facility={facility} />
          ))
        ) : (
          <div className="col-span-full py-12">
            <div className="mx-auto max-w-xl rounded-2xl border border-white/70 bg-white/90 p-8 shadow-lg text-center">
              <div className="flex items-center justify-center mb-4">
                <svg className="h-20 w-20 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="7" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" />
                  <path d="M7 11l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">No Featured Facilities</h3>
              <p className="text-sm text-slate-600 mb-6">We could not find any featured venues right now. Check back later or explore all facilities below.</p>

              {/* <div className="flex items-center justify-center gap-4">
                <Link
                  href="/all-facilities"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 text-white font-semibold shadow-md hover:shadow-lg transition"
                >
                  Explore All Facilities
                  <span aria-hidden className="ml-1">→</span>
                </Link>
              </div> */}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Link 
          href="/all-facilities"
          className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Explore All Facilities
          <FiArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFacilities;