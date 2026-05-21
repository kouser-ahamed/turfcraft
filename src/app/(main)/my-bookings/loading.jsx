import React from "react";
import SkeletonBookingCard from "@/components/SkeletonBookingCard";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-28 rounded-full bg-linear-to-r from-emerald-200 via-sky-200 to-amber-200" />
            <div className="h-10 w-72 rounded-2xl bg-linear-to-r from-slate-200 to-emerald-100" />
            <div className="h-4 w-full max-w-2xl rounded-full bg-linear-to-r from-slate-200 via-sky-100 to-amber-100" />
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="h-14 rounded-2xl bg-linear-to-r from-white via-slate-100 to-emerald-50 animate-pulse" />
            <div className="flex gap-3">
              <div className="h-11 w-32 rounded-full bg-linear-to-r from-emerald-100 to-sky-100 animate-pulse" />
              <div className="h-11 w-28 rounded-full bg-linear-to-r from-rose-100 to-amber-100 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBookingCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
