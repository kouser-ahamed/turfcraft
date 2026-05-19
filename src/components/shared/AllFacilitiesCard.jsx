import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineReduceCapacity } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";

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
    <Card className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          alt={facilityName}
          src={imageUrl}
          width={500}
          height={300}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
            {facilityType}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="text-red-500 text-lg">
            <VscLocation />
          </span>

          <p className="line-clamp-1">{location}</p>
        </div>

        <h2 className="text-xl font-bold text-slate-800 line-clamp-1">
          {facilityName}
        </h2>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="text-xl text-emerald-600">
              <MdOutlineReduceCapacity />
            </span>

            <span className="font-medium">{capacity} Person</span>
          </div>

          <p className="text-2xl font-bold text-emerald-600">
            ${pricePerHour}
            <span className="text-sm font-medium text-slate-500">/hr</span>
          </p>
        </div>

     <Link href={`/all-facilities/${_id}`}>
        <Button
          variant="outline"
          className="h-11 w-full rounded-xl border-emerald-500 font-semibold text-emerald-600 transition-all duration-300 hover:bg-emerald-500 hover:text-white"
        >
          Book Now
        </Button>
     </Link>
      </div>
    </Card>
  );
};

export default AllFacilitiesCard;
