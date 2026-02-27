"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "backdrop-blur-xl shadow-lg"
                : ""
                }`}
            style={scrolled
                ? { backgroundColor: 'rgba(255,255,255,0.85)', borderBottom: '1px solid rgba(0,0,0,0.06)' }
                : { backgroundColor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)' }
            }
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
                <a href="/" className="flex items-center gap-3 group" aria-label="WebCraft Home">
                    <div
                        className="w-10 h-10 flex items-center justify-center font-bold text-lg rounded-[14px] transition-all duration-500 bg-[#1A1A1A] text-white shadow-sm"
                    >
                        W
                    </div>
                    <span
                        className="text-xl font-bold tracking-tight transition-colors duration-500 text-[#1A1A1A]"
                        style={{ fontFamily: 'var(--font-sans)' }}
                    >
                        WebCraft<span className="text-[#0096C7]">.</span>
                    </span>
                </a>

                <div className="hidden md:flex items-center gap-10 text-sm font-bold tracking-wide uppercase">
                    {["Services", "Portfolio", "Process", "Contact"].map((item) => (
                        <a
                            key={item}
                            href={item === "Contact" ? "#requirements" : `#${item.toLowerCase()}`}
                            className="relative py-1 transition-colors duration-300 group text-[#4A4A4A] hover:text-[#1A1A1A]"
                        >
                            {item}
                            <span
                                className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500 bg-[#0096C7] rounded-full"
                            />
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center">
                    <a
                        href="#requirements"
                        className="group inline-flex items-center gap-2 pl-6 pr-1.5 py-1.5 text-sm font-bold rounded-full transition-all duration-300 bg-[#1A1A1A] text-white hover:bg-[#333] hover:-translate-y-0.5 hover:shadow-xl shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                    >
                        Start a Project
                        <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform group-hover:rotate-[-35deg]">
                            <ArrowRight className="w-4 h-4 text-[#1A1A1A]" />
                        </span>
                    </a>
                </div>

                <button
                    className="md:hidden p-2 transition-colors text-[#1A1A1A]"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    id="mobile-menu-toggle"
                >
                    {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {open && (
                <div
                    className="md:hidden px-6 py-10 flex flex-col gap-6 animate-fade-in-up backdrop-blur-xl bg-white/95"
                    style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
                    role="navigation"
                >
                    {["Services", "Portfolio", "Process", "Contact"].map((item) => (
                        <a
                            key={item}
                            href={item === "Contact" ? "#requirements" : `#${item.toLowerCase()}`}
                            onClick={() => setOpen(false)}
                            className="text-lg font-bold py-2 text-[#1A1A1A] border-b border-gray-100"
                        >
                            {item}
                        </a>
                    ))}
                    <a
                        href="#requirements"
                        onClick={() => setOpen(false)}
                        className="mt-4 px-8 py-4 text-base font-bold rounded-[14px] text-center bg-[#1A1A1A] text-white"
                    >
                        Start a Project
                    </a>
                </div>
            )}
        </nav>
    );
}
