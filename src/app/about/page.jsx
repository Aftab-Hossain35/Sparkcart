"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Headphones,
  Heart,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const features = [
  {
    icon: ShoppingBag,
    title: "Curated Products",
    description:
      "We bring together carefully selected products designed to make your everyday life better.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Your shopping experience is built around security, reliability and customer confidence.",
  },
  {
    icon: Zap,
    title: "Fast Experience",
    description:
      "From discovering products to placing an order, Sparkcart is designed to keep everything simple and smooth.",
  },
  {
    icon: Headphones,
    title: "Customer First",
    description:
      "We believe great ecommerce is not just about products. It is about creating a great customer experience.",
  },
];

const stats = [
  {
    number: "100+",
    label: "Products",
  },
  {
    number: "24/7",
    label: "Shopping",
  },
  {
    number: "100%",
    label: "Customer Focus",
  },
  {
    number: "∞",
    label: "Possibilities",
  },
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Every decision starts with one question: how can we make shopping better for our customers?",
  },
  {
    icon: Sparkles,
    title: "Quality Matters",
    description:
      "We focus on creating a marketplace where quality, usefulness and value come together.",
  },
  {
    icon: Rocket,
    title: "Always Improving",
    description:
      "Technology and customer expectations constantly evolve. So do we.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    description:
      "Sparkcart is designed to make online shopping simple, accessible and enjoyable.",
  },
];

const team = [
  {
    name: "Our Team",
    role: "Building the Sparkcart Experience",
    icon: Users,
  },
  {
    name: "Developers",
    role: "Technology & Innovation",
    icon: Rocket,
  },
  {
    name: "Support",
    role: "Customer Experience",
    icon: Headphones,
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 top-96 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl"
        />
      </div>

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* Left */}

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-600"
              >
                <Sparkles size={16} />
                Discover Sparkcart
              </motion.div>

              <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Shopping made
                <span className="block bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  simple & exciting.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Welcome to Sparkcart — a modern shopping experience built
                around quality products, simple discovery and a customer-first
                mindset.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/shop"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.03]"
                >
                  Explore Products
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-600"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            {/* Right Visual */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto aspect-square max-w-[500px]">
                {/* Glow */}

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-10 rounded-[40%] bg-gradient-to-br from-sky-400/30 via-blue-500/20 to-purple-500/30 blur-3xl"
                />

                {/* Main Card */}

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-8 rounded-[40px] border border-white/80 bg-gradient-to-br from-sky-50 via-white to-purple-50 p-6 shadow-2xl shadow-sky-500/10"
                >
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg">
                        <ShoppingBag size={24} />
                      </div>

                      <div className="flex gap-1 text-yellow-400">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <Star
                            key={item}
                            size={15}
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                        }}
                        className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-[30px] bg-gradient-to-br from-sky-500 to-purple-600 text-white shadow-xl sm:h-36 sm:w-36"
                      >
                        <Sparkles size={58} />
                      </motion.div>

                      <h3 className="text-2xl font-black">Sparkcart</h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Your everyday shopping destination
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {["Quality", "Simple", "Secure"].map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl bg-white/80 p-3 text-center shadow-sm"
                        >
                          <CheckCircle2
                            size={17}
                            className="mx-auto text-sky-500"
                          />
                          <p className="mt-1 text-xs font-bold text-slate-600">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Cards */}

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-2 top-20 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-right-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-green-50 p-2 text-green-500">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Shopping</p>
                      <p className="font-bold">Secure & Easy</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-3 left-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-left-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-50 p-2 text-purple-500">
                      <Heart size={20} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Experience</p>
                      <p className="font-bold">Made With Care</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="relative border-y border-slate-100 bg-slate-50/70 px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.h3
                whileHover={{ scale: 1.1 }}
                className="text-3xl font-black bg-gradient-to-r from-sky-500 to-purple-600 bg-clip-text text-transparent sm:text-4xl"
              >
                {stat.number}
              </motion.h3>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =====================================================
          OUR STORY
      ====================================================== */}

      <section className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="relative"
            >
              <div className="rounded-[35px] bg-gradient-to-br from-sky-500 via-blue-600 to-purple-600 p-[1px]">
                <div className="rounded-[34px] bg-white p-7 sm:p-10">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
                      <Target size={28} />
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider text-sky-500">
                        Our Story
                      </p>
                      <h2 className="text-2xl font-black sm:text-3xl">
                        Why Sparkcart?
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
                    <p>
                      Shopping online should feel exciting, effortless and
                      trustworthy. Sparkcart was created with that idea at its
                      heart.
                    </p>

                    <p>
                      We are building a modern ecommerce platform where
                      customers can discover products without unnecessary
                      complexity.
                    </p>

                    <p>
                      From product discovery to checkout, our goal is to make
                      every interaction feel simple, fast and enjoyable.
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-3 rounded-2xl bg-sky-50 p-4">
                    <Award className="shrink-0 text-sky-500" size={23} />

                    <p className="text-sm font-semibold text-slate-700">
                      Creating a better way to shop, one experience at a time.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
                Mission & Vision
              </span>

              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                More than a store.
                <span className="block text-slate-400">
                  A better shopping experience.
                </span>
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                Our mission is to create a digital shopping experience that
                combines modern technology, thoughtful design and customer
                needs.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  "Make product discovery simple",
                  "Create a secure and reliable shopping experience",
                  "Keep improving with technology",
                  "Put customers at the center of everything",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                      <CheckCircle2 size={17} />
                    </div>

                    <span className="font-semibold text-slate-700">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}

      <section className="relative bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500">
              Why Sparkcart
            </span>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
              Designed around
              <span className="text-sky-500"> you.</span>
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Everything we build is focused on making online shopping easier,
              safer and more enjoyable.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -10,
                  }}
                  className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-2xl hover:shadow-sky-500/10"
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-blue-100 text-sky-500"
                  >
                    <Icon size={27} />
                  </motion.div>

                  <h3 className="mt-6 text-xl font-black">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>

                  <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}

      <section className="relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-purple-500">
                What We Believe
              </span>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Our values shape
                <span className="block text-slate-400">
                  everything we build.
                </span>
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                Sparkcart is not just about selling products. We want to build
                an ecommerce experience that people enjoy coming back to.
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2">
              {values.map((value, index) => {
                const Icon = value.icon;

                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/40"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-sky-50 text-purple-500">
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-5 font-black">{value.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TEAM
      ====================================================== */}

      <section className="relative bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-sky-400">
              The People
            </span>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
              Built by people who
              <span className="text-sky-400"> care.</span>
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              A passionate team working behind the scenes to create a better
              ecommerce experience.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {team.map((member, index) => {
              const Icon = member.icon;

              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm"
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.4,
                    }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-purple-600 shadow-xl shadow-sky-500/20"
                  >
                    <Icon size={34} />
                  </motion.div>

                  <h3 className="mt-6 text-xl font-black">{member.name}</h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {member.role}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[35px] bg-gradient-to-r from-sky-500 via-blue-600 to-purple-600 px-6 py-14 text-center text-white shadow-2xl shadow-sky-500/20 sm:px-10 lg:px-20"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10"
          />

          <motion.div
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10"
          />

          <div className="relative">
            <Sparkles className="mx-auto mb-5" size={30} />

            <h2 className="text-3xl font-black sm:text-4xl lg:text-5xl">
              Ready to start shopping?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-sky-50">
              Explore our collection and discover products that fit your
              everyday needs.
            </p>

            <Link
              href="/all-products"
              className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-black text-blue-600 shadow-xl transition hover:scale-105"
            >
              Start Shopping
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
    </>
  );
}