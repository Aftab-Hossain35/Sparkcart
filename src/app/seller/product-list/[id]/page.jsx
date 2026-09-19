'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import Footer from '@/components/seller/Footer';
import Loading from '@/components/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';

import {
  ArrowLeft,
  ImagePlus,
  X,
  Save,
  Loader2,
  CheckCircle2,
  PackageX,
  Tag,
  FileText,
  Layers,
  Coins,
  BadgePercent,
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'Earphone',
  'Headphone',
  'Smartphone',
  'Laptop',
  'Watch',
  'Camera',
  'Accessories',
];

// Turn a File into a base64 data URL so it can travel inside a
// plain JSON body to the existing PUT /api/product/update/[id] route.
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const UpdateProduct = () => {
  const { id } = useParams();
  const { router, getToken, user } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  // Each slot is either an existing image URL (string), a newly
  // picked File, or null (empty slot).
  const [images, setImages] = useState([null, null, null, null]);

  // =========================
  // Load the product to edit
  // =========================

  useEffect(() => {
    const load = async () => {
      if (!user || !id) return;

      try {
        setLoading(true);

        const token = await getToken();

        const { data } = await axios.get(
          `/api/product/update/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          const p = data.product;
          setName(p.name || '');
          setDescription(p.description || '');
          setCategory(p.category || CATEGORIES[0]);
          setPrice(p.price ?? '');
          setOfferPrice(p.offerPrice ?? '');

          const existing = Array.isArray(p.image) ? p.image : [];
          const slots = [null, null, null, null];
          existing.slice(0, 4).forEach((url, i) => { slots[i] = url; });
          setImages(slots);
        } else {
          setNotFound(true);
          toast.error(data.message);
        }
      } catch (error) {
        setNotFound(true);
        toast.error(
          error?.response?.data?.message ||
          error.message ||
          'Failed to load product'
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, id]);

  // =========================
  // Image slot handlers
  // =========================

  const handleImagePick = (index, file) => {
    if (!file) return;
    setImages((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const handleImageClear = (index) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const previewFor = (slot) => {
    if (!slot) return null;
    if (typeof slot === 'string') return slot;
    return URL.createObjectURL(slot);
  };

  // =========================
  // Submit
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Product name is required');
      return;
    }

    try {
      setSaving(true);

      const token = await getToken();

      const resolvedImages = await Promise.all(
        images
          .filter(Boolean)
          .map((slot) => (typeof slot === 'string' ? slot : fileToBase64(slot)))
      );

      const { data } = await axios.put(
        `/api/product/update/${id}`,
        {
          name: name.trim(),
          description,
          category,
          price: Number(price),
          offerPrice: Number(offerPrice),
          image: resolvedImages,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setSuccess(true);
        toast.success('Product updated successfully');
        setTimeout(() => {
          router.push('/seller/product-list');
        }, 1100);
      } else {
        toast.error(data.message);
        setSaving(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        'Failed to update product'
      );
      setSaving(false);
    }
  };

  // =========================
  // Animation variants
  // =========================

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.07 },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (loading) return <Loading />;

  return (
    <div className="relative flex-1 min-h-screen flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-violet-50/60">

      {/* BACKGROUND DECORATIONS */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />

      {notFound ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4 p-10 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
            <PackageX size={28} className="text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-700">Product not found</h2>
          <p className="text-sm text-slate-400">It may have been deleted, or the link is wrong.</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push('/seller/product-list')}
            className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            Back to products
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full md:p-10 p-4 flex justify-center"
        >
          <div className="w-full max-w-3xl">

            {/* HEADER */}
            <motion.div variants={fieldVariants} className="flex items-center gap-3 mb-7">
              <motion.button
                whileHover={{ scale: 1.06, x: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => router.push('/seller/product-list')}
                className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-xl border border-white shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft size={18} />
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Update Product</h1>
                <p className="text-sm text-slate-500">Editing &quot;{name || 'product'}&quot;</p>
              </div>
            </motion.div>

            {/* FORM CARD */}
            <motion.form
              variants={fieldVariants}
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-white shadow-xl shadow-slate-300/30 p-6 md:p-8 space-y-7"
            >

              {/* IMAGES */}
              <motion.div variants={fieldVariants}>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <ImagePlus size={16} className="text-violet-500" />
                  Product images
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((slot, index) => {
                    const preview = previewFor(slot);
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.04 }}
                        className="relative aspect-square rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50 border-2 border-dashed border-slate-200 overflow-hidden"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImagePick(index, e.target.files?.[0])}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />

                        {preview ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={preview}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-contain p-2"
                            />
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => { e.stopPropagation(); handleImageClear(index); }}
                              className="absolute top-1.5 right-1.5 z-20 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md"
                            >
                              <X size={13} />
                            </motion.button>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-slate-400">
                            <ImagePlus size={22} />
                            <span className="text-[11px] font-medium">Add image</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* NAME */}
              <motion.div variants={fieldVariants}>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <Tag size={16} className="text-blue-500" />
                  Product name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Wireless Earphone"
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 outline-none text-sm text-slate-700 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all"
                />
              </motion.div>

              {/* DESCRIPTION */}
              <motion.div variants={fieldVariants}>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                  <FileText size={16} className="text-cyan-500" />
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="Describe the product..."
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 outline-none text-sm text-slate-700 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all resize-none"
                />
              </motion.div>

              {/* CATEGORY + PRICES */}
              <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Layers size={16} className="text-violet-500" />
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 outline-none text-sm text-slate-700 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <Coins size={16} className="text-amber-500" />
                    Regular price
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="৳0"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 outline-none text-sm text-gray-900 focus:ring-2 focus:ring-violet-400/30 focus:border-violet-300 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                    <BadgePercent size={16} className="text-green-500" />
                    Offer price
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    placeholder="৳0"
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-200 outline-none text-sm text-green-500 focus:ring-2 focus:ring-green-400/30 focus:border-green-300 transition-all"
                  />
                </div>
              </motion.div>

              {/* ACTIONS */}
              <motion.div variants={fieldVariants} className="flex items-center gap-3 pt-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => router.push('/seller/product-list')}
                  className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition"
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={saving}
                  whileHover={{ scale: saving ? 1 : 1.03 }}
                  whileTap={{ scale: saving ? 1 : 0.96 }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 disabled:opacity-80"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {success ? (
                      <motion.span
                        key="done"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 size={17} />
                        Saved
                      </motion.span>
                    ) : saving ? (
                      <motion.span
                        key="saving"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 size={17} className="animate-spin" />
                        Saving...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Save size={17} />
                        Save changes
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      )}

      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center text-emerald-500"
            >
              <CheckCircle2 size={40} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpdateProduct;
