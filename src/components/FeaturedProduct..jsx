'use client'
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";

// Each category gets its own accent so the grid doesn't read as three
// identical cards — audio = violet/magenta, connectivity = magenta/cyan,
// computing = amber/orange.
const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
    from: "from-violet-400",
    to: "to-fuchsia-400",
    glow: "shadow-[0_20px_50px_-15px_rgba(168,85,247,0.55)]",
    tilt: -3,
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
    from: "from-pink-400",
    to: "to-rose-400",
    glow: "shadow-[0_20px_60px_-15px_rgba(244,63,145,0.55)]",
    tilt: 0,
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
    from: "from-amber-400",
    to: "to-orange-400",
    glow: "shadow-[0_20px_60px_-15px_rgba(249,115,22,0.55)]",
    tilt: 3,
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 40, rotate: 0 },
  show: (tilt) => ({
    opacity: 1,
    y: 0,
    rotate: tilt,
    transition: { type: "spring", stiffness: 90, damping: 14 },
  }),
};

const FeaturedProduct = () => {
  return (
    <div className="mt-20">
      <div className="flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent"
        >
          Featured Products
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 56 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-1 rounded-full bg-linear-to-r from-violet-500 to-orange-500 mt-3"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-14 md:px-14 px-4"
      >
        {products.map(({ id, image, title, description, from, to, glow, tilt }) => (
          <motion.div
            key={id}
            custom={tilt}
            variants={card}
            whileHover={{
              y: -10,
              rotate: 0,
              transition: { type: "spring", stiffness: 200, damping: 15 },
            }}
            className={`relative group rounded-3xl overflow-hidden bg-gray-900 ${glow} transition-shadow`}
          >
            {/* gradient frame */}
            <div className={`absolute inset-0 bg-linear-to-br ${from} ${to} opacity-80`} />

            <Image
              src={image}
              alt={title}
              className="relative w-full h-auto object-cover mix-blend-luminosity opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white space-y-2"
              initial={{ y: 8 }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
            >
              <p className="font-semibold text-xl lg:text-2xl drop-shadow">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-64 text-white/85">
                {description}
              </p>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 bg-white text-gray-900 font-medium px-4 py-2 rounded-full mt-2 cursor-pointer shadow-lg"
              >
                Buy now
                {/* <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" /> */}
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeaturedProduct;
