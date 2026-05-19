import AllFacilitiesCard from "@/components/shared/AllFacilitiesCard";
import React from "react";

const AllFacilities = async () => {
  const res = await fetch("http://localhost:5000/facility");
  const allFacilities = await res.json();

  console.log(allFacilities);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="pb-6 text-3xl font-bold text-slate-800">All Facilities</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {allFacilities.map((facility) => (
          <AllFacilitiesCard key={facility._id} facility={facility} />
        ))}
      </div>
    </div>
  );
};

export default AllFacilities;
