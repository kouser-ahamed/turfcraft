import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { FiCalendar, FiClock, FiDollarSign, FiLayers } from "react-icons/fi";

const MyBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // user must be logged in to view their bookings then logout korle loginpage  ejbe
  if (!session?.user) {
    redirect("/login");
  }

  const user = session?.user;

  console.log(user);

  // token verify server side

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log("Token in FacilityDetailsPage:", token);

  // done token verify
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const bookings = await res.json();
  console.log(bookings);

  const statusStyles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const statusTone = {
    pending: "from-amber-400 to-amber-500 text-amber-900",
    approved: "from-emerald-400 to-emerald-600 text-emerald-900",
    confirmed: "from-sky-400 to-emerald-500 text-sky-900",
    cancelled: "from-rose-400 to-rose-600 text-rose-900",
  };

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.06),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#f8fafc_100%)] min-h-screen py-10">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px)] bg-size-[42px_42px] opacity-30" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-2xl border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                My Bookings
              </h1>
              <p className="mt-2 text-sm font-medium text-slate-600">
                Manage your reservations, track schedules, and view booking history.
              </p>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <div className="rounded-2xl border border-emerald-100 bg-linear-to-br from-white to-emerald-50 px-4 py-2 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-600">Total</p>
                <p className="text-xl font-black text-slate-900">{bookings.length}</p>
              </div>
              <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white">New Booking</Button>
            </div>
          </div>
        </div>

        <div>
          {bookings.length === 0 ? (
            <div className="text-center rounded-[1.5rem] border border-slate-100 bg-white/80 p-12 shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <FiCalendar className="text-2xl" />
              </div>
              <h3 className="text-xl font-black text-slate-900">No Bookings Found</h3>
              <p className="mt-2 text-sm text-slate-600">You haven't reserved any facility yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => {
                const currentStatus = booking.status?.toLowerCase() || "pending";
                const badgeClass = statusStyles[currentStatus] || "bg-slate-50 text-slate-700 border-slate-200";
                const tone = statusTone[currentStatus] || "from-emerald-400 to-sky-400 text-emerald-900";

                return (
                  <div key={booking._id} className="group overflow-hidden rounded-2xl border border-white/70 bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_24px_70px_rgba(15,23,42,0.09)]">
                    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-5">
                      <div className="relative h-44 w-full md:w-64 shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-50">
                        {booking.imageUrl ? (
                          <Image alt={booking.facilityName} src={booking.imageUrl} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-300">
                            <FiLayers className="text-3xl" />
                          </div>
                        )}
                        <div className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-linear-to-r ${tone} shadow-lg`}>{booking.facilityType}</div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h2 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">{booking.facilityName}</h2>
                              <div className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <FiClock className="text-slate-400" />
                                <span>{booking.timeSlot}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${badgeClass}`}>
                                • {booking.status}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-50 pt-3 sm:grid-cols-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Date</p>
                              <div className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-700">
                                <FiCalendar className="text-slate-400" />
                                {new Date(booking.bookingDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                              </div>
                            </div>

                            <div>
                              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Duration</p>
                              <p className="mt-1 text-sm font-bold text-slate-700">{booking.hours} <span className="font-medium text-slate-400">Hours</span></p>
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Paid</p>
                              <p className="mt-0.5 text-lg font-black text-emerald-600 flex items-center"><FiDollarSign className="text-base -mr-0.5" />{booking.totalPrice}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end md:justify-end">
                          <BookingCancelAlert booking={booking} />
                        </div>
                      </div>
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

export default MyBookings;
