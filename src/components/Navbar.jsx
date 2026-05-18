"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const getLinkClass = (href) => {
    const isActive = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

    return [
      "pb-1 transition-colors duration-200 border-b-2",
      isActive
        ? "text-emerald-600 border-emerald-600"
        : "border-transparent text-slate-700 hover:text-emerald-600 hover:border-emerald-600/60",
    ].join(" ");
  };

  return (
    <div className="border-b border-emerald-100 bg-linear-to-r from-emerald-50 via-white to-lime-50 px-2 shadow-sm">
      <nav className="flex justify-between items-center py-3 max-w-7xl mx-auto w-full">
        <div className="flex gap-2 items-center">
          <Image
            src={"/assets/Logo.png"}
            alt="logo"
            loading="eager"
            width={30}
            height={30}
            className="object-cover h-auto w-auto rounded-full"
          />
          <h3 className="font-black text-lg">TurfCraft</h3>
        </div>

        <ul className="flex items-center gap-5 text-sm">
          <li>
            <Link href={"/"} className={getLinkClass("/")} aria-current={pathname === "/" ? "page" : undefined}>
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
              aria-current={pathname === "/manage-my-facilities" ? "page" : undefined}
            >
              Manage My Facilities
            </Link>
          </li>
        </ul>

        <div className="flex gap-4">
          <ul className="flex items-center  text-sm">
            <li>
              <Link href={"/login"} className={getLinkClass("/login")} aria-current={pathname === "/login" ? "page" : undefined}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;