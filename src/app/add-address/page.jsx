'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const field = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const inputClass =
    "px-4 py-3 bg-gray-50 focus:bg-white focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100 transition-all border border-gray-200 rounded-xl outline-none w-full text-gray-700 placeholder:text-gray-400";

const AddAddress = () => {

    const { getToken, router } = useAppContext()
    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken()
            const { data } = await axios.post('/api/user/add-address', { address }, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                toast.success(data.message)
                router.push('/cart')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <Navbar />
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
                <motion.form
                    onSubmit={onSubmitHandler}
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="w-full max-w-lg bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_-15px_rgba(124,92,252,0.25)] p-8 md:p-10"
                >
                    <motion.p variants={field} className="text-2xl md:text-3xl text-gray-800">
                        Add Shipping{" "}
                        <span className="font-bold bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                            Address
                        </span>
                    </motion.p>
                    <motion.div variants={field} className="h-1 w-14 rounded-full bg-gradient-to-r from-violet-500 to-orange-500 mt-3" />

                    <div className="space-y-4 mt-8">
                        <motion.input
                            variants={field}
                            whileFocus={{ scale: 1.01 }}
                            className={inputClass}
                            type="text"
                            placeholder="Full name"
                            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                            value={address.fullName}
                        />
                        <motion.input
                            variants={field}
                            whileFocus={{ scale: 1.01 }}
                            className={inputClass}
                            type="text"
                            placeholder="Phone number"
                            onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                            value={address.phoneNumber}
                        />
                        <motion.input
                            variants={field}
                            whileFocus={{ scale: 1.01 }}
                            className={inputClass}
                            type="text"
                            placeholder="Pin code"
                            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                            value={address.pincode}
                        />
                        <motion.textarea
                            variants={field}
                            whileFocus={{ scale: 1.01 }}
                            className={`${inputClass} resize-none`}
                            rows={4}
                            placeholder="Address (Area and Street)"
                            onChange={(e) => setAddress({ ...address, area: e.target.value })}
                            value={address.area}
                        ></motion.textarea>
                        <motion.div variants={field} className="flex gap-3">
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                className={inputClass}
                                type="text"
                                placeholder="City/District/Town"
                                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                value={address.city}
                            />
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                className={inputClass}
                                type="text"
                                placeholder="State"
                                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                value={address.state}
                            />
                        </motion.div>
                    </div>

                    <motion.button
                        variants={field}
                        whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(168,85,247,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full mt-8 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 text-white font-semibold py-3.5 rounded-full uppercase tracking-wide cursor-pointer"
                    >
                        Save address
                    </motion.button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <motion.div
                        aria-hidden
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-violet-200/60 via-fuchsia-200/50 to-amber-200/50 blur-3xl"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        animate={{ y: [0, -14, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image
                            className="md:mr-16 w-full max-w-md drop-shadow-xl"
                            src={assets.my_location_image}
                            alt="my_location_image"
                        />
                    </motion.div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default AddAddress;
