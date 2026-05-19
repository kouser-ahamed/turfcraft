import BookingCard from "@/components/BookingCard";
import Image from "next/image";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";

const FacilityDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:5000/facility/${id}`
  );

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
  } = facility;

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-center text-4xl font-black text-slate-800">
            Facility Details
          </h1>

          <p className="mt-3 text-center text-slate-500">
            View complete information and reserve your preferred slot.
          </p>
        </div>

        {/* Main Container */}
        <div className="overflow-hidden rounded-[35px] bg-white shadow-2xl">
          
          {/* Banner */}
          <div className="relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={facilityName}
              width={1400}
              height={600}
              className="h-[260px] w-full object-cover md:h-[420px]"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Facility Type */}
            <div className="absolute right-5 top-5">
              <span className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-bold text-white shadow-lg">
                {facilityType}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-5 lg:p-8">
            
            {/* Left Side */}
            <div className="space-y-7 lg:col-span-3">
              
              {/* Name */}
              <div>
                <h2 className="text-4xl font-black text-slate-800">
                  {facilityName}
                </h2>

                {/* Location */}
                <div className="mt-4 flex items-center gap-2 text-slate-500">
                  <span className="text-2xl text-red-500">
                    <VscLocation />
                  </span>

                  <p className="text-lg">
                    {location}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                
                {/* Capacity */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center gap-4">
                    
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                      <MdOutlineReduceCapacity className="text-3xl text-emerald-600" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        Capacity
                      </p>

                      <h3 className="text-3xl font-black text-slate-800">
                        {capacity}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-semibold text-slate-500">
                    Price Per Hour
                  </p>

                  <h3 className="mt-3 text-4xl font-black text-emerald-600">
                    ${pricePerHour}

                    <span className="ml-1 text-lg font-medium text-slate-500">
                      /hr
                    </span>
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-3 text-2xl font-black text-slate-800">
                  Description
                </h3>

                <p className="leading-8 text-slate-600">
                  {description}
                </p>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="mb-4 text-2xl font-black text-slate-800">
                  Available Time Slots
                </h3>

                <div className="flex flex-wrap gap-3">
                  {availableTimeSlots?.map((slot, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-2">
              <BookingCard facility={facility} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;