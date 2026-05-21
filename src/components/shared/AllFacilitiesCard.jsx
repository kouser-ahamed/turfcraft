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

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/55 via-slate-950/8 to-transparent" />

        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/20 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-800 shadow-lg backdrop-blur">
            {facilityType}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/30">
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

        <div className="flex items-end justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Price
            </p>
            <p className="mt-1 text-3xl font-black text-emerald-600">
              ${pricePerHour}
              <span className="ml-1 text-sm font-medium text-slate-500">/hr</span>
            </p>
          </div>

          <div className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            Flexible booking
          </div>
        </div>

        <Link href={`/all-facilities/${_id}`}>
          <Button
            variant="outline"
            className="h-12 w-full rounded-full border-emerald-500 bg-white font-semibold text-emerald-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:text-white"
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
