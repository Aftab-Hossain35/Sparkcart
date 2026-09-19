'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
// import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { PackageSearch, MapPin, Phone, CalendarDays, Wallet } from "lucide-react";

const ACCENTS = [
    "from-violet-500 to-fuchsia-500",
    "from-fuchsia-500 to-pink-500",
    "from-amber-500 to-orange-500",
    "from-cyan-500 to-sky-500",
    "from-emerald-500 to-teal-500",
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const Orders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSellerOrders = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get('/api/order/seller-list', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setOrders(data.orders);
                setLoading(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchSellerOrders();
        }
    }, [user]);

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {loading ? <Loading /> : <div className="md:p-10 p-4 space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                        Orders
                    </h2>
                    <div className="h-1 w-14 rounded-full bg-gradient-to-r from-violet-500 to-orange-500 mt-2" />
                </motion.div>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl flex flex-col items-center justify-center gap-3 py-20 text-gray-400"
                    >
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center"
                        >
                            <PackageSearch size={28} className="text-fuchsia-400" />
                        </motion.div>
                        <p className="font-medium">No orders yet</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="max-w-4xl flex flex-col gap-4"
                    >
                        {orders.map((order, index) => {
                            const accent = ACCENTS[index % ACCENTS.length];
                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariant}
                                    whileHover={{ y: -4 }}
                                    className="relative flex flex-col md:flex-row gap-5 justify-between p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                                >
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${accent}`} />

                                    <div className="flex-1 flex gap-4 max-w-80 pl-2">
                                        {(() => {
                                            const orderedItems = order.items.filter((item) => item.product);
                                            const visibleItems = orderedItems.slice(0, 3);
                                            const extraCount = orderedItems.length - visibleItems.length;

                                            return (
                                                <div className="flex shrink-0 -space-x-4">
                                                    {visibleItems.map((item, i) => (
                                                        <motion.div
                                                            key={item.product._id || i}
                                                            whileHover={{ y: -4, scale: 1.08, zIndex: 10 }}
                                                            className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${accent} p-0.5 shadow-sm`}
                                                            style={{ zIndex: visibleItems.length - i }}
                                                        >
                                                            <div className="relative w-full h-full rounded-[10px] bg-white overflow-hidden">
                                                                <Image
                                                                    src={item.product.image[0]}
                                                                    alt={item.product.name}
                                                                    fill
                                                                    className="object-cover"
                                                                    sizes="56px"
                                                                />
                                                            </div>
                                                            {item.quantity > 1 && (
                                                                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gray-900 text-white text-[10px] font-semibold flex items-center justify-center">
                                                                    x{item.quantity}
                                                                </span>
                                                            )}
                                                        </motion.div>
                                                    ))}
                                                    {extraCount > 0 && (
                                                        <div
                                                            className="relative w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500"
                                                            style={{ zIndex: 0 }}
                                                        >
                                                            +{extraCount}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })()}
                                        <p className="flex flex-col gap-2">
                                            <span className="font-semibold text-gray-800">
                                                {order.items
                                                    .filter((item) => item.product)
                                                    .map(
                                                        (item) =>
                                                            `${item.product.name} x ${item.quantity}`
                                                    )
                                                    .join(", ")}
                                            </span>
                                            <span className="text-xs text-gray-500">Items : {order.items.length}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-start gap-2 text-gray-600">
                                        <MapPin size={15} className="mt-0.5 text-fuchsia-400 shrink-0" />
                                        <p>
                                            <span className="font-medium text-gray-800">{order.address.fullName}</span>
                                            <br />
                                            <span>{order.address.area}</span>
                                            <br />
                                            <span>{`${order.address.city}, ${order.address.state}`}</span>
                                            <br />
                                            <span className="inline-flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                <Phone size={12} /> {order.address.phoneNumber}
                                            </span>
                                        </p>
                                    </div>

                                    <p className="font-bold text-lg bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent my-auto">
                                        {currency}{order.amount}
                                    </p>

                                    <div className="flex flex-col gap-1.5 text-gray-600">
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 w-fit">
                                            <Wallet size={12} /> Method: COD
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                                            <CalendarDays size={12} /> {new Date(order.date).toLocaleDateString()}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 w-fit">
                                            Payment: Pending
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </div>}
            {/* <Footer /> */}
        </div>
    );
};

export default Orders;
