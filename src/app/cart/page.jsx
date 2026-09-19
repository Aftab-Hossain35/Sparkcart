'use client';

import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import {
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const rowVariants = {
  hidden: {
    opacity: 0,
    x: -16,
  },

  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },

  exit: {
    opacity: 0,
    x: 16,
    height: 0,
    transition: {
      duration: 0.25,
    },
  },
};

const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
  } = useAppContext();

  // =========================================================
  // GET ONLY VALID CART PRODUCTS
  // =========================================================
  const cartProductIds = Object.keys(cartItems).filter((itemId) => {
    const product = products.find(
      (product) => product._id === itemId
    );

    return product && cartItems[itemId] > 0;
  });

  // =========================================================
  // CHECK EMPTY CART
  // =========================================================
  const isCartEmpty = cartProductIds.length === 0;

  return (
    <>
      <Navbar />

      <main className="w-full">

        {/* =====================================================
            MAIN CART CONTAINER
        ====================================================== */}
        <div
          className="
            w-full
            max-w-7xl
            mx-auto
            flex
            flex-col
            lg:flex-row
            gap-8
            xl:gap-12
            px-4
            sm:px-6
            md:px-10
            lg:px-12
            xl:px-16
            pt-8
            sm:pt-10
            md:pt-14
            mb-16
            lg:mb-20
          "
        >

          {/* ===================================================
              CART SECTION
          ==================================================== */}
          <div className="flex-1 min-w-0">

            {/* =================================================
                CART HEADER
            ================================================== */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-3
                mb-6
                sm:mb-8
                border-b
                border-gray-200
                pb-5
                sm:pb-6
              "
            >

              {/* TITLE */}
              <p
                className="
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  text-gray-800
                  leading-tight
                "
              >
                Your{" "}

                <span
                  className="
                    font-bold
                    bg-gradient-to-r
                    from-violet-600
                    to-fuchsia-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  Shopping Cart
                </span>
              </p>


              {/* ITEM COUNT */}
              {!isCartEmpty && (
                <motion.div
                  key={getCartCount()}
                  initial={{
                    scale: 0.8,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 12,
                  }}
                  className="
                    shrink-0
                    px-3
                    sm:px-4
                    py-1.5
                    sm:py-2
                    bg-gradient-to-r
                    from-blue-600
                    to-sky-500
                    text-white
                    rounded-full
                    text-xs
                    sm:text-sm
                    font-semibold
                    shadow-md
                    shadow-sky-500/30
                    whitespace-nowrap
                  "
                >
                  {getCartCount()} Items
                </motion.div>
              )}

            </div>


            {/* =================================================
                EMPTY CART
            ================================================== */}
            {isCartEmpty ? (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.45,
                }}
                className="
                  w-full
                  min-h-[350px]
                  sm:min-h-[400px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  bg-white
                  rounded-2xl
                  border
                  border-gray-200
                  shadow-sm
                  px-5
                  py-12
                "
              >

                {/* CART ICON */}
                <motion.div
                  initial={{
                    scale: 0.6,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 180,
                    damping: 12,
                  }}
                  className="
                    relative
                    w-20
                    h-20
                    sm:w-24
                    sm:h-24
                    rounded-full
                    bg-gradient-to-br
                    from-violet-100
                    via-fuchsia-100
                    to-blue-100
                    flex
                    items-center
                    justify-center
                    mb-5
                  "
                >

                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ShoppingCart
                      size={42}
                      strokeWidth={1.7}
                      className="text-violet-600"
                    />
                  </motion.div>

                </motion.div>


                {/* TITLE */}
                <motion.h2
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                  className="
                    text-xl
                    sm:text-2xl
                    font-bold
                    text-gray-800
                  "
                >
                  No Product Added
                </motion.h2>


                {/* DESCRIPTION */}
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.25,
                  }}
                  className="
                    text-sm
                    sm:text-base
                    text-gray-500
                    mt-2
                    max-w-md
                    leading-relaxed
                  "
                >
                  Your shopping cart is currently empty.
                  Start shopping and add your favorite
                  products to your cart.
                </motion.p>


                {/* GO TO SHOPPING */}
                <motion.button
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.3,
                  }}
                  whileHover={{
                    scale: 1.04,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() =>
                    router.push("/all-products")
                  }
                  className="
                    mt-6
                    px-6
                    sm:px-8
                    py-3
                    rounded-full
                    bg-gradient-to-r
                    from-violet-600
                    to-fuchsia-500
                    text-white
                    font-semibold
                    text-sm
                    sm:text-base
                    shadow-lg
                    shadow-fuchsia-500/25
                    hover:shadow-xl
                    transition
                    cursor-pointer
                  "
                >
                  Go to Shopping
                </motion.button>

              </motion.div>

            ) : (

              /* =================================================
                 CART HAS PRODUCTS
              ================================================== */
              <>

                {/* =================================================
                    DESKTOP / TABLET
                ================================================== */}
                <div
                  className="
                    hidden
                    md:block
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    shadow-sm
                    bg-white
                  "
                >

                  <div className="w-full overflow-x-auto">

                    <table className="w-full table-auto">

                      {/* TABLE HEADER */}
                      <thead
                        className="
                          bg-gradient-to-r
                          from-blue-100
                          via-sky-100
                          to-cyan-100
                          border-b
                          border-gray-200
                        "
                      >

                        <tr
                          className="
                            text-gray-600
                            uppercase
                            text-xs
                            tracking-wider
                          "
                        >

                          <th
                            className="
                              py-5
                              px-4
                              lg:px-6
                              text-left
                              font-semibold
                            "
                          >
                            Product
                          </th>

                          <th
                            className="
                              py-5
                              px-4
                              lg:px-6
                              text-left
                              font-semibold
                            "
                          >
                            Price
                          </th>

                          <th
                            className="
                              py-5
                              px-4
                              lg:px-6
                              text-left
                              font-semibold
                            "
                          >
                            Quantity
                          </th>

                          <th
                            className="
                              py-5
                              px-4
                              lg:px-6
                              text-left
                              font-semibold
                            "
                          >
                            Subtotal
                          </th>

                        </tr>

                      </thead>


                      {/* TABLE BODY */}
                      <tbody className="divide-y divide-gray-100">

                        <AnimatePresence initial={false}>

                          {cartProductIds.map((itemId) => {

                            const product = products.find(
                              (product) =>
                                product._id === itemId
                            );

                            if (!product) return null;

                            return (
                              <motion.tr
                                key={itemId}
                                layout
                                variants={rowVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className="
                                  hover:bg-gradient-to-r
                                  hover:from-violet-50/60
                                  hover:to-transparent
                                  transition-colors
                                "
                              >

                                {/* PRODUCT */}
                                <td
                                  className="
                                    py-5
                                    px-4
                                    lg:px-6
                                  "
                                >

                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-3
                                      lg:gap-4
                                    "
                                  >

                                    {/* IMAGE */}
                                    <div
                                      className="
                                        w-14
                                        h-14
                                        lg:w-16
                                        lg:h-16
                                        shrink-0
                                        rounded-xl
                                        overflow-hidden
                                        bg-gray-100
                                        border
                                        border-gray-200
                                        p-1
                                      "
                                    >

                                      <Image
                                        src={product.image[0]}
                                        alt={product.name}
                                        className="
                                          w-full
                                          h-full
                                          object-cover
                                          rounded-lg
                                        "
                                        width={128}
                                        height={128}
                                      />

                                    </div>


                                    {/* PRODUCT INFO */}
                                    <div className="min-w-0">

                                      <p
                                        className="
                                          text-sm
                                          font-semibold
                                          text-gray-800
                                          max-w-[180px]
                                          truncate
                                        "
                                      >
                                        {product.name}
                                      </p>


                                      <motion.button
                                        whileHover={{
                                          scale: 1.05,
                                        }}
                                        whileTap={{
                                          scale: 0.9,
                                        }}
                                        className="
                                          text-xs
                                          text-red-500
                                          mt-2
                                          font-medium
                                          cursor-pointer
                                          flex
                                          items-center
                                          gap-1
                                        "
                                        onClick={() =>
                                          updateCartQuantity(
                                            product._id,
                                            0
                                          )
                                        }
                                      >
                                        <Trash2 size={14} />
                                        Remove
                                      </motion.button>

                                    </div>

                                  </div>

                                </td>


                                {/* PRICE */}
                                <td
                                  className="
                                    py-5
                                    px-4
                                    lg:px-6
                                  "
                                >

                                  <span
                                    className="
                                      font-semibold
                                      text-gray-700
                                      whitespace-nowrap
                                    "
                                  >
                                    ৳{product.offerPrice}
                                  </span>

                                </td>


                                {/* QUANTITY */}
                                <td
                                  className="
                                    py-5
                                    px-4
                                    lg:px-6
                                  "
                                >

                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-1
                                      bg-gradient-to-r
                                      from-violet-100
                                      to-fuchsia-100
                                      p-1
                                      rounded-full
                                      w-fit
                                    "
                                  >

                                    {/* MINUS */}
                                    <motion.button
                                      whileTap={{
                                        scale: 0.8,
                                      }}
                                      disabled={
                                        cartItems[itemId] <= 1
                                      }
                                      onClick={() =>
                                        updateCartQuantity(
                                          product._id,
                                          cartItems[itemId] - 1
                                        )
                                      }
                                      className="
                                        w-8
                                        h-8
                                        flex
                                        items-center
                                        justify-center
                                        hover:bg-white
                                        rounded-full
                                        transition
                                        font-bold
                                        text-fuchsia-600
                                        disabled:opacity-30
                                        disabled:cursor-not-allowed
                                        cursor-pointer
                                      "
                                    >
                                      <Minus size={15} />
                                    </motion.button>


                                    {/* COUNT */}
                                    <motion.span
                                      key={cartItems[itemId]}
                                      initial={{
                                        scale: 1.3,
                                      }}
                                      animate={{
                                        scale: 1,
                                      }}
                                      className="
                                        w-8
                                        text-center
                                        font-bold
                                        text-gray-800
                                      "
                                    >
                                      {cartItems[itemId]}
                                    </motion.span>


                                    {/* PLUS */}
                                    <motion.button
                                      whileTap={{
                                        scale: 0.8,
                                      }}
                                      onClick={() =>
                                        addToCart(
                                          product._id
                                        )
                                      }
                                      className="
                                        w-8
                                        h-8
                                        flex
                                        items-center
                                        justify-center
                                        hover:bg-white
                                        rounded-full
                                        transition
                                        font-bold
                                        text-fuchsia-600
                                        cursor-pointer
                                      "
                                    >
                                      <Plus size={15} />
                                    </motion.button>

                                  </div>

                                </td>


                                {/* SUBTOTAL */}
                                <td
                                  className="
                                    py-5
                                    px-4
                                    lg:px-6
                                  "
                                >

                                  <motion.span
                                    key={
                                      product.offerPrice *
                                      cartItems[itemId]
                                    }
                                    initial={{
                                      scale: 1.15,
                                      opacity: 0.5,
                                    }}
                                    animate={{
                                      scale: 1,
                                      opacity: 1,
                                    }}
                                    className="
                                      font-bold
                                      text-gray-900
                                      whitespace-nowrap
                                    "
                                  >
                                    ৳
                                    {(
                                      product.offerPrice *
                                      cartItems[itemId]
                                    ).toFixed(2)}
                                  </motion.span>

                                </td>

                              </motion.tr>
                            );
                          })}

                        </AnimatePresence>

                      </tbody>

                    </table>

                  </div>

                </div>


                {/* =================================================
                    MOBILE CART CARDS
                ================================================== */}
                <div
                  className="
                    md:hidden
                    space-y-4
                  "
                >

                  <AnimatePresence initial={false}>

                    {cartProductIds.map((itemId) => {

                      const product = products.find(
                        (product) =>
                          product._id === itemId
                      );

                      if (!product) return null;

                      return (
                        <motion.div
                          key={itemId}
                          layout
                          initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.97,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: -15,
                            scale: 0.95,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                          className="
                            w-full
                            bg-white
                            rounded-2xl
                            border
                            border-gray-200
                            shadow-sm
                            hover:shadow-md
                            transition-shadow
                            p-4
                          "
                        >

                          {/* ================= TOP ================= */}
                          <div
                            className="
                              flex
                              gap-3
                              sm:gap-4
                            "
                          >

                            {/* IMAGE */}
                            <div
                              className="
                                w-20
                                h-20
                                sm:w-24
                                sm:h-24
                                shrink-0
                                rounded-xl
                                overflow-hidden
                                bg-gray-100
                                border
                                border-gray-200
                                p-1
                              "
                            >

                              <Image
                                src={product.image[0]}
                                alt={product.name}
                                width={160}
                                height={160}
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                  rounded-lg
                                "
                              />

                            </div>


                            {/* PRODUCT INFO */}
                            <div
                              className="
                                flex-1
                                min-w-0
                              "
                            >

                              <div
                                className="
                                  flex
                                  items-start
                                  justify-between
                                  gap-2
                                "
                              >

                                <div className="min-w-0">

                                  <h3
                                    className="
                                      text-sm
                                      sm:text-base
                                      font-semibold
                                      text-gray-800
                                      truncate
                                    "
                                  >
                                    {product.name}
                                  </h3>

                                  <p
                                    className="
                                      text-xs
                                      text-gray-400
                                      mt-1
                                    "
                                  >
                                    Product
                                  </p>

                                </div>


                                {/* REMOVE */}
                                <motion.button
                                  whileHover={{
                                    scale: 1.1,
                                  }}
                                  whileTap={{
                                    scale: 0.85,
                                  }}
                                  onClick={() =>
                                    updateCartQuantity(
                                      product._id,
                                      0
                                    )
                                  }
                                  className="
                                    shrink-0
                                    w-8
                                    h-8
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    bg-red-50
                                    text-red-500
                                    hover:bg-red-100
                                    transition
                                    cursor-pointer
                                  "
                                >
                                  <Trash2 size={15} />
                                </motion.button>

                              </div>


                              {/* PRICE */}
                              <div className="mt-3">

                                <span
                                  className="
                                    text-base
                                    sm:text-lg
                                    font-bold
                                    text-gray-800
                                  "
                                >
                                  ৳{product.offerPrice}
                                </span>

                                <span
                                  className="
                                    text-xs
                                    text-gray-400
                                    ml-1
                                  "
                                >
                                  / item
                                </span>

                              </div>

                            </div>

                          </div>


                          {/* DIVIDER */}
                          <div
                            className="
                              border-t
                              border-gray-100
                              my-4
                            "
                          />


                          {/* ================= BOTTOM ================= */}
                          <div
                            className="
                              flex
                              items-end
                              justify-between
                              gap-4
                            "
                          >

                            {/* QUANTITY */}
                            <div>

                              <p
                                className="
                                  text-[10px]
                                  sm:text-[11px]
                                  uppercase
                                  tracking-wider
                                  font-semibold
                                  text-gray-400
                                  mb-2
                                "
                              >
                                Quantity
                              </p>


                              <div
                                className="
                                  flex
                                  items-center
                                  gap-1
                                  bg-gradient-to-r
                                  from-violet-100
                                  to-fuchsia-100
                                  p-1
                                  rounded-full
                                "
                              >

                                {/* MINUS */}
                                <motion.button
                                  whileTap={{
                                    scale: 0.8,
                                  }}
                                  disabled={
                                    cartItems[itemId] <= 1
                                  }
                                  onClick={() =>
                                    updateCartQuantity(
                                      product._id,
                                      cartItems[itemId] - 1
                                    )
                                  }
                                  className="
                                    w-8
                                    h-8
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    font-bold
                                    text-fuchsia-600
                                    hover:bg-white
                                    transition
                                    disabled:opacity-30
                                    disabled:cursor-not-allowed
                                    cursor-pointer
                                  "
                                >
                                  <Minus size={14} />
                                </motion.button>


                                {/* COUNT */}
                                <motion.span
                                  key={cartItems[itemId]}
                                  initial={{
                                    scale: 1.3,
                                  }}
                                  animate={{
                                    scale: 1,
                                  }}
                                  className="
                                    w-8
                                    text-center
                                    text-sm
                                    font-bold
                                    text-gray-800
                                  "
                                >
                                  {cartItems[itemId]}
                                </motion.span>


                                {/* PLUS */}
                                <motion.button
                                  whileTap={{
                                    scale: 0.8,
                                  }}
                                  onClick={() =>
                                    addToCart(
                                      product._id
                                    )
                                  }
                                  className="
                                    w-8
                                    h-8
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                    font-bold
                                    text-fuchsia-600
                                    hover:bg-white
                                    transition
                                    cursor-pointer
                                  "
                                >
                                  <Plus size={14} />
                                </motion.button>

                              </div>

                            </div>


                            {/* SUBTOTAL */}
                            <div className="text-right">

                              <p
                                className="
                                  text-[10px]
                                  sm:text-[11px]
                                  uppercase
                                  tracking-wider
                                  font-semibold
                                  text-gray-400
                                  mb-1
                                "
                              >
                                Subtotal
                              </p>


                              <motion.p
                                key={
                                  product.offerPrice *
                                  cartItems[itemId]
                                }
                                initial={{
                                  scale: 1.15,
                                  opacity: 0.5,
                                }}
                                animate={{
                                  scale: 1,
                                  opacity: 1,
                                }}
                                className="
                                  text-lg
                                  sm:text-xl
                                  font-extrabold
                                  bg-gradient-to-r
                                  from-violet-600
                                  to-fuchsia-500
                                  bg-clip-text
                                  text-transparent
                                "
                              >
                                ৳
                                {(
                                  product.offerPrice *
                                  cartItems[itemId]
                                ).toFixed(2)}
                              </motion.p>

                            </div>

                          </div>

                        </motion.div>
                      );
                    })}

                  </AnimatePresence>

                </div>


                {/* =================================================
                    CONTINUE SHOPPING
                ================================================== */}
                <motion.button
                  whileHover={{
                    x: -4,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    router.push("/all-products")
                  }
                  className="
                    group
                    flex
                    items-center
                    mt-6
                    sm:mt-8
                    gap-2
                    text-sm
                    sm:text-base
                    text-gray-600
                    hover:text-fuchsia-600
                    transition
                    font-medium
                    cursor-pointer
                  "
                >

                  <ArrowLeft
                    size={18}
                    className="
                      text-fuchsia-500
                      group-hover:-translate-x-1
                      transition
                    "
                  />

                  Continue Shopping

                </motion.button>

              </>

            )}

          </div>


          {/* ===================================================
              ORDER SUMMARY
          ==================================================== */}
          {!isCartEmpty && (
            <div
              className="
                w-full
                lg:w-[360px]
                xl:w-[390px]
                shrink-0
              "
            >
              <OrderSummary />
            </div>
          )}

        </div>

      </main>
    </>
  );
};

export default Cart;