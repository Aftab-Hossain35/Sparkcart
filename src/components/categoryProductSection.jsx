"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";
import {
  getCategoryStyle,
  slugifyCategory,
} from "@/lib/categoryStyles";

// --------------------------------------------------
// Category order
// --------------------------------------------------
const PREFERRED_ORDER = [
  "electronics",
  "fashion and fashion accessories",
  "grocery household food & pets",
  "chocolate",
  "other",
];

// --------------------------------------------------
// Products shown before "See All"
// --------------------------------------------------
const PREVIEW_COUNT = 6;

// --------------------------------------------------
// Group products by category
// --------------------------------------------------
const groupByCategory = (products) => {
  const groups = {};
  const order = [];

  products.forEach((product) => {
    const key = product.category || "Uncategorized";

    if (!groups[key]) {
      groups[key] = [];
      order.push(key);
    }

    groups[key].push(product);
  });

  const sortedOrder = [
    ...PREFERRED_ORDER.map((name) =>
      order.find((k) => k.toLowerCase() === name)
    ).filter(Boolean),

    ...order.filter(
      (k) => !PREFERRED_ORDER.includes(k.toLowerCase())
    ),
  ];

  return sortedOrder.map((key) => ({
    category: key,
    items: groups[key],
  }));
};

// --------------------------------------------------
// Section animation
// --------------------------------------------------
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

// --------------------------------------------------
// Product animation
// --------------------------------------------------
const item = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// --------------------------------------------------
// CategoryProductSections
// --------------------------------------------------
const CategoryProductSections = () => {
  const { products, router } = useAppContext();

  // --------------------------------------------------
  // Empty state
  // --------------------------------------------------
  if (!products?.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          flex
          flex-col
          items-center
          justify-center
          px-5
          py-20
          text-center
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-sky-100
            via-indigo-100
            to-purple-100
            text-indigo-500
          "
        >
          <ShoppingBag size={28} />
        </div>

        <p className="mt-5 text-base font-semibold text-slate-600">
          No products found
        </p>

        <p className="mt-1 max-w-sm text-sm text-slate-400">
          New products will appear here when they become available.
        </p>
      </motion.div>
    );
  }

  const sections = groupByCategory(products);

  return (
    <div
      className="
        w-full
        mt-10
        sm:mt-12
        md:mt-16
        lg:mt-20
        space-y-14
        sm:space-y-16
        md:space-y-20
        lg:space-y-24
        px-3
        sm:px-5
        md:px-8
        lg:px-12
        xl:px-16
        2xl:px-24
      "
    >
      {sections.map(({ category, items }, sectionIndex) => {
        const { grad, text } = getCategoryStyle(category);

        const visibleItems = items.slice(0, PREVIEW_COUNT);
        const hasMore = items.length > PREVIEW_COUNT;

        return (
          <motion.section
            key={category}
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.08,
            }}
            transition={{
              duration: 0.6,
              delay: sectionIndex * 0.03,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full"
          >
            {/* ==================================================
                Decorative background glow
            ================================================== */}
            <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-32 w-64 -translate-x-1/2 rounded-full bg-sky-200/10 blur-3xl" />

            {/* ==================================================
                CATEGORY HEADER
            ================================================== */}
            <div className="mb-6 sm:mb-7 md:mb-9">
              <div className="flex items-center justify-between gap-3">
                {/* Left decoration */}
                <div className="hidden flex-1 items-center sm:flex">
                  <div className="h-px w-full bg-linear-to-r from-transparent via-slate-200 to-slate-200" />
                </div>

                {/* Category title */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="
                    relative
                    flex
                    max-w-[85%]
                    flex-col
                    items-center
                    text-center
                    justify-center
                  "
                >
                  {/* Small badge */}
                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-sky-100
                      bg-white/80
                      px-3
                      py-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-sky-500
                      shadow-sm
                      backdrop-blur
                      sm:text-[10px]
                    "
                  >
                    <Sparkles size={11} />
                    Featured Collection
                  </div>

                  <h2
                    className={`
                      ${text}
                      bg-gradient-to-r
                      ${grad}
                      bg-clip-text
                      text-transparent
                      text-base
                      font-black
                      uppercase
                      tracking-wide
                      sm:text-lg
                      md:text-xl
                      lg:text-2xl
                      xl:text-3xl
                      leading-tight
                      text-center
                    `}
                  >
                    {category}
                  </h2>

                  {/* Animated underline */}
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "55%",
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: 0.2,
                      duration: 0.55,
                      ease: "easeOut",
                    }}
                    className={`
                      mt-2
                      h-1
                      min-w-10
                      max-w-24
                      rounded-full
                      bg-linear-to-r
                      ${grad}
                    `}
                  />

                  {/* Product count */}
                  <p className="mt-2 text-[11px] font-medium text-slate-400 sm:text-xs">
                    {items.length}{" "}
                    {items.length === 1 ? "product" : "products"}
                  </p>
                </motion.div>

                {/* Right decoration */}
                <div className="hidden flex-1 items-center sm:flex">
                  <div className="h-px w-full bg-linear-to-l from-transparent via-slate-200 to-slate-200" />
                </div>
              </div>
            </div>

            {/* ==================================================
                PRODUCT GRID
            ================================================== */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0.08,
              }}
              className="
                grid
                w-[108%]

                grid-cols-2
                gap-x-2
                gap-y-5

                min-[480px]:grid-cols-2
                min-[480px]:gap-x-3
                min-[480px]:gap-y-5

                sm:grid-cols-3
                sm:gap-2

                md:grid-cols-4
                md:gap-2

                lg:grid-cols-6
                lg:gap-0
  
              "
            >
              {visibleItems.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={item}
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

            {/* ==================================================
                SEE ALL BUTTON
            ================================================== */}
            {hasMore && (
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
                transition={{
                  delay: 0.25,
                  duration: 0.4,
                }}
                className="mt-7 flex justify-center sm:mt-9"
              >
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() =>
                    router.push(
                      `/all-products?category=${slugifyCategory(
                        category
                      )}`
                    )
                  }
                  className="
                    group
                    relative
                    flex
                    min-h-11
                    items-center
                    gap-2
                    overflow-hidden
                    rounded-full
                    border
                    border-sky-200
                    bg-white
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    text-sky-600
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-transparent
                    hover:text-white
                    hover:shadow-lg
                    hover:shadow-sky-500/20

                    sm:px-6
                    sm:text-sm
                  "
                >
                  {/* Animated background */}
                  <motion.span
                    initial={{
                      x: "-100%",
                    }}
                    whileHover={{
                      x: "0%",
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      absolute
                      inset-0
                      -z-0
                      bg-gradient-to-r
                      from-sky-500
                      via-indigo-500
                      to-purple-600
                    "
                  />

                  <span className="relative z-10">
                    See All Products
                  </span>

                  <motion.span
                    className="relative z-10"
                    whileHover={{
                      x: 4,
                    }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </motion.button>
              </motion.div>
            )}

            {/* ==================================================
                MOBILE CATEGORY DIVIDER
            ================================================== */}
            {sectionIndex !== sections.length - 1 && (
              <div className="mt-14 flex items-center justify-center sm:mt-16 md:mt-20">
                <ChevronRight
                  size={18}
                  className="
                    rotate-90
                    text-slate-200
                  "
                />
              </div>
            )}
          </motion.section>
        );
      })}
    </div>
  );
};

export default CategoryProductSections;

