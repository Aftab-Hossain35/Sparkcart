"use client"
import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'
import { motion } from 'framer-motion'

const Navbar = () => {

  const { router } = useAppContext()

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer flex items-center gap-1"
              onClick={() => router.push('/')}
            >
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                <span className="bg-linear-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent text-4xl md:text-5xl">S</span>
                <span className="text-gray-900">parkcart</span>
              </h1>
            </motion.div>
      <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar