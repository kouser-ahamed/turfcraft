import React from "react";

const SkeletonBookingCard = () => {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 shadow-[0_14px_30px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-5">
        <div className="h-44 w-full md:w-64 shrink-0 rounded-xl bg-linear-to-br from-emerald-100 via-sky-100 to-amber-100 animate-pulse" />

        <div className="flex-1 space-y-4">
          <div className="h-4 w-1/3 rounded-full bg-linear-to-r from-emerald-200 to-sky-200 animate-pulse" />
          <div className="h-3 w-1/4 rounded-full bg-linear-to-r from-slate-200 to-emerald-100 animate-pulse" />

          <div className="mt-2 grid grid-cols-2 gap-4 border-t border-slate-50 pt-3 sm:grid-cols-3">
            <div>
              <div className="h-3 w-2/3 rounded-full bg-linear-to-r from-slate-200 to-emerald-100 animate-pulse" />
            </div>

            <div>
              <div className="h-3 w-2/3 rounded-full bg-linear-to-r from-slate-200 to-emerald-100 animate-pulse" />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="h-5 w-1/3 rounded-full bg-linear-to-r from-emerald-200 via-sky-200 to-amber-200 animate-pulse" />
            </div>
          </div>

          <div className="flex justify-end">
            <div className="h-10 w-32 rounded-full bg-linear-to-r from-emerald-100 to-sky-100 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBookingCard;
