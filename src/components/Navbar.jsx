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
  const cartCount = Object.values(cartItems || {}).reduce(
    (total, quantity) => total + Number(quantity || 0),
    0
  );

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <House size={16} />,
    },
    {
      name: "Shop",
      href: "/all-products",
      icon: <ShoppingBasket size={16} />,
    },
    {
      name: "About Us",
      href: "/",
      icon: <Sparkles size={16} />,
    },
    {
      name: "Contact",
      href: "/",
      icon: <Heart size={16} />,
    },
  ];

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

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href={item.href}
                  className="
                    group
                    relative
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-slate-300
                    hover:text-indigo-500
                    transition-all
                  "
                >
                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:scale-110
                      group-hover:rotate-6
                    "
                  >
                    {item.icon}
                  </span>

                  {item.name}

                  <span
                    className="
                      absolute
                      left-4
                      right-4
                      bottom-1
                      h-[2px]
                      rounded-full
                      bg-gradient-to-r
                      from-sky-400
                      via-indigo-500
                      to-purple-500
                      scale-x-0
                      group-hover:scale-x-100
                      transition-transform
                      duration-300
                      origin-center
                    "
                  />
                </Link>
              </motion.div>
            ))}

            {/* Seller dashboard */}
            {isSeller && (
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => router.push("/seller")}
                className="
                  ml-2
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  text-xs
                  font-bold
                  text-white
                  bg-gradient-to-r
                  from-fuchsia-500
                  via-purple-600
                  to-indigo-600
                  shadow-lg
                  shadow-purple-500/25
                "
              >
                <LayoutDashboard size={15} />
                Admin Dashboard
              </motion.button>
            )}
          </div>

          {/* ================= RIGHT ACTIONS ================= */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search */}
            <motion.button
              whileHover={{
                scale: 1.08,
                rotate: 5,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
               className="
                          relative
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-slate-200
                          bg-white/80
                          text-slate-600
                          shadow-sm
                          transition
                          hover:border-blue-300
                          hover:text-blue-600
                          dark:border-white/10
                          dark:bg-white/5
                          dark:text-slate-300
                          cursor-pointer
                          "

            >
              {isSearchOpen ? (
                <X size={19} />
              ) : (
                <Search size={19} />
              )}
            </motion.button>

            {/* Cart */}
            <Link href="/cart">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="
                          relative
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-slate-200
                          bg-white/80
                          text-slate-600
                          shadow-sm
                          transition
                          hover:border-blue-300
                          hover:text-blue-600
                          dark:border-white/10
                          dark:bg-white/5
                          dark:text-slate-300
                          "
              >
                <ShoppingCart size={19} />

                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{
                        scale: 0,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{
                        scale: 0,
                        opacity: 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                      className="
                        absolute
                        -right-2
                        -top-2
                        min-w-[21px]
                        h-[21px]
                        px-1
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-r
                        from-fuchsia-500
                        to-violet-600
                        text-white
                        text-[10px]
                        font-black
                        border-2
                        border-white
                        shadow-lg
                      "
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>

            {/* ================= CLERK USER ================= */}
            {user ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="
                  ml-1
                  p-1
                  rounded-full
                  bg-gradient-to-r
                  from-sky-400
                  via-indigo-500
                  to-purple-500
                  shadow-lg
                  shadow-indigo-400/20
                "
              >
                <div className="rounded-full bg-white p-[2px]">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 md:w-9 md:h-9",
                      },
                    }}
                  >
                    {/* Home */}
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="Home"
                        labelIcon={<House size={16} />}
                        onClick={() => router.push("/")}
                      />
                    </UserButton.MenuItems>

                    {/* Profile */}
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="My Profile"
                        labelIcon={<UserRound size={16} />}
                        onClick={() => router.push("/profile")}
                      />
                    </UserButton.MenuItems>

                    {/* Products */}
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="Products"
                        labelIcon={<ShoppingBasket size={16} />}
                        onClick={() => router.push("/all-products")}
                      />
                    </UserButton.MenuItems>

                    {/* Orders */}
                    <UserButton.MenuItems>
                      <UserButton.Action
                        label="My Orders"
                        labelIcon={<Handbag size={16} />}
                        onClick={() => router.push("/my-orders")}
                      />
                    </UserButton.MenuItems>

                    {/* Cart */}
                  </UserButton>
                </div>
              </motion.div>
            ) : (
              /* Sign In */
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={openSignIn}
                className="
                  flex
                  items-center
                  gap-2
                  px-4
                  md:px-5
                  py-2.5
                  rounded-xl
                  text-sm
                  font-bold
                  text-white
                  bg-gradient-to-r
                  from-sky-500
                  via-indigo-600
                  to-purple-600
                  shadow-lg
                  shadow-indigo-500/25
                "
              >
                <UserRound size={17} />
                <span className="hidden sm:block">Sign In</span>
              </motion.button>
            )}

            {/* Mobile menu */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="
                lg:hidden
                flex
                w-10
                h-10
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-slate-950/75
                text-slate-300
              "
            >
              {isMobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </motion.button>
          </div>
        </div>

        {/* ================= SEARCH BAR ================= */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                overflow-hidden
                border-t
                border-sky-100
                bg-white/90
                backdrop-blur-xl
              "
            >
              <div className="px-5 md:px-16 lg:px-32 py-4">
                <motion.div
                  initial={{
                    y: -10,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  className="
                    max-w-3xl
                    mx-auto
                    flex
                    items-center
                    gap-3
                    px-5
                    py-3
                    rounded-2xl
                    border
                    border-sky-100
                    bg-gradient-to-r
                    from-sky-50
                    via-white
                    to-indigo-50
                    shadow-inner
                  "
                >
                  <Search
                    size={20}
                    className="text-indigo-500"
                  />

                  <input
                    type="text"
                    placeholder="Search products, categories..."
                    autoFocus
                    className="
                      flex-1
                      bg-transparent
                      outline-none
                      text-sm
                      md:text-base
                      text-gray-800
                      placeholder:text-gray-400
                    "
                  />

                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="
                      p-1.5
                      rounded-lg
                      hover:bg-gray-100
                      text-gray-400
                      hover:text-gray-700
                      transition
                    "
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              className="
                lg:hidden
                overflow-hidden
                border-t
                border-sky-100
                bg-slate-950/75
                backdrop-blur-xl
              "
            >
              <div className="p-5 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{
                      x: -20,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                      className="
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        text-slate-300
                        hover:text-indigo-500
                        hover:bg-indigo-50
                        font-medium
                        transition
                      "
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {isSeller && (
                  <motion.button
                    initial={{
                      x: -20,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.2,
                    }}
                    onClick={() => {
                      router.push("/seller");
                      setIsMobileMenuOpen(false);
                    }}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-white
                      font-bold
                      bg-gradient-to-r
                      from-fuchsia-500
                      to-indigo-600
                      shadow-lg
                    "
                  >
                    <LayoutDashboard size={17} />
                    Admin Dashboard
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Navbar spacer because navbar is fixed */}
      <div className="h-[70px] md:h-[76px]" />
    </>
  );
};

export default Navbar;

