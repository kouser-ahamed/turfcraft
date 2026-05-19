"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const BookingCard = ({ facility }) => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const facilityName = facility?.facilityName || "";

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
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-xl lg:sticky lg:top-24">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-black text-slate-800">
          Reserve Your Slot
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Complete the form below to confirm your booking.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Facility */}
        <div>
          <label className="mb-2 block text-sm font-bold uppercase text-slate-500">
            Facility Name
          </label>

          <input
            type="text"
            value={facilityName}
            readOnly
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 text-sm font-medium text-slate-700 outline-none"
          />
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold uppercase text-slate-500">
            <FiCalendar />
            Booking Date
          </label>

          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {/* Slot */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold uppercase text-slate-500">
            <FaRegClock />
            Time Slot
          </label>

          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          >
            <option value="">Select a time slot</option>

            {availableTimeSlots?.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="mb-2 block text-sm font-bold uppercase text-slate-500">
            Booking Duration
          </label>

          <input
            type="number"
            min="1"
            required
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Enter booking duration"
            className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {/* Total */}
        <div className="rounded-3xl bg-emerald-50 p-5">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>
              ${pricePerHour}/hr × {hours || 0} hr
            </span>

            <span>${totalPrice}</span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-800">Total Price</h3>

            <p className="text-4xl font-black text-emerald-600">
              ${totalPrice}
            </p>
          </div>
        </div>

        {/* Button */}
        <Button
          type="submit"
          isLoading={loading}
          className="h-14 w-full rounded-2xl bg-emerald-600 text-base font-bold text-white transition hover:bg-emerald-700"
        >
          Confirm Booking
        </Button>
      </form>
    </div>
  );
};

export default BookingCard;
