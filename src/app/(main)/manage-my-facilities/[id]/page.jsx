"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { FiEdit3, FiImage, FiUsers } from "react-icons/fi";
import { HiOutlineEmojiSad, HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdAdd, MdSportsSoccer } from "react-icons/md";
import { TbCurrencyDollar } from "react-icons/tb";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

const ManageEditFacilitiesPage = ({ facility }) => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [facilityData, setFacilityData] = useState(facility ?? null);
  const [isLoading, setIsLoading] = useState(!facility);
  const [notFoundFacility, setNotFoundFacility] = useState(false);

  const [timeSlots, setTimeSlots] = useState(
    () => facility?.availableTimeSlots ?? [],
  );

  const [currentSlot, setCurrentSlot] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadFacility = async () => {
      if (!id) return;

      try {
        setIsLoading(true);

        const res = await fetch(`http://localhost:5000/facility/${id}`);

        // Facility not found
        if (!res.ok) {
          setNotFoundFacility(true);
          return;
        }

        const data = await res.json();

        setFacilityData(data);

        setTimeSlots(
          Array.isArray(data?.availableTimeSlots)
            ? data.availableTimeSlots
            : [],
        );
      } catch (error) {
        console.error("Failed to load facility:", error);

        toast.error("Failed to load facility details", {
          position: "top-right",
          autoClose: 1000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!facility) {
      loadFacility();
    }
  }, [facility, id]);

  const handleAddSlot = () => {
    const trimmedSlot = currentSlot.trim();

    if (!trimmedSlot) return;

    if (timeSlots.includes(trimmedSlot)) {
      toast.error("This time slot is already added.", {
        position: "top-right",
        autoClose: 1500,
      });

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

    const payload = {
      facilityName: formData.get("facilityName"),
      facilityType: formData.get("facilityType"),
      imageUrl: formData.get("imageUrl"),
      location: formData.get("location"),
      pricePerHour: Number(formData.get("pricePerHour")),
      capacity: Number(formData.get("capacity")),
      description: formData.get("description"),
      availableTimeSlots: timeSlots,
    };

    if (payload.pricePerHour <= 0 || payload.capacity <= 0) {
      toast.error("Price and Capacity must be positive numbers", {
        position: "top-right",
        autoClose: 1500,
      });

      return;
    }

    try {
      setIsUpdating(true);

      const res = await fetch(
        `http://localhost:5000/facility/${facilityData?._id || id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      console.log("Server Edit Response:", data);

      if (res.ok && (data.modifiedCount > 0 || data.matchedCount > 0)) {
        toast.success("Facility updated successfully!", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => {
          router.push("/manage-my-facilities");
          router.refresh();
        }, 800);
      } else {
        if (data.matchedCount > 0 && data.modifiedCount === 0) {
          toast.info("No changes were made.", {
            position: "top-right",
            autoClose: 1000,
          });

          return;
        }

        toast.error(data.message || "Failed to update facility", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.error("Update error:", err);

      toast.error("Something went wrong via network call!");
    } finally {
      setIsUpdating(false);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="mx-auto my-8 max-w-4xl rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl">
        <p className="text-sm font-semibold text-slate-500">
          Loading facility details...
        </p>
      </div>
    );
  }

  // Facility Not Found State
  if (notFoundFacility || !facilityData) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-rose-50">
            <span className="text-4xl text-yellow-300"><HiOutlineEmojiSad /></span>
          </div>

          <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-900">
            Facility Not Found
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Sorry, we could not find the facility you are trying to edit. It may
            have been removed or the link may be invalid.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={() => router.push("/manage-my-facilities")}
              className="h-12 rounded-xl bg-emerald-600 px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-700"
            >
              Back To Facilities
            </Button>

            <Button
              onClick={() => router.back()}
              className="h-12 rounded-xl bg-slate-100 px-6 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-200"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 md:p-8 bg-white rounded-3xl border border-slate-100 shadow-xl">
      {/* Header Section */}
      <div className="flex items-center gap-3 pb-6 mb-8 border-b border-slate-100">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
          <FiEdit3 className="size-6" />
        </div>

        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Edit Facility Details
          </h1>

          <p className="text-sm text-slate-500 mt-0.5">
            Update the details and available timings of your facility.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Facility Name */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              <MdSportsSoccer className="text-emerald-500 text-base" />
              Facility Name
            </label>

            <input
              type="text"
              name="facilityName"
              required
              defaultValue={facilityData?.facilityName || ""}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Facility Type */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              <MdSportsSoccer className="text-emerald-500 text-base" />
              Facility Type
            </label>

            <select
              name="facilityType"
              required
              defaultValue={facilityData?.facilityType || ""}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            >
              <option value="Football">Football</option>
              <option value="Badminton">Badminton</option>
              <option value="Swimming">Swimming</option>
              <option value="Tennis">Tennis</option>
              <option value="Volleyball">Volleyball</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              <FiImage className="text-emerald-500 text-base" />
              Image URL
            </label>

            <input
              type="url"
              name="imageUrl"
              required
              defaultValue={facilityData?.imageUrl || ""}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              <HiOutlineLocationMarker className="text-emerald-500 text-base" />
              Location
            </label>

            <input
              type="text"
              name="location"
              required
              defaultValue={facilityData?.location || ""}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              <TbCurrencyDollar className="text-emerald-500 text-base" />
              Price Per Hour
            </label>

            <input
              type="number"
              name="pricePerHour"
              required
              min="1"
              defaultValue={facilityData?.pricePerHour || ""}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
              <FiUsers className="text-emerald-500 text-base" />
              Capacity
            </label>

            <input
              type="number"
              name="capacity"
              required
              min="1"
              defaultValue={facilityData?.capacity || ""}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>

          {/* Time Slots */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Available Time Slots
            </label>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={currentSlot}
                onChange={(e) => setCurrentSlot(e.target.value)}
                placeholder="08:00 AM - 09:00 AM"
                className="h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
              />

              <button
                type="button"
                onClick={handleAddSlot}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 font-bold text-xs uppercase tracking-wider text-white shadow-xs transition-colors"
              >
                <MdAdd className="text-lg" />
                Add Slot
              </button>
            </div>

            {timeSlots.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-3 py-2 text-xs font-bold text-emerald-700"
                  >
                    {slot}

                    <button
                      type="button"
                      onClick={() => handleRemoveSlot(index)}
                      className="text-base text-rose-500 hover:text-rose-600 transition-transform hover:scale-110"
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
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
              Description
            </label>

            <textarea
              name="description"
              required
              defaultValue={facilityData?.description || ""}
              className="min-h-30 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 pt-6 border-t border-slate-100">
          <Button
            type="button"
            onClick={() => router.back()}
            className="flex-1 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Go Back
          </Button>

          <Button
            type="submit"
            disabled={isUpdating}
            className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 shadow-md shadow-emerald-600/10"
          >
            {isUpdating ? "Updating..." : "Update Facility"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ManageEditFacilitiesPage;
