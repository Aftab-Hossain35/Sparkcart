"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <div className="flex flex-col items-center pt-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
          Popular products
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1 w-20 mx-auto mt-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 origin-left"
        />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 pb-16 w-full">
        {products.map((product, index) => (
          <ProductCard key={product._id ?? index} product={product} index={index} />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#0284c7", color: "#fff" }}
        whileTap={{ scale: 0.96 }}
        onClick={() => router.push("/all-products")}
        className="cursor-pointer px-12 py-2.5 border-2 border-blue-500 rounded-full text-sky-600 font-medium transition-colors"
      >
        See more
      </motion.button>
    </div>
  );
};

export default HomeProducts;