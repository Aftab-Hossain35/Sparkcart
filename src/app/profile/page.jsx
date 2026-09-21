"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UserRound,
  ShoppingBag,
  ShoppingCart,
  Heart,
  MapPin,
  Settings,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Package,
  CreditCard,
  LogOut,
} from "lucide-react";

import { useUser, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const { router, cartItems } = useAppContext();

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            h-10
            w-10
            rounded-full
            border-4
            border-sky-200
            border-t-indigo-600
          "
        />
      </div>
    );
  }

  // --------------------------------------------------
  // User not logged in
  // --------------------------------------------------
  if (!user) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-gradient-to-br
          from-sky-50
          via-white
          to-indigo-50
          px-5
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-white
            bg-white/80
            p-8
            text-center
            shadow-2xl
            shadow-indigo-200/30
            backdrop-blur-xl
          "
        >
          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-gradient-to-br
              from-sky-400
              via-indigo-500
              to-purple-600
              text-white
              shadow-xl
            "
          >
            <UserRound size={34} />
          </div>

          <h1 className="mt-6 text-2xl font-black text-gray-900">
            Welcome to Sparkcart
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please sign in to access your profile and orders.
          </p>

          <button
            onClick={() => router.push("/")}
            className="
              mt-6
              w-full
              rounded-xl
              bg-gradient-to-r
              from-sky-500
              via-indigo-600
              to-purple-600
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-indigo-500/20
              transition
              hover:scale-[1.02]
            "
          >
            Back to Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  // --------------------------------------------------
  // Cart count
  // --------------------------------------------------
  const cartCount = Object.values(cartItems || {}).reduce(
    (total, quantity) => total + Number(quantity || 0),
    0
  );

  const firstName =
    user.firstName ||
    user.fullName?.split(" ")[0] ||
    "User";

  const fullName =
    user.fullName ||
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    "Sparkcart User";

  const email =
    user.primaryEmailAddress?.emailAddress ||
    "No email available";

  // --------------------------------------------------
  // Quick action cards
  // --------------------------------------------------
  const quickActions = [
    {
      title: "My Orders",
      description: "Track and manage your purchases",
      icon: Package,
      gradient: "from-violet-500 to-indigo-600",
      bg: "bg-indigo-50",
      action: () => router.push("/my-orders"),
    },
    {
      title: "Shopping Cart",
      description: `${cartCount} ${
        cartCount === 1 ? "item" : "items"
      } in your cart`,
      icon: ShoppingCart,
      gradient: "from-sky-400 to-cyan-600",
      bg: "bg-sky-50",
      action: () => router.push("/cart"),
    },
    {
      title: "Continue Shopping",
      description: "Discover our latest products",
      icon: ShoppingBag,
      gradient: "from-pink-500 to-purple-600",
      bg: "bg-pink-50",
      action: () => router.push("/all-products"),
    },
    {
      title: "Wishlist",
      description: "Your favorite products",
      icon: Heart,
      gradient: "from-rose-500 to-pink-600",
      bg: "bg-rose-50",
      action: () => {},
    },
  ];

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-slate-50
        via-white
        to-sky-50
        px-4
        py-8
        sm:px-6
        md:px-10
        lg:px-16
        xl:px-24
      "
    >
      {/* ==================================================
          BACKGROUND DECORATION
      ================================================== */}

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -top-32
          -left-32
          h-96
          w-96
          rounded-full
          bg-sky-300/20
          blur-3xl
        "
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-40
          h-96
          w-96
          rounded-full
          bg-purple-300/15
          blur-3xl
        "
      />

      {/* ==================================================
          MAIN CONTAINER
      ================================================== */}

      <div className="relative mx-auto max-w-7xl">

        {/* ==================================================
            PAGE TITLE
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-7 sm:mb-9"
        >
          <div className="flex items-center gap-2">
            <Sparkles
              size={20}
              className="text-indigo-500"
            />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-indigo-500
              "
            >
              My Account
            </span>
          </div>

          <h1
            className="
              mt-2
              text-3xl
              font-black
              tracking-tight
              text-gray-900
              sm:text-4xl
              md:text-5xl
            "
          >
            Welcome back,{" "}
            <span
              className="
                bg-gradient-to-r
                from-sky-500
                via-indigo-600
                to-purple-600
                bg-clip-text
                text-transparent
              "
            >
              {firstName}
            </span>
            👋
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Manage your Sparkcart account and shopping activity.
          </p>
        </motion.div>

        {/* ==================================================
            PROFILE HERO
        ================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/70
            bg-white/75
            shadow-xl
            shadow-indigo-200/20
            backdrop-blur-xl
          "
        >
          {/* Gradient banner */}
          <div
            className="
              h-32
              bg-gradient-to-r
              from-sky-400
              via-indigo-500
              to-purple-600
              sm:h-40
              md:h-48
            "
          />

          {/* Decorative circles */}
          <div className="absolute right-[-40px] top-[-70px] h-52 w-52 rounded-full border-[35px] border-white/10" />

          <div className="absolute right-24 top-8 h-20 w-20 rounded-full bg-white/10 blur-xl" />

          {/* Profile content */}
          <div className="relative px-5 pb-6 sm:px-8 sm:pb-8 md:px-10">
            <div
              className="
                -mt-12
                flex
                flex-col
                gap-5
                sm:-mt-16
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              {/* Avatar */}
              <div className="flex items-end gap-4">
                <div
                  className="
                    rounded-full
                    bg-white
                    p-1.5
                    shadow-2xl
                  "
                >
                  <img
                    src={user.imageUrl}
                    alt={fullName}
                    className="
                      h-24
                      w-24
                      rounded-full
                      object-cover
                      sm:h-32
                      sm:w-32
                    "
                  />
                </div>

                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-gray-900 sm:text-2xl">
                      {fullName}
                    </h2>

                    <ShieldCheck
                      size={18}
                      className="text-indigo-500"
                    />
                  </div>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    {email}
                  </p>
                </div>
              </div>

              {/* Clerk profile button */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-400">
                  Account
                </span>

                <div
                  className="
                    rounded-full
                    bg-gradient-to-r
                    from-sky-400
                    via-indigo-500
                    to-purple-600
                    p-1
                    shadow-lg
                  "
                >
                  <div className="rounded-full bg-white p-0.5">
                    <UserButton />
                  </div>
                </div>
              </div>
            </div>

            {/* Account information */}
            <div
              className="
                mt-7
                grid
                gap-3
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {/* Email */}
              <div
                className="
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50/80
                  p-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-sky-100
                      text-sky-600
                    "
                  >
                    <UserRound size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Email
                    </p>

                    <p className="truncate text-sm font-semibold text-gray-700">
                      {email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div
                className="
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50/80
                  p-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-purple-100
                      text-purple-600
                    "
                  >
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Delivery
                    </p>

                    <p className="text-sm font-semibold text-gray-700">
                      Manage your address
                    </p>
                  </div>
                </div>
              </div>

              {/* Account status */}
              <div
                className="
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50/80
                  p-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-100
                      text-emerald-600
                    "
                  >
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Status
                    </p>

                    <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Account Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ==================================================
            QUICK ACTIONS
        ================================================== */}

        <div className="mt-8 sm:mt-10">
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
              Quick Access
            </p>

            <h2 className="mt-1 text-xl font-black text-gray-900 sm:text-2xl">
              Your Shopping
            </h2>
          </motion.div>

          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;

              return (
                <motion.button
                  key={action.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.015,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={action.action}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white
                    bg-white/80
                    p-5
                    text-left
                    shadow-lg
                    shadow-slate-200/40
                    backdrop-blur
                    transition
                  "
                >
                  {/* Hover glow */}
                  <div
                    className={`
                      absolute
                      -right-10
                      -top-10
                      h-28
                      w-28
                      rounded-full
                      ${action.bg}
                      opacity-0
                      blur-2xl
                      transition
                      duration-500
                      group-hover:opacity-100
                    `}
                  />

                  <div className="relative">
                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        ${action.gradient}
                        text-white
                        shadow-lg
                      `}
                    >
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-gray-900">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      {action.description}
                    </p>

                    <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-500">
                      Explore
                      <motion.span
                        whileHover={{
                          x: 4,
                        }}
                      >
                        <ArrowRight size={14} />
                      </motion.span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            ACCOUNT SETTINGS
        ================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-8
            rounded-3xl
            border
            border-white
            bg-white/75
            p-5
            shadow-lg
            shadow-slate-200/40
            backdrop-blur-xl
            sm:p-7
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-slate-700
                to-slate-900
                text-white
              "
            >
              <Settings size={20} />
            </div>

            <div>
              <h2 className="font-black text-gray-900">
                Account Settings
              </h2>

              <p className="text-xs text-gray-400">
                Manage your account preferences
              </p>
            </div>
          </div>

          <div
            className="
              mt-5
              grid
              gap-3
              sm:grid-cols-2
            "
          >
            <button
              onClick={() => router.push("/my-orders")}
              className="
                group
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-100
                bg-slate-50/70
                px-4
                py-4
                text-left
                transition
                hover:border-indigo-100
                hover:bg-indigo-50/50
              "
            >
              <div className="flex items-center gap-3">
                <CreditCard
                  size={19}
                  className="text-indigo-500"
                />

                <div>
                  <p className="text-sm font-bold text-gray-700">
                    Order History
                  </p>

                  <p className="text-[11px] text-gray-400">
                    View your previous purchases
                  </p>
                </div>
              </div>

              <ArrowRight
                size={16}
                className="
                  text-gray-300
                  transition
                  group-hover:translate-x-1
                  group-hover:text-indigo-500
                "
              />
            </button>

            <button
              onClick={() => router.push("/cart")}
              className="
                group
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-100
                bg-slate-50/70
                px-4
                py-4
                text-left
                transition
                hover:border-sky-100
                hover:bg-sky-50/50
              "
            >
              <div className="flex items-center gap-3">
                <ShoppingCart
                  size={19}
                  className="text-sky-500"
                />

                <div>
                  <p className="text-sm font-bold text-gray-700">
                    Shopping Cart
                  </p>

                  <p className="text-[11px] text-gray-400">
                    Review items before checkout
                  </p>
                </div>
              </div>

              <ArrowRight
                size={16}
                className="
                  text-gray-300
                  transition
                  group-hover:translate-x-1
                  group-hover:text-sky-500
                "
              />
            </button>
          </div>
        </motion.section>

        {/* ==================================================
            FOOTER MESSAGE
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="
            py-8
            text-center
            text-xs
            text-gray-400
          "
        >
          <p className="flex items-center justify-center gap-1">
            Made with
            <span className="text-pink-500">♥</span>
            for Sparkcart shoppers
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default ProfilePage;

