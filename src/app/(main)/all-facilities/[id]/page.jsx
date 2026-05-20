import BookingCard from "@/components/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { MdOutlineReduceCapacity, MdAttachMoney } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";

const FacilityDetailsPage = async ({ params }) => {
  const { id } = await params;

  const {token} = await auth.api.getToken({
    headers:  await headers()
});
console.log("Token in FacilityDetailsPage:", token);

  const res = await fetch(`http://localhost:5000/facility/${id}`,{
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4 mt-20">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-50">
            <span className="text-4xl text-yellow-300">
              <HiOutlineEmojiSad />
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-black text-slate-900">
            Facility Not Found
          </h1>

          <p className="mt-3 text-base leading-7 text-slate-500">
            Sorry, the facility details page you are looking for does not exist
            or may have been removed.
          </p>

          <div className="mt-8">
            <Link
              href="/all-facilities"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-emerald-700"
            >
              Browse Facilities
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-slate-50/50 py-12 antialiased">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 items-start">
          <div className="lg:col-span-3 space-y-8">
            <div className="relative overflow-hidden rounded-3xl bg-slate-200 shadow-md ring-1 ring-slate-100">
              <Image
                src={imageUrl}
                alt={facilityName}
                width={1400}
                height={600}
                className="h-[300px] w-full object-cover sm:h-[400px] lg:h-[460px] transition-transform duration-700 hover:scale-[1.02]"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

              <div className="absolute left-6 top-6">
                <span className="inline-flex items-center rounded-xl bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800 backdrop-blur-md shadow-sm ring-1 ring-black/5">
                  {facilityType}
                </span>
              </div>
            </div>

            <div className="border-b border-slate-100 pb-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {facilityName}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-slate-500">
                <VscLocation className="text-xl flex-shrink-0 text-rose-500" />
                <p className="text-base font-medium sm:text-lg text-slate-600">
                  {location}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200/80">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                    <MdOutlineReduceCapacity className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Capacity
                    </p>
                    <h3 className="text-2xl font-black text-slate-800 mt-0.5">
                      {capacity}{" "}
                      <span className="text-sm font-normal text-slate-500">
                        People
                      </span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200/80">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
                    <MdAttachMoney className="text-2xl" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Price Rate
                    </p>
                    <h3 className="text-2xl font-black text-slate-800 mt-0.5">
                      ${pricePerHour}
                      <span className="text-sm font-medium text-slate-400">
                        {" "}
                        / hr
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-3 mb-4">
                About this Facility
              </h3>
              <p className="text-base leading-7 text-slate-600 font-normal">
                {description}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-3 mb-4">
                Available Time Slots
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {availableTimeSlots?.map((slot, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-2.5 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-50"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:sticky lg:top-8">
            <BookingCard facility={facility} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetailsPage;
