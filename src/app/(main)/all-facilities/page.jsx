import FacilitySearchFilter from "@/components/FacilitySearchFilter";
import React from "react";

export const dynamic = "force-dynamic";

const AllFacilities = async () => {
  let allFacilities = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`, {
      cache: "no-store",
    });

    if (res.ok) {
      allFacilities = await res.json();
    }
  } catch (error) {
    console.error("Failed to load facilities:", error);
  }

  console.log(allFacilities);

  return <FacilitySearchFilter initialFacilities={allFacilities} />;
};

export default AllFacilities;
