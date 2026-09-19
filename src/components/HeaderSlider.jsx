"use client";

import React, {
    useState,
    useEffect,
    useCallback,
} from "react";

import { assets } from "@/assets/assets";

import Image from "next/image";

import {
    ArrowLeft,
    ArrowRight,
    ChevronsRight,
    Sparkles,
    ShoppingBag,
    Zap,
} from "lucide-react";

import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";


const sliderData = [
    {
        id: 1,
        title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
        offer: "Limited Time Offer 30% Off",
        buttonText1: "Buy Now",
        buttonText2: "Find More",
        imgSrc: assets.header_headphone_image,

        gradient:
            "from-violet-700 via-fuchsia-600 to-orange-400",

        glow:
            "bg-fuchsia-500",

        accent:
            "from-fuchsia-400 to-orange-300",

        badge:
            "bg-fuchsia-500/20 border-fuchsia-300/30",

        shadow:
            "shadow-fuchsia-500/30",
    },

    {
        id: 2,
        title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
        offer: "Hurry Up, Only a Few Left!",
        buttonText1: "Shop Now",
        buttonText2: "Explore Deals",
        imgSrc: assets.header_playstation_image,

        gradient:
            "from-indigo-950 via-blue-700 to-cyan-400",

        glow:
            "bg-cyan-400",

        accent:
            "from-cyan-400 to-blue-300",

        badge:
            "bg-cyan-400/20 border-cyan-300/30",

        shadow:
            "shadow-cyan-500/30",
    },

    {
        id: 3,
        title: "Power Meets Elegance - Apple MacBook Pro is Here for You!",
        offer: "Exclusive Deal 50% Off",
        buttonText1: "Order Now",
        buttonText2: "Learn More",
        imgSrc: assets.header_macbook_image,

        gradient:
            "from-slate-950 via-purple-900 to-pink-500",

        glow:
            "bg-purple-500",

        accent:
            "from-purple-400 to-pink-400",

        badge:
            "bg-purple-400/20 border-purple-300/30",

        shadow:
            "shadow-purple-500/30",
    },

    {
        id: 4,
        title: "Next Level iPhone 13 is Here for You!",
        offer: "Exclusive Deal 40% Off",
        buttonText1: "Order Now",
        buttonText2: "Learn More",
        imgSrc: assets.iphone_13_image,

        gradient:
            "from-rose-600 via-pink-500 to-amber-300",

        glow:
            "bg-rose-400",

        accent:
            "from-pink-300 to-yellow-200",

        badge:
            "bg-pink-400/20 border-pink-200/30",

        shadow:
            "shadow-pink-500/30",
    },

    {
        id: 5,
        title: "Power Meets Elegance - Apple MacBook Pro is Here for You!",
        offer: "Exclusive Deal 40% Off",
        buttonText1: "Order Now",
        buttonText2: "Learn More",
        imgSrc: assets.header_macbook_image,

        gradient:
            "from-emerald-950 via-teal-700 to-lime-400",

        glow:
            "bg-teal-400",

        accent:
            "from-teal-300 to-lime-200",

        badge:
            "bg-teal-400/20 border-teal-200/30",

        shadow:
            "shadow-teal-500/30",
    },
];


const textVariants = {
    enter: {
        opacity: 0,
        y: 35,
    },

    center: {
        opacity: 1,
        y: 0,

        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },

    exit: {
        opacity: 0,
        y: -25,

        transition: {
            duration: 0.25,
        },
    },
};


const childVariants = {
    enter: {
        opacity: 0,
        y: 20,
    },

    center: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },

    exit: {
        opacity: 0,
        y: -15,
    },
};


const HeaderSlider = () => {

    const [[current, direction], setSlide] =
        useState([0, 0]);

    const [isPaused, setIsPaused] =
        useState(false);


    // ------------------------------------------
    // MOUSE PARALLAX
    // ------------------------------------------

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, {
        stiffness: 100,
        damping: 20,
    });

    const springY = useSpring(mouseY, {
        stiffness: 100,
        damping: 20,
    });

    const imageX = useTransform(
        springX,
        [-500, 500],
        [-15, 15]
    );

    const imageY = useTransform(
        springY,
        [-500, 500],
        [-10, 10]
    );


    const handleMouseMove = (event) => {

        const rect =
            event.currentTarget.getBoundingClientRect();

        mouseX.set(
            event.clientX -
                rect.left -
                rect.width / 2
        );

        mouseY.set(
            event.clientY -
                rect.top -
                rect.height / 2
        );
    };


    const resetMouse = () => {
        mouseX.set(0);
        mouseY.set(0);
    };


    // ------------------------------------------
    // SLIDE
    // ------------------------------------------

    const paginate = useCallback(
        (newDirection) => {

            setSlide(([prev]) => {

                const next =
                    (prev +
                        newDirection +
                        sliderData.length) %
                    sliderData.length;

                return [
                    next,
                    newDirection,
                ];
            });
        },
        []
    );


    // ------------------------------------------
    // AUTOPLAY
    // ------------------------------------------

    useEffect(() => {

        if (isPaused) return;

        const interval = setInterval(
            () => paginate(1),
            5000
        );

        return () =>
            clearInterval(interval);

    }, [paginate, isPaused]);


    const slide =
        sliderData[current];


    return (

        <section
            className="relative mt-6 w-full"
            onMouseEnter={() =>
                setIsPaused(true)
            }
            onMouseLeave={() =>
                setIsPaused(false)
            }
        >

            {/* ==================================================
                HERO CONTAINER
            ================================================== */}

            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={resetMouse}
                className="
                    relative
                    mx-auto
                    min-h-[520px]
                    w-full
                    overflow-hidden
                    rounded-[32px]
                    shadow-2xl
                "
            >

                {/* ==================================================
                    SLIDE
                ================================================== */}

                <AnimatePresence
                    initial={false}
                    custom={direction}
                    mode="wait"
                >

                    <motion.div
                        key={slide.id}
                        custom={direction}

                        initial={{
                            opacity: 0,
                            x:
                                direction >= 0
                                    ? 100
                                    : -100,
                            scale: 1.03,
                        }}

                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}

                        exit={{
                            opacity: 0,
                            x:
                                direction >= 0
                                    ? -100
                                    : 100,
                            scale: 0.98,
                        }}

                        transition={{
                            duration: 0.7,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}

                        className={`
                            absolute
                            inset-0
                            bg-gradient-to-br
                            ${slide.gradient}
                        `}
                    >

                        {/* ==================================================
                            BACKGROUND GLOW
                        ================================================== */}

                        <motion.div
                            className={`
                                absolute
                                -left-24
                                -top-24
                                h-96
                                w-96
                                rounded-full
                                ${slide.glow}
                                opacity-30
                                blur-[100px]
                            `}
                            animate={{
                                x: [
                                    0,
                                    50,
                                    0,
                                ],

                                y: [
                                    0,
                                    40,
                                    0,
                                ],

                                scale: [
                                    1,
                                    1.2,
                                    1,
                                ],
                            }}
                            transition={{
                                duration: 9,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />


                        <motion.div
                            className="
                                absolute
                                -bottom-32
                                right-0
                                h-96
                                w-96
                                rounded-full
                                bg-white
                                opacity-10
                                blur-[110px]
                            "
                            animate={{
                                x: [
                                    0,
                                    -40,
                                    0,
                                ],

                                y: [
                                    0,
                                    -30,
                                    0,
                                ],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />


                        {/* ==================================================
                            DECORATIVE RINGS
                        ================================================== */}

                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="
                                absolute
                                -right-32
                                -top-32
                                h-[420px]
                                w-[420px]
                                rounded-full
                                border
                                border-white/10
                            "
                        />

                        <motion.div
                            animate={{
                                rotate: -360,
                            }}
                            transition={{
                                duration: 24,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="
                                absolute
                                -right-20
                                -top-20
                                h-[300px]
                                w-[300px]
                                rounded-full
                                border
                                border-white/10
                            "
                        />


                        {/* ==================================================
                            SMALL FLOATING PARTICLES
                        ================================================== */}

                        {[...Array(12)].map(
                            (_, index) => (

                                <motion.span
                                    key={index}
                                    className="
                                        absolute
                                        h-1
                                        w-1
                                        rounded-full
                                        bg-white/60
                                    "

                                    style={{
                                        left: `${
                                            10 +
                                            (index *
                                                17) %
                                                85
                                        }%`,

                                        top: `${
                                            10 +
                                            (index *
                                                23) %
                                                75
                                        }%`,
                                    }}

                                    animate={{
                                        y: [
                                            0,
                                            -20,
                                            0,
                                        ],

                                        opacity: [
                                            0.2,
                                            0.9,
                                            0.2,
                                        ],

                                        scale: [
                                            1,
                                            1.8,
                                            1,
                                        ],
                                    }}

                                    transition={{
                                        duration:
                                            2.5 +
                                            index *
                                                0.3,

                                        repeat:
                                            Infinity,

                                        delay:
                                            index *
                                            0.15,
                                    }}
                                />

                            )
                        )}


                        {/* ==================================================
                            MAIN CONTENT
                        ================================================== */}

                        <div
                            className="
                                relative
                                z-10
                                flex
                                min-h-[520px]
                                flex-col
                                items-center
                                justify-between
                                gap-8
                                px-6
                                py-12

                                md:flex-row
                                md:px-14
                                md:py-10

                                lg:px-20
                            "
                        >

                            {/* ==================================================
                                TEXT
                            ================================================== */}

                            <motion.div
                                variants={
                                    textVariants
                                }
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="
                                    flex
                                    w-full
                                    max-w-2xl
                                    flex-col
                                    justify-center
                                    text-white

                                    md:w-1/2
                                "
                            >

                                {/* OFFER BADGE */}

                                <motion.div
                                    variants={
                                        childVariants
                                    }
                                    className={`
                                        mb-5
                                        flex
                                        w-fit
                                        items-center
                                        gap-2
                                        rounded-full
                                        border
                                        ${slide.badge}
                                        px-4
                                        py-2
                                        backdrop-blur-md
                                    `}
                                >

                                    <motion.span
                                        animate={{
                                            rotate: [
                                                0,
                                                10,
                                                -10,
                                                0,
                                            ],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat:
                                                Infinity,
                                        }}
                                    >
                                        <Zap
                                            size={15}
                                            className="text-yellow-200"
                                        />
                                    </motion.span>

                                    <span className="
                                        text-xs
                                        font-bold
                                        tracking-wide
                                        sm:text-sm
                                    ">
                                        {slide.offer}
                                    </span>

                                </motion.div>


                                {/* HEADING */}

                                <motion.h1
                                    variants={
                                        childVariants
                                    }
                                    className="
                                        max-w-xl
                                        text-4xl
                                        font-black
                                        leading-[1.08]
                                        tracking-tight

                                        sm:text-5xl

                                        lg:text-[54px]
                                        lg:leading-[1.05]
                                    "
                                >
                                    {slide.title}
                                </motion.h1>


                                {/* DESCRIPTION */}

                                <motion.p
                                    variants={
                                        childVariants
                                    }
                                    className="
                                        mt-5
                                        max-w-lg
                                        text-sm
                                        leading-6
                                        text-white/75

                                        sm:text-base
                                    "
                                >
                                    Discover premium
                                    products, exclusive
                                    deals and everything
                                    you need — all in one
                                    place at Sparkcart.
                                </motion.p>


                                {/* BUTTONS */}

                                <motion.div
                                    variants={
                                        childVariants
                                    }
                                    className="
                                        mt-7
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-3
                                    "
                                >

                                    {/* PRIMARY */}

                                    <motion.button
                                        whileHover={{
                                            scale: 1.06,
                                            y: -3,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        className="
                                            group
                                            relative
                                            flex
                                            items-center
                                            gap-2
                                            overflow-hidden
                                            rounded-full
                                            bg-white
                                            px-7
                                            py-3.5
                                            font-bold
                                            text-slate-900
                                            shadow-xl
                                            shadow-black/20

                                            sm:px-9
                                        "
                                    >

                                        {/* shimmer */}

                                        <motion.span
                                            animate={{
                                                x: [
                                                    "-150%",
                                                    "150%",
                                                ],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat:
                                                    Infinity,
                                                repeatDelay:
                                                    2,
                                            }}
                                            className="
                                                absolute
                                                inset-y-0
                                                w-10
                                                rotate-12
                                                bg-gradient-to-r
                                                from-transparent
                                                via-slate-200
                                                to-transparent
                                            "
                                        />

                                        <ShoppingBag
                                            size={17}
                                            className="relative"
                                        />

                                        <span className="relative">
                                            {
                                                slide.buttonText1
                                            }
                                        </span>

                                        <ArrowRight
                                            size={16}
                                            className="
                                                relative
                                                transition
                                                group-hover:translate-x-1
                                            "
                                        />

                                    </motion.button>


                                    {/* SECONDARY */}

                                    <motion.button
                                        whileHover={{
                                            x: 5,
                                        }}
                                        whileTap={{
                                            scale: 0.95,
                                        }}
                                        className="
                                            group
                                            flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            border-white/20
                                            bg-white/10
                                            px-6
                                            py-3.5
                                            font-semibold
                                            text-white
                                            backdrop-blur-md
                                            transition
                                            hover:bg-white/20
                                        "
                                    >

                                        {
                                            slide.buttonText2
                                        }

                                        <ChevronsRight
                                            size={18}
                                            className="
                                                transition
                                                group-hover:translate-x-1
                                            "
                                        />

                                    </motion.button>

                                </motion.div>


                                {/* TRUST */}

                                <motion.div
                                    variants={
                                        childVariants
                                    }
                                    className="
                                        mt-7
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    <div className="flex -space-x-2">

                                        {[1, 2, 3, 4].map(
                                            (item) => (

                                                <motion.div
                                                    key={
                                                        item
                                                    }
                                                    whileHover={{
                                                        y: -4,
                                                        zIndex: 10,
                                                    }}
                                                    className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        border-2
                                                        border-white/40
                                                        bg-white/20
                                                        text-[10px]
                                                        font-bold
                                                        backdrop-blur
                                                    "
                                                >
                                                    {item}
                                                </motion.div>

                                            )
                                        )}

                                    </div>

                                    <div>

                                        <div className="flex items-center gap-1">

                                            {[1, 2, 3, 4, 5].map(
                                                (star) => (

                                                    <motion.span
                                                        key={
                                                            star
                                                        }
                                                        animate={{
                                                            scale: [
                                                                1,
                                                                1.15,
                                                                1,
                                                            ],
                                                        }}
                                                        transition={{
                                                            duration:
                                                                1.5,
                                                            delay:
                                                                star *
                                                                0.05,
                                                            repeat:
                                                                Infinity,
                                                        }}
                                                        className="
                                                            text-xs
                                                            text-yellow-300
                                                        "
                                                    >
                                                        ★
                                                    </motion.span>

                                                )
                                            )}

                                        </div>

                                        <p className="
                                            text-[10px]
                                            text-white/60
                                        ">
                                            Trusted by
                                            thousands of
                                            shoppers
                                        </p>

                                    </div>

                                </motion.div>

                            </motion.div>


                            {/* ==================================================
                                PRODUCT IMAGE
                            ================================================== */}

                            <motion.div
                                className="
                                    relative
                                    flex
                                    w-full
                                    flex-1
                                    items-center
                                    justify-center

                                    md:w-1/2
                                "
                                style={{
                                    x: imageX,
                                    y: imageY,
                                }}
                            >

                                {/* IMAGE GLOW */}

                                <motion.div
                                    animate={{
                                        scale: [
                                            1,
                                            1.15,
                                            1,
                                        ],
                                        opacity: [
                                            0.2,
                                            0.4,
                                            0.2,
                                        ],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat:
                                            Infinity,
                                    }}
                                    className={`
                                        absolute
                                        h-64
                                        w-64
                                        rounded-full
                                        ${slide.glow}
                                        blur-[80px]

                                        md:h-80
                                        md:w-80
                                    `}
                                />


                                {/* PRODUCT PLATFORM */}

                                <motion.div
                                    animate={{
                                        rotate: [
                                            0,
                                            360,
                                        ],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat:
                                            Infinity,
                                        ease: "linear",
                                    }}
                                    className="
                                        absolute
                                        h-64
                                        w-64
                                        rounded-full
                                        border
                                        border-white/10

                                        md:h-80
                                        md:w-80
                                    "
                                />


                                {/* IMAGE */}

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.7,
                                        rotate: -8,
                                        y: 30,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotate: 0,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.15,
                                        ease: [
                                            0.22,
                                            1,
                                            0.36,
                                            1,
                                        ],
                                    }}
                                    className="
                                        relative
                                        z-10
                                    "
                                >

                                    <motion.div
                                        animate={{
                                            y: [
                                                0,
                                                -15,
                                                0,
                                            ],
                                            rotate: [
                                                0,
                                                1.5,
                                                0,
                                                -1.5,
                                                0,
                                            ],
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat:
                                                Infinity,
                                            ease: "easeInOut",
                                        }}
                                    >

                                        <Image
                                            src={
                                                slide.imgSrc
                                            }
                                            alt={
                                                slide.title
                                            }
                                            priority
                                            className="
                                                w-52
                                                drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)]

                                                sm:w-64

                                                md:w-72

                                                lg:w-[360px]
                                            "
                                        />

                                    </motion.div>

                                </motion.div>


                                {/* FLOATING SPARKLES */}

                                <motion.div
                                    animate={{
                                        y: [
                                            0,
                                            -15,
                                            0,
                                        ],
                                        rotate: [
                                            0,
                                            15,
                                            0,
                                        ],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat:
                                            Infinity,
                                    }}
                                    className="
                                        absolute
                                        left-[15%]
                                        top-[10%]
                                        text-white/70
                                    "
                                >
                                    <Sparkles
                                        size={24}
                                    />
                                </motion.div>


                                <motion.div
                                    animate={{
                                        y: [
                                            0,
                                            15,
                                            0,
                                        ],
                                        rotate: [
                                            0,
                                            -15,
                                            0,
                                        ],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat:
                                            Infinity,
                                    }}
                                    className="
                                        absolute
                                        bottom-[15%]
                                        right-[12%]
                                        text-white/60
                                    "
                                >
                                    <Sparkles
                                        size={18}
                                    />
                                </motion.div>

                            </motion.div>

                        </div>

                    </motion.div>

                </AnimatePresence>


                {/* ==================================================
                    SLIDE COUNTER
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="
                        absolute
                        bottom-5
                        right-5
                        z-30
                        hidden
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/20
                        bg-black/10
                        px-3
                        py-1.5
                        text-xs
                        font-bold
                        text-white
                        backdrop-blur-md

                        sm:flex
                    "
                >

                    <span>
                        {String(
                            current + 1
                        ).padStart(2, "0")}
                    </span>

                    <span className="text-white/40">
                        /
                    </span>

                    <span className="text-white/50">
                        {String(
                            sliderData.length
                        ).padStart(2, "0")}
                    </span>

                </motion.div>


                {/* ==================================================
                    PREVIOUS / NEXT
                ================================================== */}

                <div className="
                    absolute
                    bottom-5
                    left-5
                    z-30
                    hidden
                    gap-2

                    sm:flex
                ">

                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        onClick={() =>
                            paginate(-1)
                        }
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/20
                            bg-black/10
                            text-white
                            backdrop-blur-md
                            transition
                            hover:bg-white/20
                        "
                    >
                        <ArrowLeft
                            size={17}
                        />
                    </motion.button>


                    <motion.button
                        whileHover={{
                            scale: 1.1,
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        onClick={() =>
                            paginate(1)
                        }
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/20
                            bg-black/10
                            text-white
                            backdrop-blur-md
                            transition
                            hover:bg-white/20
                        "
                    >
                        <ArrowRight
                            size={17}
                        />
                    </motion.button>

                </div>

            </div>


            {/* ======================================================
                PAGINATION
            ====================================================== */}

            <div className="
                mt-5
                flex
                items-center
                justify-center
                gap-2
            ">

                {sliderData.map(
                    (item, index) => {

                        const active =
                            current === index;

                        return (

                            <motion.button
                                key={item.id}
                                onClick={() =>
                                    setSlide([
                                        index,
                                        index >
                                            current
                                            ? 1
                                            : -1,
                                    ])
                                }
                                whileHover={{
                                    scale: 1.15,
                                }}
                                whileTap={{
                                    scale: 0.9,
                                }}
                                className="
                                    relative
                                    h-2
                                    overflow-hidden
                                    rounded-full
                                    bg-slate-200
                                "
                                animate={{
                                    width: active
                                        ? 42
                                        : 9,
                                }}
                            >

                                {active && (

                                    <motion.div
                                        layoutId="activeSliderDot"
                                        className={`
                                            absolute
                                            inset-0
                                            rounded-full
                                            bg-gradient-to-r
                                            ${slide.accent}
                                        `}
                                    />

                                )}

                            </motion.button>

                        );

                    }
                )}

            </div>


            {/* ======================================================
                AUTOPLAY PROGRESS
            ====================================================== */}

            <div className="
                mx-auto
                mt-3
                h-1
                max-w-xs
                overflow-hidden
                rounded-full
                bg-slate-200
            ">

                {!isPaused && (

                    <motion.div
                        key={current}
                        initial={{
                            width: "0%",
                        }}
                        animate={{
                            width: "100%",
                        }}
                        transition={{
                            duration: 5,
                            ease: "linear",
                        }}
                        className={`
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            ${slide.accent}
                        `}
                    />

                )}

            </div>

        </section>
    );
};

export default HeaderSlider;