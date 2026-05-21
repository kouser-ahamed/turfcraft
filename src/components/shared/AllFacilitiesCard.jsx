import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";
import { FiArrowRight } from "react-icons/fi";

const AllFacilitiesCard = ({ facility }) => {
  const {
    facilityName,
    facilityType,
    imageUrl,
    location,
    pricePerHour,
    capacity,
    _id,
  } = facility;

  const typeToneMap = {
    Football: "from-emerald-500 to-lime-500",
    Badminton: "from-amber-500 to-orange-500",
    Swimming: "from-sky-500 to-cyan-500",
    Tennis: "from-lime-500 to-emerald-500",
    Volleyball: "from-rose-500 to-fuchsia-500",
  };

  const tone = typeToneMap[facilityType] || "from-emerald-500 to-sky-500";
  return (
    <Card className="group overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_90px_rgba(15,23,42,0.14)]">
      <div className="relative overflow-hidden">
        <Image
          alt={facilityName}
          src={imageUrl}
          width={500}
          height={300}
          className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-400 via-sky-400 to-amber-400 opacity-90" />

        <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-linear-to-br ${tone} opacity-25 blur-2xl`} />

        <div className="absolute left-4 top-4">
          <span className={`rounded-full bg-linear-to-r ${tone} px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-slate-900/15 backdrop-blur`}>
            {facilityType}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className={`inline-flex items-center gap-2 rounded-full bg-linear-to-r ${tone} px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-slate-900/20`}>
            <MdOutlineReduceCapacity className="text-sm" />
            {capacity} Person Capacity
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="text-lg text-rose-500">
            <VscLocation />
          </span>

          <p className="line-clamp-1">{location}</p>
        </div>

        <h2 className="line-clamp-1 text-2xl font-black tracking-tight text-slate-900">
          {facilityName}
        </h2>

        <div className="flex items-end justify-between gap-4 rounded-2xl border border-slate-100 bg-linear-to-br from-slate-50 via-white to-emerald-50/40 p-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-600">
              Price
            </p>
            <p className="mt-1 text-3xl font-black text-emerald-600">
              ${pricePerHour}
              <span className="ml-1 text-sm font-medium text-slate-500">/hr</span>
            </p>
          </div>

          <div className="rounded-full border border-emerald-100 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
            Flexible booking
          </div>
        </div>

        <Link href={`/all-facilities/${_id}`}>
          <Button
            variant="outline"
            className="h-12 w-full rounded-full border-transparent bg-linear-to-r from-emerald-500 via-sky-500 to-cyan-500 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-600 hover:via-sky-600 hover:to-cyan-600 hover:text-white"
            endContent={<FiArrowRight />}
          >
            Book Now
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default AllFacilitiesCard;
