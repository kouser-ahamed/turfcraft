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
  FiCheckCircle,
  FiZap,
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility-user/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const facilities = await res.json();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-size-[40px_40px] opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-linear-to-r from-emerald-50 via-sky-50 to-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                📊 Facility Manager
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Manage Your Facilities
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
                View all your listed venues, update details, manage availability, and track your facility performance in one dashboard.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
              <div className="rounded-2xl border-2 border-emerald-200 bg-linear-to-br from-emerald-50/60 to-emerald-100/40 px-4 py-3 shadow-md shadow-emerald-200/30">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 flex items-center gap-2">
                  <FiMapPin className="text-sm text-emerald-700" />
                  Active Facilities
                </p>
                <p className="mt-2 text-3xl font-black bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{facilities.length}</p>
              </div>
              <div className="rounded-2xl border-2 border-sky-200 bg-linear-to-br from-sky-50/60 to-sky-100/40 px-4 py-3 shadow-md shadow-sky-200/30">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-700 flex items-center gap-2">
                  <FiZap className="text-sm text-sky-700" />
                  Ready to Book
                </p>
                <p className="mt-2 text-sm font-bold text-slate-900">{facilities.length > 0 ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          {facilities.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[2rem] border border-white/70 bg-white/80 p-16 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-emerald-100 to-sky-100 text-emerald-600 mb-6">
                <FiLayers className="text-3xl" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                No Facilities Yet
              </h3>
              <p className="mt-2 text-center text-slate-600 max-w-sm">
                You haven&apos;t added any sports facility yet. Start earning today by listing your first venue!
              </p>
              <Link href="/add-facility" className="mt-6">
                <Button className="bg-linear-to-r from-emerald-500 via-teal-500 to-sky-500 text-white font-bold rounded-2xl px-8 py-6 shadow-lg shadow-emerald-500/30 hover:shadow-2xl transition-all">
                  ➕ Add Your First Facility
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              {facilities.map((facility) => {
                const facilityTypeColors = {
                  Football: "from-emerald-500 to-lime-500",
                  Badminton: "from-amber-500 to-orange-500",
                  Swimming: "from-sky-500 to-cyan-500",
                  Tennis: "from-lime-500 to-green-500",
                  Volleyball: "from-rose-500 to-pink-500",
                };

                const typeColor = facilityTypeColors[facility.facilityType] || "from-slate-500 to-slate-600";

                return (
                  <div
                    key={facility._id}
                    className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:border-white/90 flex flex-col md:flex-row md:items-center gap-6 p-6"
                  >
                    <div className="relative h-48 w-full md:h-56 md:w-72 shrink-0 overflow-hidden rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 border border-white/50">
                      {facility.imageUrl ? (
                        <Image
                          alt={facility.facilityName}
                          src={facility.imageUrl}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
                          <FiLayers className="text-4xl text-slate-300" />
                        </div>
                      )}
                      <div className={`absolute inset-0 bg-linear-to-t ${typeColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    </div>

                    <div className="flex-1 space-y-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h2 className="text-2xl font-black text-slate-900 tracking-tight group-hover:bg-linear-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                            {facility.facilityName}
                          </h2>
                          <div className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                            <FiMapPin className="text-emerald-500" />
                            <span>{facility.location}</span>
                          </div>
                        </div>

                        <span className={`inline-flex items-center rounded-2xl bg-linear-to-r ${typeColor} px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20`}>
                          <FiLayers className="mr-2" /> {facility.facilityType}
                        </span>
                      </div>

                      <div className="grid gap-4 border-t border-white/50 pt-5 sm:grid-cols-4">
                        <div className="rounded-2xl border border-emerald-100/50 bg-linear-to-br from-emerald-50/60 to-emerald-100/30 p-4">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
                            <FiDollarSign className="text-[12px]" />
                            Price
                          </p>
                          <p className="mt-2 text-2xl font-black text-emerald-600">
                            ${facility.pricePerHour}
                            <span className="text-xs font-bold text-emerald-600/70 ml-1">
                              /hr
                            </span>
                          </p>
                        </div>

                        <div className="rounded-2xl border border-sky-100/50 bg-linear-to-br from-sky-50/60 to-sky-100/30 p-4">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-sky-700 flex items-center gap-2">
                            <FiUsers className="text-[12px]" />
                            Capacity
                          </p>
                          <p className="mt-2 text-2xl font-black text-sky-600">
                            {facility.capacity}
                            <span className="text-xs font-bold text-sky-600/70 ml-1">
                              Max
                            </span>
                          </p>
                        </div>

                        <div className="rounded-2xl border border-amber-100/50 bg-linear-to-br from-amber-50/60 to-amber-100/30 p-4">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-2">
                            <FiClock className="text-[12px]" />
                            Slots
                          </p>
                          <p className="mt-2 text-2xl font-black text-amber-600">
                            {facility.availableTimeSlots?.length || 0}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-rose-100/50 bg-linear-to-br from-rose-50/60 to-rose-100/30 p-4">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-2">
                            <FiCheckCircle className="text-[12px]" />
                            Status
                          </p>
                          <p className="mt-2 text-sm font-bold text-rose-600">
                            Active
                          </p>
                        </div>
                      </div>

                      {facility.availableTimeSlots && facility.availableTimeSlots.length > 0 && (
                        <div className="border-t border-white/50 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5 flex items-center gap-2">
                            <FiClock className="text-[12px]" />
                            Time Slots
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {facility.availableTimeSlots.slice(0, 4).map((slot, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-linear-to-r from-emerald-100/70 to-sky-100/70 px-3 py-1.5 rounded-full border border-emerald-200/50"
                              >
                                <FiClock className="text-[10px]" />
                                {slot}
                              </div>
                            ))}
                            {facility.availableTimeSlots.length > 4 && (
                              <div className="text-xs font-bold text-slate-500 px-3 py-1.5">
                                +{facility.availableTimeSlots.length - 4} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 md:pt-0 border-t border-white/50 md:border-none flex flex-col gap-3 w-full md:w-auto">
                      <ManageEditModal facility={facility} />
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
