"use client";

import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-[#1A1A1A] text-white" role="contentinfo">

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 sm:pt-16 pb-6 sm:pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 flex items-center justify-center font-bold text-base rounded-[12px] bg-white text-[#1A1A1A]">
                                W
                            </div>
                            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
                                WebCraft<span className="text-[#0096C7]">.</span>
                            </span>
                        </div>
                        <p className="text-[14px] leading-relaxed text-white/40 max-w-sm">
                            Premium digital experiences crafted with engineering excellence.
                        </p>
                    </div>

                    {/* Navigate Links */}
                    <div className="lg:col-span-2 space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Navigate</h4>
                        <ul className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                            {[
                                { name: "Services", href: "#services" },
                                { name: "Portfolio", href: "#portfolio" },
                                { name: "Process", href: "#process" },
                                { name: "Contact", href: "#requirements" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-sm text-white/40 hover:text-white transition-colors duration-300">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links (Desktop Only) */}
                    <div className="hidden lg:block lg:col-span-2 space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Company</h4>
                        <ul className="space-y-2">
                            {["About Us", "Our Team", "Careers", "Policy"].map((name) => (
                                <li key={name}>
                                    <a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-300">
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links (Desktop Only) */}
                    <div className="hidden lg:block lg:col-span-3 space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Resources</h4>
                        <ul className="space-y-2">
                            {["Case Studies", "Status", "Support"].map((name) => (
                                <li key={name}>
                                    <a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-300">
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Divider */}
                <div className="mt-8 sm:mt-12 mb-6 sm:mb-8 h-px bg-white/10" />

                {/* Bottom Bar */}
                <div className="flex justify-between items-center">
                    <p className="text-[12px] font-bold tracking-widest text-white/20 uppercase">
                        &copy; {currentYear} WebCraft
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="w-8 h-8 rounded-[10px] flex items-center justify-center bg-white/5 border border-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all duration-300"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
