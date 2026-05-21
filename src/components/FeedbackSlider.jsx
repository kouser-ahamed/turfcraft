"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FiStar, FiMessageCircle, FiCalendar, FiMapPin } from "react-icons/fi";

import "swiper/css";
import "swiper/css/pagination";

const feedbackData = [
  {
    id: 1,
    name: "Md. Karim Ahmed",
    role: "Football Player",
    date: "May 18, 2026",
    facility: "Green Field Stadium",
    comment:
      "Excellent facility with top-notch maintenance. The booking process is seamless and the staff is very cooperative. Perfect for our weekend matches!",
    rating: 5,
    avatar: "MK",
  },
  {
    id: 2,
    name: "Fatima Begum",
    role: "Cricket Enthusiast",
    date: "May 15, 2026",
    facility: "Cricket Ground",
    comment:
      "Amazing platform for booking cricket grounds. The app is user-friendly and the facilities are well-maintained. Highly recommended!",
    rating: 5,
    avatar: "FB",
  },
  {
    id: 3,
    name: "Rajib Hossain",
    role: "Badminton Coach",
    date: "May 10, 2026",
    facility: "Sports Complex",
    comment:
      "Great experience with the facility booking system. Quick availability updates and excellent customer support throughout.",
    rating: 4,
    avatar: "RH",
  },
  {
    id: 4,
    name: "Rima Das",
    role: "Fitness Trainer",
    date: "May 05, 2026",
    facility: "Multi-Sport Arena",
    comment:
      "TurfCraft made facility management so easy. The interface is intuitive and the booking confirmation is instant. Love it!",
    rating: 5,
    avatar: "RD",
  },
];

const FeedbackSlider = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[4px] uppercase text-blue-600 font-bold">
            User Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-black mt-4 bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
            What Players Say
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-base font-medium">
            Real experiences from athletes, coaches, and sports enthusiasts
            using TurfCraft to book their favorite facilities.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {feedbackData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="h-full bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-50 to-slate-50 pointer-events-none" />

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                      {item.avatar}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <FiMessageCircle
                    className="text-slate-200 group-hover:text-blue-200 transition"
                    size={28}
                  />
                </div>

                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={16}
                      fill={i < item.rating ? "#3b82f6" : "none"}
                      className={
                        i < item.rating ? "text-blue-500" : "text-slate-200"
                      }
                    />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed flex-grow relative z-10 font-medium">
                  &quot;{item.comment}&quot;
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-3 text-xs text-slate-600 relative z-10">
                  <div className="flex items-center gap-2 font-semibold">
                    <FiCalendar size={14} className="text-blue-600" />
                    {item.date}
                  </div>

                  <div className="flex items-center gap-2 font-semibold">
                    <FiMapPin size={14} className="text-green-600" />
                    {item.facility}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .swiper-pagination-bullet {
            background: #cbd5e1;
            opacity: 1;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            background: #3b82f6;
            transform: scale(1.3);
          }
        `}</style>
      </div>
    </div>
  );
};

export default FeedbackSlider;
