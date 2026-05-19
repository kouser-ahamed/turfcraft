"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { FiCalendar, FiUser, FiLayers } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const BookingCard = ({ facility }) => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const facilityName = facility?.facilityName || "";
  const imageUrl = facility?.imageUrl || "";

  const facilityId = facility?._id || "";

  const pricePerHour = Number(facility?.pricePerHour || 0);

  const availableTimeSlots = Array.isArray(facility?.availableTimeSlots)
    ? facility.availableTimeSlots
    : [];

  const [bookingDate, setBookingDate] = useState("");

  const [timeSlot, setTimeSlot] = useState("");

  const [hours, setHours] = useState("");

  const [loading, setLoading] = useState(false);

  const totalPrice = Number(hours || 0) * pricePerHour;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please login first", {
        position: "top-right",
        autoClose: 1000,
      });

      return;
    }

    const bookingData = {
      facilityId,
      facilityName,

      bookingDate,
      timeSlot,
      imageUrl,

      hours: Number(hours),

      totalPrice,

      userId: user?.id,
      userEmail: user?.email,

      createdAt: new Date(),

      status: "pending",
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Booking successful!", {
          position: "top-right",
          autoClose: 1000,
        });

        setBookingDate("");
        setTimeSlot("");
        setHours("");
      }
    } catch (error) {
      console.log(error);

      toast.error("Booking failed!", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-100/70 ring-1 ring-slate-100">
     
      <div className="mb-6 border-b border-slate-50 pb-4">
        <h2 className="text-2xl font-black tracking-tight text-slate-800">
          Reserve Your Slot
        </h2>
        <p className="mt-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider">
          Instant Confirmation Booking
        </p>
      </div>

    
      <form onSubmit={handleSubmit} className="space-y-5">
        
       
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <FiLayers className="text-slate-400" />
            Facility Name
          </label>
          <input
            type="text"
            value={facilityName}
            readOnly
            className="h-12 w-full rounded-xl border border-slate-100 bg-slate-50 px-4 text-sm font-semibold text-slate-600 outline-none cursor-not-allowed select-none"
          />
        </div>

       
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <FiCalendar className="text-slate-400" />
            Booking Date
          </label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
            className="h-12 w-full rounded-xl border border-slate-200/80 bg-white px-4 text-sm text-slate-700 outline-none transition duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 hover:border-slate-300"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <FaRegClock className="text-slate-400" />
            Select Time Slot
          </label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            className="h-12 w-full rounded-xl border border-slate-200/80 bg-white px-4 text-sm text-slate-700 outline-none transition duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 hover:border-slate-300 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat"
          >
            <option value="">Select a time slot</option>
            {availableTimeSlots?.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

       
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <FiUser className="text-slate-400" />
            Booking Duration (Hours)
          </label>
          <input
            type="number"
            min="1"
            required
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="e.g., 2"
            className="h-12 w-full rounded-xl border border-slate-200/80 bg-white px-4 text-sm text-slate-700 outline-none transition duration-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 hover:border-slate-300"
          />
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 transition-all duration-300">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span className="bg-white px-2 py-1 rounded-md border border-slate-100 shadow-xs">
              ${pricePerHour}/hr × {hours || 0} hr
            </span>
            <span className="font-semibold text-slate-600">${totalPrice}</span>
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-emerald-100/60 pt-3">
            <h3 className="text-sm font-bold text-slate-700">Total Price</h3>
            <p className="text-3xl font-black tracking-tight text-emerald-600">
              ${totalPrice}
            </p>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={loading}
          className="h-12 w-full rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-md shadow-emerald-600/10 transition-all duration-200 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-700/20 active:scale-[0.99]"
        >
          Confirm & Pay
        </Button>
      </form>
    </div>
  );
};

export default BookingCard;