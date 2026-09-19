"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Search,
  Users,
  Trash2,
  Mail,
  Copy,
  Check,
  ShieldCheck,
  UserRound,
  RefreshCw,
  UserX,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
    },
  },

  exit: {
    opacity: 0,
    scale: 0.96,
    x: 30,
    transition: {
      duration: 0.2,
    },
  },
};

const UsersPage = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // =========================================================
  // FETCH USERS
  // =========================================================

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const { data } = await axios.get(
        "/api/user/list"
      );

      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(
          data.message || "Failed to load users"
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load users"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  // =========================================================
  // SEARCH
  // =========================================================

  const filteredUsers = useMemo(() => {

    const value = search.toLowerCase().trim();

    if (!value) {
      return users;
    }

    return users.filter((user) => {

      return (
        user.name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value) ||
        user.clerkId?.toLowerCase().includes(value)
      );

    });

  }, [users, search]);


  // =========================================================
  // DELETE USER
  // =========================================================

  const deleteUser = async () => {

    if (!selectedUser) return;

    try {

      setDeletingId(selectedUser._id);

      const { data } = await axios.delete(
        `/api/user/delete/${selectedUser._id}`
      );

      if (!data.success) {
        throw new Error(
          data.message || "Delete failed"
        );
      }

      setUsers((prev) =>
        prev.filter(
          (user) =>
            user._id !== selectedUser._id
        )
      );

      toast.success("User deleted successfully");

      setSelectedUser(null);

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to delete user"
      );

    } finally {

      setDeletingId(null);

    }
  };


  // =========================================================
  // COPY CLERK ID
  // =========================================================

  const copyId = async (id) => {

    try {

      await navigator.clipboard.writeText(id);

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);

    } catch (error) {
      toast.error("Unable to copy ID");
    }
  };


  return (
    <main
      className="
                min-h-screen
                w-full
                bg-gradient-to-br
                from-slate-50
                via-white
                to-violet-50/60
                px-4
                sm:px-6
                lg:px-10
                xl:px-14
                py-6
                lg:py-10
            "
    >

      {/* =================================================
                BACKGROUND DECORATION
            ================================================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
                        absolute
                        -top-32
                        -right-32
                        w-96
                        h-96
                        rounded-full
                        bg-violet-300/20
                        blur-3xl
                    "
        />

        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
                        absolute
                        bottom-0
                        -left-32
                        w-96
                        h-96
                        rounded-full
                        bg-cyan-300/20
                        blur-3xl
                    "
        />

      </div>


      {/* =================================================
                CONTENT
            ================================================= */}

      <div className="relative max-w-7xl mx-auto">


        {/* =================================================
                    HEADER
                ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-6
                        mb-8
                    "
        >

          {/* TITLE */}

          <div className="flex items-center gap-4">

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-gradient-to-br
                                from-violet-600
                                to-blue-500
                                flex
                                items-center
                                justify-center
                                shadow-lg
                                shadow-violet-500/25
                            "
            >
              <Users
                size={24}
                className="text-white"
              />
            </motion.div>


            <div>

              <div className="flex items-center gap-2">

                <h1
                  className="
                                        text-2xl
                                        sm:text-3xl
                                        font-bold
                                        text-slate-800
                                    "
                >
                  Users
                </h1>

                <Sparkles
                  size={18}
                  className="text-violet-500"
                />

              </div>

              <p className="text-sm text-slate-500 mt-1">
                Manage registered users and accounts
              </p>

            </div>

          </div>


          {/* REFRESH */}

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={fetchUsers}
            className="
                            self-start
                            md:self-auto
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-xl
                            bg-white
                            border
                            border-slate-200
                            text-slate-600
                            shadow-sm
                            hover:shadow-md
                            transition
                            cursor-pointer
                        "
          >

            <motion.div
              animate={
                loading
                  ? {
                    rotate: 360,
                  }
                  : {}
              }
              transition={{
                duration: 1,
                repeat: loading
                  ? Infinity
                  : 0,
                ease: "linear",
              }}
            >
              <RefreshCw size={16} />
            </motion.div>

            Refresh

          </motion.button>

        </motion.div>


        {/* =================================================
                    STAT CARDS
                ================================================= */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="
                        grid
                        grid-cols-1
                        sm:grid-cols-3
                        gap-4
                        mb-7
                    "
        >

          {/* TOTAL USERS */}

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -4,
            }}
            className="
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            p-5
                            shadow-sm
                            hover:shadow-lg
                            transition-shadow
                        "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Total Users
                </p>

                <motion.p
                  key={users.length}
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  className="
                                        text-3xl
                                        font-bold
                                        text-slate-800
                                        mt-2
                                    "
                >
                  {users.length}
                </motion.p>

              </div>

              <div
                className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-blue-50
                                    text-blue-600
                                    flex
                                    items-center
                                    justify-center
                                "
              >
                <Users size={21} />
              </div>

            </div>

          </motion.div>


          {/* ACTIVE */}

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -4,
            }}
            className="
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            p-5
                            shadow-sm
                            hover:shadow-lg
                            transition-shadow
                        "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Accounts
                </p>

                <p className="
                                    text-3xl
                                    font-bold
                                    text-emerald-600
                                    mt-2
                                ">
                  {users.length}
                </p>

              </div>

              <div
                className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-emerald-50
                                    text-emerald-600
                                    flex
                                    items-center
                                    justify-center
                                "
              >
                <ShieldCheck size={21} />
              </div>

            </div>

          </motion.div>


          {/* SEARCH RESULT */}

          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -4,
            }}
            className="
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            p-5
                            shadow-sm
                            hover:shadow-lg
                            transition-shadow
                        "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Showing
                </p>

                <p className="
                                    text-3xl
                                    font-bold
                                    text-violet-600
                                    mt-2
                                ">
                  {filteredUsers.length}
                </p>

              </div>

              <div
                className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-violet-50
                                    text-violet-600
                                    flex
                                    items-center
                                    justify-center
                                "
              >
                <Search size={21} />
              </div>

            </div>

          </motion.div>

        </motion.div>


        {/* =================================================
                    SEARCH BAR
                ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="mb-5"
        >

          <div
            className="
                            relative
                            max-w-xl
                        "
          >

            <Search
              size={19}
              className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-slate-400
                            "
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by name, Gmail or user ID..."
              className="
                                w-full
                                h-12
                                pl-11
                                pr-4
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                outline-none
                                text-sm
                                text-slate-700
                                placeholder:text-slate-400
                                shadow-sm
                                focus:border-violet-400
                                focus:ring-4
                                focus:ring-violet-100
                                transition
                            "
            />

          </div>

        </motion.div>


        {/* =================================================
                    USERS TABLE
                ================================================= */}

        <div
          className="
                        bg-white/90
                        backdrop-blur-xl
                        rounded-3xl
                        border
                        border-slate-200
                        shadow-xl
                        shadow-slate-200/40
                        overflow-hidden
                    "
        >

          {/* TABLE HEADER */}

          <div
            className="
                            hidden
                            md:grid
                            grid-cols-[minmax(280px,1.5fr)_minmax(200px,1fr)_minmax(240px,1.2fr)_130px]
                            items-center
                            gap-4
                            px-6
                            py-4
                            bg-gradient-to-r
                            from-slate-50
                            via-blue-50/50
                            to-violet-50/50
                            border-b
                            border-slate-200
                        "
          >

            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              User
            </p>

            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Email
            </p>

            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              User ID
            </p>

            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Action
            </p>

          </div>


          {/* =================================================
                        LOADING
                    ================================================= */}

          {loading ? (

            <div className="p-6 space-y-4">

              {[1, 2, 3, 4].map((item) => (

                <motion.div
                  key={item}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                  className="
                                        h-20
                                        rounded-2xl
                                        bg-slate-100
                                    "
                />

              ))}

            </div>

          ) : filteredUsers.length === 0 ? (

            /* =================================================
               NO USERS
            ================================================= */

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                                py-20
                                flex
                                flex-col
                                items-center
                                text-center
                            "
            >

              <div
                className="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    bg-slate-100
                                    flex
                                    items-center
                                    justify-center
                                    text-slate-400
                                    mb-4
                                "
              >
                <UserX size={28} />
              </div>

              <h3 className="
                                text-lg
                                font-bold
                                text-slate-700
                            ">
                No users found
              </h3>

              <p className="
                                text-sm
                                text-slate-400
                                mt-1
                            ">
                Try another search term.
              </p>

            </motion.div>

          ) : (

            /* =================================================
               USER LIST
            ================================================= */

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >

              <AnimatePresence mode="popLayout">

                {filteredUsers.map((user, index) => (

                  <motion.div
                    key={user.id || user.email || `user-${index}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{
                      backgroundColor:
                        "rgba(248,250,252,0.8)",
                    }}
                    className="
                                            border-b
                                            border-slate-100
                                            last:border-b-0
                                        "
                  >

                    {/* DESKTOP */}

                    <div
                      className="
                                                hidden
                                                md:grid
                                                grid-cols-[minmax(280px,1.5fr)_minmax(200px,1fr)_minmax(240px,1.2fr)_130px]
                                                items-center
                                                gap-4
                                                px-6
                                                py-4
                                            "
                    >

                      {/* USER */}

                      <div className="flex items-center gap-3 min-w-0">

                        <motion.div
                          whileHover={{
                            scale: 1.08,
                          }}
                          className="
                                                        w-12
                                                        h-12
                                                        rounded-2xl
                                                        overflow-hidden
                                                        shrink-0
                                                        bg-gradient-to-br
                                                        from-violet-100
                                                        to-blue-100
                                                        border
                                                        border-white
                                                        shadow-sm
                                                    "
                        >

                          {user.imageUrl ? (

                            <Image
                              src={user.imageUrl}
                              alt={user.name || "User"}
                              width={48}
                              height={48}
                              className="
                                                                w-full
                                                                h-full
                                                                object-cover
                                                            "
                            />

                          ) : (

                            <div
                              className="
                                                                w-full
                                                                h-full
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-violet-600
                                                            "
                            >
                              <UserRound
                                size={21}
                              />
                            </div>

                          )}

                        </motion.div>


                        <div className="min-w-0">

                          <p
                            className="
                                                            font-bold
                                                            text-slate-700
                                                            truncate
                                                        "
                          >
                            {user.name ||
                              "Unnamed User"}
                          </p>

                          <div className="flex items-center gap-1.5 mt-1">

                            <span
                              className="
                                                                w-1.5
                                                                h-1.5
                                                                rounded-full
                                                                bg-emerald-500
                                                            "
                            />

                            <span className="
                                                            text-xs
                                                            text-slate-400
                                                        ">
                              Registered user
                            </span>

                          </div>

                        </div>

                      </div>


                      {/* EMAIL */}

                      <div className="min-w-0">

                        <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-sm
                                                    text-slate-600
                                                ">

                          <Mail
                            size={15}
                            className="
                                                            text-violet-500
                                                            shrink-0
                                                        "
                          />

                          <span className="
                                                        truncate
                                                    ">
                            {user.email ||
                              "No email"}
                          </span>

                        </div>

                      </div>


                      {/* CLERK ID */}

                      <div className="min-w-0">

                        <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                ">

                          <code
                            className="
                                                            text-xs
                                                            text-slate-500
                                                            bg-slate-100
                                                            px-2.5
                                                            py-1.5
                                                            rounded-lg
                                                            truncate
                                                            max-w-[200px]
                                                        "
                          >
                            {user.clerkId}
                          </code>

                          <motion.button
                            whileTap={{
                              scale: 0.8,
                            }}
                            onClick={() =>
                              copyId(
                                user.clerkId
                              )
                            }
                            className="
                                                            shrink-0
                                                            w-8
                                                            h-8
                                                            rounded-lg
                                                            flex
                                                            items-center
                                                            justify-center
                                                            bg-slate-100
                                                            hover:bg-violet-100
                                                            text-slate-500
                                                            hover:text-violet-600
                                                            transition
                                                            cursor-pointer
                                                        "
                          >

                            {copiedId ===
                              user.clerkId ? (

                              <Check
                                size={15}
                              />

                            ) : (

                              <Copy
                                size={15}
                              />

                            )}

                          </motion.button>

                        </div>

                      </div>


                      {/* DELETE */}

                      <div>

                        <motion.button
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.93,
                          }}
                          disabled={
                            deletingId ===
                            user.clerkId
                          }
                          onClick={() =>
                            setSelectedUser(
                              user
                            )
                          }
                          className="
                                                        w-full
                                                        flex
                                                        items-center
                                                        justify-center
                                                        gap-1.5
                                                        px-3
                                                        py-2.5
                                                        rounded-xl
                                                        bg-gradient-to-r
                                                        from-rose-500
                                                        to-red-600
                                                        text-white
                                                        text-sm
                                                        font-semibold
                                                        shadow-md
                                                        shadow-red-500/20
                                                        hover:shadow-lg
                                                        transition
                                                        cursor-pointer
                                                        disabled:opacity-50
                                                        disabled:cursor-not-allowed
                                                    "
                        >

                          <Trash2 size={15} />

                          Delete

                        </motion.button>

                      </div>

                    </div>


                    {/* =================================================
                                            MOBILE CARD
                                        ================================================= */}

                    <div
                      className="
                                                md:hidden
                                                p-4
                                            "
                    >

                      <div className="flex items-start gap-3">

                        <div
                          className="
                                                        w-12
                                                        h-12
                                                        rounded-xl
                                                        overflow-hidden
                                                        shrink-0
                                                        bg-violet-50
                                                        flex
                                                        items-center
                                                        justify-center
                                                        text-violet-600
                                                    "
                        >

                          {user.imageUrl ? (

                            <Image
                              src={user.imageUrl}
                              alt={
                                user.name ||
                                "User"
                              }
                              width={48}
                              height={48}
                              className="
                                                                w-full
                                                                h-full
                                                                object-cover
                                                            "
                            />

                          ) : (

                            <UserRound
                              size={20}
                            />

                          )}

                        </div>


                        <div className="min-w-0 flex-1">

                          <div className="
                                                        flex
                                                        items-start
                                                        justify-between
                                                        gap-2
                                                    ">

                            <div className="min-w-0">

                              <h3 className="
                                                                font-bold
                                                                text-slate-700
                                                                truncate
                                                            ">
                                {user.name ||
                                  "Unnamed User"}
                              </h3>

                              <p className="
                                                                text-xs
                                                                text-slate-500
                                                                truncate
                                                                mt-1
                                                            ">
                                {user.email ||
                                  "No email"}
                              </p>

                            </div>


                            <motion.button
                              whileTap={{
                                scale: 0.85,
                              }}
                              onClick={() =>
                                setSelectedUser(
                                  user
                                )
                              }
                              className="
                                                                shrink-0
                                                                w-9
                                                                h-9
                                                                rounded-xl
                                                                bg-red-50
                                                                text-red-500
                                                                flex
                                                                items-center
                                                                justify-center
                                                                cursor-pointer
                                                            "
                            >
                              <Trash2
                                size={16}
                              />
                            </motion.button>

                          </div>


                          <div className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        mt-3
                                                    ">

                            <code className="
                                                            text-[10px]
                                                            text-slate-500
                                                            bg-slate-100
                                                            rounded-lg
                                                            px-2
                                                            py-1.5
                                                            truncate
                                                            flex-1
                                                        ">
                              {user.clerkId}
                            </code>

                            <button
                              onClick={() =>
                                copyId(
                                  user.clerkId
                                )
                              }
                              className="
                                                                w-8
                                                                h-8
                                                                rounded-lg
                                                                bg-slate-100
                                                                flex
                                                                items-center
                                                                justify-center
                                                                text-slate-500
                                                                shrink-0
                                                            "
                            >

                              {copiedId ===
                                user.clerkId ? (
                                <Check
                                  size={14}
                                />
                              ) : (
                                <Copy
                                  size={14}
                                />
                              )}

                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  </motion.div>

                ))}

              </AnimatePresence>

            </motion.div>

          )}

        </div>

      </div>


      {/* =====================================================
                DELETE CONFIRMATION MODAL
            ====================================================== */}

      <AnimatePresence>

        {selectedUser && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
                            fixed
                            inset-0
                            z-50
                            flex
                            items-center
                            justify-center
                            p-4
                            bg-slate-900/50
                            backdrop-blur-sm
                        "
            onClick={() =>
              !deletingId &&
              setSelectedUser(null)
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 15,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
              }}
              onClick={(e) =>
                e.stopPropagation()
              }
              className="
                                w-full
                                max-w-md
                                bg-white
                                rounded-3xl
                                shadow-2xl
                                overflow-hidden
                            "
            >

              {/* TOP */}

              <div
                className="
                                    p-6
                                    bg-gradient-to-br
                                    from-red-50
                                    via-white
                                    to-orange-50
                                "
              >

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-red-100
                                        text-red-600
                                        flex
                                        items-center
                                        justify-center
                                        mb-4
                                    "
                >
                  <AlertTriangle
                    size={27}
                  />
                </motion.div>


                <h2 className="
                                    text-xl
                                    font-bold
                                    text-slate-800
                                ">
                  Delete User?
                </h2>

                <p className="
                                    text-sm
                                    text-slate-500
                                    mt-2
                                    leading-relaxed
                                ">
                  This will permanently remove{" "}
                  <strong className="text-slate-700">
                    {selectedUser.name ||
                      selectedUser.email}
                  </strong>{" "}
                  from your application.
                </p>

              </div>


              {/* USER */}

              <div className="
                                px-6
                                py-4
                                border-y
                                border-slate-100
                            ">

                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                  <div className="
                                        w-10
                                        h-10
                                        rounded-xl
                                        bg-violet-100
                                        flex
                                        items-center
                                        justify-center
                                        text-violet-600
                                        overflow-hidden
                                    ">

                    {selectedUser.imageUrl ? (

                      <Image
                        src={
                          selectedUser.imageUrl
                        }
                        alt=""
                        width={40}
                        height={40}
                        className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                "
                      />

                    ) : (

                      <UserRound
                        size={18}
                      />

                    )}

                  </div>

                  <div className="min-w-0">

                    <p className="
                                            font-semibold
                                            text-slate-700
                                            truncate
                                        ">
                      {selectedUser.name ||
                        "Unnamed User"}
                    </p>

                    <p className="
                                            text-xs
                                            text-slate-400
                                            truncate
                                        ">
                      {selectedUser.email}
                    </p>

                  </div>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="
                                p-6
                                flex
                                flex-col-reverse
                                sm:flex-row
                                gap-3
                            ">

                <button
                  disabled={!!deletingId}
                  onClick={() =>
                    setSelectedUser(null)
                  }
                  className="
                                        flex-1
                                        py-3
                                        rounded-xl
                                        bg-slate-100
                                        text-slate-600
                                        font-semibold
                                        hover:bg-slate-200
                                        transition
                                        cursor-pointer
                                        disabled:opacity-50
                                    "
                >
                  Cancel
                </button>


                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  disabled={!!deletingId}
                  onClick={deleteUser}
                  className="
                                        flex-1
                                        py-3
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-red-500
                                        to-rose-600
                                        text-white
                                        font-semibold
                                        shadow-lg
                                        shadow-red-500/20
                                        cursor-pointer
                                        disabled:opacity-60
                                    "
                >

                  {deletingId ? (

                    <span className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                        ">

                      <RefreshCw
                        size={16}
                        className="
                                                    animate-spin
                                                "
                      />

                      Deleting...

                    </span>

                  ) : (

                    <span className="
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                        ">

                      <Trash2 size={16} />

                      Delete User

                    </span>

                  )}

                </motion.button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </main>
  );
};

export default UsersPage;