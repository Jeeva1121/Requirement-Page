"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle2, ArrowRight, ChevronRight, Rocket, ArrowLeft } from "lucide-react";

const inputClass = "w-full px-5 sm:px-9 py-3 sm:py-4 bg-[#F8FAFC] rounded-full outline-none text-[14px] sm:text-[15px] font-medium border border-[#E2E8F0] focus:ring-4 focus:ring-[#6B4EFF]/10 focus:border-[#6B4EFF] focus:bg-white transition-all duration-300 placeholder:text-[#94A3B8] text-[#1A1A1A] shadow-sm cursor-text appearance-none";

const sectionHeaderClass = "flex flex-col items-center text-center mb-6 sm:mb-10";
const sectionIconClass = "w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center font-bold text-[16px] sm:text-[20px] shadow-lg mb-4 sm:mb-6 border border-white/20";
const labelClass = "text-[11px] sm:text-[12px] font-black uppercase tracking-[0.15em] text-[#94A3B8] ml-4 sm:ml-6 mb-1.5 sm:mb-2 inline-block";

const stepVariants = {
    hidden: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 50 : -50,
        scale: 0.95
    }),
    visible: {
        opacity: 1,
        x: 0,
        scale: 1
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -50 : 50,
        scale: 0.95
    })
};

const TOTAL_STEPS = 3;

const ContactForm = () => {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [direction, setDirection] = useState(0);

    const goNext = () => {
        setDirection(1);
        setStep((s) => Math.min(s + 1, TOTAL_STEPS));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const goPrev = () => {
        setDirection(-1);
        setStep((s) => Math.max(s - 1, 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFinalSubmit = () => {
        setSubmitted(true);
    };

    /* ── SUCCESS SCREEN ── */
    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-20 px-6 h-full"
            >
                <div className="w-24 h-24 bg-[#6B4EFF]/10 rounded-full flex items-center justify-center mb-10 shadow-[0_20px_50px_rgba(107,78,255,0.1)]">
                    <CheckCircle2 className="w-12 h-12 text-[#6B4EFF]" />
                </div>
                <h3 className="text-6xl font-black mb-4 tracking-tight" style={{ fontFamily: 'var(--font-caveat)', color: '#6B4EFF' }}>Brilliant!</h3>
                <p className="text-[#64748B] font-medium text-lg leading-relaxed max-w-sm">
                    We&apos;ve received your requirement. Expect a response from us within <span className="text-[#6B4EFF] font-bold">24 hours</span>.
                </p>
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setSubmitted(false);
                        setStep(1);
                    }}
                    className="mt-12 group inline-flex items-center gap-3 pl-7 pr-1.5 py-1.5 bg-[#6B4EFF] text-white font-bold rounded-full hover:shadow-[0_10px_30px_rgba(107,78,255,0.3)] transition-all"
                >
                    <span className="text-[14px] uppercase tracking-widest">Submit another</span>
                    <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center transition-transform group-hover:rotate-[-45deg]">
                        <ArrowRight className="w-4 h-4 text-[#6B4EFF]" />
                    </span>
                </motion.button>
            </motion.div>
        );
    }

    /* ── MULTI-STEP FORM (no <form> tag – prevents accidental browser submission) ── */
    return (
        <div className="space-y-8 relative min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait" custom={direction}>

                {/* ═══ STEP 1 — WHO YOU ARE ═══ */}
                {step === 1 && (
                    <motion.div
                        key="step1"
                        variants={stepVariants}
                        custom={direction}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8 flex-1 relative"
                    >
                        <div className={`${sectionHeaderClass} relative z-10`}>
                            <div className={`${sectionIconClass} bg-[#F0EEFF] overflow-hidden`}>
                                <img src="/profile-icon.png" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-3xl sm:text-5xl mt-2 uppercase" style={{ fontFamily: 'var(--font-frogie)', color: '#6B4EFF', textShadow: '5px 5px 0px rgba(0,0,0,0.1)' }}>Tell us who you are</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label htmlFor="fullName" className={labelClass}>Full Name</label>
                                <input id="fullName" name="fullName" type="text" placeholder="John Doe" className={inputClass} />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="company" className={labelClass}>Company</label>
                                <input id="company" name="company" type="text" placeholder="Startup Inc." className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label htmlFor="email" className={labelClass}>Email Address</label>
                                <input id="email" name="email" type="email" placeholder="hello@world.com" className={inputClass} />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="phone" className={labelClass}>Phone Number</label>
                                <input id="phone" name="phone" type="tel" placeholder="+91 00000 00000" className={inputClass} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label htmlFor="location" className={labelClass}>Location</label>
                                <input id="location" name="location" type="text" placeholder="City, Country" className={inputClass} />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="preferredContact" className={labelClass}>Preferred Contact</label>
                                <div className="relative group">
                                    <select id="preferredContact" name="preferredContact" className={inputClass + " pr-12 cursor-pointer"}>
                                        <option>Email</option>
                                        <option>Phone</option>
                                        <option>WhatsApp</option>
                                    </select>
                                    <ChevronRight className="w-5 h-5 absolute right-6 top-1/2 -translate-y-1/2 text-[#94A3B8] rotate-90 pointer-events-none transition-transform group-hover:text-[#6B4EFF]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══ STEP 2 — WHAT ARE WE BUILDING ═══ */}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        variants={stepVariants}
                        custom={direction}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8 flex-1"
                    >
                        <div className={sectionHeaderClass}>
                            <div className={`${sectionIconClass} bg-[#FFEFEF] overflow-hidden`}>
                                <img src="/building-icon.png" alt="Building" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-3xl sm:text-5xl mt-2 uppercase" style={{ fontFamily: 'var(--font-frogie)', color: '#FF4D85', textShadow: '5px 5px 0px rgba(0,0,0,0.1)' }}>What are we building?</h3>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="projectTitle" className={labelClass}>Project Title</label>
                            <input id="projectTitle" name="projectTitle" type="text" placeholder="e.g. Modern E-commerce Platform" className={inputClass} />
                        </div>

                        <div className="space-y-4">
                            <label className={labelClass}>Service Type</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                {[
                                    { label: "Website", color: "#6B4EFF" },
                                    { label: "Mobile App", color: "#FF4D85" },
                                    { label: "SaaS / ERP", color: "#FF9F1C" },
                                    { label: "AI Solution", color: "#10B981" },
                                    { label: "Blender 3D", color: "#3B82F6" },
                                    { label: "Other", color: "#8B5CF6" }
                                ].map((service) => (
                                    <label key={service.label} className="flex items-center gap-2 sm:gap-4 p-3 sm:p-5 bg-white border border-[#F1F5F9] rounded-full cursor-pointer transition-all duration-300 group shadow-sm active:scale-95" style={{ '--hover-color': service.color } as any}>
                                        <div className="relative flex items-center justify-center">
                                            <input type="checkbox" name={`service_${service.label.replace(/\s+/g, '_').toLowerCase()}`} className="peer absolute opacity-0 w-full h-full cursor-pointer z-10" />
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#E2E8F0] peer-checked:bg-[var(--hover-color)] peer-checked:border-[var(--hover-color)] transition-all duration-300 flex items-center justify-center">
                                                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                        <span className="text-[13px] sm:text-[15px] tracking-wide text-[#64748B] transition-colors group-hover:text-[var(--hover-color)]" style={{ fontFamily: 'var(--font-frogie)' }}>{service.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="projectDescription" className={labelClass}>Project Description</label>
                            <textarea
                                id="projectDescription"
                                name="projectDescription"
                                rows={5}
                                placeholder="Tell us about your idea, target audience, and core features..."
                                className={inputClass + " rounded-[32px] resize-none py-6 leading-relaxed"}
                            ></textarea>
                        </div>
                    </motion.div>
                )}

                {/* ═══ STEP 3 — BUDGET & LAUNCH ═══ */}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        variants={stepVariants}
                        custom={direction}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8 flex-1"
                    >
                        <div className={sectionHeaderClass}>
                            <div className={`${sectionIconClass} bg-[#FFFBEB] overflow-hidden`}>
                                <img src="/budget-icon.png" alt="Budget" className="w-full h-full object-cover p-3 sm:p-5" />
                            </div>
                            <h3 className="text-3xl sm:text-5xl mt-2 uppercase" style={{ fontFamily: 'var(--font-frogie)', color: '#F59E0B', textShadow: '5px 5px 0px rgba(0,0,0,0.1)' }}>Budget & Launch</h3>
                        </div>

                        <div className="space-y-4">
                            <label className={labelClass}>Expected Investment</label>
                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                {["Under ₹25k", "₹25k – ₹50k", "₹50k – ₹1L", "Above ₹1L"].map((amt) => (
                                    <label key={amt} className="flex items-center gap-2 sm:gap-4 p-3 sm:p-5 bg-white border border-[#F1F5F9] rounded-full cursor-pointer hover:border-[#FF9F1C] hover:bg-[#FFFBEB] transition-all duration-300 group shadow-sm active:scale-95">
                                        <div className="relative flex items-center justify-center">
                                            <input type="radio" name="budget" value={amt} className="peer absolute opacity-0 w-full h-full cursor-pointer z-10" />
                                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#E2E8F0] peer-checked:border-[#F59E0B] peer-checked:bg-[#F59E0B] transition-all duration-300 flex items-center justify-center">
                                                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                        <span className="text-[13px] sm:text-[15px] font-medium tracking-wide text-[#64748B] group-hover:text-[#D97706] transition-colors">{amt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-1">
                                <label htmlFor="kickoffDate" className={labelClass}>Kick-off Date</label>
                                <input id="kickoffDate" name="kickoffDate" type="date" className={inputClass} />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="targetLaunch" className={labelClass}>Target Launch</label>
                                <input id="targetLaunch" name="targetLaunch" type="date" className={inputClass} />
                            </div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* ── NAVIGATION BUTTONS ── */}
            <div className="flex items-center justify-between pt-6 sm:pt-10 mt-auto">
                {step > 1 ? (
                    <button
                        type="button"
                        onClick={goPrev}
                        className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-[13px] sm:text-sm font-bold text-[#94A3B8] hover:text-[#1A1A1A] transition-all group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
                        Back
                    </button>
                ) : (
                    <div />
                )}

                {step < TOTAL_STEPS ? (
                    <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={goNext}
                        className={`group inline-flex items-center gap-2.5 sm:gap-3 pl-6 sm:pl-8 pr-1.5 sm:pr-2 py-1.5 sm:py-2 text-white font-bold rounded-full shadow-lg transition-all ${step === 1 ? 'bg-[#6B4EFF] hover:shadow-[0_10px_30px_rgba(107,78,255,0.3)]' : 'bg-[#FF4D85] hover:shadow-[0_10px_30px_rgba(255,77,133,0.3)]'
                            }`}
                    >
                        <span className="text-[12px] sm:text-[14px] uppercase tracking-[0.1em] sm:tracking-[0.15em]">Next Step</span>
                        <span className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center transition-transform group-hover:translate-x-1">
                            <ArrowRight className={`w-3.5 h-3.5 sm:w-5 sm:h-5 ${step === 1 ? 'text-[#6B4EFF]' : 'text-[#FF4D85]'}`} />
                        </span>
                    </motion.button>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleFinalSubmit}
                        className="group inline-flex items-center gap-3 pl-8 pr-1.5 py-1.5 bg-[#F59E0B] text-white font-bold rounded-full shadow-[0_20px_40px_rgba(245,158,11,0.3)] transition-all"
                    >
                        <span className="text-[12px] sm:text-[14px] uppercase tracking-[0.15em]">Send Now</span>
                        <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:rotate-[-45deg]">
                            <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
                        </span>
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default function ContactPage() {
    const handleBackHome = (e: React.MouseEvent) => {
        e.preventDefault();
        sessionStorage.setItem("skip-loading-screen", "true");
        window.location.href = "/";
    };

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <Navbar />

            {/* Contact Hero Area */}
            <section className="pt-16 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 bg-white border-b border-gray-100 relative">
                {/* Back Button & Title Area */}
                <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-0">
                    <div className="w-full md:absolute md:left-0 md:top-16 flex justify-start px-1 sm:px-4 md:px-0">
                        <motion.a
                            href="/"
                            onClick={handleBackHome}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-[#6B4EFF] rounded-full text-white shadow-[0_10px_30px_rgba(107,78,255,0.3)] transition-all group active:scale-95 ml-2 md:ml-44 mt-8 md:mt-8"
                            title="Back to Home"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
                        </motion.a>
                    </div>

                    <div className="text-center max-w-2xl mt-0 md:mt-0">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl sm:text-5xl md:text-7xl font-black text-[#1A1A1A] tracking-tighter"
                            style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.1' }}
                        >
                            GET IN <span className="text-[#6B4EFF]" style={{ fontFamily: 'var(--font-caveat)', fontWeight: 'normal' }}>TOUCH</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[#64748B] text-sm sm:text-lg mt-1 sm:mt-3 font-medium leading-relaxed max-w-[280px] sm:max-w-none mx-auto"
                        >
                            We've simplified our portal so you can share your vision in seconds.
                        </motion.p>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-24 px-4 sm:px-6 relative flex items-center justify-center" style={{ backgroundColor: '#D1D9FF' }}>
                {/* Form Container with clean white background */}
                <div className="max-w-3xl w-full mx-auto bg-white/95 backdrop-blur-xl rounded-[32px] sm:rounded-[48px] shadow-[0_20px_70px_rgba(0,0,0,0.3)] relative z-10 overflow-hidden border border-white/20">
                    <div className="p-6 sm:p-12 md:p-16">
                        <ContactForm />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
