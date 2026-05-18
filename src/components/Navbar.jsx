"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { LuChevronDown, LuMenu, LuX } from "react-icons/lu";

const ProfileAvatar = ({ src, name, sizeClassName }) => {
  const imageSrc = typeof src === "string" && src.trim() ? src.trim() : null;
  const initial = name?.charAt(0)?.toUpperCase() || "U";

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ring-1 ring-slate-200 shadow-sm ${sizeClassName}`}
    >
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={name || "User profile"}
          referrerPolicy="no-referrer"
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
          {initial}
        </span>
      )}
    </span>
  );
};

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

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
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
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <Image
            src="/assets/Logo.png"
            alt="logo"
            width={40}
            height={40}
            priority
            className="rounded-full object-cover"
          />

          <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-linear-to-r from-slate-900 via-emerald-700 to-lime-500 bg-clip-text text-transparent">
            Turf<span className="text-lime-500">Craft</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-7 text-sm font-semibold">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>

          <li>
            <NavLink href="/all-facilities">
              All Facilities
            </NavLink>
          </li>

          <li>
            <NavLink href="/my-bookings">
              My Bookings
            </NavLink>
          </li>

          <li>
            <NavLink href="/add-facility">
              Add Facility
            </NavLink>
          </li>

          <li>
            <NavLink href="/manage-my-facilities">
              Manage Facilities
            </NavLink>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center">
            {!user ? (
              <Link href="/login">
                <Button
                  size="sm"
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-5 font-semibold shadow-md"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                
                {/* Profile Button */}
                <button
                  onClick={() =>
                    setProfileMenuOpen((prev) => !prev)
                  }
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm hover:border-emerald-200 hover:bg-emerald-50 transition-all"
                >
                  <ProfileAvatar src={user?.image} name={user?.name} sizeClassName="w-8 h-8" />

                  <span className="max-w-24 truncate text-sm font-semibold text-slate-700">
                    {user?.name?.split(" ")[0]}
                  </span>

                  <LuChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      profileMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 top-[115%] w-72 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-300 ${
                    profileMenuOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  
                  {/* User Info */}
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <ProfileAvatar src={user?.image} name={user?.name} sizeClassName="w-11 h-11" />

                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-bold text-slate-800">
                        {user?.name}
                      </h4>

                      <p className="truncate text-xs text-slate-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="mt-2 flex flex-col">
                    <Link
                      href="/my-bookings"
                      onClick={closeMenus}
                      className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                    >
                      My Bookings
                    </Link>

                    <Link
                      href="/add-facility"
                      onClick={closeMenus}
                      className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                    >
                      Add Facility
                    </Link>

                    <Link
                      href="/manage-my-facilities"
                      onClick={closeMenus}
                      className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                    >
                      Manage Facilities
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="mt-1 rounded-xl px-4 py-3 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center rounded-lg p-2 hover:bg-slate-100 transition"
          >
            {menuOpen ? (
              <LuX size={26} className="text-emerald-600" />
            ) : (
              <LuMenu size={26} className="text-emerald-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute right-4 top-20 w-[92vw] max-w-sm rounded-3xl border border-slate-100 bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-300 lg:hidden ${
            menuOpen
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 -translate-y-3"
          }`}
        >
          <div className="p-4">

            {/* User Info */}
            {user && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <ProfileAvatar src={user?.image} name={user?.name} sizeClassName="w-10 h-10" />

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {user?.name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col gap-1">
              {[
                ["Home", "/"],
                ["All Facilities", "/all-facilities"],
                ["My Bookings", "/my-bookings"],
                ["Add Facility", "/add-facility"],
                ["Manage Facilities", "/manage-my-facilities"],
              ].map(([title, href]) => (
                <Link
                  key={title}
                  href={href}
                  onClick={closeMenus}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                >
                  {title}
                </Link>
              ))}
            </div>

            {/* Auth */}
            <div className="mt-4">
              {!user ? (
                <Link href="/login" onClick={closeMenus}>
                  <Button
                    fullWidth
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold"
                  >
                    Login
                  </Button>
                </Link>
              ) : (
                <Button
                  fullWidth
                  onClick={handleSignOut}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-full font-semibold"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;