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
            <div className="max-w-7xl mx-auto px-4 lg:px-12 pt-6 sm:pt-16 pb-4 sm:pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-12 lg:gap-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 flex items-center justify-center font-bold text-lg rounded-[14px] bg-white text-[#1A1A1A]">
                                W
                            </div>
                            <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>
                                WebCraft<span className="text-[#0096C7]">.</span>
                            </span>
                        </div>
                        <p className="text-[15px] leading-relaxed text-white/50 max-w-sm">
                            Combining artistic vision with engineering excellence to craft premium digital experiences that elevate brands.
                        </p>
                        <div className="space-y-3 pt-2">
                            <a href="mailto:hello@webcraft.com" className="flex items-center gap-3 text-sm text-white/40 hover:text-white/80 transition-colors">
                                <Mail className="w-4 h-4" /> hello@webcraft.com
                            </a>
                            <a href="tel:+1234567890" className="flex items-center gap-3 text-sm text-white/40 hover:text-white/80 transition-colors">
                                <Phone className="w-4 h-4" /> +1 (234) 567-890
                            </a>
                            <div className="flex items-center gap-3 text-sm text-white/40">
                                <MapPin className="w-4 h-4" /> San Francisco, CA
                            </div>
                        </div>
                    </div>

                    {/* Navigate Links */}
                    <div className="lg:col-span-2 space-y-5">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Navigate</h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Services", href: "#services" },
                                { name: "Portfolio", href: "#portfolio" },
                                { name: "Process", href: "#process" },
                                { name: "Contact", href: "#requirements" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links - Hidden on mobile */}
                    <div className="lg:col-span-2 space-y-5 hidden md:block">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Company</h4>
                        <ul className="space-y-3">
                            {["About Us", "Our Team", "Careers", "Privacy Policy"].map((name) => (
                                <li key={name}>
                                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links - Hidden on mobile */}
                    <div className="lg:col-span-3 space-y-5 hidden md:block">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">Resources</h4>
                        <ul className="space-y-3">
                            {["Case Studies", "Documentation", "Design System", "Support"].map((name) => (
                                <li key={name}>
                                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Divider */}
                <div className="mt-6 sm:mt-12 mb-4 sm:mb-8 h-px bg-white/10" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/30">
                        &copy; {currentYear} WebCraft Studios. Crafted with care.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-[14px] flex items-center justify-center bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </footer>
    );
}
