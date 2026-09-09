'use client'
import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface MenuItem {
    name: string;
    path: string;
    icon: string;
    from: string;
    to: string;
}

const menuItems: MenuItem[] = [
    { name: 'Add Product', path: '/seller', icon: assets.add_icon, from: 'from-blue-500', to: 'to-sky-500' },
    { name: 'Product List', path: '/seller/product-list', icon: assets.product_list_icon, from: 'from-fuchsia-500', to: 'to-rose-400' },
    { name: 'Orders', path: '/seller/orders', icon: assets.order_icon, from: 'from-amber-500', to: 'to-orange-500' },
];

const SideBar = () => {
    const pathname = usePathname();

    return (
        <div className="md:w-64 w-16 min-h-screen border-r border-gray-200 bg-white/70 backdrop-blur-sm py-4 flex flex-col relative">
            {/* soft ambient glow behind the sidebar */}
            <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-violet-300/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-200/20 blur-3xl" />

            <div className="relative flex flex-col gap-1 px-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link href={item.path} key={item.name} passHref>
                            <motion.div
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.97 }}
                                className={`relative flex items-center py-3 px-3 gap-3 rounded-xl cursor-pointer overflow-hidden transition-colors ${
                                    isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="seller-sidebar-active"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        className={`absolute inset-0 rounded-xl bg-linear-to-r ${item.from} ${item.to} opacity-10`}
                                    />
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="seller-sidebar-bar"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        className={`absolute left-0 top-1.5 bottom-1.5 w-1 md:w-1.5 rounded-full bg-linear-to-b ${item.from} ${item.to}`}
                                    />
                                )}

                                <motion.div
                                    whileHover={{ rotate: -8, scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                                    className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${
                                        isActive
                                            ? `bg-gradient-to-br ${item.from} ${item.to} shadow-md`
                                            : 'bg-gray-100'
                                    }`}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={`${item.name.toLowerCase()}_icon`}
                                        className={`w-4.5 h-4.5 ${isActive ? 'brightness-0 invert' : ''}`}
                                    />
                                </motion.div>

                                <p className={`relative z-10 md:block hidden font-medium ${isActive ? 'font-semibold' : ''}`}>
                                    {item.name}
                                </p>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SideBar;
