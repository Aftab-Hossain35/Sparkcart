'use client'
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-6">
            <p className="text-2xl md:text-3xl text-gray-800">
              Your <span className="font-bold text-sky-600">Shopping Cart</span>
            </p>
            <div className="px-4 py-1 bg-slate-100 text-sky-600 rounded-full font-medium">
              {getCartCount()} Items
            </div>
          </div>

          {/* Table Container - This adds the 'Card' look */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-gray-600 uppercase text-xs tracking-wider">
                  <th className="py-5 px-6 text-left font-semibold">Product</th>
                  <th className="py-5 px-6 text-left font-semibold">Price</th>
                  <th className="py-5 px-6 text-left font-semibold">Quantity</th>
                  <th className="py-5 px-6 text-left font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find(product => product._id === itemId);
                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <tr key={itemId} className="hover:bg-gray-50 transition-colors">
                      <td className="py-5 px-6 flex items-center gap-4">
                        <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-200 p-1">
                          <Image
                            src={product.image[0]}
                            alt={product.name}
                            className="w-16 h-16 object-cover"
                            width={128}
                            height={128}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{product.name}</p>
                          <button
                            className="text-xs text-red-500 hover:text-red-700 mt-1 font-medium transition"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-5 px-6 font-medium text-gray-700">${product.offerPrice}</td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg w-fit">
                          <button 
                            className="p-1 hover:bg-white rounded-md transition"
                            onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                          >
                            <Image src={assets.decrease_arrow} alt="decrease" className="w-4 h-4" />
                          </button>
                          <input 
                            onChange={e => updateCartQuantity(product._id, Number(e.target.value))} 
                            type="number" 
                            value={cartItems[itemId]} 
                            className="w-10 bg-transparent text-center font-bold text-gray-800 focus:outline-none"
                          />
                          <button 
                            className="p-1 hover:bg-white rounded-md transition"
                            onClick={() => addToCart(product._id)}
                          >
                            <Image src={assets.increase_arrow} alt="increase" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-5 px-6 font-bold text-gray-900">${(product.offerPrice * cartItems[itemId]).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button onClick={()=> router.push('/all-products')} className="group flex items-center mt-8 gap-2 text-gray-600 hover:text-orange-600 transition font-medium">
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow"
            />
            Continue Shopping
          </button>
        </div>
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;