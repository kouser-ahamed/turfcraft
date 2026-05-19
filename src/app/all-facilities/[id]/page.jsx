import { Button } from "@heroui/react";
import Image from "next/image";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";

const FacilityDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/facility/${id}`);
  const facility = await res.json();

  const {
    facilityName,
    facilityType,
    imageUrl,
    location,
    pricePerHour,
    capacity,
    description,
    availableTimeSlots,
    _id,
  } = facility;

  console.log(facility, "deatails Page");

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      
      <h1 className="mb-6 text-center text-3xl font-bold text-slate-800">
        Facility Details
      </h1>

      {/* Card */}
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lg">
        
        {/* Image */}
        <div className="relative">
          <Image
            src={imageUrl}
            alt={facilityName}
            width={1000}
            height={500}
            className="h-[300px] w-full object-cover md:h-[420px]"
          />

          {/* Facility Type */}
          <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white">
            {facilityType}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-5 p-6">
          
          {/* Name */}
          <h2 className="text-3xl font-bold text-slate-800">
            {facilityName}
          </h2>

          {/* Location */}
          <div className="flex items-center gap-2 text-slate-500">
            <span className="text-xl text-red-500">
              <VscLocation />
            </span>
            <p>{location}</p>
          </div>

          {/* Capacity  Price */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 text-slate-700">
              <MdOutlineReduceCapacity className="text-2xl text-emerald-600" />
              <span className="font-medium">
                Capacity: {capacity}
              </span>
            </div>

            <div className="text-2xl font-bold text-emerald-600">
              ${pricePerHour}/hr
            </div>
          </div>

          {/* Description */}
          <p className="leading-7 text-slate-600">
            {description}
          </p>

          {/* Time Slots */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-slate-800">
              Available Time Slots
            </h3>

            <div className="flex flex-wrap gap-2">
              {availableTimeSlots?.map((slot, index) => (
                <span
                  key={index}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>

          {/* Button */}
          <Button className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-white hover:bg-emerald-600">
            Book Now
          </Button>

        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;