"use client";

import Link from "next/link";
import {FaFacebookF,FaInstagram,FaTwitter,FaLinkedinIn,} from "react-icons/fa";
import { Phone,Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-800 text-white">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>
            <h2 className="text-4xl font-extrabold">
              <span className="text-sky-400">S</span>parkcart
            </h2>

            <p className="mt-6 text-slate-300 leading-relaxed">
              Sparkcart delivers premium shopping experiences with modern
              technology, lightning-fast service, and customer-first support.
            </p>

            <div className="flex gap-4 mt-8">

              {[
                FaFacebookF,
                FaInstagram,
                FaTwitter,
                FaLinkedinIn,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm transition duration-300 hover:scale-110 hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500/40"
                >
                  <Icon size={18} />
                </a>
              ))}

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Company
            </h3>

            <ul className="space-y-4 text-slate-300">

              {[
                "Home",
                "About Us",
                "Products",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="group inline-flex items-center"
                  >
                    <span className="transition duration-300 group-hover:text-cyan-400">
                      {item}
                    </span>

                    <span className="ml-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-6 group-hover:ml-2"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Support
            </h3>

            <ul className="space-y-4 text-slate-300">

              {[
                "Privacy Policy",
                "Terms & Conditions",
                "FAQs",
                "Shipping Policy",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="transition duration-300 hover:text-cyan-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Get In Touch
            </h3>

            <div className="space-y-5 text-slate-300">

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-cyan-400"
                />
                <span>+880 172-XXXXXXX</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-cyan-400"
                />
                <span>support@sparkcart.com</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center text-slate-400">

          <p>
            © {new Date().getFullYear()} Sparkcart. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}