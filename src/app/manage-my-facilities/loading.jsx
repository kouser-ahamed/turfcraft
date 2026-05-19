import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      
      <div className="flex flex-col items-center gap-4">

        
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-slate-200"></div>
          <div className="w-14 h-14 rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent animate-spin absolute top-0 left-0"></div>
        </div>


        <p className="text-sm font-semibold text-slate-500 tracking-widest animate-pulse">
          Loading...
        </p>

      </div>
    </div>
  );
};

export default LoadingPage;