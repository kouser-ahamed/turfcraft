import FacilitySearchFilter from "@/components/FacilitySearchFilter";
import React from "react";

const AllFacilities = async () => {
  const res = await fetch("http://localhost:5000/facility");
  const allFacilities = await res.json();

  console.log(allFacilities);

  return <FacilitySearchFilter initialFacilities={allFacilities} />;
};

export default AllFacilities;
