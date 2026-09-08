'use client'
import React from "react";
import { motion } from "framer-motion";

// Sits fixed behind the whole app (mount once in the root layout).
// Soft, slow-moving color blobs on a warm-white base — colorful enough to
// feel alive, restrained enough that white cards (Cart, OrderSummary,
// Product) still read clearly on top of it.
const AnimatedBackground = () => {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-[#FBFAFF]"
    >
      {/* soft base gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50 via-white to-orange-50/40" />

      <motion.div
        className="absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-violet-300/40 blur-3xl motion-reduce:animate-none"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-fuchsia-300/35 blur-3xl motion-reduce:animate-none"
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute bottom-[-8rem] left-1/4 w-[30rem] h-[30rem] rounded-full bg-amber-200/40 blur-3xl motion-reduce:animate-none"
        animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-cyan-200/30 blur-3xl motion-reduce:animate-none"
        animate={{ x: [0, -20, 0], y: [0, -18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* faint dot grid for texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#7C3AED 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
