import React from "react";
import { FiLayers } from "react-icons/fi";

const LoadingSkeletonCard = () => (
  <div className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl animate-pulse flex flex-col md:flex-row md:items-center gap-6 p-6">
    <div className="relative h-48 w-full md:h-56 md:w-72 shrink-0 overflow-hidden rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 border border-white/50" />

    <div className="flex-1 space-y-5">
      <div className="space-y-3">
        <div className="h-6 w-3/4 rounded-full bg-slate-200" />
        <div className="h-4 w-1/2 rounded-full bg-slate-100" />
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl bg-slate-100 p-4 h-24" />
        <div className="rounded-2xl bg-slate-100 p-4 h-24" />
        <div className="rounded-2xl bg-slate-100 p-4 h-24" />
        <div className="rounded-2xl bg-slate-100 p-4 h-24" />
      </div>
    </div>

    <div className="pt-4 md:pt-0 flex flex-col gap-3 w-full md:w-auto">
      <div className="h-12 w-full md:w-24 rounded-xl bg-slate-200" />
      <div className="h-12 w-full md:w-24 rounded-xl bg-slate-200" />
    </div>
  </div>
);

const LoadingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.1),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ffffff_45%,#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.025)_1px,transparent_1px)] bg-size-[40px_40px] opacity-50" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8 animate-pulse">
          <div className="space-y-4">
            <div className="h-4 w-32 rounded-full bg-slate-200" />
            <div className="h-8 w-1/2 rounded-full bg-slate-200" />
            <div className="h-6 w-3/4 rounded-full bg-slate-100" />
          </div>
        </div>

        <div className="grid gap-6">
          {[1, 2].map((i) => (
            <LoadingSkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;