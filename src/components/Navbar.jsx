"use client";

import React, { useState } from "react";
import Link from "next/link";

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
  Contact,
} from "lucide-react";

import { useAppContext } from "@/context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const {
    isSeller,
    router,
    user,
    cartItems,
  } = useAppContext();

  const { openSignIn } = useClerk();

  const [isSearchOpen, setIsSearchOpen] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  // ============================================================
  // CART COUNT
  // ============================================================

  const cartCount = Object.values(
    cartItems || {}
  ).reduce(
    (total, quantity) =>
      total + Number(quantity || 0),
    0
  );


  // ============================================================
  // NAV ITEMS
  // ============================================================

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <House size={17} />,
    },

    {
      name: "Shop",
      href: "/all-products",
      icon: <ShoppingBasket size={17} />,
    },

    {
      name: "About Us",
      href: "/about",
      icon: <Sparkles size={17} />,
    },

    {
      name: "Contact",
      href: "/",
      icon: <Contact size={17} />,
    },
  ];


  return (
    <>
      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <motion.nav
        initial={{
          y: -80,
          opacity: 0,
        }}

        animate={{
          y: 0,
          opacity: 1,
        }}

        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}

        className="
          fixed
          left-0
          right-0
          top-0
          z-50

          w-full
          max-w-full

          border-b
          border-white/10

          bg-slate-950/75
          backdrop-blur-2xl

          shadow-[0_15px_50px_rgba(80,100,180,0.15)]
        "
      >

        {/* ======================================================
            TOP GRADIENT LINE
        ====================================================== */}

        <motion.div
          animate={{
            backgroundPosition: [
              "0% 50%",
              "100% 50%",
              "0% 50%",
            ],
          }}

          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}

          className="
            absolute
            left-0
            right-0
            top-0

            h-[3px]

            bg-[linear-gradient(90deg,#38bdf8,#6366f1,#ec4899,#8b5cf6,#38bdf8)]
            bg-[length:300%_100%]
          "
        />


        {/* ======================================================
            BACKGROUND GLOW
        ====================================================== */}

        <div className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        ">

          <motion.div
            animate={{
              x: [0, 60, 0],
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
              -left-20
              -top-24

              h-48
              w-48

              rounded-full
              bg-sky-400/10

              blur-3xl
            "
          />


          <motion.div
            animate={{
              x: [0, -60, 0],
              y: [0, 25, 0],
              scale: [1, 1.1, 1],
            }}

            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}

            className="
              absolute
              -right-20
              -top-24

              h-56
              w-56

              rounded-full
              bg-purple-500/10

              blur-3xl
            "
          />

        </div>


        {/* ======================================================
            MAIN NAVBAR ROW
        ====================================================== */}

        <div
          className="
            relative
            mx-auto

            flex
            h-[68px]

            w-full
            max-w-[1600px]

            items-center
            justify-between

            gap-2

            px-3

            sm:px-5

            md:h-[74px]
            md:px-8

            lg:px-12

            xl:px-16
          "
        >

          {/* ====================================================
              LOGO
          ==================================================== */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}

            whileTap={{
              scale: 0.96,
            }}

            onClick={() =>
              router.push("/")
            }

            className="
              flex
              min-w-0
              shrink-0
              cursor-pointer
              items-center
              gap-2
            "
          >

            {/* LOGO ICON */}

            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.04, 1],
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}

              className="
                relative
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center

                rounded-xl

                bg-gradient-to-br
                from-sky-400
                via-indigo-500
                to-purple-600

                shadow-lg
                shadow-indigo-500/30

                sm:h-10
                sm:w-10

                md:h-11
                md:w-11
              "
            >

              <ShoppingCart
                size={18}
                className="
                  text-white

                  sm:h-5
                  sm:w-5

                  md:h-[22px]
                  md:w-[22px]
                "
                strokeWidth={2.5}
              />

              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.8, 0.2, 0.8],
                }}

                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}

                className="
                  absolute
                  inset-0
                  rounded-xl
                  border-2
                  border-sky-400
                "
              />

            </motion.div>


            {/* BRAND */}

            <div className="min-w-0">

              <h1
                className="
                  truncate
                  text-xl
                  font-black
                  tracking-tight

                  sm:text-2xl

                  md:text-3xl
                "
              >

                <span
                  className="
                    bg-gradient-to-r
                    from-sky-400
                    via-indigo-500
                    to-purple-500

                    bg-clip-text
                    text-transparent

                    text-3xl

                    sm:text-4xl
                  "
                >
                  S
                </span>

                <span className="text-slate-200">
                  parkcart
                </span>

              </h1>


              <p
                className="
                  hidden
                  truncate

                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-slate-400

                  sm:block
                "
              >
                Shop • Discover • Enjoy
              </p>

            </div>

          </motion.div>


          {/* ====================================================
              DESKTOP NAV
          ==================================================== */}

          <div
            className="
              hidden
              lg:flex
              lg:flex-1
              lg:justify-center
            "
          >

            <div className="
              flex
              items-center
              gap-1
              rounded-2xl
              border
              border-white/5
              bg-white/[0.03]
              p-1
            ">

              {navItems.map((item) => (

                <motion.div
                  key={item.name}

                  whileHover={{
                    y: -2,
                  }}

                  whileTap={{
                    scale: 0.96,
                  }}
                >

                  <Link
                    href={item.href}

                    className="
                      group
                      relative

                      flex
                      items-center
                      gap-2

                      whitespace-nowrap

                      rounded-xl

                      px-3
                      py-2.5

                      text-sm
                      font-semibold

                      text-slate-300

                      transition-all

                      hover:bg-white/10
                      hover:text-white

                      xl:px-4
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
                        bottom-1
                        left-3
                        right-3

                        h-[2px]

                        origin-center
                        scale-x-0

                        rounded-full

                        bg-gradient-to-r
                        from-sky-400
                        via-indigo-500
                        to-purple-500

                        transition-transform
                        duration-300

                        group-hover:scale-x-100
                      "
                    />

                  </Link>

                </motion.div>

              ))}


              {/* SELLER */}

              {isSeller && (

                <motion.button
                  whileHover={{
                    scale: 1.04,
                    y: -2,
                  }}

                  whileTap={{
                    scale: 0.96,
                  }}

                  onClick={() =>
                    router.push("/seller")
                  }

                  className="
                    ml-1

                    flex
                    items-center
                    gap-2

                    whitespace-nowrap

                    rounded-xl

                    bg-gradient-to-r
                    from-fuchsia-500
                    via-purple-600
                    to-indigo-600

                    px-3
                    py-2.5

                    text-xs
                    font-bold
                    text-white

                    shadow-lg
                    shadow-purple-500/20

                    xl:px-4
                  "
                >

                  <LayoutDashboard size={15} />

                  <span>
                    Admin Dashboard
                  </span>

                </motion.button>

              )}

            </div>

          </div>


          {/* ====================================================
              RIGHT ACTIONS
          ==================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1

              sm:gap-2

              md:gap-2.5
            "
          >

            {/* ==================================================
                SEARCH
            ================================================== */}

            <motion.button
              whileHover={{
                scale: 1.08,
              }}

              whileTap={{
                scale: 0.9,
              }}

              onClick={() =>
                setIsSearchOpen(
                  !isSearchOpen
                )
              }

              aria-label="Search"

              className="
                flex
                h-9
                w-9
                shrink-0

                items-center
                justify-center

                rounded-full

                border
                border-white/10

                bg-white/5

                text-slate-300

                transition
                cursor-pointer

                hover:border-sky-300
                hover:bg-sky-400/10
                hover:text-sky-600

                sm:h-10
                sm:w-10

                md:h-11
                md:w-11
              "
            >

              {isSearchOpen ? (
                <X size={18} />
              ) : (
                <Search size={18} />
              )}

            </motion.button>


            {/* ==================================================
                CART
            ================================================== */}

            <Link
              href="/cart"
              className="shrink-0"
            >

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
                  h-9
                  w-9

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/10

                  bg-white/5

                  text-slate-300

                  transition

                  hover:border-sky-300
                  hover:bg-sky-400/10
                  hover:text-sky-600

                  sm:h-10
                  sm:w-10

                  md:h-11
                  md:w-11
                "
              >

                <ShoppingCart
                  size={18}
                />


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
                        -right-1.5
                        -top-1.5

                        flex
                        min-h-[20px]
                        min-w-[20px]

                        items-center
                        justify-center

                        rounded-full

                        border-1
                        border-slate-950

                        bg-gradient-to-r
                        from-fuchsia-500
                        to-violet-600

                        px-1

                        text-[10px]
                        font-black
                        text-white

                        shadow-lg

                        sm:min-h-[20px]
                        sm:min-w-[20px]
                        sm:text-[10px]
                      "
                    >
                      {cartCount > 99
                        ? "99+"
                        : cartCount}
                    </motion.span>

                  )}

                </AnimatePresence>

              </motion.div>

            </Link>


            {/* ==================================================
                ACCOUNT
            ================================================== */}

            {user ? (

              <motion.div
                whileHover={{
                  scale: 1.04,
                }}

                className="
                  hidden
                  shrink-0

                  rounded-full

                  bg-gradient-to-r
                  from-sky-400
                  via-indigo-500
                  to-purple-500

                  p-[2px]

                  shadow-lg
                  shadow-indigo-500/20

                  sm:block
                "
              >

                <div
                  className="
                    rounded-full
                    bg-slate-950
                    p-[2px]
                  "
                >

                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-8 h-8 md:w-9 md:h-9",
                      },
                    }}
                  >

                    <UserButton.MenuItems>

                      <UserButton.Action
                        label="Home"
                        labelIcon={
                          <House size={16} />
                        }
                        onClick={() =>
                          router.push("/")
                        }
                      />

                    </UserButton.MenuItems>


                    <UserButton.MenuItems>

                      <UserButton.Action
                        label="My Profile"
                        labelIcon={
                          <UserRound
                            size={16}
                          />
                        }
                        onClick={() =>
                          router.push(
                            "/profile"
                          )
                        }
                      />

                    </UserButton.MenuItems>


                    <UserButton.MenuItems>

                      <UserButton.Action
                        label="Products"
                        labelIcon={
                          <ShoppingBasket
                            size={16}
                          />
                        }
                        onClick={() =>
                          router.push(
                            "/all-products"
                          )
                        }
                      />

                    </UserButton.MenuItems>


                    <UserButton.MenuItems>

                      <UserButton.Action
                        label="My Orders"
                        labelIcon={
                          <Handbag
                            size={16}
                          />
                        }
                        onClick={() =>
                          router.push(
                            "/my-orders"
                          )
                        }
                      />

                    </UserButton.MenuItems>

                  </UserButton>

                </div>

              </motion.div>

            ) : (

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
                  hidden
                  shrink-0

                  items-center
                  gap-2

                  rounded-full

                  bg-gradient-to-r
                  from-sky-500
                  via-indigo-600
                  to-purple-600

                  px-4
                  py-2.5

                  text-sm
                  font-bold
                  text-white

                  shadow-lg
                  shadow-indigo-500/25

                  sm:flex
                  md:px-5
                "
              >

                <UserRound size={16} />

                <span>
                  Sign In
                </span>

              </motion.button>

            )}


            {/* ==================================================
                MOBILE MENU
            ================================================== */}

            <motion.button
              whileTap={{
                scale: 0.9,
              }}

              onClick={() =>
                setIsMobileMenuOpen(
                  !isMobileMenuOpen
                )
              }

              aria-label="Open menu"

              className="
                flex
                h-9
                w-9
                shrink-0

                items-center
                justify-center

                rounded-xl

                border
                border-white/10

                bg-white/5

                text-slate-300

                transition

                hover:bg-white/10

                lg:hidden

                sm:h-10
                sm:w-10
              "
            >

              {isMobileMenuOpen ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}

            </motion.button>

          </div>

        </div>


        {/* ======================================================
            SEARCH BAR
        ====================================================== */}

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
                border-white/10

                bg-slate-950/95

                backdrop-blur-2xl
              "
            >

              <div
                className="
                  mx-auto
                  w-full
                  max-w-3xl

                  px-3
                  py-3

                  sm:px-5
                  sm:py-4
                "
              >

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
                    flex
                    min-w-0
                    items-center
                    gap-2

                    rounded-2xl

                    border
                    border-sky-400/20

                    bg-white/[0.06]

                    px-3
                    py-2.5

                    shadow-xl

                    sm:px-4
                    sm:py-3
                  "
                >

                  <Search
                    size={19}
                    className="
                      shrink-0
                      text-sky-400
                    "
                  />


                  <input
                    type="text"

                    placeholder="
                      Search products, categories...
                    "

                    autoFocus

                    className="
                      min-w-0
                      flex-1

                      bg-transparent

                      text-sm
                      text-white

                      outline-none

                      placeholder:text-slate-500

                      sm:text-base
                    "
                  />


                  <button
                    onClick={() =>
                      setIsSearchOpen(false)
                    }

                    className="
                      shrink-0

                      rounded-lg

                      p-1.5

                      text-slate-500

                      transition

                      hover:bg-white/10
                      hover:text-white
                    "
                  >

                    <X size={17} />

                  </button>

                </motion.div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>


        {/* ======================================================
            MOBILE MENU
        ====================================================== */}

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

              transition={{
                duration: 0.3,
              }}

              className="
                overflow-hidden

                border-t
                border-white/10

                bg-slate-950/95

                backdrop-blur-2xl

                lg:hidden
              "
            >

              <div
                className="
                  mx-auto
                  w-full
                  max-w-2xl

                  space-y-2

                  px-3
                  py-4

                  sm:px-5
                "
              >

                {/* MOBILE ACCOUNT */}

                {user && (

                  <motion.button
                    initial={{
                      x: -15,
                      opacity: 0,
                    }}

                    animate={{
                      x: 0,
                      opacity: 1,
                    }}

                    onClick={() => {
                      router.push(
                        "/profile"
                      );

                      setIsMobileMenuOpen(
                        false
                      );
                    }}

                    className="
                      flex
                      w-full
                      items-center
                      gap-3

                      rounded-2xl

                      border
                      border-indigo-400/20

                      bg-gradient-to-r
                      from-indigo-500/10
                      to-purple-500/10

                      px-4
                      py-3

                      text-left

                      text-sm
                      font-semibold
                      text-white

                      transition

                      hover:bg-white/10
                    "
                  >

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center

                        rounded-xl

                        bg-gradient-to-br
                        from-sky-400
                        to-purple-600
                      "
                    >

                      <UserRound
                        size={17}
                      />

                    </span>

                    <span>
                      My Profile
                    </span>

                  </motion.button>

                )}


                {/* NAV ITEMS */}

                {navItems.map(
                  (item, index) => (

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
                        delay:
                          (index + 1) *
                          0.05,
                      }}
                    >

                      <Link
                        href={item.href}

                        onClick={() =>
                          setIsMobileMenuOpen(
                            false
                          )
                        }

                        className="
                          flex
                          w-full
                          items-center
                          gap-3

                          rounded-xl

                          px-4
                          py-3

                          text-sm
                          font-medium
                          text-slate-300

                          transition

                          hover:bg-white/10
                          hover:text-white
                        "
                      >

                        <span
                          className="
                            text-sky-400
                          "
                        >
                          {item.icon}
                        </span>

                        {item.name}

                      </Link>

                    </motion.div>

                  )
                )}


                {/* SHOPPING */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-2
                    pt-2
                  "
                >

                  <Link
                    href="/cart"

                    onClick={() =>
                      setIsMobileMenuOpen(
                        false
                      )
                    }

                    className="
                      flex
                      items-center
                      justify-center
                      gap-2

                      rounded-xl

                      border
                      border-fuchsia-400/20

                      bg-fuchsia-500/10

                      px-3
                      py-3

                      text-xs
                      font-bold
                      text-fuchsia-300
                    "
                  >

                    <ShoppingCart
                      size={16}
                    />

                    Cart

                    {cartCount > 0 && (
                      <span>
                        ({cartCount})
                      </span>
                    )}

                  </Link>


                  <Link
                    href="/all-products"

                    onClick={() =>
                      setIsMobileMenuOpen(
                        false
                      )
                    }

                    className="
                      flex
                      items-center
                      justify-center
                      gap-2

                      rounded-xl

                      border
                      border-sky-400/20

                      bg-sky-500/10

                      px-3
                      py-3

                      text-xs
                      font-bold
                      text-sky-300
                    "
                  >

                    <ShoppingBasket
                      size={16}
                    />

                    Shop

                  </Link>

                </div>


                {/* SELLER */}

                {isSeller && (

                  <motion.button
                    initial={{
                      y: 10,
                      opacity: 0,
                    }}

                    animate={{
                      y: 0,
                      opacity: 1,
                    }}

                    onClick={() => {
                      router.push(
                        "/seller"
                      );

                      setIsMobileMenuOpen(
                        false
                      );
                    }}

                    className="
                      mt-1

                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2

                      rounded-xl

                      bg-gradient-to-r
                      from-fuchsia-500
                      via-purple-600
                      to-indigo-600

                      px-4
                      py-3

                      text-sm
                      font-bold
                      text-white

                      shadow-lg
                    "
                  >

                    <LayoutDashboard
                      size={17}
                    />

                    Admin Dashboard

                  </motion.button>

                )}

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </motion.nav>


      {/* ========================================================
          FIXED NAVBAR SPACER
      ======================================================== */}

      <div
        className="
          h-[68px]

          sm:h-[72px]

          md:h-[74px]
        "
      />

    </>
  );
};

export default Navbar;