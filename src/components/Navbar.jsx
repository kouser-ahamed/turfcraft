"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const getLinkClass = (href) => {
    const isActive =
      href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);

    return [
      "pb-1 transition-all duration-200 border-b-2 font-medium text-sm",
      isActive
        ? "text-emerald-600 border-emerald-600 font-semibold"
        : "border-transparent text-slate-600 hover:text-emerald-600 hover:border-emerald-500/50",
    ].join(" ");
  };

  return (
    <div className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-4 shadow-xs">
      <nav className="flex justify-between items-center py-3.5 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5 rounded-full ">
          <Image
            src={"/assets/Logo.png"}
            alt="logo"
            priority
            width={34}
            height={34}
            className="object-contain rounded-full"
          />

          <h3 className="text-2xl font-black tracking-tight bg-linear-to-r from-slate-900 via-emerald-800 to-lime-500 bg-clip-text text-transparent">
            Turf<span className="text-lime-500">Craft</span>
          </h3>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link
              href={"/"}
              className={getLinkClass("/")}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/all-facilities"}
              className={getLinkClass("/all-facilities")}
              aria-current={pathname === "/all-facilities" ? "page" : undefined}
            >
              All Facilities
            </Link>
          </li>
          <li>
            <Link
              href={"/my-bookings"}
              className={getLinkClass("/my-bookings")}
              aria-current={pathname === "/my-bookings" ? "page" : undefined}
            >
              My Bookings
            </Link>
          </li>
          <li>
            <Link
              href={"/add-facility"}
              className={getLinkClass("/add-facility")}
              aria-current={pathname === "/add-facility" ? "page" : undefined}
            >
              Add Facility
            </Link>
          </li>
          <li>
            <Link
              href={"/manage-my-facilities"}
              className={getLinkClass("/manage-my-facilities")}
              aria-current={
                pathname === "/manage-my-facilities" ? "page" : undefined
              }
            >
              Manage Facilities
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href={"/login"}
            className="border border-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-2xs"
          >
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
