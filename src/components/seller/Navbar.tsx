"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  Handbag,
  ShoppingBasket,
  House,
  Search,
  X,
  LayoutDashboard,
  UserRound,
  Sparkles,
  Menu,
  Heart,
} from "lucide-react";

import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { isSeller, router, user, cartItems } = useAppContext();

  const { openSignIn } = useClerk();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart quantity



  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed top-0 left-0 right-0 z-50
          border-b border-slate-200
          bg-slate-950/75
          backdrop-blur-2xl
          shadow-[0_15px_50px_rgba(80,100,180,0.12)]
        "
      >
        {/* Animated top gradient line */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute top-0 left-0 right-0
            h-[3px]
            bg-[linear-gradient(90deg,#38bdf8,#6366f1,#ec4899,#8b5cf6,#38bdf8)]
            bg-[length:300%_100%]
          "
        />

        {/* Floating background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 80, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -top-20
              left-[20%]
              w-52
              h-52
              rounded-full
              bg-sky-300/10
              blur-3xl
            "
          />

          <motion.div
            animate={{
              x: [0, -70, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -top-24
              right-[20%]
              w-60
              h-60
              rounded-full
              bg-purple-300/10
              blur-3xl
            "
          />
        </div>

        <div
          className="
            relative
            flex
            items-center
            justify-between
            px-5
            md:px-10
            lg:px-20
            xl:px-32
            py-3
          "
        >
          {/* ================= LOGO ================= */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push("/")}
            className="cursor-pointer flex items-center gap-2"
          >
            {/* Logo icon */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                flex
                items-center
                justify-center
                w-11
                h-11
                rounded-2xl
                bg-gradient-to-br
                from-sky-400
                via-indigo-500
                to-purple-600
                shadow-lg
                shadow-indigo-400/30
              "
            >
              <ShoppingCart
                size={22}
                className="text-white"
                strokeWidth={2.5}
              />

              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  border-2
                  border-sky-400
                "
              />
            </motion.div>

            {/* Brand */}
            <div className="leading-none">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                <span
                  className="
                    bg-gradient-to-r
                    from-indigo-500
                    via-fuchsia-500
                    to-violet-600
                    bg-clip-text
                    text-transparent
                    text-4xl
                  "
                >
                  S
                </span>
                <span className="text-slate-300">parkcart</span>
              </h1>

              <p className="hidden sm:block text-[9px] uppercase tracking-[0.25em] text-slate-300 font-bold mt-1">
                Shop • Discover • Enjoy
              </p>
            </div>
          </motion.div>

          {/* ================= RIGHT ACTIONS ================= */}
        </div>
        {/* ================= SEARCH BAR ================= */}

        {/* ================= MOBILE MENU ================= */}

      </motion.nav>

      {/* Navbar spacer because navbar is fixed */}
      <div className="h-[70px] md:h-[76px]" />
    </>
  );
};

export default Navbar;

