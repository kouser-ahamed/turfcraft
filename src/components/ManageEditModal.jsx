"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal } from "@heroui/react";
import { FiEdit3, FiImage, FiUsers } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoIosRemoveCircle } from "react-icons/io";
import { MdAdd, MdSportsSoccer } from "react-icons/md";
import { TbCurrencyDollar } from "react-icons/tb";
import { toast } from "react-toastify";

export function ManageEditModal({ facility }) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (facility?.availableTimeSlots) {
      setTimeSlots(facility.availableTimeSlots);
    }
  }, [facility, isOpen]);

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
        `http://localhost:5000/facility/${facility?._id}`,
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

        setIsOpen(false);

        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        if (data.matchedCount > 0 && data.modifiedCount === 0) {
          toast.info("No changes were made.", {
            position: "top-right",
            autoClose: 1000,
          });
          setIsOpen(false);
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

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-slate-200 bg-white text-xs font-bold uppercase tracking-wider text-slate-700 shadow-xs transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:text-emerald-600 active:scale-[0.98]">
        <FiEdit3 className="text-base" />
        <span>Edit</span>
      </Button>

      <Modal.Backdrop className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300">
        <Modal.Container className="flex items-center justify-center w-full h-full p-4">
          <Modal.Dialog className="w-full sm:max-w-2xl bg-white rounded-3xl border border-slate-100 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 ease-out duration-300">
            <Modal.CloseTrigger className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-50 transition-colors z-10" />

            <Modal.Header className="flex items-center gap-3 p-6 border-b border-slate-100">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <FiEdit3 className="size-5" />
              </div>
              <Modal.Heading className="text-xl font-black tracking-tight text-slate-900">
                Edit Facility Details
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6 overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                      <MdSportsSoccer className="text-emerald-500 text-base" />
                      Facility Name
                    </label>
                    <input
                      type="text"
                      name="facilityName"
                      required
                      defaultValue={facility?.facilityName || ""}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                      <MdSportsSoccer className="text-emerald-500 text-base" />
                      Facility Type
                    </label>
                    <select
                      name="facilityType"
                      required
                      defaultValue={facility?.facilityType || ""}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                    >
                      <option value="Football">Football</option>
                      <option value="Badminton">Badminton</option>
                      <option value="Swimming">Swimming</option>
                      <option value="Tennis">Tennis</option>
                      <option value="Volleyball">Volleyball</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                      <FiImage className="text-emerald-500 text-base" />
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      required
                      defaultValue={facility?.imageUrl || ""}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                      <HiOutlineLocationMarker className="text-emerald-500 text-base" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      defaultValue={facility?.location || ""}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                      <TbCurrencyDollar className="text-emerald-500 text-base" />
                      Price Per Hour
                    </label>
                    <input
                      type="number"
                      name="pricePerHour"
                      required
                      defaultValue={facility?.pricePerHour || ""}
                      min="1"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                      <FiUsers className="text-emerald-500 text-base" />
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      required
                      defaultValue={facility?.capacity || ""}
                      min="1"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                    />
                  </div>

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
                        className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 font-bold text-xs uppercase tracking-wider text-white shadow-sm transition-colors"
                      >
                        <MdAdd className="text-lg" />
                        Add Slot
                      </button>
                    </div>

                    {timeSlots.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {timeSlots.map((slot, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700"
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

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Description
                    </label>
                    <textarea
                      name="description"
                      required
                      defaultValue={facility?.description || ""}
                      className="min-h-[100px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-3 pt-4 border-t border-slate-100">
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
