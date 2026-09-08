'use client'
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";

const floatY = {
  animate: {
    y: [0, -14, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const floatYSlow = {
  animate: {
    y: [0, 12, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
  },
};

const Banner = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between md:pl-20 py-16 md:py-0 my-16 rounded-3xl overflow-hidden bg-[#12102A]">
      {/* animated gradient backdrop */}
      <motion.div
        aria-hidden
        className="absolute -inset-32 opacity-70 blur-3xl"
        style={{
          background:
            "conic-gradient(from 0deg, #7C5CFC, #FF4FA3, #FFB020, #22D3EE, #7C5CFC)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-[#12102A]/85" />

      <motion.div
        variants={floatY}
        animate="animate"
        className="relative z-10"
      >
        <Image className="max-w-56 drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]" src={assets.jbl_soundbox_image} alt="jbl_soundbox_image" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center justify-center text-center space-y-3 px-6 md:px-0"
      >
        <span className="text-xs font-semibold tracking-wide text-cyan-300 bg-cyan-400/10 border border-cyan-400/30 rounded-full px-3 py-1">
          New drop
        </span>
        <h2 className="text-2xl md:text-4xl font-bold max-w-[320px] text-white">
          Level Up Your{" "}
          <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            Gaming Experience
          </span>
        </h2>
        <p className="max-w-[343px] font-medium text-white/60">
          From immersive sound to precise controls — everything you need to win.
        </p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(124,92,252,0.55)" }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center justify-center gap-2 px-10 py-3 mt-2 rounded-full text-white font-medium bg-gradient-to-r from-violet-600 to-fuchsia-500 cursor-pointer"
        >
          Buy now
          <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </motion.button>
      </motion.div>

      <motion.div variants={floatYSlow} animate="animate" className="relative z-10 hidden md:block">
        <Image className="max-w-80 drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]" src={assets.md_controller_image} alt="md_controller_image" />
      </motion.div>
      <motion.div variants={floatYSlow} animate="animate" className="relative z-10 md:hidden mt-4">
        <Image src={assets.sm_controller_image} alt="sm_controller_image" />
      </motion.div>
    </div>
  );
};

export default Banner;
