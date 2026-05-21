"use client";

import { useEffect, useState } from "react";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdAdd, MdSportsSoccer } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiImage, FiUsers } from "react-icons/fi";
import { TbCurrencyDollar } from "react-icons/tb";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AddFacilityPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log("Current User:", user);

 //  user ke login e pathabe jodi user logout kore jai tahole login page e chole jabe client side authentication check
  const router = useRouter();

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (!user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  // end of authentication check

  const [timeSlots, setTimeSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState("");

  const handleAddSlot = () => {
    const trimmedSlot = currentSlot.trim();

    if (!trimmedSlot) return;

    if (timeSlots.includes(trimmedSlot)) {
      toast.error(
        "This time slot is already added. Please choose another slot.",
        {
          position: "top-right",
          autoClose: 1500,
        },
      );
      return;
    }

    setTimeSlots((prev) => [...prev, trimmedSlot]);

    setCurrentSlot("");
  };

  const handleRemoveSlot = (indexToRemove) => {
    setTimeSlots((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (timeSlots.length === 0) {
      toast.error("Please add at least one time slot", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    const formData = new FormData(form);
    const faceilityData = Object.fromEntries(formData.entries());

    const priceVal = Number(faceilityData.pricePerHour);
    const capacityVal = Number(faceilityData.capacity);

    if (isNaN(priceVal) || priceVal <= 0) {
      toast.error("Price per hour must be a positive number", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    if (isNaN(capacityVal) || capacityVal <= 0) {
      toast.error("Capacity must be a positive number", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    const payload = {
      ...faceilityData,
      availableTimeSlots: timeSlots,
      userId: user?.id || "",
      userEmail: user?.email || "",
    };

    console.log(payload);

    // token data contains the token and other info, we need tokenData.token for authorization header
    // const {data:tokenData} = await authClient.token();
    // authorization: `Bearer ${tokenData?.token}`

    const {data:tokenData} = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },

      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Server Response:", data);

    if (res.ok) {
      toast.success("Facility added successfully!", {
        position: "top-right",
        autoClose: 1000,
      });

      try {
        form.reset();
      } catch (err) {
        /* ignore */
      }
      setTimeSlots([]);
      setCurrentSlot("");
    } else {
      toast.error(data.message || "Failed to add facility", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-size-[40px_40px] opacity-50" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-linear-to-r from-emerald-50 via-sky-50 to-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  Facility Creator
                </div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
                  Turn Your Venue Into Revenue
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  List your sports facility today and start receiving bookings from athletes. Manage availability, set your rates, and grow your earnings all in one place.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-end">
                <div className="rounded-2xl border border-emerald-100 bg-linear-to-br from-white to-emerald-50 px-4 py-3 shadow-sm shadow-emerald-100/70">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                    Slots
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-900">{timeSlots.length}</p>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-linear-to-br from-white to-sky-50 px-4 py-3 shadow-sm shadow-sky-100/70">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600">
                    Status
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">Ready to publish</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="border-b border-slate-100 bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 px-6 py-5 text-white sm:px-8">
                <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                  Facility Details
                </h2>
                <p className="mt-1 text-sm text-white/85">
                  Fill in the details below to create a compelling listing.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-8 px-5 py-6 sm:px-8 sm:py-8"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-100 bg-linear-to-br from-white via-emerald-50/40 to-white p-4 shadow-sm">
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <MdSportsSoccer className="text-emerald-600" />
                      Facility Name
                    </label>

                    <input
                      type="text"
                      name="facilityName"
                      required
                      placeholder="Champions Sports Complex"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div className="rounded-3xl border border-slate-100 bg-linear-to-br from-white via-sky-50/40 to-white p-4 shadow-sm">
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <MdSportsSoccer className="text-sky-600" />
                      Facility Type
                    </label>

                    <select
                      name="facilityType"
                      required
                      defaultValue=""
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                    >
                      <option value="" disabled>
                        Select Type
                      </option>

                      <option value="Football">Football</option>
                      <option value="Badminton">Badminton</option>
                      <option value="Swimming">Swimming</option>
                      <option value="Tennis">Tennis</option>
                      <option value="Volleyball">Volleyball</option>
                    </select>
                  </div>

                  <div className="rounded-3xl border border-slate-100 bg-linear-to-br from-white via-amber-50/40 to-white p-4 shadow-sm">
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FiImage className="text-amber-600" />
                      Image URL (imgbb/postimage)
                    </label>

                    <input
                      type="url"
                      name="imageUrl"
                      required
                      placeholder="https://images.unsplash.com/sports-facility.jpg"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
                    />
                  </div>

                  <div className="rounded-3xl border border-slate-100 bg-linear-to-br from-white via-cyan-50/40 to-white p-4 shadow-sm">
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <HiOutlineLocationMarker className="text-cyan-600" />
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="Dhanmondi, Dhaka, Bangladesh"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                    />
                  </div>

                  <div className="rounded-3xl border border-slate-100 bg-linear-to-br from-white via-emerald-50/40 to-white p-4 shadow-sm">
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <TbCurrencyDollar className="text-emerald-600" />
                      Price Per Hour
                    </label>

                    <input
                      type="number"
                      name="pricePerHour"
                      required
                      placeholder="$100"
                      min="1"
                      step="1"
                      inputMode="numeric"
                      onInvalid={(e) => {
                        e.currentTarget.setCustomValidity(
                          "Price per hour must be greater than 0",
                        );
                      }}
                      onInput={(e) => e.currentTarget.setCustomValidity("")}
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>

                  <div className="rounded-3xl border border-slate-100 bg-linear-to-br from-white via-sky-50/40 to-white p-4 shadow-sm">
                    <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FiUsers className="text-sky-600" />
                      Capacity
                    </label>

                    <input
                      type="number"
                      name="capacity"
                      required
                      placeholder="22 Players"
                      min="1"
                      step="1"
                      inputMode="numeric"
                      onInvalid={(e) => {
                        e.currentTarget.setCustomValidity(
                          "Capacity must be greater than 0",
                        );
                      }}
                      onInput={(e) => e.currentTarget.setCustomValidity("")}
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                    />
                  </div>

                  <div className="md:col-span-2 rounded-3xl border border-slate-100 bg-linear-to-br from-white via-emerald-50/30 to-sky-50/30 p-4 shadow-sm">
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      Available Time Slots
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="text"
                        value={currentSlot}
                        onChange={(e) => setCurrentSlot(e.target.value)}
                        placeholder="08:00 AM - 09:00 AM"
                        className="h-14 flex-1 rounded-2xl border border-slate-200 bg-white px-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      />

                      <button
                        type="button"
                        onClick={handleAddSlot}
                        className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 px-6 font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-[1.02] hover:shadow-xl"
                      >
                        <MdAdd className="text-xl" />
                        Add Slot
                      </button>
                    </div>

                    {timeSlots.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-3">
                        {timeSlots.map((slot, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 rounded-full border border-emerald-100 bg-linear-to-r from-emerald-50 via-sky-50 to-cyan-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm"
                          >
                            {slot}

                            <button
                              type="button"
                              onClick={() => handleRemoveSlot(index)}
                              className="text-lg text-rose-500 transition hover:scale-110"
                            >
                              <IoIosRemoveCircle />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 rounded-3xl border border-slate-100 bg-linear-to-br from-white via-slate-50 to-emerald-50/20 p-4 shadow-sm">
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      Description
                    </label>

                    <textarea
                      name="description"
                      required
                      placeholder="Describe your facility..."
                      className="min-h-45 w-full resize-none rounded-3xl border border-slate-200 bg-white p-5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="h-14 w-full rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:scale-[1.01] hover:shadow-2xl disabled:opacity-70"
                >
                  Add Facility
                </button>
              </form>
            </div>

            <aside className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <div className="rounded-3xl bg-linear-to-br from-emerald-600 via-emerald-500 to-lime-500 p-5 text-white shadow-lg shadow-emerald-500/15">
                  <h3 className="text-lg font-black">Add Facility Card</h3>
                  <p className="mt-2 text-sm text-white/85">
                    Keep the listing clean, visual, and easy to scan.
                  </p>

                  <div className="mt-5 rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-white/20" />
                      <div className="min-w-0 flex-1">
                        <div className="h-4 w-2/3 rounded-full bg-white/30" />
                        <div className="mt-2 h-3 w-1/2 rounded-full bg-white/20" />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/15 p-3">
                        <div className="h-3 w-14 rounded-full bg-white/25" />
                        <div className="mt-2 h-4 w-20 rounded-full bg-white/35" />
                      </div>
                      <div className="rounded-2xl bg-white/15 p-3">
                        <div className="h-3 w-14 rounded-full bg-white/25" />
                        <div className="mt-2 h-4 w-16 rounded-full bg-white/35" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                  Quick Tips
                </h3>

                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                    Use a bright image with a clear facility angle.
                  </div>
                  <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
                    Add practical time slots that users can book easily.
                  </div>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
                    Keep the description short, accurate, and helpful.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddFacilityPage;
