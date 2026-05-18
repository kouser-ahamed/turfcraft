"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { LuChevronDown, LuMenu, LuX } from "react-icons/lu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const userData = authClient.useSession();
  const user = userData.data?.user;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    closeMenus();
  };

  return (
    <div className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      <nav className="flex justify-between items-center py-3 px-4 lg:px-10 max-w-7xl mx-auto w-full relative">
        {/* Logo */}
        <Link
          href={"/"}
          className="flex gap-2 items-center z-50 transition-opacity hover:opacity-80"
        >
          <Image
            src={"/assets/Logo.png"}
            alt="logo"
            priority
            width={35}
            height={35}
            className="object-cover h-auto w-auto rounded-full"
          />

          <h1 className="text-xl font-black tracking-tight bg-linear-to-r from-slate-900 via-emerald-800 to-lime-500 bg-clip-text text-transparent">
            Turf<span className="text-lime-500">Craft</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          <li>
            <NavLink href={"/"}>Home</NavLink>
          </li>

          <li>
            <NavLink href={"/all-facilities"}>
              All Facilities
            </NavLink>
          </li>

          <li>
            <NavLink href={"/my-bookings"}>
              My Bookings
            </NavLink>
          </li>

          <li>
            <NavLink href={"/add-facility"}>
              Add Facility
            </NavLink>
          </li>

          <li>
            <NavLink href={"/manage-my-facilities"}>
              Manage Facilities
            </NavLink>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-2">
                <Link href={"/login"}>
                  <Button
                    size="sm"
                    variant="light"
                    className="border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all rounded-full px-4 font-semibold"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                <Button
                  type="button"
                  size="sm"
                  variant="light"
                  onClick={() => setProfileMenuOpen((current) => !current)}
                  className="flex items-center gap-2 border border-slate-200 bg-white/90 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all rounded-full px-3 py-2 font-semibold shadow-sm rounded-md"
                >
                  <Avatar size="sm">
                    <Avatar.Image
                      src={user?.image}     
                      alt={user?.name}
                      referrerPolicy="no-referrer"
                    />
                    <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                  </Avatar>

                  <span className="max-w-28 truncate text-sm">
                    {user.name?.split(" ")[0]}
                  </span>

                  <LuChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      profileMenuOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </Button>

                <div
                  className={`absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl shadow-slate-900/10 transition-all duration-200 ${
                    profileMenuOpen
                      ? "translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                  }`}
                >
                  <div className="border-b border-slate-100 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Image
                          src={user?.image}
                          alt={user?.name}
                          referrerPolicy="no-referrer"
                        />
                        <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {user?.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/my-bookings"
                      onClick={closeMenus}
                      className="block rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      My Bookings
                    </Link>

                    <Link
                      href="/add-facility"
                      onClick={closeMenus}
                      className="block rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      Add Facility
                    </Link>

                    <Link
                      href="/manage-my-facilities"
                      onClick={closeMenus}
                      className="block rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      Manage My Facilities
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="mt-1 w-full rounded-xl px-4 py-2 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 hover:bg-slate-100 rounded-md transition-colors"
            >
              {menuOpen ? (
                <LuX size={26} className="text-emerald-600" />
              ) : (
                <LuMenu size={26} className="text-emerald-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute top-16 right-4 w-56 bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 ease-in-out lg:hidden z-50
          ${
            menuOpen
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="flex flex-col p-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg"
            >
              Home
            </Link>

            <Link
              href="/all-facilities"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg"
            >
              All Facilities
            </Link>

            <Link
              href="/my-bookings"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg"
            >
              My Bookings
            </Link>

            <Link
              href="/add-facility"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg"
            >
              Add Facility
            </Link>

            <Link
              href="/manage-my-facilities"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg border-b border-slate-100"
            >
              Manage Facilities
            </Link>

            <div className="p-2 pt-3">
              {!user ? (
                <div className="flex flex-col gap-2">
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    <Button
                      fullWidth
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 px-2">
                    <Avatar size="sm" className="w-6 h-6">
                      <Avatar.Image
                        src={user?.image}
                        alt={user?.name}
                        referrerPolicy="no-referrer"
                      />
                      <Avatar.Fallback>
                        {user?.name?.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>

                    <div className="min-w-0">
                      <span className="block truncate text-xs font-bold text-slate-700">
                        {user.name}
                      </span>
                      <span className="block truncate text-[11px] text-slate-500">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/my-bookings"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg"
                  >
                    My Bookings
                  </Link>

                  <Link
                    href="/add-facility"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg"
                  >
                    Add Facility
                  </Link>

                  <Link
                    href="/manage-my-facilities"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg"
                  >
                    Manage My Facilities
                  </Link>

                  <Button
                    size="sm"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold"
                    onClick={handleSignOut}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;