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

  const {token} = await auth.api.getToken({
      headers:  await headers()
  });
  console.log("Token in FacilityDetailsPage:", token);
   // done token verify 
  const res = await fetch(`http://localhost:5000/booking/${user?.id}`,{
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  );

  const bookings = await res.json();
  console.log(bookings);


  const statusStyles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="min-h-[6  0vh] bg-[#f8fafc] py-8 antialiased">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
     
        <div className="mb-5 pb-5 pt-5 border-b border-slate-200/60">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            My Bookings
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Manage your reservations, track schedules, and view booking history.
          </p>
        </div>

        
        <div>
          {bookings.length === 0 ? (
            <div className="text-center bg-white border border-slate-100 rounded-3xl p-16 shadow-xs">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 mb-4">
                <FiCalendar className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Bookings Found</h3>
              <p className="mt-1 text-sm text-slate-400">
                You haven't reserved any facility yet.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {bookings.map((booking) => {
                
                const currentStatus = booking.status?.toLowerCase() || "pending";
                const badgeClass = statusStyles[currentStatus] || "bg-slate-50 text-slate-700 border-slate-200";

                return (
                  <div 
                    key={booking._id} 
                    className="group bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] hover:border-slate-200/80 flex flex-col md:flex-row md:items-center gap-6"
                  >
                    
                   
                    <div className="relative h-44 w-full md:w-64 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 border border-slate-50">
                      {booking.imageUrl ? (
                        <Image 
                          alt={booking.facilityName}
                          src={booking.imageUrl}
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
                            {booking.facilityName}
                          </h2>
                          <div className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                            <FiClock className="text-slate-400" />
                            <span>{booking.timeSlot}</span>
                          </div>
                        </div>

                        <span className={`inline-flex items-center rounded-xl border px-3 py-1 text-xs font-bold uppercase tracking-wider ${badgeClass}`}>
                          • {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-3 sm:grid-cols-3">
                        
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Date</p>
                          <div className="mt-1 flex items-center gap-1 text-sm font-bold text-slate-700">
                            <FiCalendar className="text-slate-400" />
                            {new Date(booking.bookingDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Duration</p>
                          <p className="mt-1 text-sm font-bold text-slate-700">
                            {booking.hours} <span className="font-medium text-slate-400">Hours</span>
                          </p>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Paid</p>
                          <p className="mt-0.5 text-lg font-black text-emerald-600 flex items-center">
                            <FiDollarSign className="text-base -mr-0.5" />
                            {booking.totalPrice}
                          </p>
                        </div>

                      </div>
                    </div>

                    <div className="pt-2 md:pt-0 border-t border-slate-50 md:border-none flex justify-end">
                  <BookingCancelAlert  booking={booking}/>
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