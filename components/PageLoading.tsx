import { Fragment } from "react";
import { motion, useTime, useTransform } from "framer-motion";
import { easeOut } from "popmotion";

const colors = [
    "from-sage-500/0 to-sage-500",
    "from-ocean-400/0 to-ocean-400",
    "from-grape-400/0 to-grape-400",
    "from-pink-500/0 to-pink-500",
];

interface StripDirection {
    className: string;
    animate: string;
}

const directions = [
    {
        className: "top-0 bg-gradient-to-r w-full h-2 sm:h-3 lg:h-4",
        animate: "left",
    },
    {
        className: "right-0 bg-gradient-to-b h-full w-2 sm:w-3 lg:w-4",
        animate: "top",
    },
    {
        className: "bottom-0 bg-gradient-to-l w-full h-2 sm:h-3 lg:h-4",
        animate: "right",
    },
    {
        className: "left-0 bg-gradient-to-t h-full w-2 sm:w-3 lg:w-4",
        animate: "bottom",
    },
];

const duration = 1000;

function PageLoadingStrip({ color, direction, offset }: { color: string, direction: StripDirection, offset: number }) {
    const time = useTime();
    const repeatingTime = useTransform(time, time => (time + (colors.length - offset) * duration) % (colors.length * duration));

    const opacity = useTransform(repeatingTime, [1.2 * duration, 2 * duration], [1, 0]);
    const position = useTransform(repeatingTime, [0, duration], ["-100%", "0%"], { ease: easeOut });

    return <motion.div className={`absolute ${color} ${direction.className}`} style={{
        opacity,
        [direction.animate]: position,
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

export function PageLoading() {
    return <PageLoadingContent />;
}