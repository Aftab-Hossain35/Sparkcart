"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";

const ACCENTS = [
  "from-indigo-500 to-cyan-400",
];

const ProductCard = ({ product, index = 0 }) => {
  const { currency, router } = useAppContext();
  const [liked, setLiked] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      onClick={() => {
      router.push("/product/" + product._id);
      scrollTo(0, 0);

      }}
      className="group relative flex flex-col items-start gap-1 max-w-55 p-2 w-full cursor-pointer rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow transition-shadow"
    >
      <div
        className={`absolute -inset-0.5 rounded-xl bg-linear-to-br ${accent} opacity-0 group-hover:opacity-20 blur transition-opacity -z-10`}
      />

      <div className="relative w-full h-52 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
        <motion.div
          className="w-4/5 h-4/5 md:w-full md:h-full relative"
          whileHover={{ scale: 1.06, rotate: 1 }}
          transition={{ duration: 0.35 }}
        >
          <Image src={product.image[0]} alt={product.name} fill className="object-cover" sizes="300px" />
        </motion.div>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          whileTap={{ scale: 0.7 }}
          animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.35 }}
          className="absolute top-2 right-2 bg-white/90 backdrop-blur p-2 rounded-full shadow-md"
        >
          <Heart
            className="h-3.5 w-3.5"
            fill={liked ? "#f43f5e" : "none"}
            stroke={liked ? "#f43f5e" : "#6b7280"}
          />
        </motion.button>

        <span
          className={`absolute top-2 left-2 text-[10px] font-semibold text-white px-2 py-0.5 rounded-full bg-linear-to-r ${accent} opacity-90`}
        >
          {index % 3 === 0 ? "Hot" : "New"}
        </span>
      </div>

      <p className="md:text-base font-semibold pt-2 w-full truncate text-gray-900">{product.name}</p>
      <p className="w-full text-xs text-gray-500 max-sm:hidden truncate">{product.description}</p>

      <div className="flex items-center gap-2">
        <p className="text-xs font-medium text-amber-600">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < 4 ? "text-amber-400" : "text-gray-200"}>
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-1">
        <p
          className={`text-lg font-bold bg-linear-to-r ${accent} bg-clip-text text-transparent`}
        >
          {currency}
          {product.price}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`max-sm:hidden px-4 py-1.5 text-white rounded-full text-xs font-medium bg-linear-to-r ${accent} shadow-sm cursor-pointer`}
        >
          Buy now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
