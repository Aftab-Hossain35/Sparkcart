'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="relative my-10 mx-4 md:mx-14 rounded-3xl overflow-hidden bg-[#12102A] px-6 py-14 md:py-16">
      {/* floating accent blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-fuchsia-500/30 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-cyan-400/25 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center justify-center text-center space-y-3"
      >
        <h1 className="md:text-4xl text-2xl font-bold text-white">
          Subscribe now &{" "}
          <span className="bg-gradient-to-r from-amber-300 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
            get 20% off
          </span>
        </h1>
        <p className="md:text-base text-white/60 pb-6 max-w-md">
          Be the first to hear about new drops, restocks, and subscriber-only deals.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between max-w-xl w-full md:h-14 h-12"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-full w-full rounded-l-full rounded-r-none px-5 text-white bg-white/10 border border-white/20 focus:border-cyan-300 outline-none placeholder:text-white/40 transition"
            type="email"
            placeholder="Enter your email id"
          />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="md:px-10 px-6 h-full font-medium text-white bg-gradient-to-r from-fuchsia-500 to-violet-600 rounded-r-full cursor-pointer"
          >
            Subscribe
          </motion.button>
        </form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-cyan-300 pt-1"
          >
            You're in — check your inbox for the code.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default NewsLetter;
