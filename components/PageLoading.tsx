"use client";

import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion, MotionStyle, useTime, useTransform, easeOut } from "framer-motion";
import { useReducedMotion } from "lib/mediaQueries";
import { useAppContext } from "./AppContext";

const colors = [
    "from-sage-500/0 to-sage-500",
    "from-ocean-400/0 to-ocean-400",
    "from-grape-400/0 to-grape-400",
    "from-pink-500/0 to-pink-500",
];

interface StripDirection {
    className: string;
    animatePosition: keyof MotionStyle;
    animateScale: keyof MotionStyle;
}

const directions: StripDirection[] = [
    {
        className: "top-0 bg-gradient-to-r w-full",
        animatePosition: "left",
        animateScale: "height",
    },
    {
        className: "right-0 bg-gradient-to-b h-full",
        animatePosition: "top",
        animateScale: "width",
    },
    {
        className: "bottom-0 bg-gradient-to-l w-full",
        animatePosition: "right",
        animateScale: "height",
    },
    {
        className: "left-0 bg-gradient-to-t h-full",
        animatePosition: "bottom",
        animateScale: "width",
    },
];

const loaderSize = "12px";

const duration = 1000;

function PageLoadingStrip({ color, direction, offset }: { color: string, direction: StripDirection, offset: number }) {
    const time = useTime();
    const shouldReduceMotion = useReducedMotion();
    const repeatingTime = useTransform(time, time => (time + (colors.length - offset) * duration) % (colors.length * duration));

    const opacity = useTransform(repeatingTime, [1.2 * duration, 2 * duration], shouldReduceMotion ? (offset === 0 ? [1, 1] : [0, 0]) : [1, 0]);
    const position = useTransform(repeatingTime, [0, duration], [shouldReduceMotion ? "0%" : "-100%", "0%"], { ease: easeOut });

    return <motion.div className={`absolute ${color} ${direction.className}`} initial={{
        [direction.animateScale]: shouldReduceMotion ? loaderSize : 0,
    }} animate={{
        [direction.animateScale]: loaderSize,
    }} exit={{
        [direction.animateScale]: shouldReduceMotion ? loaderSize : 0,
    }} style={{
        opacity,
        [direction.animatePosition]: position,
    }} />;
}

function PageLoadingContent() {
    return <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {directions.map((direction, directionIndex) => {
            return <Fragment key={directionIndex}>
                {colors.map((color, colorIndex) => {
                    return <PageLoadingStrip color={color} direction={direction} key={colorIndex} offset={(directionIndex + colorIndex) % colors.length} />;
                })}
            </Fragment>
        })}
    </div>;
}

function PageLoadingFadingContent() {
    const time = useTime();
    const repeatingTime = useTransform(time, time => time % duration);
    const opacity = useTransform(repeatingTime, [0, duration, 2 * duration], [0, 1, 0]);

    return <motion.div initial={{
        opacity: 0,
    }} animate={{
        opacity: 1,
    }} exit={{
        opacity: 0,
    }}>
        <motion.div style={{ opacity }}>
            <PageLoadingContent />
        </motion.div>
    </motion.div>;
}

function PageLoadingReducedMotionArbiter() {
    const shouldReduceMotion = useReducedMotion();

    // If reduced motion is enabled, use an alternate animation to imply progress.
    return shouldReduceMotion ? <PageLoadingFadingContent /> : <PageLoadingContent />;
}

export function PageLoading({ isLoading }: { isLoading: boolean }) {
    return <AnimatePresence>
        {isLoading && <PageLoadingReducedMotionArbiter />}
    </AnimatePresence>;
}

export function PageLoadingIndicator() {
    const { isLoading } = useAppContext();

    const [isShowingLoadingIndicator, setShowingLoadingIndicator] = useState(false);
    useEffect(() => {
        if (isLoading) {
            const timeout = setTimeout(() => {
                setShowingLoadingIndicator(true);
            }, 200);
            return () => clearTimeout(timeout);
        } else {
            setShowingLoadingIndicator(false);
        }
    }, [isLoading]);

    return <PageLoading isLoading={isShowingLoadingIndicator} />;
}