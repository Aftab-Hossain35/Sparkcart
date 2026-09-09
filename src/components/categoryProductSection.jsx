"use client";
import React from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard";
import { getCategoryStyle, slugifyCategory } from "@/lib/categoryStyles";

// Sections render in this order first; any category not listed here is
// appended afterward in the order it's first encountered in `products`.
const PREFERRED_ORDER = [
  "electronics",
  "fashion and fashion accessories",
  "grocery household food & pets",
  "chocolate",
  "other",
];

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

  return sortedOrder.map((key) => ({ category: key, items: groups[key] }));
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const CategoryProductSections = () => {
  const { products, router } = useAppContext();

  if (!products?.length) return null;

  const sections = groupByCategory(products);

  return (
    <div className="flex flex-col gap-16 mt-16 px-4 md:px-14">
      {sections.map(({ category, items }) => {
        const { grad, text } = getCategoryStyle(category);

        return (
          <div key={category} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mb-8"
            >
              <p className={`text-xl md:text-2xl font-bold uppercase tracking-wide ${text}`}>
                {category}
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className={`h-1 rounded-full bg-linear-to-r ${grad} mt-2`}
              />
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6 w-full"
            >
              {items.map((product) => (
                <motion.div key={product._id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                router.push(`/all-products?category=${slugifyCategory(category)}`)
              }
              className={`mt-8 px-8 py-2.5 rounded-full border text-sm font-medium transition border-sky-500 text-sky-500 border-current hover:bg-sky-400 hover:text-white`}
            >
              See All
            </motion.button>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryProductSections;
