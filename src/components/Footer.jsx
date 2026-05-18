"use client";
import Link from "next/link";
import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { FaPhoneVolume, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/Logo.png"
                alt="TurfCraft Logo"
                width={30}
                height={30}
                className="object-contain rounded-full"
              />
              <span className="text-xl font-black tracking-tight text-white">
                Turf<span className="text-lime-400">Craft</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The premium sports facility booking platform. Discover, reserve, and manage the finest football turfs, badminton courts, swimming lanes, and tennis courts near you.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Information
            </h4>
            <ul className="text-sm space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 text-base"><MdLocationPin /></span> Dhanmondi, Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 text-base"><TbMessage /></span> support@turfcraft.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-500 text-sm"><FaPhoneVolume /></span> +880 1322699296
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect With Us
            </h4>
            <p className="text-sm text-slate-400 mb-2">
              Stay updated with our latest venues and exclusive premium offers.
            </p>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://www.facebook.com/kouserahamed420" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:bg-[#1877F2] hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/20 transition-all duration-300 text-base"
              >
                <FaFacebookF />
              </a>
              
              <a 
                href="https://www.linkedin.com/in/kouser-ahamed/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:bg-[#0077B5] hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-[#0077B5]/20 transition-all duration-300 text-base"
              >
                <FaLinkedinIn />
              </a>

              <a 
                href="https://github.com/kouser-ahamed" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:bg-emerald-600 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-emerald-600/20 transition-all duration-300 text-base"
              >
                <SiGithub />
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} TurfCraft. All rights reserved.</p>
          <p className="hover:text-emerald-400 transition-colors font-medium">
            Developed by Kouser Ahamed Opu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;