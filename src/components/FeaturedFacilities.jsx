import React from "react";
import AllFacilitiesCard from "./shared/AllFacilitiesCard";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const FeaturedFacilities = async () => {
  let topFeaturedFacilities = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`, {
      cache: "no-store",
    });

    if (res.ok) {
      const allFacilities = await res.json();
      topFeaturedFacilities = allFacilities.slice(0, 6);
    }
  } catch (error) {
    console.error("Failed to load facilities:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black mb-3 bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
          Featured Facilities
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-base">
          Discover our top-rated sports facilities, hand-picked for exceptional quality and amenities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {topFeaturedFacilities.length > 0 ? (
          topFeaturedFacilities.map((facility) => (
            <AllFacilitiesCard key={facility._id || facility.id} facility={facility} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500 text-lg">No facilities available at the moment.</p>
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