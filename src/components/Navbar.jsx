"use client"
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import { ShoppingCart, Handbag, ShoppingBasket, House, Search, X } from 'lucide-react';
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-gradient-to-r from-sky-50 via-cyan-50 shadow-md shadow-sky-100/50 flex items-center justify-between px-6 md:px-16 lg:px-32 py-3.5 border-b border-sky-100/60 text-gray-700"
    >
      {/* Animated Brand Logo */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer flex items-center gap-1"
        onClick={() => router.push('/')}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent text-4xl md:text-5xl">S</span>
          <span className="text-gray-900">parkcart</span>
        </h1>
      </motion.div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10 font-medium">
        {[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/all-products" },
          { name: "About Us", href: "/" },
          { name: "Contact", href: "/" }
        ].map((item, index) => (
          <motion.div key={index} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Link href={item.href} className="relative group text-gray-600 hover:text-sky-500 transition-colors">
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        ))}

        {isSeller && (
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/seller')} 
            className="text-xs font-semibold bg-white/80 border border-sky-200 text-sky-600 px-4 py-2 rounded-full shadow-sm transition cursor-pointer"
          >
            Admin Dashboard
          </motion.button>
        )}
      </div>

      {/* Desktop Right Side Actions */}
      <div className="hidden md:flex items-center gap-6">
        {/* Search Icon Trigger */}
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="cursor-pointer p-2 rounded-full bg-white/60 hover:bg-white shadow-sm transition text-gray-600"
        >
          <Search className="w-5 h-5" />
        </motion.div>

        {user ? (
          <motion.div whileHover={{ scale: 1.05 }}>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action label="Home" labelIcon={<House size={16} />} onClick={() => router.push('/')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Cart" labelIcon={<ShoppingCart size={16} />} onClick={() => router.push('/cart')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Products" labelIcon={<ShoppingBasket size={16} />} onClick={() => router.push('/all-products')} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action label="Orders" labelIcon={<Handbag size={16} />} onClick={() => router.push('/my-orders')} />
              </UserButton.MenuItems>
            </UserButton>
          </motion.div>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openSignIn} 
            className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md shadow-sky-500/20 hover:opacity-90 transition-colors"
          >
            <Image src={assets.user_icon} alt="user icon" className="invert brightness-0 w-4 h-4" />
            Account
          </motion.button>
        )}
      </div>

      {/* Mobile Right Section */}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button onClick={() => router.push('/seller')} className="text-[11px] font-medium border text-sky-600 bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
            Dashboard
          </button>
        )}
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<ShoppingCart size={16} />} onClick={() => router.push('/cart')} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Orders" labelIcon={<Handbag size={16} />} onClick={() => router.push('/my-orders')} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button onClick={openSignIn} className="flex items-center gap-1.5 bg-sky-600 text-white px-3.5 py-1.5 rounded-full text-xs shadow-sm">
            Account
          </button>
        )}
      </div>

      {/* Expandable Search Input Bar Animation */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-sky-100 px-6 md:px-16 py-3.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 w-full max-w-2xl mx-auto">
              <Search className="text-sky-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search products, categories..." 
                className="w-full bg-transparent outline-none text-gray-800 text-sm md:text-base"
                autoFocus
              />
              <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;