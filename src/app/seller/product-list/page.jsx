'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import Footer from '@/components/seller/Footer';
import Loading from '@/components/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';

import {
  Eye,
  Pencil,
  Trash2,
  Package,
  ShoppingBag,
  Sparkles,
  X,
  AlertTriangle,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';

import { IoSearch } from "react-icons/io5";

import { motion, AnimatePresence } from 'framer-motion';

const ProductList = () => {
  const { router, getToken, user } = useAppContext();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');

  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // =========================
  // Fetch Seller Products
  // =========================

  const fetchSellerProduct = async () => {
    try {
      setLoading(true);

      const token = await getToken();

      const { data } = await axios.get(
        '/api/product/seller-list',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setProducts(data.products);
        setLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        'Something went wrong'
      );
    }
  };

  // =========================
  // Delete Product
  // =========================

  const handleDelete = async () => {
    if (!deleteProduct) return;

    try {
      setDeleting(true);

      const token = await getToken();

      const { data } = await axios.delete(
        `/api/product/delete/${deleteProduct._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success('Product deleted successfully');
        setDeleting(false);

        setProducts((prev) =>
          prev.filter(
            (product) =>
              product._id !== deleteProduct._id
          )
        );

        setDeleteProduct(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        'Failed to delete product'
      );
    }
  };

  // =========================
  // Fetch
  // =========================

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  // =========================
  // Search
  // =========================

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // Animation
  // =========================

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
      },
    },
  };

  const rowVariants = {
    hidden: {
      opacity: 0,
      x: -25,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
      },
    },
  };

  return (
    <div className="relative flex-1 min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-violet-50/60">

      {/* =====================================
          BACKGROUND DECORATIONS
      ===================================== */}

      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />

      {/* =====================================
          MAIN
      ===================================== */}

      {loading ? (
        <Loading />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full md:p-10 p-4"
        >

          {/* HEADER */}

          <motion.div
            variants={rowVariants}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-7"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg"
                >
                  <ShoppingBag size={19} />
                </motion.div>
                <h1 className="text-2xl font-bold text-slate-800">All Products</h1>
              </div>
              <p className="text-sm text-slate-500">
                Manage, update and organize your products
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.04, y: -3 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-500 text-white">
                <Package size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Products</p>
                <p className="text-lg font-bold text-slate-800">{products.length}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* SEARCH */}

          <motion.div variants={rowVariants} className="mb-5">
            <div className="relative max-w-md">
              <IoSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-md outline-none text-sm text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={17} />
                </button>
              )}
            </div>
          </motion.div>

          {/* TABLE CARD */}

          <motion.div
            variants={rowVariants}
            className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white/80 backdrop-blur-2xl border border-white shadow-xl shadow-slate-300/30"
          >
            <div className="overflow-x-auto">
              <table className="table-fixed w-full">
                <thead className="bg-gradient-to-r from-slate-50 via-blue-50/50 to-violet-50/50">
                  <tr>
                    <th className="w-[35%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Product</th>
                    <th className="w-[18%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600 max-sm:hidden">Category</th>
                    <th className="w-[15%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Price</th>
                    <th className="w-[32%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product, index) => (
                      <motion.tr
                        key={product._id}
                        variants={rowVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -100, height: 0 }}
                        whileHover={{ backgroundColor: 'rgba(239,246,255,0.55)' }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-slate-200/70 group"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <motion.div
                              whileHover={{ scale: 1.08, rotate: 2 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                              className="relative w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50 p-2 shadow-sm overflow-hidden"
                            >
                              <Image
                                src={product.image[0]}
                                alt={product.name}
                                width={100}
                                height={100}
                                className="w-full h-full object-contain"
                              />
                            </motion.div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-700 truncate">{product.name}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Sparkles size={12} className="text-violet-500" />
                                <span className="text-xs text-slate-400">Product #{index + 1}</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 max-sm:hidden">
                          <span className="inline-flex px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold border border-blue-100">
                            {product.category}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div>
                            <p className="font-bold text-slate-700">৳{product.offerPrice}</p>
                            {product.price && product.price !== product.offerPrice && (
                              <p className="text-xs text-slate-400 line-through">৳{product.price}</p>
                            )}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            {/* VISIT */}
                            <motion.button
                              whileHover={{ scale: 1.07, y: -2 }}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => router.push(`/product/${product._id}`)}
                              className="group/btn flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-white text-xs font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                              <Eye size={15} />
                              <span className="hidden lg:inline">Visit</span>
                              <ArrowUpRight size={13} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                            </motion.button>

                            {/* UPDATE — now routes to the dedicated edit page */}
                            <motion.button
                              whileHover={{ scale: 1.07, y: -2, rotate: -1 }}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => router.push(`/seller/product-list/${product._id}`)}
                              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-white text-xs font-semibold bg-linear-to-r from-fuchsia-500 to-violet-600 shadow-md shadow-violet-500/20 hover:shadow-lg hover:shadow-violet-500/30 transition-all"
                            >
                              <Pencil size={15} />
                              <span className="hidden lg:inline">Update</span>
                            </motion.button>

                            {/* DELETE */}
                            <motion.button
                              whileHover={{ scale: 1.07, y: -2 }}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => setDeleteProduct(product)}
                              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-white text-xs font-semibold bg-gradient-to-r from-rose-500 to-red-600 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 transition-all"
                            >
                              <Trash2 size={15} />
                              <span className="hidden lg:inline">Delete</span>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center"
              >
                <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Package size={28} className="text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-700">No products found</h3>
                <p className="text-sm text-slate-400 mt-1">Try searching with another product name.</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* DELETE CONFIRMATION MODAL */}

      <AnimatePresence>
        {deleteProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => { if (!deleting) setDeleteProduct(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="h-2 bg-gradient-to-r from-rose-500 via-red-500 to-orange-500" />
              <div className="p-7">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-red-100 flex items-center justify-center text-red-500"
                >
                  <AlertTriangle size={30} />
                </motion.div>
                <h2 className="text-xl font-bold text-center text-slate-800">Delete Product?</h2>
                <p className="text-sm text-slate-500 text-center mt-2">Are you sure you want to delete</p>
                <p className="text-center font-bold text-slate-700 mt-1">&quot;{deleteProduct.name}&quot;</p>
                <p className="text-xs text-red-500 text-center mt-3">This action cannot be undone.</p>

                <div className="flex gap-3 mt-7">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    disabled={deleting}
                    onClick={() => setDeleteProduct(null)}
                    className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition"
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    disabled={deleting}
                    onClick={handleDelete}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-red-500 to-rose-600 text-white font-semibold text-sm shadow-lg shadow-red-500/20"
                  >
                    {deleting ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 size={17} />
                        Delete
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductList;
