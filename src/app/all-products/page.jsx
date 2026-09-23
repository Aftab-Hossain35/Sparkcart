"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";

const AllProducts = () => {
  const { products } = useAppContext();

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-white via-slate-50/40 to-white">
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"
          />

          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-32 top-96 h-80 w-80 rounded-full bg-purple-400/10 blur-3xl"
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-16 xl:px-20">
          {/* =====================================================
              HEADER
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            {/* Title */}

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-600 sm:text-sm">
                <Sparkles size={15} />
                Explore our collection
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                All{" "}
                <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Products
                </span>
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Discover our latest collection of products, carefully selected
                for quality, style and everyday use.
              </p>
            </div>

            {/* Product Count */}

            <motion.div
              whileHover={{ scale: 1.04 }}
              className="flex w-fit items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <ShoppingBag size={20} />
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Available Products
                </p>

                <p className="font-bold text-slate-800">
                  {products?.length || 0} Products
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* =====================================================
              DIVIDER
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 h-px origin-left bg-gradient-to-r from-sky-200 via-blue-100 to-transparent"
          />

          {/* =====================================================
              PRODUCTS GRID
          ====================================================== */}

          {products && products.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.06,
                  },
                },
              }}
              className="
                mt-8
                grid
                grid-cols-2
                gap-x-3
                gap-y-7
                sm:grid-cols-2
                sm:gap-x-5
                sm:gap-y-9
                md:grid-cols-3
                md:gap-x-6
                lg:grid-cols-4
                lg:gap-x-7
                xl:grid-cols-6
                w-[103%]
              "
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 25,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut",
                      },
                    },
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  transition={{
                    duration: 75,
                  }}
                  className="min-w-0"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* =====================================================
                EMPTY STATE
            ====================================================== */

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex min-h-[400px] flex-col items-center justify-center py-16 text-center"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-50 text-sky-500"
              >
                <ShoppingBag size={38} />
              </motion.div>

              <h2 className="mt-6 text-2xl font-black text-slate-800">
                No products found
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                We don't have any products available right now. Please check
                back again soon.
              </p>
            </motion.div>
          )}

          {/* Bottom spacing */}

          <div className="h-8 sm:h-12" />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AllProducts;