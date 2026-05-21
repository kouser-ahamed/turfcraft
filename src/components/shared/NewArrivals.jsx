
import React from "react";
import Marquee from "react-fast-marquee";

const upcoming = [
  {
    _id: "1",
    title:
      "Football Turf Tournament - Friday 5:00 PM at City Arena (Knockout Round 1)",
  },
  {
    _id: "2",
    title:
      "Badminton Singles Championship - Saturday 10:00 AM to 2:00 PM at Indoor Court 2",
  },
  {
    _id: "3",
    title:
      "Swimming Lane Time Trial Event - Sunday 8:00 AM at Aqua Sports Complex",
  },
  {
    _id: "4",
    title:
      "Tennis Doubles League Match - Friday 7:00 PM at Premium Tennis Court",
  },
  {
    _id: "5",
    title:
      "Football Friendly Match Booking Slot - Thursday Evening 6:00 PM to 8:00 PM",
  },
  {
    _id: "6",
    title:
      "Badminton Training Session - Monday 4:00 PM to 6:00 PM for beginners",
  },
  {
    _id: "7",
    title:
      "Swimming Practice Session - Tuesday & Thursday Morning 7:00 AM to 9:00 AM",
  },
  {
    _id: "8",
    title:
      "Tennis Weekly League Registration Open - Deadline: Wednesday Night 11:59 PM",
  },
];

const NewArrivals = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-4 my-2"
>
      <div className="flex items-center bg-white border border-gray-200 shadow-sm overflow-hidden rounded-md">
        
        <button className="bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 font-bold uppercase text-xs sm:text-sm whitespace-nowrap z-10">
          Upcoming Events
        </button>

        <Marquee pauseOnHover={true} speed={70} gradient={true} gradientWidth={40}>
          {upcoming.map((n) => (
            <div key={n._id} className="flex items-center">
              <span className="text-gray-700 font-medium py-2">
                {n.title}
              </span>

              <span className="mx-8 text-gray-400 font-bold">|</span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default NewArrivals;