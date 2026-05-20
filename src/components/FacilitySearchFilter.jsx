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
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="pb-4 text-3xl font-bold text-slate-800">
          All Facilities
        </h1>
        <p className="text-sm text-slate-500">
          Find and book your favorite sports facility
        </p>
      </div>

     
      <div className="mb-8 space-y-4">
      
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Search facilities by name..."
            value={search}
            onChange={handleSearchChange}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

       
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-xs transition-all hover:border-slate-300 hover:bg-slate-50 md:w-auto"
          >
            <FiFilter className="text-base" />
            Filters
          </button>

        
          {(search || selectedTypes.length > 0) && (
            <button
              onClick={handleClearFilters}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 text-xs font-bold uppercase tracking-wider text-rose-600 shadow-xs transition-all hover:border-rose-300 hover:bg-rose-100"
            >
              <FiX className="text-base" />
              Clear All
            </button>
          )}
        </div>

    
        {showFilters && (
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-600">
              Sport Type
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
              {sportTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 cursor-pointer transition hover:border-emerald-300 hover:bg-emerald-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 accent-emerald-600 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

   
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>
            <p className="text-sm font-semibold text-slate-600">
              Loading facilities...
            </p>
          </div>
        </div>
      ) : facilities.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <FiSearch className="text-2xl" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No Facilities Found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-sm font-medium text-slate-600">
            Found {facilities.length} facilit{facilities.length !== 1 ? "ies" : "y"}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((facility) => (
              <AllFacilitiesCard
                key={facility._id}
                facility={facility}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FacilitySearchFilter;
