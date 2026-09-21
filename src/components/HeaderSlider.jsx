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


// ============================================================
// SLIDER DATA
// ============================================================

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

        glow: "bg-fuchsia-500",

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

        glow: "bg-cyan-400",

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

        glow: "bg-purple-500",

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

        glow: "bg-rose-400",

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

        glow: "bg-teal-400",

        accent:
            "from-teal-300 to-lime-200",

        badge:
            "bg-teal-400/20 border-teal-200/30",

        shadow:
            "shadow-teal-500/30",
    },
];


// ============================================================
// TEXT ANIMATION
// ============================================================

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


// ============================================================
// COMPONENT
// ============================================================

const HeaderSlider = () => {

    const [[current, direction], setSlide] =
        useState([0, 0]);

    const [isPaused, setIsPaused] =
        useState(false);


    // ========================================================
    // MOUSE PARALLAX
    // ========================================================

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
        [-12, 12]
    );

    const imageY = useTransform(
        springY,
        [-500, 500],
        [-8, 8]
    );


    const handleMouseMove = (event) => {

        // Avoid unnecessary parallax on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

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


    // ========================================================
    // SLIDER
    // ========================================================

    const paginate = useCallback(
        (newDirection) => {

            setSlide(([prev]) => {

                const next =
                    (
                        prev +
                        newDirection +
                        sliderData.length
                    ) %
                    sliderData.length;

                return [
                    next,
                    newDirection,
                ];
            });
        },
        []
    );


    // ========================================================
    // AUTOPLAY
    // ========================================================

    useEffect(() => {

        if (isPaused) return;

        const interval =
            setInterval(
                () => paginate(1),
                5000
            );

        return () =>
            clearInterval(interval);

    }, [paginate, isPaused]);


    const slide =
        sliderData[current];


    // ========================================================
    // RETURN
    // ========================================================

    return (

        <section
            className="
                relative
                mt-4
                w-full

                sm:mt-5
                lg:mt-6
            "
            onMouseEnter={() =>
                setIsPaused(true)
            }
            onMouseLeave={() =>
                setIsPaused(false)
            }
        >

            {/* ==================================================
                HERO
            ================================================== */}

            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={resetMouse}

                className="
                    relative
                    mx-auto
                    w-full
                    overflow-hidden

                    rounded-2xl
                    shadow-xl

                    sm:rounded-3xl
                    sm:shadow-2xl

                    lg:rounded-[32px]
                "
            >

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
                                    ? 80
                                    : -80,
                            scale: 1.02,
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
                                    ? -80
                                    : 80,
                            scale: 0.98,
                        }}

                        transition={{
                            duration: 0.65,
                            ease: [
                                0.22,
                                1,
                                0.36,
                                1,
                            ],
                        }}

                        className={`
                            relative
                            min-h-[680px]

                            bg-gradient-to-br
                            ${slide.gradient}

                            sm:min-h-[650px]

                            md:min-h-[560px]

                            lg:min-h-[520px]

                            xl:min-h-[540px]
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

                                h-64
                                w-64

                                rounded-full
                                ${slide.glow}

                                opacity-25
                                blur-[80px]

                                sm:h-80
                                sm:w-80

                                lg:h-96
                                lg:w-96
                                lg:blur-[100px]
                            `}
                            animate={{
                                x: [0, 40, 0],
                                y: [0, 30, 0],
                                scale: [1, 1.15, 1],
                            }}
                            transition={{
                                duration: 9,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />


                        {/* ==================================================
                            SECOND GLOW
                        ================================================== */}

                        <motion.div
                            className="
                                absolute
                                -bottom-32
                                -right-20

                                h-72
                                w-72

                                rounded-full
                                bg-white/10

                                blur-[90px]

                                sm:h-96
                                sm:w-96

                                lg:blur-[110px]
                            "
                            animate={{
                                x: [0, -30, 0],
                                y: [0, -25, 0],
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
                                -top-28

                                h-72
                                w-72

                                rounded-full
                                border
                                border-white/10

                                sm:h-96
                                sm:w-96

                                lg:h-[420px]
                                lg:w-[420px]
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

                                -right-16
                                -top-16

                                h-52
                                w-52

                                rounded-full
                                border
                                border-white/10

                                sm:h-72
                                sm:w-72

                                lg:h-[300px]
                                lg:w-[300px]
                            "
                        />


                        {/* ==================================================
                            FLOATING PARTICLES
                        ================================================== */}

                        {[...Array(10)].map(
                            (_, index) => (

                                <motion.span
                                    key={index}

                                    className="
                                        absolute
                                        h-1
                                        w-1
                                        rounded-full
                                        bg-white/50
                                    "

                                    style={{
                                        left: `${
                                            8 +
                                            (index * 19) %
                                                88
                                        }%`,

                                        top: `${
                                            10 +
                                            (index * 23) %
                                                75
                                        }%`,
                                    }}

                                    animate={{
                                        y: [
                                            0,
                                            -18,
                                            0,
                                        ],

                                        opacity: [
                                            0.2,
                                            0.8,
                                            0.2,
                                        ],

                                        scale: [
                                            1,
                                            1.7,
                                            1,
                                        ],
                                    }}

                                    transition={{
                                        duration:
                                            2.5 +
                                            index * 0.25,

                                        repeat:
                                            Infinity,

                                        delay:
                                            index * 0.12,
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
                                min-h-[680px]
                                flex-col

                                px-5
                                py-9

                                sm:min-h-[650px]
                                sm:px-8
                                sm:py-10

                                md:min-h-[560px]
                                md:flex-row
                                md:items-center
                                md:gap-6
                                md:px-10

                                lg:min-h-[520px]
                                lg:px-16
                                lg:py-10

                                xl:px-20
                            "
                        >

                            {/* ==================================================
                                TEXT
                            ================================================== */}

                            <motion.div
                                variants={textVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"

                                className="
                                    flex
                                    w-full
                                    flex-col
                                    justify-center
                                    text-center
                                    text-white

                                    md:w-1/2
                                    md:text-left
                                "
                            >

                                {/* OFFER */}

                                <motion.div
                                    variants={childVariants}

                                    className={`
                                        mx-auto
                                        mb-4
                                        flex
                                        w-fit
                                        items-center
                                        gap-2

                                        rounded-full
                                        border
                                        ${slide.badge}

                                        px-3
                                        py-1.5

                                        backdrop-blur-md

                                        sm:px-4
                                        sm:py-2

                                        md:mx-0
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
                                            repeat: Infinity,
                                        }}
                                    >
                                        <Zap
                                            size={14}
                                            className="
                                                text-yellow-200
                                                sm:h-4
                                                sm:w-4
                                            "
                                        />
                                    </motion.span>

                                    <span
                                        className="
                                            text-[10px]
                                            font-bold
                                            tracking-wide

                                            sm:text-xs
                                            md:text-sm
                                        "
                                    >
                                        {slide.offer}
                                    </span>

                                </motion.div>


                                {/* ==================================================
                                    HEADING
                                ================================================== */}

                                <motion.h1
                                    variants={childVariants}

                                    className="
                                        mx-auto
                                        max-w-xl

                                        text-3xl
                                        font-black
                                        leading-[1.08]
                                        tracking-tight

                                        xs:text-4xl

                                        sm:text-[42px]

                                        md:mx-0
                                        md:text-[44px]

                                        lg:text-[52px]

                                        xl:text-[56px]
                                    "
                                >
                                    {slide.title}
                                </motion.h1>


                                {/* ==================================================
                                    DESCRIPTION
                                ================================================== */}

                                <motion.p
                                    variants={childVariants}

                                    className="
                                        mx-auto
                                        mt-4
                                        max-w-lg

                                        text-xs
                                        leading-5
                                        text-white/75

                                        sm:mt-5
                                        sm:text-sm
                                        sm:leading-6

                                        md:mx-0
                                        md:text-base
                                    "
                                >
                                    Discover premium products,
                                    exclusive deals and everything
                                    you need — all in one place at
                                    Sparkcart.
                                </motion.p>


                                {/* ==================================================
                                    BUTTONS
                                ================================================== */}

                                <motion.div
                                    variants={childVariants}

                                    className="
                                        mt-6

                                        flex
                                        flex-col
                                        items-stretch
                                        gap-3

                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-center

                                        md:justify-start
                                    "
                                >

                                    {/* PRIMARY */}

                                    <motion.button
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                        }}

                                        whileTap={{
                                            scale: 0.96,
                                        }}

                                        className="
                                            group
                                            relative
                                            flex
                                            min-h-12
                                            items-center
                                            justify-center
                                            gap-2

                                            overflow-hidden
                                            rounded-full
                                            bg-white

                                            px-6
                                            py-3

                                            text-sm
                                            font-bold
                                            text-slate-900

                                            shadow-xl
                                            shadow-black/20

                                            sm:px-8
                                        "
                                    >

                                        {/* SHIMMER */}

                                        <motion.span
                                            animate={{
                                                x: [
                                                    "-150%",
                                                    "150%",
                                                ],
                                            }}

                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                repeatDelay: 2,
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
                                            x: 4,
                                        }}

                                        whileTap={{
                                            scale: 0.96,
                                        }}

                                        className="
                                            group
                                            flex
                                            min-h-12
                                            items-center
                                            justify-center
                                            gap-2

                                            rounded-full
                                            border
                                            border-white/20
                                            bg-white/10

                                            px-6
                                            py-3

                                            text-sm
                                            font-semibold
                                            text-white

                                            backdrop-blur-md

                                            transition
                                            hover:bg-white/20

                                            sm:px-7
                                        "
                                    >

                                        <span>
                                            {
                                                slide.buttonText2
                                            }
                                        </span>

                                        <ChevronsRight
                                            size={18}
                                            className="
                                                transition
                                                group-hover:translate-x-1
                                            "
                                        />

                                    </motion.button>

                                </motion.div>


                                {/* ==================================================
                                    TRUST
                                ================================================== */}

                                <motion.div
                                    variants={childVariants}

                                    className="
                                        mt-6

                                        flex
                                        items-center
                                        justify-center
                                        gap-3

                                        md:justify-start
                                    "
                                >

                                    <div className="flex -space-x-2">

                                        {[1, 2, 3, 4].map(
                                            (item) => (

                                                <motion.div
                                                    key={item}

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

                                        <div className="flex items-center gap-0.5">

                                            {[1, 2, 3, 4, 5].map(
                                                (star) => (

                                                    <motion.span
                                                        key={star}

                                                        animate={{
                                                            scale: [
                                                                1,
                                                                1.15,
                                                                1,
                                                            ],
                                                        }}

                                                        transition={{
                                                            duration: 1.5,
                                                            delay:
                                                                star *
                                                                0.05,
                                                            repeat:
                                                                Infinity,
                                                        }}

                                                        className="
                                                            text-[10px]
                                                            text-yellow-300

                                                            sm:text-xs
                                                        "
                                                    >
                                                        ★
                                                    </motion.span>

                                                )
                                            )}

                                        </div>

                                        <p
                                            className="
                                                text-[9px]
                                                text-white/60

                                                sm:text-[10px]
                                            "
                                        >
                                            Trusted by thousands
                                            of shoppers
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

                                    mt-8
                                    flex
                                    w-full
                                    flex-1

                                    items-center
                                    justify-center

                                    md:mt-0
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
                                            1.12,
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
                                        repeat: Infinity,
                                    }}

                                    className={`
                                        absolute

                                        h-48
                                        w-48

                                        rounded-full

                                        ${slide.glow}

                                        blur-[60px]

                                        sm:h-60
                                        sm:w-60

                                        md:h-72
                                        md:w-72

                                        lg:h-80
                                        lg:w-80
                                    `}
                                />


                                {/* PRODUCT PLATFORM */}

                                <motion.div
                                    animate={{
                                        rotate: 360,
                                    }}

                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}

                                    className="
                                        absolute

                                        h-48
                                        w-48

                                        rounded-full
                                        border
                                        border-white/10

                                        sm:h-60
                                        sm:w-60

                                        md:h-72
                                        md:w-72

                                        lg:h-80
                                        lg:w-80
                                    "
                                />


                                {/* IMAGE */}

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.75,
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
                                        w-full

                                        max-w-[220px]

                                        sm:max-w-[270px]

                                        md:max-w-[300px]

                                        lg:max-w-[360px]
                                    "
                                >

                                    <motion.div
                                        animate={{
                                            y: [
                                                0,
                                                -12,
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
                                            repeat: Infinity,
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
                                                h-auto
                                                w-full

                                                drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)]

                                                sm:drop-shadow-[0_30px_30px_rgba(0,0,0,0.35)]
                                            "
                                        />

                                    </motion.div>

                                </motion.div>


                                {/* ==================================================
                                    SPARKLES
                                ================================================== */}

                                <motion.div
                                    animate={{
                                        y: [
                                            0,
                                            -12,
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
                                        repeat: Infinity,
                                    }}

                                    className="
                                        absolute
                                        left-[12%]
                                        top-[5%]

                                        text-white/70

                                        sm:left-[15%]
                                        sm:top-[10%]
                                    "
                                >
                                    <Sparkles
                                        size={20}
                                        className="
                                            sm:h-6
                                            sm:w-6
                                        "
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
                                        repeat: Infinity,
                                    }}

                                    className="
                                        absolute

                                        bottom-[5%]
                                        right-[10%]

                                        text-white/60

                                        sm:bottom-[15%]
                                        sm:right-[12%]
                                    "
                                >
                                    <Sparkles
                                        size={16}
                                        className="
                                            sm:h-[18px]
                                            sm:w-[18px]
                                        "
                                    />
                                </motion.div>

                            </motion.div>

                        </div>

                    </motion.div>

                </AnimatePresence>


                {/* ==================================================
                    MOBILE / DESKTOP SLIDE COUNTER
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
                        bottom-4
                        right-4
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

                        sm:bottom-5
                        sm:right-5
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

                <div
                    className="
                        absolute
                        bottom-4
                        left-4
                        z-30

                        hidden

                        gap-2

                        sm:flex
                        sm:bottom-5
                        sm:left-5
                    "
                >

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

                        aria-label="Previous slide"

                        className="
                            flex
                            h-9
                            w-9

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

                            sm:h-10
                            sm:w-10
                        "
                    >
                        <ArrowLeft size={17} />
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

                        aria-label="Next slide"

                        className="
                            flex
                            h-9
                            w-9

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

                            sm:h-10
                            sm:w-10
                        "
                    >
                        <ArrowRight size={17} />
                    </motion.button>

                </div>

            </div>


            {/* ======================================================
                PAGINATION
            ====================================================== */}

            <div
                className="
                    mt-4

                    flex
                    items-center
                    justify-center
                    gap-1.5

                    sm:mt-5
                    sm:gap-2
                "
            >

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

                                aria-label={`Go to slide ${index + 1}`}

                                className="
                                    relative
                                    h-2
                                    overflow-hidden
                                    rounded-full
                                    bg-slate-200
                                "

                                animate={{
                                    width: active
                                        ? 36
                                        : 8,
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

            <div
                className="
                    mx-auto
                    mt-2

                    h-1
                    max-w-[180px]

                    overflow-hidden
                    rounded-full
                    bg-slate-200

                    sm:max-w-xs
                "
            >

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