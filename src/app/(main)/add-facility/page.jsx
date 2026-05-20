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
  const userData = authClient.useSession();
  const user = userData.data?.user;
  console.log("Current User:", user);

 //  user ke login e pathabe jodi user logout kore jai tahole login page e chole jabe client side authentication check
  const router = useRouter();

  useEffect(() => {
    if (!userData?.data?.user) {
      router.push("/login");
    }
  }, [userData, router]);

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
      <div className="min-h-screen  px-4 py-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/40 bg-white/80 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
          <div className="relative overflow-hidden bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-8 py-12 text-white md:px-12">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 blur-3xl"></div>

            <h1 className="relative text-3xl font-black md:text-5xl text-center">
              Add Your Sports Facility
            </h1>

            <p className="relative  mt-3 max-w-2xl text-sm text-white/90 mx-auto text-center">
              Create a beautiful listing and let players discover your venue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-10 px-6 py-10 md:px-12"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Facility Name */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MdSportsSoccer className="text-green-500" />
                  Facility Name
                </label>

                <input
                  type="text"
                  name="facilityName"
                  required
                  placeholder="Champions Sports Complex"
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Facility Type */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <MdSportsSoccer className="text-green-500" />
                  Facility Type
                </label>

                <select
                  name="facilityType"
                  required
                  defaultValue=""
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
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

              {/* Image URL */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiImage className="text-green-500" />
                  Image URL (imgbb/postimage)
                </label>

                <input
                  type="url"
                  name="imageUrl"
                  required
                  placeholder="https://images.unsplash.com/sports-facility.jpg"
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <HiOutlineLocationMarker className="text-green-500" />
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Dhanmondi, Dhaka, Bangladesh"
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <TbCurrencyDollar className="text-green-500" />
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
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FiUsers className="text-green-500" />
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
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Time Slots */}
              <div className="md:col-span-2">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Available Time Slots
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={currentSlot}
                    onChange={(e) => setCurrentSlot(e.target.value)}
                    placeholder="08:00 AM - 09:00 AM"
                    className="h-14 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />

                  <button
                    type="button"
                    onClick={handleAddSlot}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
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
                        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-medium text-green-700 shadow-sm"
                      >
                        {slot}

                        <button
                          type="button"
                          onClick={() => handleRemoveSlot(index)}
                          className="text-lg text-red-500 transition hover:scale-110"
                        >
                          <IoIosRemoveCircle />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  required
                  placeholder="Describe your facility..."
                  className="min-h-[180px] w-full resize-none rounded-3xl border border-gray-200 bg-gray-50 p-5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="h-14 w-full rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-base font-bold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-2xl disabled:opacity-70"
            >
              Add Facility
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddFacilityPage;
