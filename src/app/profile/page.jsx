// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import {
//     User,
//     Mail,
//     Phone,
//     MapPin,
//     Package,
//     Heart,
//     ShoppingCart,
//     ShieldCheck,
//     LogOut,
//     ChevronRight,
//     Pencil,
// } from 'lucide-react';
// import { useUser, SignOutButton } from '@clerk/nextjs';

// const Profile = () => {

//     const { user, isLoaded } = useUser();

//     if (!isLoaded) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin h-10 w-10 rounded-full border-4 border-sky-500 border-t-transparent" />
//             </div>
//         );
//     }

//     return (
//         <main className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">

//             <div className="max-w-6xl mx-auto">

//                 {/* Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="mb-8"
//                 >
//                     <h1 className="text-3xl font-bold text-gray-800">
//                         My Profile
//                     </h1>

//                     <p className="text-gray-500 mt-1">
//                         Manage your account and personal information
//                     </p>
//                 </motion.div>


//                 {/* Profile Card */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
//                 >

//                     <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

//                         {/* Avatar */}
//                         <div className="relative">

//                             <img
//                                 src={
//                                     user?.imageUrl ||
//                                     "https://via.placeholder.com/150"
//                                 }
//                                 alt="Profile"
//                                 className="w-28 h-28 rounded-full object-cover border-4 border-sky-100"
//                             />

//                             <button
//                                 className="absolute bottom-0 right-0 bg-sky-500 text-white p-2 rounded-full shadow-md hover:bg-sky-600 transition"
//                             >
//                                 <Pencil size={16} />
//                             </button>

//                         </div>


//                         {/* User Info */}
//                         <div className="flex-1 text-center sm:text-left">

//                             <h2 className="text-2xl font-bold text-gray-800">
//                                 {user?.fullName || 'User'}
//                             </h2>

//                             <p className="text-gray-500 mt-1">
//                                 {user?.primaryEmailAddress?.emailAddress}
//                             </p>

//                             <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">

//                                 <span className="px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 text-sm font-medium">
//                                     Customer
//                                 </span>

//                                 <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-medium">
//                                     Active Account
//                                 </span>

//                             </div>

//                         </div>


//                         {/* Edit Button */}
//                         <button
//                             className="
//                                 flex items-center gap-2
//                                 px-5 py-2.5
//                                 rounded-xl
//                                 bg-sky-500
//                                 hover:bg-sky-600
//                                 text-white
//                                 font-medium
//                                 transition
//                             "
//                         >
//                             <Pencil size={17} />
//                             Edit Profile
//                         </button>

//                     </div>

//                 </motion.div>


//                 {/* Main Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//                     {/* Account Information */}
//                     <motion.div
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
//                     >

//                         <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                             Account Information
//                         </h3>


//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

//                             {/* Name */}
//                             <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
//                                 <div className="p-3 rounded-xl bg-sky-100 text-sky-600">
//                                     <User size={20} />
//                                 </div>

//                                 <div>
//                                     <p className="text-sm text-gray-500">
//                                         Full Name
//                                     </p>

//                                     <p className="font-medium text-gray-800">
//                                         {user?.fullName || 'Not added'}
//                                     </p>
//                                 </div>
//                             </div>


//                             {/* Email */}
//                             <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
//                                 <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
//                                     <Mail size={20} />
//                                 </div>

//                                 <div className="min-w-0">
//                                     <p className="text-sm text-gray-500">
//                                         Email
//                                     </p>

//                                     <p className="font-medium text-gray-800 truncate">
//                                         {user?.primaryEmailAddress?.emailAddress || 'Not added'}
//                                     </p>
//                                 </div>
//                             </div>


//                             {/* Phone */}
//                             <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
//                                 <div className="p-3 rounded-xl bg-green-100 text-green-600">
//                                     <Phone size={20} />
//                                 </div>

//                                 <div>
//                                     <p className="text-sm text-gray-500">
//                                         Phone
//                                     </p>

//                                     <p className="font-medium text-gray-800">
//                                         {user?.primaryPhoneNumber?.phoneNumber || 'Not added'}
//                                     </p>
//                                 </div>
//                             </div>


//                             {/* Address */}
//                             <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
//                                 <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
//                                     <MapPin size={20} />
//                                 </div>

//                                 <div>
//                                     <p className="text-sm text-gray-500">
//                                         Address
//                                     </p>

//                                     <p className="font-medium text-gray-800">
//                                         Manage your addresses
//                                     </p>
//                                 </div>
//                             </div>

//                         </div>

//                     </motion.div>


//                     {/* Quick Actions */}
//                     <motion.div
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
//                     >

//                         <h3 className="text-xl font-semibold text-gray-800 mb-5">
//                             Quick Actions
//                         </h3>

//                         <div className="space-y-3">

//                             <ProfileAction
//                                 icon={<Package size={20} />}
//                                 title="My Orders"
//                                 description="View your orders"
//                             />

//                             <ProfileAction
//                                 icon={<Heart size={20} />}
//                                 title="Wishlist"
//                                 description="Saved products"
//                             />

//                             <ProfileAction
//                                 icon={<ShoppingCart size={20} />}
//                                 title="My Cart"
//                                 description="View your cart"
//                             />

//                             <ProfileAction
//                                 icon={<MapPin size={20} />}
//                                 title="Addresses"
//                                 description="Manage addresses"
//                             />

//                         </div>

//                     </motion.div>

//                 </div>


//                 {/* Security */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6"
//                 >

//                     <div className="flex items-center gap-4">

//                         <div className="p-3 rounded-xl bg-green-100 text-green-600">
//                             <ShieldCheck size={24} />
//                         </div>

//                         <div className="flex-1">

//                             <h3 className="font-semibold text-gray-800">
//                                 Account Security
//                             </h3>

//                             <p className="text-sm text-gray-500">
//                                 Your account is secured by Clerk authentication.
//                             </p>

//                         </div>

//                         <ChevronRight className="text-gray-400" />

//                     </div>

//                 </motion.div>


//                 {/* Logout */}
//                 <div className="mt-6 flex justify-end">

//                     <SignOutButton>
//                         <button
//                             className="
//                                 flex items-center gap-2
//                                 px-5 py-2.5
//                                 rounded-xl
//                                 bg-fuchsia-50
//                                 text-fuchsia-600
//                                 hover:bg-fuchsia-100
//                                 transition
//                                 font-medium
//                             "
//                         >
//                             <LogOut size={18} />
//                             Logout
//                         </button>
//                     </SignOutButton>

//                 </div>

//             </div>

//         </main>
//     );
// };


// const ProfileAction = ({ icon, title, description }) => {

//     return (
//         <button
//             className="
//                 w-full flex items-center gap-4
//                 p-4 rounded-xl
//                 bg-gray-50
//                 hover:bg-sky-50
//                 group
//                 transition
//                 text-left
//             "
//         >

//             <div className="text-sky-500">
//                 {icon}
//             </div>

//             <div className="flex-1">

//                 <p className="font-medium text-gray-800 group-hover:text-sky-600">
//                     {title}
//                 </p>

//                 <p className="text-xs text-gray-500">
//                     {description}
//                 </p>

//             </div>

//             <ChevronRight
//                 size={18}
//                 className="text-gray-400 group-hover:text-sky-500"
//             />

//         </button>
//     );
// };


// export default Profile;

