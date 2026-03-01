"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 80);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${scrolled
                ? "shadow-lg"
                : ""
                }`}
            style={scrolled
                ? { backgroundColor: 'rgba(255,255,255,0.92)', borderBottom: '1px solid rgba(0,0,0,0.06)' }
                : { backgroundColor: 'rgba(255,255,255,0.5)' }
            }
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-2 sm:py-3 flex justify-between items-center">
                <a href="/" className="flex items-center gap-2.5 sm:gap-3 group" aria-label="WebCraft Home">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-base sm:text-lg rounded-[12px] sm:rounded-[14px] bg-[#1A1A1A] text-white shadow-sm">
                        W
                    </div>
                    <span
                        className="text-lg sm:text-xl font-bold tracking-tight text-[#1A1A1A]"
                        style={{ fontFamily: 'var(--font-sans)' }}
                    >
                        WebCraft<span className="text-[#0096C7]">.</span>
                    </span>
                </a>

                <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-wide">
                    {["Services", "Portfolio", "Process", "Contact"].map((item) => (
                        <a
                            key={item}
                            href={item === "Contact" ? "#requirements" : `#${item.toLowerCase()}`}
                            className="relative py-1 transition-colors duration-300 group text-[#4A4A4A] hover:text-[#1A1A1A]"
                        >
                            {item}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-400 bg-[#0096C7] rounded-full" />
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center">
                    <a
                        href="#requirements"
                        className="group inline-flex items-center gap-2 pl-6 pr-1.5 py-1.5 text-sm font-bold rounded-full bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
                    >
                        Start a Project
                        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform group-hover:rotate-[-35deg]">
                            <ArrowRight className="w-4 h-4 text-[#1A1A1A]" />
                        </span>
                    </a>
                </div>

                <button
                    className="md:hidden p-2 text-[#1A1A1A]"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    id="mobile-menu-toggle"
                >
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu — AnimatePresence for smooth open/close */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden px-6 py-5 flex flex-col gap-3.5 bg-white shadow-xl z-50"
                        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
                        role="navigation"
                    >
                        {["Services", "Portfolio", "Process", "Contact"].map((item) => (
                            <a
                                key={item}
                                href={item === "Contact" ? "/contact" : `#${item.toLowerCase()}`}
                                onClick={() => setOpen(false)}
                                className="text-base font-bold py-1.5 text-[#1A1A1A]"
                            >
                                {item}
                            </a>
                        ))}
                        <a
                            href="#requirements"
                            onClick={() => setOpen(false)}
                            className="mt-2 px-2 py-3.5 max-w-[180px] mx-auto w-full text-sm font-bold rounded-full text-center bg-[#1A1A1A] text-white"
                        >
                            Start a Project
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    );
}
