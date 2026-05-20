import FacilitySearchFilter from "@/components/FacilitySearchFilter";
import React from "react";

const AllFacilities = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`);
  const allFacilities = await res.json();

  console.log(allFacilities);

  return <FacilitySearchFilter initialFacilities={allFacilities} />;
};

export default AllFacilities;
