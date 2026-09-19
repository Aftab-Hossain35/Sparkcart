'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {LayoutDashboard,CopyPlus,CalendarArrowDown,ListPlus,Contact,} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MenuItem {
    name: string;
    path: string;
    icon: LucideIcon;
    from: string;
    to: string;
}

// NOTE: adjust these paths to match your actual seller routes —
// I've assumed /seller is now "Dashboard" and moved Add Product to
// /seller/add-product. If Add Product should stay at /seller, swap
// the two path values below.
const menuItems: MenuItem[] = [
    // {
    //     name: 'Dashboard',
    //     path: '',
    //     icon: LayoutDashboard,
    //     from: 'from-cyan-500',
    //     to: 'to-sky-500',
    // },
    {
        name: 'Add Product',
        path: '/seller',
        icon: CopyPlus,
       from: 'from-cyan-500',
        to: 'to-sky-500',
    },
    {
        name: 'Product List',
        path: '/seller/product-list',
        icon: ListPlus,
        from: 'from-cyan-500',
        to: 'to-sky-500',
    },
    {
        name: 'Orders',
        path: '/seller/orders',
        icon: CalendarArrowDown,
        from: 'from-cyan-500',
        to: 'to-sky-500',
    },
    {
        name: 'Users',
        path: '/seller/users',
        icon: Contact,
        from: 'from-cyan-500',
        to: 'to-sky-500',
    },
    {
        name: 'Transaction history',
        path: '/',
        icon: Contact,
        from: 'from-cyan-500',
        to: 'to-sky-500',
    },
];

const SideBar = () => {
    const pathname = usePathname();

    return (
        <div className="md:w-64 w-16 min-h-screen border-r border-slate-200/60 bg-gradient-to-b from-slate-50 via-blue-50/70 to-indigo-50/80 backdrop-blur-xl py-4 flex flex-col relative overflow-hidden">

            {/* Background decorations */}
            <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 -right-20 w-52 h-52 rounded-full bg-violet-400/15 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 -left-16 w-48 h-48 rounded-full bg-cyan-300/20 blur-3xl" />

            {/* Subtle grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Menu */}
            <div className="relative z-10 flex flex-col gap-1 px-2">
                {menuItems.map((item) => {

                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link href={item.path} key={item.name}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.97 }}
                                className={`relative flex items-center py-3 px-3 gap-3 rounded-xl cursor-pointer overflow-hidden transition-colors ${
                                    isActive
                                        ? 'text-gray-900'
                                        : 'text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                {/* Active background */}
                                {isActive && (
                                    <motion.div
                                        layoutId="seller-sidebar-active"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        className={`absolute inset-0 rounded-xl bg-linear-to-r ${item.from} ${item.to} opacity-10`}
                                    />
                                )}

                                {/* Active bar */}
                                {isActive && (
                                    <motion.div
                                        layoutId="seller-sidebar-bar"
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        className={`absolute left-0 top-1.5 bottom-1.5 w-1 md:w-1.5 rounded-full bg-linear-to-b ${item.from} ${item.to}`}
                                    />
                                )}

                                {/* Icon */}
                                <motion.div
                                    whileHover={{ rotate: -8, scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                                    className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-lg shrink-0 ${
                                        isActive
                                            ? `bg-gradient-to-br ${item.from} ${item.to} shadow-md`
                                            : 'bg-white/70 shadow-sm'
                                    }`}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={2.25}
                                        className={isActive ? 'text-white' : 'text-gray-500'}
                                    />
                                </motion.div>

                                {/* Text */}
                                <p
                                    className={`relative z-10 md:block hidden font-medium ${
                                        isActive ? 'font-semibold text-gray-900' : ''
                                    }`}
                                >
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
