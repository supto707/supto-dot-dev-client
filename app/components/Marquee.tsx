"use client";

import { motion } from "framer-motion";
import {
    SiNextdotjs,
    SiNodedotjs,
    SiMongodb,
    SiStripe,
    SiReact,
    SiTailwindcss,
    SiTypescript,
    SiGooglecloud
} from "react-icons/si";
import { IconType } from "react-icons";

// We need to install react-icons: npm install react-icons

const stack = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Stripe", icon: SiStripe },
    { name: "React", icon: SiReact },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Google Cloud", icon: SiGooglecloud },
];

const Marquee = () => {
    return (
        <div className="relative py-10 overflow-hidden bg-black/50 border-y border-white/5">
            <div className="flex">
                <motion.div
                    className="flex space-x-12 px-6"
                    animate={{ x: "-50%" }}
                    transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                >
                    {/* Double the list for seamless loop */}
                    {[...stack, ...stack].map((tech, index) => (
                        <div
                            key={`${tech.name}-${index}`}
                            className="group flex flex-col items-center justify-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 cursor-default"
                        >
                            <tech.icon className="w-10 h-10 text-gray-500 group-hover:text-neon-purple group-hover:drop-shadow-[0_0_10px_rgba(123,44,191,0.5)] transition-all duration-300" />
                            <span className="text-xs font-mono text-gray-600 group-hover:text-white transition-colors uppercase tracking-wider">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />
        </div>
    );
};

export default Marquee;
