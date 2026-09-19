'use client'
import React from "react";
import { motion } from "framer-motion";

// Full-screen branded loader. Drop this in as the return value of your
// existing <Loading /> component (used across Product.jsx etc.) and/or
// as app/loading.jsx so Next.js shows it automatically during route loads.
const Loading = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 bg-[#FBFAFF] overflow-hidden relative">
            {/* soft drifting color wash behind the loader, same family as the
                site-wide background */}
            <motion.div
                aria-hidden
                className="absolute w-[28rem] h-[28rem] rounded-full bg-violet-300/30 blur-3xl"
                animate={{ x: [-40, 40, -40], y: [-20, 20, -20] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="absolute w-[24rem] h-[24rem] rounded-full bg-amber-200/30 blur-3xl"
                animate={{ x: [30, -30, 30], y: [30, -10, 30] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />

            {/* orbiting-dot spinner around the mark */}
            <div className="relative w-28 h-28 flex items-center justify-center">
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background:
                            "conic-gradient(from 0deg, #2563eb,#0ea5e9,#22d3ee)",
                        WebkitMask:
                            "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                    className="relative z-10 w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <motion.span
                        className="text-3xl font-extrabold bg-linear-to-br from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent"
                        animate={{ rotate: [0, -8, 8, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        S
                    </motion.span>
                </motion.div>
            </div>

            {/* wordmark + animated ellipsis */}
            <div className="relative z-10 flex flex-col items-center gap-2">
                {/* <p className="text-xl font-bold text-gray-800">
                    Spark
                    <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 bg-clip-text text-transparent">
                        cart
                    </span>
                </p> */}
                <div className="flex items-center gap-1 text-sm text-gray-400 font-medium">
                    <span>Loading</span>
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                        >
                            .
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* indeterminate shimmer bar */}
            <div className="relative z-10 w-48 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <motion.div
                    className="h-full w-1/3 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400"
                    animate={{ x: ["-100%", "220%"] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};

export default Loading;
