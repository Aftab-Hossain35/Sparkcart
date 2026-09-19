'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';

import {
  Upload,
  ImagePlus,
  X,
  Package,
  Tag,
  FileText,
  Layers3,
  DollarSign,
  Sparkles,
  CheckCircle2,
  Loader2,
  Plus,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const AddProduct = () => {
  const { getToken } = useAppContext();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================
  // Image Preview URLs
  // =========================================

  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const urls = files.map((file) =>
      file ? URL.createObjectURL(file) : null
    );

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [files]);

  // =========================================
  // Handle Image
  // =========================================

  const handleImageChange = (index, file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    const updatedFiles = [...files];

    updatedFiles[index] = file;

    setFiles(updatedFiles);
  };

  // =========================================
  // Remove Image
  // =========================================

  const removeImage = (index) => {
    const updatedFiles = [...files];

    updatedFiles[index] = undefined;

    setFiles(updatedFiles);
  };

  // =========================================
  // Submit
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.filter(Boolean).length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    if (Number(offerPrice) > Number(price)) {
      toast.error('Offer price cannot be higher than product price');
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('offerPrice', offerPrice);

      files.forEach((file) => {
        if (file) {
          formData.append('images', file);
        }
      });

      const token = await getToken();

      const { data } = await axios.post(
        '/api/product/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || 'Product added successfully');

        // Reset
        setFiles([]);
        setName('');
        setDescription('');
        setCategory('Earphone');
        setPrice('');
        setOfferPrice('');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================
  // Animation Variants
  // =========================================

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="relative min-h-screen flex-1 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/60 to-violet-50">

      {/* ==================================================
          ANIMATED BACKGROUND
      ================================================== */}

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -top-40 -right-40 h-[450px] w-[450px] rounded-full bg-violet-400/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute top-1/3 -left-52 h-[500px] w-[500px] rounded-full bg-cyan-400/15 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute bottom-[-150px] right-1/3 h-[400px] w-[400px] rounded-full bg-blue-400/10 blur-3xl"
      />

      {/* ==================================================
          MAIN
      ================================================== */}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-6xl p-4 md:p-8 lg:p-10"
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          variants={itemVariants}
          className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"
        >

          <div>

            <div className="mb-2 flex items-center gap-3">

              <motion.div
                animate={{
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 text-white shadow-xl shadow-blue-500/20"
              >
                <Package size={23} />
              </motion.div>

              <div>

                <div className="flex items-center gap-2">

                  <h1 className="text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
                    Add New Product
                  </h1>

                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  >
                    <Sparkles
                      size={21}
                      className="text-violet-500"
                    />
                  </motion.div>

                </div>

                <p className="text-sm text-slate-500">
                  Create and publish a new product to your store
                </p>

              </div>

            </div>

          </div>

          {/* Status Card */}

          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              y: -3,
            }}
            className="flex items-center gap-3 rounded-2xl border border-white bg-white/70 px-5 py-3 shadow-lg shadow-slate-200/40 backdrop-blur-xl"
          >

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600"
            >
              <CheckCircle2 size={19} />
            </motion.div>

            <div>
              <p className="text-xs text-slate-400">
                Store Status
              </p>

              <p className="text-sm font-bold text-emerald-600">
                Ready to publish
              </p>
            </div>

          </motion.div>

        </motion.div>


        {/* ==================================================
            FORM
        ================================================== */}

        <form onSubmit={handleSubmit}>

          <div className="grid gap-7 lg:grid-cols-[1fr_380px]">

            {/* ==================================================
                LEFT SIDE
            ================================================== */}

            <div className="space-y-7">

              {/* ==================================================
                  IMAGE UPLOAD CARD
              ================================================== */}

              <motion.section
                variants={itemVariants}
                className="overflow-hidden rounded-3xl border border-white bg-white/75 p-5 shadow-xl shadow-slate-300/20 backdrop-blur-2xl md:p-7"
              >

                <div className="mb-6 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                      <ImagePlus size={20} />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-800">
                        Product Images
                      </h2>

                      <p className="text-xs text-slate-400">
                        Add up to 4 product images
                      </p>
                    </div>

                  </div>

                  <div className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                    {files.filter(Boolean).length}/4
                  </div>

                </div>


                {/* IMAGE GRID */}

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                  {[0, 1, 2, 3].map((index) => {

                    const hasImage = files[index];

                    return (
                      <motion.div
                        key={index}
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          delay: index * 0.1,
                        }}
                        whileHover={{
                          y: -5,
                          scale: 1.02,
                        }}
                        className="relative"
                      >

                        <label
                          htmlFor={`image${index}`}
                          className={`group relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all ${
                            hasImage
                              ? 'border-blue-300 bg-blue-50'
                              : 'border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/50 hover:border-blue-400 hover:bg-blue-50'
                          }`}
                        >

                          {hasImage ? (

                            <>
                              <Image
                                src={previewUrls[index]}
                                alt={`Product ${index + 1}`}
                                fill
                                className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                              <div className="absolute bottom-2 left-2 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-600 opacity-0 shadow group-hover:opacity-100">
                                Change image
                              </div>
                            </>

                          ) : (

                            <div className="flex flex-col items-center justify-center text-center">

                              <motion.div
                                whileHover={{
                                  scale: 1.15,
                                  rotate: 5,
                                }}
                                className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-500 shadow-md"
                              >
                                <Upload size={21} />
                              </motion.div>

                              <p className="text-xs font-semibold text-slate-500">
                                Upload
                              </p>

                              <p className="mt-1 text-[10px] text-slate-400">
                                Image {index + 1}
                              </p>

                            </div>

                          )}

                          <input
                            id={`image${index}`}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) =>
                              handleImageChange(
                                index,
                                e.target.files?.[0]
                              )
                            }
                          />

                        </label>


                        {/* REMOVE BUTTON */}

                        {hasImage && (
                          <motion.button
                            type="button"
                            initial={{
                              scale: 0,
                            }}
                            animate={{
                              scale: 1,
                            }}
                            whileHover={{
                              scale: 1.15,
                              rotate: 90,
                            }}
                            whileTap={{
                              scale: 0.9,
                            }}
                            onClick={() =>
                              removeImage(index)
                            }
                            className="absolute -right-2 -top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg"
                          >
                            <X size={14} />
                          </motion.button>
                        )}

                      </motion.div>
                    );
                  })}

                </div>


                {/* IMAGE INFO */}

                <div className="mt-5 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 px-4 py-3 text-xs text-slate-500">

                  <Sparkles
                    size={14}
                    className="text-violet-500"
                  />

                  <span>
                    Use high-quality images for better product visibility.
                    Maximum 5MB per image.
                  </span>

                </div>

              </motion.section>


              {/* ==================================================
                  PRODUCT DETAILS
              ================================================== */}

              <motion.section
                variants={itemVariants}
                className="rounded-3xl border border-white bg-white/75 p-5 shadow-xl shadow-slate-300/20 backdrop-blur-2xl md:p-7"
              >

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
                    <FileText size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">
                      Product Details
                    </h2>

                    <p className="text-xs text-slate-400">
                      Tell customers about your product
                    </p>
                  </div>

                </div>


                {/* PRODUCT NAME */}

                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="mb-6"
                >

                  <label
                    htmlFor="product-name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Product Name
                  </label>

                  <div className="group relative">

                    <Tag
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-blue-500"
                    />

                    <input
                      id="product-name"
                      type="text"
                      placeholder="e.g. Premium Wireless Headphone"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                  </div>

                </motion.div>


                {/* DESCRIPTION */}

                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  className="mb-2"
                >

                  <label
                    htmlFor="product-description"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Product Description
                  </label>

                  <textarea
                    id="product-description"
                    rows={6}
                    placeholder="Write a detailed description of your product..."
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    required
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  />

                  <div className="mt-2 flex justify-end text-xs text-slate-400">
                    {description.length} characters
                  </div>

                </motion.div>

              </motion.section>

            </div>


            {/* ==================================================
                RIGHT SIDE
            ================================================== */}

            <div className="space-y-7">

              {/* ==================================================
                  CATEGORY
              ================================================== */}

              <motion.section
                variants={itemVariants}
                className="rounded-3xl border border-white bg-white/75 p-6 shadow-xl shadow-slate-300/20 backdrop-blur-2xl"
              >

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 text-white shadow-lg">
                    <Layers3 size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">
                      Category
                    </h2>

                    <p className="text-xs text-slate-400">
                      Organize your product
                    </p>
                  </div>

                </div>


                <select
                  id="category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-3.5 text-sm font-medium text-slate-700 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                >

                  <option value="Earphone">
                    Electronics
                  </option>

                  <option value="Headphone">
                    Headphone
                  </option>

                  <option value="Watch">
                    Watch
                  </option>

                  <option value="Smartphone">
                    Smartphone
                  </option>

                  <option value="Fashion">
                    Fashion
                  </option>

                  <option value="Food">
                    Food
                  </option>

                  <option value="Groceries">
                    Groceries
                  </option>

                  <option value="Chocolate">
                    Chocolate
                  </option>

                  <option value="Accessories">
                    Other Accessories
                  </option>

                </select>

              </motion.section>


              {/* ==================================================
                  PRICING
              ================================================== */}

              <motion.section
                variants={itemVariants}
                className="rounded-3xl border border-white bg-white/75 p-6 shadow-xl shadow-slate-300/20 backdrop-blur-2xl"
              >

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-emerald-400 to-cyan-500 text-white shadow-lg">
                    <DollarSign size={20} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-800">
                      Pricing
                    </h2>

                    <p className="text-xs text-slate-400">
                      Set your product price
                    </p>
                  </div>

                </div>


                {/* ORIGINAL PRICE */}

                <div className="mb-5">

                  <label
                    htmlFor="product-price"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Product Price
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      ৳
                    </span>

                    <input
                      id="product-price"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={price}
                      onChange={(e) =>
                      setPrice(e.target.value)
                      }
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 py-3.5 pl-9 pr-4 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />

                  </div>

                </div>


                {/* OFFER PRICE */}

                <div>

                  <label
                    htmlFor="offer-price"
                    className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700"
                  >
                    <span>Offer Price</span>

                    {price && offerPrice && Number(offerPrice) < Number(price) && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500">
                        <TrendingDown size={13} />
                        Discount
                      </span>
                    )}

                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-violet-400">
                      ৳
                    </span>

                    <input
                      id="offer-price"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={offerPrice}
                      onChange={(e) =>
                      setOfferPrice(e.target.value)
                      }
                      className="w-full rounded-2xl border border-violet-200 bg-violet-50/40 py-3.5 pl-9 pr-4 text-sm font-bold text-violet-700 outline-none transition-all focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                    />

                  </div>

                </div>


                {/* PRICE PREVIEW */}

                <AnimatePresence>

                  {price && offerPrice && Number(offerPrice) < Number(price) && (

                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        height: 'auto',
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      className="mt-5 overflow-hidden"
                    >

                      <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-cyan-50 p-4">

                        <div className="flex items-center justify-between">

                          <span className="text-xs text-slate-500">
                            Customer saves
                          </span>

                          <span className="font-bold text-emerald-600">
                            ৳{Number(price) - Number(offerPrice)}
                          </span>

                        </div>

                      </div>

                    </motion.div>

                  )}

                </AnimatePresence>

              </motion.section>


              {/* ==================================================
                  PUBLISH CARD
              ================================================== */}

              <motion.section
                variants={itemVariants}
                className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-blue-950 to-violet-950 p-6 text-white shadow-2xl"
              >

                {/* Animated glow */}

                <motion.div
                  animate={{
                    x: [0, 80, 0],
                    opacity: [0.15, 0.3, 0.15],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                  className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-400 blur-3xl"
                />

                <motion.div
                  animate={{
                    x: [0, -60, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                  }}
                  className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-violet-500 blur-3xl"
                />

                <div className="relative z-10">

                  <div className="mb-5 flex items-center gap-3">

                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md"
                    >
                      <Sparkles size={21} />
                    </motion.div>

                    <div>

                      <h3 className="font-bold">
                        Ready to publish?
                      </h3>

                      <p className="text-xs text-blue-200">
                        Add your product to the store
                      </p>

                    </div>

                  </div>


                  <p className="mb-5 text-sm leading-6 text-slate-300">
                    Make sure all product information and images
                    are correct before publishing.
                  </p>


                  {/* SUBMIT BUTTON */}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={
                      !isSubmitting
                        ? {
                            scale: 1.03,
                            y: -2,
                          }
                        : {}
                    }
                    whileTap={
                      !isSubmitting
                        ? {
                            scale: 0.97,
                          }
                        : {}
                    }
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 py-4 font-bold text-white shadow-xl shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                  >

                    {/* Button shine */}

                    {!isSubmitting && (
                      <motion.div
                        animate={{
                          x: ['-120%', '120%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        className="absolute inset-y-0 w-20 -skew-x-12 bg-white/20 blur-sm"
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-2">

                      {isSubmitting ? (
                        <>
                          <Loader2
                            size={19}
                            className="animate-spin"
                          />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Plus size={19} />
                          ADD PRODUCT
                          <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </>
                      )}

                    </span>

                  </motion.button>

                </div>

              </motion.section>

            </div>

          </div>

        </form>

      </motion.div>

    </div>
  );
};

export default AddProduct;