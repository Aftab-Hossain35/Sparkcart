"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: "easeOut" },
    }),
};

const Product = () => {

    const { id } = useParams();

    const { products, router, addToCart } = useAppContext()

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length])

    return productData ? (<>
        <Navbar />
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Gallery */}
                    <motion.div
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        animate="show"
                        className="px-5 lg:px-16 xl:px-20"
                    >
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-violet-100 via-fuchsia-50 to-amber-50 mb-4 p-1">
                            <div className="relative rounded-xl overflow-hidden bg-white">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={mainImage || productData.image[0]}
                                        initial={{ opacity: 0, scale: 1.03 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src={mainImage || productData.image[0]}
                                            alt="alt"
                                            className="w-full h-auto object-cover"
                                            width={1280}
                                            height={720}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {productData.image.map((image, index) => {
                                const isActive = (mainImage || productData.image[0]) === image;
                                return (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setMainImage(image)}
                                        className={`cursor-pointer rounded-xl overflow-hidden bg-gray-500/10 p-0.5 transition-all ${
                                            isActive
                                                ? "ring-2 ring-fuchsia-500 bg-gradient-to-br from-violet-400 to-fuchsia-400"
                                                : "ring-1 ring-transparent"
                                        }`}
                                    >
                                        <div className="rounded-[10px] overflow-hidden bg-white">
                                            <Image
                                                src={image}
                                                alt="alt"
                                                className="w-full h-auto object-cover"
                                                width={1280}
                                                height={720}
                                            />
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        variants={fadeUp}
                        custom={0.15}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            {productData.name}
                        </h1>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 300 }}
                                    >
                                        <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.54, type: "spring", stiffness: 300 }}
                                >
                                    <Image className="h-4 w-4" src={assets.star_dull_icon} alt="star_dull_icon" />
                                </motion.div>
                            </div>
                            <p className="text-gray-500 text-sm">(4.5)</p>
                        </div>
                        <p className="text-gray-600 mt-4 leading-relaxed">
                            {productData.description}
                        </p>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="mt-6 flex items-baseline gap-3"
                        >
                            <span className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                                ৳{productData.offerPrice}
                            </span>
                            <span className="text-base font-normal text-gray-400 line-through">
                                ৳{productData.price}
                            </span>
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                {productData.offerPrice !== productData.price && (
                                <>
                                {Math.round(100 - (productData.offerPrice / productData.price) * 100)}% off
                                </>
                                )}
                            </span>
                        </motion.p>

                        <hr className="border-gray-200 my-6" />

                        <div className="overflow-x-auto">
                            <table className="table-auto border-collapse w-full max-w-80">
                                <tbody>
                                    <tr>
                                        <td className="py-1.5 text-gray-500 font-medium">Brand</td>
                                        <td className="py-1.5 text-gray-800">Generic</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1.5 text-gray-500 font-medium">Color</td>
                                        <td className="py-1.5 text-gray-800">Multi</td>
                                    </tr>
                                    <tr>
                                        <td className="py-1.5 text-gray-500 font-medium">Category</td>
                                        <td className="py-1.5">
                                            <span className="inline-block text-xs font-semibold text-fuchsia-600 bg-fuchsia-50 px-2.5 py-1 rounded-full">
                                                {productData.category}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center mt-10 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => addToCart(productData._id)}
                                className="cursor-pointer w-full py-3.5 rounded-full font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                            >
                                Add to Cart
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03, boxShadow: "0 3px 20px #22D3EE" }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => { addToCart(productData._id); router.push('/cart') }}
                                className="cursor-pointer w-full rounded-full py-3.5 font-medium text-white bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 transition"
                            >
                                Buy now
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center mb-4 mt-16"
                    >
                        <p className="text-3xl font-bold text-gray-900">
                            Featured{" "}
                            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                                Products
                            </span>
                        </p>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 56 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                            className="h-1 rounded-full bg-gradient-to-r from-violet-500 to-orange-500 mt-3"
                        />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full"
                    >
                        {products.slice(0, 5).map((product, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                whileHover={{ y: -6 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05, borderColor: "#c026d3", color: "#c026d3" }}
                        whileTap={{ scale: 0.96 }}
                        className="px-8 py-2.5 mb-16 border rounded-full text-gray-500 transition"
                    >
                        See more
                    </motion.button>
                </div>
            </div>
        </motion.div>
        <Footer />
    </>
    ) : <Loading />
};

export default Product;
