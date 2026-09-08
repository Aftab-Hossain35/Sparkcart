'use client'
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
  exit: { opacity: 0, x: 16, height: 0, transition: { duration: 0.25 } },
};

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-6">
            <p className="text-2xl md:text-3xl text-gray-800">
              Your{" "}
              <span className="font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                Shopping Cart
              </span>
            </p>
            <motion.div
              key={getCartCount()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="px-4 py-1 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-full font-medium shadow-md shadow-sky-500/30"
            >
              {getCartCount()} Items
            </motion.div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
            <table className="min-w-full table-auto">
              <thead className="bg-gradient-to-r from-blue-100 via-sky-100 to-cyan-100 border-b border-gray-200">
                <tr className="text-gray-600 uppercase text-xs tracking-wider">
                  <th className="py-5 px-6 text-left font-semibold">Product</th>
                  <th className="py-5 px-6 text-left font-semibold">Price</th>
                  <th className="py-5 px-6 text-left font-semibold">Quantity</th>
                  <th className="py-5 px-6 text-left font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence initial={false}>
                  {Object.keys(cartItems).map((itemId) => {
                    const product = products.find(product => product._id === itemId);
                    if (!product || cartItems[itemId] <= 0) return null;

                    return (
                      <motion.tr
                        key={itemId}
                        layout
                        variants={rowVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className="hover:bg-gradient-to-r hover:from-violet-50/60 hover:to-transparent transition-colors"
                      >
                        <td className="py-5 px-6 flex items-center gap-4">
                          <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200 p-1">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              className="w-16 h-16 object-cover"
                              width={128}
                              height={128}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{product.name}</p>
                            <motion.button
                              whileHover={{ scale: 1.1, color: "#e11d48" }}
                              whileTap={{ scale: 0.9 }}
                              className="text-xs text-red-500 mt-1 font-medium transition cursor-pointer flex items-center gap-1"
                              onClick={() => updateCartQuantity(product._id, 0)}
                            >
                              <Trash2 size={14} /> Remove
                            </motion.button>
                          </div>
                        </td>
                        <td className="py-5 px-6 font-medium text-gray-700">৳{product.offerPrice}</td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2 bg-gradient-to-r from-violet-100 to-fuchsia-100 p-1 rounded-full w-fit">
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-full transition font-bold text-fuchsia-600 disabled:opacity-30"
                              disabled={cartItems[itemId] <= 1}
                              onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                            >
                              -
                            </motion.button>
                            <motion.span
                              key={cartItems[itemId]}
                              initial={{ scale: 1.3 }}
                              animate={{ scale: 1 }}
                              className="w-8 text-center font-bold text-gray-800"
                            >
                              {cartItems[itemId]}
                            </motion.span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-full transition font-bold text-fuchsia-600"
                              onClick={() => addToCart(product._id)}
                            >
                              +
                            </motion.button>
                          </div>
                        </td>
                        <td className="py-5 px-6 font-bold text-gray-900">
                          ৳{(product.offerPrice * cartItems[itemId]).toFixed(2)}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => router.push('/all-products')}
            className="group flex items-center mt-8 gap-2 text-gray-600 hover:text-fuchsia-600 transition font-medium"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow"
            />
            Continue Shopping
          </motion.button>
        </div>
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;
