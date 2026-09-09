'use client'
import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Banknote, Smartphone } from "lucide-react";

const paymentMethods = [
  {
    id: "bkash",
    label: "bKash",
    sub: "Send money / payment",
    icon: Smartphone,
    from: "from-pink-600",
    to: "to-rose-500",
    ring: "ring-pink-500",
    text: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    id: "nagad",
    label: "Nagad",
    sub: "Mobile banking",
    icon: Wallet,
    from: "from-orange-600",
    to: "to-amber-500",
    ring: "ring-orange-500",
    text: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    sub: "Pay when it arrives",
    icon: Banknote,
    from: "from-emerald-600",
    to: "to-teal-500",
    ring: "ring-emerald-500",
    text: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, getToken, user, cartItems, setCartItems } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get('/api/user/get-address',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      if (data.success) {
        setUserAddresses(data.addresses)
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0])
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error('Please select an address')
      }

      if (!paymentMethod) {
        return toast.error('Please select a payment method')
      }

      let cartItemsArray = Object.keys(cartItems).map((key) => ({ product: key, quantity: cartItems[key] }))
      cartItemsArray = cartItemsArray.filter(item => item.quantity > 0)

      if (cartItemsArray.length === 0) {
        return toast.error('Cart is empty')
      }

      const token = await getToken()

      const { data } = await axios.post('/api/order/create', {
        address: selectedAddress._id,
        items: cartItemsArray,
        paymentMethod,
      }, { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        toast.success(data.message)
        setCartItems({})
        router.push('/order-placed')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user])

  const total = getCartAmount() + Math.floor(getCartAmount() * 0.02);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-96 rounded-2xl p-6 bg-white border border-gray-100 shadow-[0_20px_60px_-15px_rgba(124,92,252,0.25)]"
    >
      <h2 className="text-xl md:text-2xl font-bold bg-linear-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
        Order Summary
      </h2>
      <hr className="border-gray-200 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="peer w-full text-left px-4 pr-2 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:border-blue-400 transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <motion.svg
                animate={{ rotate: isDropdownOpen ? 0 : -90 }}
                className="w-5 h-5 inline float-right"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#A21CAF"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute w-full bg-white border border-gray-100 rounded-xl shadow-xl mt-2 z-10 py-1.5 overflow-hidden"
                >
                  {userAddresses.map((address, index) => (
                    <li
                      key={index}
                      className="px-4 py-2.5 hover:bg-sky-50 cursor-pointer transition"
                      onClick={() => handleAddressSelect(address)}
                    >
                      {address.fullName}, {address.area}, {address.city}, {address.state}
                    </li>
                  ))}
                  <li
                    onClick={() => router.push("/add-address")}
                    className="px-4 py-2.5 hover:bg-sky-50 cursor-pointer text-center font-medium text-sky-600"
                  >
                    + Add New Address
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-3">
            Payment Method
          </label>
          <div className="grid grid-cols-1 gap-2.5">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;
              return (
                <motion.button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl border transition-all overflow-hidden ${
                    isSelected
                      ? `border-transparent ring-2 ${method.ring} ${method.bg}`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-br ${method.from} ${method.to} text-white shrink-0`}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${isSelected ? method.text : "text-gray-800"}`}>
                      {method.label}
                    </p>
                    <p className="text-xs text-gray-500">{method.sub}</p>
                  </div>

                  <div
                    className={`rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? `border-transparent bg-linear-to-br ${method.from} ${method.to}` : "border-gray-300"
                    }`}
                    style={{ width: 18, height: 18 }}
                  >
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="grow w-full outline-none p-3 text-gray-600 border border-gray-200 rounded-xl focus:border-fuchsia-400 transition"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="bg-linear-to-r from-blue-600 to-sky-500 text-white px-9 py-2.5 rounded-full font-medium shadow-md shadow-sky-500/30"
            >
              Apply
            </motion.button>
          </div>
        </div>

        <hr className="border-gray-200 my-5" />

        <div className="space-y-3">
          <div className="flex justify-between text-base font-medium">
            <p className="text-gray-600">Items ({getCartCount()})</p>
            <p className="text-gray-800">{currency}{getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-emerald-500">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">{currency}{Math.floor(getCartAmount() * 0.02)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-bold border-t border-dashed border-gray-200 pt-4">
            <p>Total</p>
            <motion.p
              key={total}
              initial={{ scale: 1.15, color: "#A21CAF" }}
              animate={{ scale: 1, color: "#111827" }}
              transition={{ duration: 0.3 }}
            >
              {currency}{total}
            </motion.p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(168,85,247,0.4)" }}
        whileTap={{ scale: 0.97 }}
        onClick={createOrder}
        className="w-full bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-semibold py-3.5 mt-6 rounded-full cursor-pointer"
      >
        Place Order
      </motion.button>
    </motion.div>
  );
};

export default OrderSummary;
