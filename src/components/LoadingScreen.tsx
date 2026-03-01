"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import toasterAnimation from "../../public/toaster.json";
import circleLoader from "../../public/circle-loader.json";

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const skip = sessionStorage.getItem("skip-loading-screen");
        if (skip) {
            setLoading(false);
            sessionStorage.removeItem("skip-loading-screen");
            return;
        }
        const timeout = setTimeout(() => setLoading(false), 1800);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
                    style={{ background: '#FAFBFF' }}
                >
                    {/* Toaster animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px]"
                    >
                        <Lottie
                            animationData={toasterAnimation}
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </motion.div>

                    {/* Brand text */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center mt-2 relative z-10"
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
                            WebCraft<span className="text-[#0096C7]">.</span>
                        </h2>
                    </motion.div>

                    {/* Circle loader animation as the loading indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] mt-6"
                    >
                        <Lottie
                            animationData={circleLoader}
                            loop={true}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
