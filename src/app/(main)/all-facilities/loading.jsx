import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-28 rounded-full bg-slate-200" />
            <div className="h-10 w-72 rounded-2xl bg-slate-200" />
            <div className="h-4 w-full max-w-2xl rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="h-14 rounded-2xl bg-slate-100 animate-pulse" />
            <div className="flex gap-3">
              <div className="h-11 w-32 rounded-full bg-slate-100 animate-pulse" />
              <div className="h-11 w-28 rounded-full bg-slate-100 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/80 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            >
              <div className="h-56 animate-pulse bg-slate-200/80" />
              <div className="space-y-4 p-5">
                <div className="h-4 w-24 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-7 w-3/4 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-20 rounded-2xl bg-slate-100 animate-pulse" />
                <div className="h-12 rounded-full bg-slate-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;