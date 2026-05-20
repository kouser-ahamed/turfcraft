import { ManageEditModal } from "@/components/ManageEditModal";
import { ManageMyFacilitiesDelete } from "@/components/ManageMyFacilitiesDelete";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import {
  FiClock,
  FiDollarSign,
  FiLayers,
  FiMapPin,
  FiUsers,
  FiEdit3,
} from "react-icons/fi";

const ManageMyFacilities = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // user must be logged in to view their bookings then logout korle loginpage  ejbe

  if (!session?.user) {
    redirect("/login");
  }

  const user = session?.user;

  // token verify server side
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log("Token in FacilityDetailsPage:", token);

  // done token verify

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility/user/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const facilities = await res.json();

  return (
    <div className="min-h-[60vh] bg-[#f8fafc] py-12 antialiased">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pb-5 pt-5 border-b border-slate-200/60">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Manage My Facilities
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Manage your listed facilities, track operational status, and view
            details.
          </p>
        </div>

        <div>
          {facilities.length === 0 ? (
            <div className="text-center bg-white border border-slate-100 rounded-3xl p-16 shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 mb-4">
                <FiLayers className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                No Facilities Found
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                You haven&apos;t added any facility yet.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {facilities.map((facility) => {
                return (
                  <div
                    key={facility._id}
                    className="group bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] hover:border-slate-200/80 flex flex-col md:flex-row md:items-center gap-6"
                  >
                    <div className="relative h-44 w-full md:w-64 shrink-0 overflow-hidden rounded-2xl bg-slate-100 border border-slate-50">
                      {facility.imageUrl ? (
                        <Image
                          alt={facility.facilityName}
                          src={facility.imageUrl}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                          <FiLayers className="text-3xl" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-emerald-600 transition-colors">
                            {facility.facilityName}
                          </h2>
                          <div className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                            <FiMapPin className="text-rose-500" />
                            <span>{facility.location}</span>
                          </div>
                        </div>

                        <span className="inline-flex items-center rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                          • {facility.facilityType}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3 sm:grid-cols-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Price Rate
                          </p>
                          <p className="mt-0.5 text-lg font-black text-emerald-600 flex items-center">
                            <FiDollarSign className="text-base -mr-0.5" />
                            {facility.pricePerHour}
                            <span className="text-xs font-bold text-slate-400/80 ml-0.5">
                              /hr
                            </span>
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Capacity
                          </p>
                          <div className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-700">
                            <FiUsers className="text-slate-400" />
                            {facility.capacity}{" "}
                            <span className="font-medium text-slate-400">
                              Max
                            </span>
                          </div>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Available Slots
                          </p>
                          <div className="flex flex-col gap-1">
                            {facility.availableTimeSlots
                              ?.slice(0, 2)
                              .map((slot, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 w-fit"
                                >
                                  <FiClock className="text-slate-400 text-[10px]" />
                                  {slot}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 md:pt-0 border-t border-slate-100 md:border-none flex flex-row md:flex-col gap-2.5 w-full md:w-auto justify-end md:justify-center">
                      {/* Edit Button */}

                      <ManageEditModal facility={facility} />

                      {/* Fixed Delete Component */}
                      <ManageMyFacilitiesDelete facility={facility} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMyFacilities;
