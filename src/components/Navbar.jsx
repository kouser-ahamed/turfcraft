"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { LuMenu, LuX } from "react-icons/lu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const userData = authClient.useSession();
  const user = userData.data?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    setMenuOpen(false);
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
                <Link href={"/signup"}>
                  <Button
                    size="sm"
                    variant="light"
                    className="border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all rounded-full px-4 font-semibold"
                  >
                    Register
                  </Button>
                </Link>

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
              <div className="flex gap-4 items-center">
                <div className="flex justify-center items-center gap-1 border rounded-md p-1">


                <Avatar size="sm">
                  <Avatar.Image
                    src={user?.image}
                    alt={user?.name}
                    referrerPolicy="no-referrer"
                    />
                  <Avatar.Fallback>
                    {user?.name?.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>

                <h2 className="text-sm font-semibold text-slate-700">
                  {user.name?.split(" ")[0]}
                </h2>
                    </div>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 font-semibold"
                  onClick={handleSignOut}
                >
                  Logout
                </Button>
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
          className={`absolute top-[65px] right-4 w-[220px] bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 ease-in-out lg:hidden z-50
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

                  <Link href="/signup" onClick={() => setMenuOpen(false)}>
                    <Button
                      fullWidth
                      size="sm"
                      variant="bordered"
                      className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-full font-semibold"
                    >
                      Register
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
                      />
                      <Avatar.Fallback>
                        {user?.name?.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>

                    <span className="text-xs font-bold text-slate-700 truncate">
                      {user.name}
                    </span>
                  </div>

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