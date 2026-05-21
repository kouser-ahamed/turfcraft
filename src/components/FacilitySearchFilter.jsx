"use client";

import React, { useState, useCallback } from "react";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import AllFacilitiesCard from "./shared/AllFacilitiesCard";

const FacilitySearchFilter = ({ initialFacilities }) => {
  const [facilities, setFacilities] = useState(initialFacilities || []);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const sportTypes = [
    "Football",
    "Badminton",
    "Swimming",
    "Tennis",
    "Volleyball",
  ];

  const sportTypeStyles = {
    Football: "border-emerald-300 bg-emerald-50 text-emerald-700",
    Badminton: "border-amber-300 bg-amber-50 text-amber-700",
    Swimming: "border-sky-300 bg-sky-50 text-sky-700",
    Tennis: "border-lime-300 bg-lime-50 text-lime-700",
    Volleyball: "border-rose-300 bg-rose-50 text-rose-700",
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchFacilities = useCallback(
    async (searchTerm, types) => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();

        if (searchTerm.trim()) {
          params.append("search", searchTerm.trim());
        }

        if (types.length > 0) {
          params.append("type", types.join(","));
        }

        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/facility-search${
          params.toString() ? "?" + params.toString() : ""
        }`;

        const res = await fetch(url);
        const data = await res.json();
        setFacilities(data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const debouncedSearch = useCallback(
    debounce((searchTerm, types) => {
      fetchFacilities(searchTerm, types);
    }, 500),
    [fetchFacilities]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value, selectedTypes);
  };

  const handleTypeToggle = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(updatedTypes);
    debouncedSearch(search, updatedTypes);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedTypes([]);
    fetchFacilities("", []);
  };

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#f8fafc_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-size-[42px_42px] opacity-35" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-linear-to-r from-emerald-50 via-sky-50 to-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Explore Venues
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                All Facilities
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Discover modern sports spaces, narrow down by type, and book the right venue without friction.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-end">
              <div className="rounded-2xl border border-emerald-100 bg-linear-to-br from-white to-emerald-50 px-4 py-3 shadow-sm shadow-emerald-100/60">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Showing
                </p>
                <p className="mt-1 text-2xl font-black text-slate-900">{facilities.length}</p>
              </div>
              <div className="rounded-2xl border border-sky-100 bg-linear-to-br from-white to-sky-50 px-4 py-3 shadow-sm shadow-sky-100/60">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600">
                  Filters
                </p>
                <p className="mt-1 text-2xl font-black text-slate-900">{selectedTypes.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-5">
          <div className="space-y-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
              <input
                type="text"
                placeholder="Search facilities by name..."
                value={search}
                onChange={handleSearchChange}
                className="h-14 w-full rounded-2xl border border-slate-200 bg-linear-to-r from-white via-slate-50 to-emerald-50/40 pl-12 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-linear-to-r from-white to-emerald-50 px-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700"
              >
                <FiFilter className="text-base" />
                {showFilters ? "Hide Filters" : "Filters"}
              </button>

              {(search || selectedTypes.length > 0) && (
                <button
                  onClick={handleClearFilters}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-rose-200 bg-linear-to-r from-rose-50 to-amber-50 px-5 text-xs font-bold uppercase tracking-[0.18em] text-rose-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-100"
                >
                  <FiX className="text-base" />
                  Clear All
                </button>
              )}
            </div>

            {showFilters && (
              <div className="rounded-[1.5rem] border border-slate-200 bg-linear-to-br from-slate-50 to-white p-4 sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-[0.22em] text-slate-600">
                    Sport Type
                  </h3>
                  <p className="text-xs font-medium text-slate-500">
                    Pick one or more categories
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                  {sportTypes.map((type) => (
                    <label
                      key={type}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-all hover:-translate-y-0.5 ${
                        selectedTypes.includes(type)
                          ? `${sportTypeStyles[type]} shadow-sm`
                          : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/70"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 accent-emerald-600 cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-slate-700">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-96 items-center justify-center rounded-[2rem] border border-white/70 bg-white/75 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
              <p className="text-sm font-semibold text-slate-600">
                Loading facilities...
              </p>
            </div>
          </div>
        ) : facilities.length === 0 ? (
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-12 text-center shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-16">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 shadow-inner">
              <FiSearch className="text-2xl" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              No Facilities Found
            </h3>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-600">
                Found {facilities.length} facilit{facilities.length !== 1 ? "ies" : "y"}
              </p>
              <div className="h-px flex-1 bg-linear-to-r from-emerald-200 via-sky-200 to-transparent" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {facilities.map((facility) => (
                <AllFacilitiesCard key={facility._id} facility={facility} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FacilitySearchFilter;
