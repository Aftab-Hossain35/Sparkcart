// "use client";

// import React, { useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Heart,
//   ShoppingBag,
//   ArrowRight,
//   Sparkles,
//   Trash2,
//   ShoppingCart,
//   Search,
//   X,
//   HeartOff,
// } from "lucide-react";

// import { useAppContext } from "@/context/AppContext";
// import ProductCard from "@/components/ProductCard";

// const WishlistPage = () => {
//   const { products, router } = useAppContext();

//   /*
//    * ----------------------------------------------------
//    * TEMPORARY WISHLIST DATA
//    * ----------------------------------------------------
//    *
//    * Replace this with your real wishlist data later.
//    *
//    * Example:
//    * const wishlistProducts = products.filter(...)
//    *
//    * For now, this stores selected product IDs locally.
//    */

//   const [wishlistIds, setWishlistIds] = useState([]);

//   const [search, setSearch] = useState("");

//   /*
//    * Add products to wishlist
//    */
//   const addToWishlist = (productId) => {
//     setWishlistIds((prev) => {
//       if (prev.includes(productId)) {
//         return prev;
//       }

//       return [...prev, productId];
//     });
//   };

//   /*
//    * Remove product
//    */
//   const removeFromWishlist = (productId) => {
//     setWishlistIds((prev) =>
//       prev.filter((id) => id !== productId)
//     );
//   };

//   /*
//    * Clear entire wishlist
//    */
//   const clearWishlist = () => {
//     setWishlistIds([]);
//   };

//   /*
//    * Wishlist products
//    */
//   const wishlistProducts = useMemo(() => {
//     if (!products?.length) return [];

//     return products.filter((product) =>
//       wishlistIds.includes(product._id)
//     );
//   }, [products, wishlistIds]);

//   /*
//    * Search wishlist
//    */
//   const filteredProducts = useMemo(() => {
//     if (!search.trim()) {
//       return wishlistProducts;
//     }

//     const query = search.toLowerCase();

//     return wishlistProducts.filter((product) =>
//       product.name?.toLowerCase().includes(query)
//     );
//   }, [wishlistProducts, search]);

//   /*
//    * ====================================================
//    * EMPTY WISHLIST
//    * ====================================================
//    */

//   if (!products?.length || wishlistProducts.length === 0) {
//     return (
//       <main
//         className="
//           relative
//           min-h-screen
//           overflow-hidden
//           bg-gradient-to-br
//           from-pink-50/60
//           via-white
//           to-indigo-50/60
//           px-4
//           py-10
//           sm:px-6
//           md:px-10
//           lg:px-16
//           xl:px-24
//         "
//       >
//         {/* Background glow */}
//         <motion.div
//           animate={{
//             x: [0, 80, 0],
//             y: [0, 30, 0],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{
//             duration: 9,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="
//             pointer-events-none
//             absolute
//             -left-32
//             top-20
//             h-80
//             w-80
//             rounded-full
//             bg-pink-300/20
//             blur-3xl
//           "
//         />

//         <motion.div
//           animate={{
//             x: [0, -70, 0],
//             y: [0, 40, 0],
//           }}
//           transition={{
//             duration: 11,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="
//             pointer-events-none
//             absolute
//             right-[-100px]
//             top-40
//             h-96
//             w-96
//             rounded-full
//             bg-indigo-300/15
//             blur-3xl
//           "
//         />

//         <div
//           className="
//             relative
//             mx-auto
//             flex
//             min-h-[75vh]
//             max-w-5xl
//             items-center
//             justify-center
//           "
//         >
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 30,
//               scale: 0.95,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//               scale: 1,
//             }}
//             transition={{
//               duration: 0.6,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="
//               w-full
//               max-w-lg
//               rounded-[2rem]
//               border
//               border-white
//               bg-white/75
//               p-7
//               text-center
//               shadow-2xl
//               shadow-pink-200/30
//               backdrop-blur-xl
//               sm:p-10
//             "
//           >
//             {/* Animated heart */}
//             <motion.div
//               animate={{
//                 scale: [1, 1.08, 1],
//                 rotate: [0, -4, 4, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="
//                 relative
//                 mx-auto
//                 flex
//                 h-24
//                 w-24
//                 items-center
//                 justify-center
//                 rounded-[2rem]
//                 bg-gradient-to-br
//                 from-pink-400
//                 via-fuchsia-500
//                 to-purple-600
//                 text-white
//                 shadow-xl
//                 shadow-pink-500/25
//               "
//             >
//               <Heart
//                 size={40}
//                 fill="currentColor"
//                 strokeWidth={1.5}
//               />

//               <motion.span
//                 animate={{
//                   scale: [1, 1.35, 1],
//                   opacity: [0.7, 0, 0.7],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                 }}
//                 className="
//                   absolute
//                   inset-0
//                   rounded-[2rem]
//                   border-2
//                   border-pink-400
//                 "
//               />
//             </motion.div>

//             <div className="mt-7">
//               <div
//                 className="
//                   mx-auto
//                   flex
//                   w-fit
//                   items-center
//                   gap-1.5
//                   rounded-full
//                   border
//                   border-pink-100
//                   bg-pink-50
//                   px-3
//                   py-1
//                   text-[10px]
//                   font-bold
//                   uppercase
//                   tracking-[0.2em]
//                   text-pink-500
//                 "
//               >
//                 <Sparkles size={11} />
//                 Wishlist
//               </div>

//               <h1
//                 className="
//                   mt-4
//                   text-2xl
//                   font-black
//                   tracking-tight
//                   text-gray-900
//                   sm:text-3xl
//                 "
//               >
//                 Your wishlist is waiting
//               </h1>

//               <p
//                 className="
//                   mx-auto
//                   mt-3
//                   max-w-md
//                   text-sm
//                   leading-6
//                   text-gray-400
//                 "
//               >
//                 Save the products you love and keep them
//                 ready for your next shopping adventure.
//               </p>
//             </div>

//             <motion.button
//               whileHover={{
//                 scale: 1.04,
//                 y: -2,
//               }}
//               whileTap={{
//                 scale: 0.96,
//               }}
//               onClick={() => router.push("/all-products")}
//               className="
//                 mt-7
//                 flex
//                 w-full
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-xl
//                 bg-gradient-to-r
//                 from-pink-500
//                 via-fuchsia-500
//                 to-purple-600
//                 px-5
//                 py-3.5
//                 text-sm
//                 font-bold
//                 text-white
//                 shadow-lg
//                 shadow-pink-500/20
//               "
//             >
//               <ShoppingBag size={17} />
//               Explore Products
//               <ArrowRight size={16} />
//             </motion.button>
//           </motion.div>
//         </div>
//       </main>
//     );
//   }

//   /*
//    * ====================================================
//    * MAIN WISHLIST
//    * ====================================================
//    */

//   return (
//     <main
//       className="
//         relative
//         min-h-screen
//         overflow-hidden
//         bg-gradient-to-br
//         from-slate-50
//         via-white
//         to-pink-50/40
//         px-3
//         py-7
//         sm:px-5
//         sm:py-9
//         md:px-8
//         md:py-12
//         lg:px-12
//         xl:px-20
//       "
//     >
//       {/* ==================================================
//           BACKGROUND
//       ================================================== */}

//       <motion.div
//         animate={{
//           x: [0, 60, 0],
//           y: [0, 30, 0],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         className="
//           pointer-events-none
//           absolute
//           -left-32
//           top-20
//           h-80
//           w-80
//           rounded-full
//           bg-pink-300/10
//           blur-3xl
//         "
//       />

//       <motion.div
//         animate={{
//           x: [0, -70, 0],
//           y: [0, 40, 0],
//         }}
//         transition={{
//           duration: 12,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         className="
//           pointer-events-none
//           absolute
//           right-[-100px]
//           top-10
//           h-96
//           w-96
//           rounded-full
//           bg-purple-300/10
//           blur-3xl
//         "
//       />

//       <div className="relative mx-auto max-w-7xl">

//         {/* ==================================================
//             HEADER
//         ================================================== */}

//         <motion.div
//           initial={{
//             opacity: 0,
//             y: -25,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             duration: 0.6,
//           }}
//           className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
//         >
//           {/* Title */}
//           <div>
//             <div
//               className="
//                 flex
//                 w-fit
//                 items-center
//                 gap-1.5
//                 rounded-full
//                 border
//                 border-pink-100
//                 bg-pink-50/80
//                 px-3
//                 py-1
//                 text-[10px]
//                 font-bold
//                 uppercase
//                 tracking-[0.2em]
//                 text-pink-500
//               "
//             >
//               <Heart
//                 size={11}
//                 fill="currentColor"
//               />
//               My Wishlist
//             </div>

//             <h1
//               className="
//                 mt-3
//                 text-3xl
//                 font-black
//                 tracking-tight
//                 text-gray-900
//                 sm:text-4xl
//                 md:text-5xl
//               "
//             >
//               Products you{" "}
//               <span
//                 className="
//                   bg-gradient-to-r
//                   from-pink-500
//                   via-fuchsia-500
//                   to-purple-600
//                   bg-clip-text
//                   text-transparent
//                 "
//               >
//                 love
//               </span>
//               ❤️
//             </h1>

//             <p className="mt-2 text-sm text-gray-400 sm:text-base">
//               Keep your favorite products close.
//             </p>
//           </div>

//           {/* Count */}
//           <motion.div
//             whileHover={{
//               scale: 1.04,
//             }}
//             className="
//               flex
//               w-fit
//               items-center
//               gap-3
//               rounded-2xl
//               border
//               border-white
//               bg-white/80
//               px-4
//               py-3
//               shadow-lg
//               shadow-slate-200/40
//               backdrop-blur
//             "
//           >
//             <div
//               className="
//                 flex
//                 h-10
//                 w-10
//                 items-center
//                 justify-center
//                 rounded-xl
//                 bg-gradient-to-br
//                 from-pink-500
//                 to-purple-600
//                 text-white
//               "
//             >
//               <Heart
//                 size={19}
//                 fill="currentColor"
//               />
//             </div>

//             <div>
//               <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
//                 Saved Items
//               </p>

//               <p className="text-lg font-black text-gray-900">
//                 {wishlistProducts.length}
//               </p>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* ==================================================
//             TOOLBAR
//         ================================================== */}

//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             delay: 0.15,
//             duration: 0.5,
//           }}
//           className="
//             mt-7
//             flex
//             flex-col
//             gap-3
//             rounded-2xl
//             border
//             border-white
//             bg-white/70
//             p-3
//             shadow-lg
//             shadow-slate-200/30
//             backdrop-blur-xl
//             sm:flex-row
//             sm:items-center
//             sm:justify-between
//           "
//         >
//           {/* Search */}
//           <div
//             className="
//               flex
//               w-full
//               items-center
//               gap-2
//               rounded-xl
//               border
//               border-slate-100
//               bg-slate-50/70
//               px-3
//               py-2.5
//               sm:max-w-sm
//             "
//           >
//             <Search
//               size={17}
//               className="text-gray-400"
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               placeholder="Search wishlist..."
//               className="
//                 min-w-0
//                 flex-1
//                 bg-transparent
//                 text-sm
//                 text-gray-700
//                 outline-none
//                 placeholder:text-gray-400
//               "
//             />

//             {search && (
//               <button
//                 onClick={() => setSearch("")}
//                 className="text-gray-400 hover:text-gray-700"
//               >
//                 <X size={16} />
//               </button>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() =>
//                 router.push("/all-products")
//               }
//               className="
//                 flex
//                 min-h-10
//                 flex-1
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-xl
//                 border
//                 border-sky-100
//                 bg-sky-50
//                 px-3
//                 text-xs
//                 font-bold
//                 text-sky-600
//                 transition
//                 hover:bg-sky-100
//                 sm:flex-none
//               "
//             >
//               <ShoppingBag size={15} />
//               Continue Shopping
//             </button>

//             <button
//               onClick={clearWishlist}
//               className="
//                 flex
//                 min-h-10
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-xl
//                 border
//                 border-red-100
//                 bg-red-50
//                 px-3
//                 text-xs
//                 font-bold
//                 text-red-500
//                 transition
//                 hover:bg-red-100
//               "
//             >
//               <Trash2 size={15} />
//               <span className="hidden sm:block">
//                 Clear
//               </span>
//             </button>
//           </div>
//         </motion.div>

//         {/* ==================================================
//             SEARCH RESULT EMPTY
//         ================================================== */}

//         {filteredProducts.length === 0 && (
//           <motion.div
//             initial={{
//               opacity: 0,
//               scale: 0.96,
//             }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//             }}
//             className="
//               mt-10
//               rounded-3xl
//               border
//               border-white
//               bg-white/80
//               px-5
//               py-16
//               text-center
//               shadow-lg
//               shadow-slate-200/30
//             "
//           >
//             <Search
//               size={36}
//               className="mx-auto text-gray-300"
//             />

//             <h2 className="mt-4 font-bold text-gray-700">
//               No matching products
//             </h2>

//             <p className="mt-1 text-sm text-gray-400">
//               Try another search term.
//             </p>
//           </motion.div>
//         )}

//         {/* ==================================================
//             PRODUCT GRID
//         ================================================== */}

//         {filteredProducts.length > 0 && (
//           <motion.div
//             initial="hidden"
//             animate="show"
//             variants={{
//               hidden: {},
//               show: {
//                 transition: {
//                   staggerChildren: 0.07,
//                 },
//               },
//             }}
//             className="
//               mt-8
//               grid
//               grid-cols-2
//               gap-x-2
//               gap-y-6

//               min-[480px]:gap-x-3

//               sm:grid-cols-3
//               sm:gap-4

//               md:grid-cols-4
//               md:gap-5

//               lg:grid-cols-5
//               lg:gap-5

//               xl:grid-cols-6
//               xl:gap-6
//             "
//           >
//             <AnimatePresence mode="popLayout">
//               {filteredProducts.map((product) => (
//                 <motion.div
//                   key={product._id}
//                   layout
//                   variants={{
//                     hidden: {
//                       opacity: 0,
//                       y: 25,
//                       scale: 0.95,
//                     },
//                     show: {
//                       opacity: 1,
//                       y: 0,
//                       scale: 1,
//                       transition: {
//                         duration: 0.45,
//                         ease: [0.22, 1, 0.36, 1],
//                       },
//                     },
//                   }}
//                   exit={{
//                     opacity: 0,
//                     scale: 0.8,
//                     y: -15,
//                   }}
//                   whileHover={{
//                     y: -6,
//                   }}
//                   className="relative min-w-0"
//                 >
//                   {/* Remove button */}
//                   <motion.button
//                     initial={{
//                       opacity: 0,
//                       scale: 0.7,
//                     }}
//                     whileHover={{
//                       scale: 1.08,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                     }}
//                     onClick={() =>
//                       removeFromWishlist(product._id)
//                     }
//                     className="
//                       absolute
//                       right-2
//                       top-2
//                       z-20
//                       flex
//                       h-8
//                       w-8
//                       items-center
//                       justify-center
//                       rounded-full
//                       border
//                       border-white
//                       bg-white/90
//                       text-red-500
//                       shadow-lg
//                       backdrop-blur
//                       transition
//                       hover:bg-red-500
//                       hover:text-white
//                     "
//                     title="Remove from wishlist"
//                   >
//                     <HeartOff size={15} />
//                   </motion.button>

//                   <ProductCard product={product} />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}

//         {/* ==================================================
//             BOTTOM CTA
//         ================================================== */}

//         {filteredProducts.length > 0 && (
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 20,
//             }}
//             whileInView={{
//               opacity: 1,
//               y: 0,
//             }}
//             viewport={{
//               once: true,
//             }}
//             className="
//               mt-12
//               overflow-hidden
//               rounded-3xl
//               bg-gradient-to-r
//               from-sky-500
//               via-indigo-600
//               to-purple-600
//               p-6
//               text-white
//               shadow-xl
//               shadow-indigo-500/20
//               sm:p-8
//               md:flex
//               md:items-center
//               md:justify-between
//               md:px-10
//             "
//           >
//             <div>
//               <div className="flex items-center gap-2">
//                 <Sparkles size={17} />

//                 <span className="text-xs font-bold uppercase tracking-wider text-white/70">
//                   Keep exploring
//                 </span>
//               </div>

//               <h2 className="mt-2 text-xl font-black sm:text-2xl">
//                 Find something else you love.
//               </h2>

//               <p className="mt-1 text-sm text-white/70">
//                 Discover more products and add them to
//                 your wishlist.
//               </p>
//             </div>

//             <motion.button
//               whileHover={{
//                 scale: 1.04,
//                 x: 3,
//               }}
//               whileTap={{
//                 scale: 0.96,
//               }}
//               onClick={() =>
//                 router.push("/all-products")
//               }
//               className="
//                 mt-5
//                 flex
//                 w-full
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-xl
//                 bg-white
//                 px-5
//                 py-3
//                 text-sm
//                 font-bold
//                 text-indigo-600
//                 shadow-lg
//                 md:mt-0
//                 md:w-auto
//               "
//             >
//               <ShoppingCart size={16} />
//                Browse Products
//               <ArrowRight size={16} />
//             </motion.button>
//           </motion.div>
//         )}

//         {/* Footer spacing */}
//         <div className="h-10" />
//       </div>
//     </main>
//   );
// };

// export default WishlistPage;

