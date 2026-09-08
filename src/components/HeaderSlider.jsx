"use client";
import React, { useState, useEffect, useCallback } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const sliderData = [
  {
    id: 1,
    title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
    offer: "Limited Time Offer 30% Off",
    buttonText1: "Buy now",
    buttonText2: "Find more",
    imgSrc: assets.header_headphone_image,
    gradient: "from-violet-600 via-fuchsia-500 to-orange-400",
    glow: "bg-fuchsia-500",
  },
  {
    id: 2,
    title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
    offer: "Hurry up, only a few left!",
    buttonText1: "Shop Now",
    buttonText2: "Explore Deals",
    imgSrc: assets.header_playstation_image,
    gradient: "from-indigo-900 via-blue-700 to-cyan-400",
    glow: "bg-cyan-400",
  },
  {
    id: 3,
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    offer: "Exclusive Deal 50% Off",
    buttonText1: "Order Now",
    buttonText2: "Learn More",
    imgSrc: assets.header_macbook_image,
    gradient: "from-slate-900 via-purple-800 to-pink-500",
    glow: "bg-purple-500",
  },
  {
    id: 4,
    title: "Next Level iPhone 13 is Here for You!",
    offer: "Exclusive Deal 40% Off",
    buttonText1: "Order Now",
    buttonText2: "Learn More",
    imgSrc: assets.iphone_13_image,
    gradient: "from-rose-500 via-pink-500 to-amber-300",
    glow: "bg-rose-400",
  },
  {
    id: 5,
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    offer: "Exclusive Deal 40% Off",
    buttonText1: "Order Now",
    buttonText2: "Learn More",
    imgSrc: assets.header_macbook_image,
    gradient: "from-emerald-800 via-teal-600 to-lime-300",
    glow: "bg-teal-400",
  },
];

const textVariants = {
  enter: { opacity: 0, y: 24 },
  center: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};
const child = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HeaderSlider = () => {
  const [[current, direction], setSlide] = useState([0, 0]);

  const paginate = useCallback((newDirection) => {
    setSlide(([prev]) => {
      const next = (prev + newDirection + sliderData.length) % sliderData.length;
      return [next, newDirection];
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => paginate(1), 3800);
    return () => clearInterval(interval);
  }, [paginate]);

  const slide = sliderData[current];

  return (
    <div className="relative w-full mt-6 rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={(dir) => ({ opacity: 0, x: dir >= 0 ? 80 : -80 })}
          animate={{ opacity: 1, x: 0 }}
          exit={(dir) => ({ opacity: 0, x: dir >= 0 ? -80 : 80 })}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br ${slide.gradient} py-10 md:px-14 px-5 rounded-2xl min-h-[380px] overflow-hidden`}
        >
          {/* floating glow blobs */}
          <motion.div
            className={`absolute -top-16 -left-16 w-72 h-72 rounded-full ${slide.glow} opacity-30 blur-3xl`}
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 right-10 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl"
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            variants={textVariants}
            initial="enter"
            animate="center"
            className="relative z-10 md:pl-8 mt-10 md:mt-0 text-white"
          >
            <motion.p variants={child} className="md:text-base font-medium text-white/80 pb-1 tracking-wide">
              {slide.offer}
            </motion.p>
            <motion.h1
              variants={child}
              className="max-w-lg md:text-[42px] md:leading-[50px] text-3xl font-bold font-[var(--font-display)]"
            >
              {slide.title}
            </motion.h1>
            <motion.div variants={child} className="flex items-center mt-6 gap-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="md:px-10 px-7 md:py-3 py-2.5 bg-white text-gray-900 font-semibold rounded-full shadow-lg shadow-black/20"
              >
                {slide.buttonText1}
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                className="group flex items-center gap-2 px-6 py-2.5 font-medium text-white/90"
              >
                {slide.buttonText2}
                <ChevronsRight className="group-hover:translate-x-1 transition" />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="relative z-10 flex items-center flex-1 justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image className="md:w-72 w-48 drop-shadow-2xl" src={slide.imgSrc} alt={slide.title} priority />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-2 mt-6">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide([index, index > current ? 1 : -1])}
            className="relative h-2 rounded-full bg-gray-300 overflow-hidden"
            style={{ width: current === index ? 24 : 8 }}
          >
            {current === index && (
              <motion.div
                layoutId="activeDot"
                className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-orange-400 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;