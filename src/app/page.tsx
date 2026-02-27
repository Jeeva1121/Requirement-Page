"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircularGallery from "@/components/CircularGallery";
import SplashCursor from "@/components/SplashCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Image from "next/image";

import { motion } from "framer-motion";
import { ArrowRight, Send, Globe, Brain, Box } from "lucide-react";

// Portfolio items for CircularGallery
const portfolioGalleryItems = [
    { image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2564&auto=format&fit=crop", text: "Web Design" },
    { image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop", text: "Mobile Apps" },
    { image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", text: "Dashboards" },
    { image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=2670&auto=format&fit=crop", text: "Branding" },
    { image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2670&auto=format&fit=crop", text: "UX Design" },
    { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", text: "SaaS" },
];

const services = [
    {
        title: "Web Platforms",
        desc: "Scalable, high-performance web applications built with precision and purpose.",
        image: "/web-dev.png",
    },
    {
        title: "App Development",
        desc: "Native and cross-platform mobile apps that deliver seamless experiences on every device.",
        image: "/app-dev.jpg",
    },
    {
        title: "3D & Blender",
        desc: "Stunning 3D visuals, product renders, and immersive experiences crafted in Blender.",
        image: "/blender-3d.png",
    },
    {
        title: "AI Solutions",
        desc: "Intelligent automation and AI-powered tools that transform how your business operates.",
        image: "/ai-management.jpg",
    },
];

const processSteps = [
    { step: "01", title: "Sprint Planning", desc: "We break your project into manageable sprints — defining user stories, priorities, and deliverables for each cycle." },
    { step: "02", title: "Design Sprint", desc: "Rapid prototyping and user testing within focused design sprints to validate ideas before development begins." },
    { step: "03", title: "Agile Development", desc: "Iterative development in 2-week sprints with daily standups, continuous integration, and real-time progress tracking." },
    { step: "04", title: "Ship & Iterate", desc: "Continuous delivery with sprint reviews, retrospectives, and data-driven improvements after every release." },
];

// Animation variants
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
};

const imageReveal = {
    hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", scale: 1.1, opacity: 0 },
    visible: {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        scale: 1,
        opacity: 1,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const itemScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
    return (
        <main className="relative min-h-screen" style={{ backgroundColor: '#F8FAFC', color: '#1A1A1A' }}>
            <LoadingScreen />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            >
                <SplashCursor />
            </motion.div>
            <Navbar />

            {/* ═══════════════════════════════════════════════════
                HERO — Full Video Background
            ═══════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-end overflow-hidden">

                {/* Full background video */}
                <div className="absolute inset-0 w-full h-full">
                    <video
                        src="/videos/hero-4k.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Gradient overlays for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                {/* Text content */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pb-16 sm:pb-20 lg:pb-28 pt-32">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] text-white max-w-4xl"
                        style={{ fontFamily: 'var(--font-sans)' }}
                    >
                        We build <br className="hidden sm:block" />
                        <span style={{ fontFamily: 'var(--font-caveat)' }} className="text-5xl sm:text-6xl md:text-8xl lg:text-[100px] xl:text-[120px] leading-[0.8] inline-block mt-3 text-[#7DD3FC]">beautiful</span><br />
                        websites.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base sm:text-lg text-white/70 mt-6 mb-8 sm:mb-10 font-medium leading-relaxed max-w-lg"
                    >
                        From stunning landing pages to powerful web applications, we craft interactive digital experiences that elevate your brand.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 items-start"
                    >
                        <motion.a
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="#requirements"
                            className="group inline-flex items-center justify-center sm:justify-start gap-3 px-4 sm:pl-7 sm:pr-2 py-2.5 sm:py-2.5 bg-white text-[#1A1A1A] font-bold rounded-full hover:bg-gray-100 transition-all hover:shadow-xl shadow-[0_8px_30px_rgba(255,255,255,0.15)] whitespace-nowrap"
                        >
                            <span className="text-[14px] sm:text-[16px]">Start Project</span>
                            <motion.span
                                whileHover={{ rotate: -35 }}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-transform shrink-0"
                            >
                                <ArrowRight className="w-4 h-4 text-white" />
                            </motion.span>
                        </motion.a>
                        <motion.a
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="#portfolio"
                            className="group inline-flex items-center justify-center sm:justify-start gap-3 px-4 sm:pl-7 sm:pr-2 py-2.5 sm:py-2.5 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all text-center whitespace-nowrap"
                        >
                            <span className="text-[14px] sm:text-[16px]">Portfolio</span>
                            <motion.span
                                whileHover={{ rotate: -35 }}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform shrink-0"
                            >
                                <ArrowRight className="w-4 h-4 text-white" />
                            </motion.span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                ABOUT — bg: #F4F3EF (cream)
            ═══════════════════════════════════════════════════ */}
            <section className="py-12 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden anim-wrapper" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-20px" }}
                            className="space-y-8 relative z-10"
                        >
                            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#F0EEFF', color: '#6B4EFF' }}>
                                <span className="text-sm font-bold tracking-wide uppercase">Who We Are</span>
                            </motion.div>

                            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]" style={{ color: '#1A1A1A', fontFamily: 'var(--font-sans)' }}>
                                We design digital <br className="hidden sm:block" />
                                experiences with <br className="hidden sm:block" />
                                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block mt-2" style={{ fontFamily: 'var(--font-caveat)', color: '#FF9F1C' }}>purpose</span>
                            </motion.h2>

                            <motion.p variants={fadeUp} custom={2} className="text-lg leading-relaxed max-w-lg" style={{ color: '#666666' }}>
                                We combine artistic vision with engineering excellence. We don’t just build websites; we craft interactive, beautiful digital platforms designed specifically to help your brand grow and succeed.
                            </motion.p>

                            <motion.div variants={fadeUp} custom={3}>
                                <a
                                    href="#contact"
                                    className="group inline-flex items-center gap-3 pl-8 pr-2 py-2 bg-[#FF9F1C] text-white font-bold rounded-full hover:bg-[#E88D0C] transition-all hover:-translate-y-1 hover:shadow-xl shadow-[0_8px_30px_rgba(255,159,28,0.35)]"
                                >
                                    <span className="text-[16px]">Learn More</span>
                                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:rotate-[-35deg]">
                                        <ArrowRight className="w-5 h-5 text-[#FF9F1C]" />
                                    </span>
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Image Container with Abstract Blob */}
                        <div className="flex justify-center relative w-full">
                            {/* Colorful background blob/shape behind image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 bg-[#FFD166] rounded-[60px] translate-x-6 translate-y-6 rotate-3 max-w-md w-full mx-auto"
                            />

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                whileHover={{ y: -10 }}
                                viewport={{ once: true, amount: 0.2 }}
                                variants={imageReveal}
                                className="relative aspect-[3/4] rounded-[32px] sm:rounded-[48px] overflow-hidden max-w-[280px] sm:max-w-md w-full border-4 border-white shadow-2xl"
                            >
                                <Image
                                    src="/about-creative.png"
                                    alt="Creative digital experiences"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 400px"
                                    className="object-cover transition-transform duration-700 hover:scale-110"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                SERVICES — Playful Grid
            ═══════════════════════════════════════════════════ */}
            <section id="services" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden anim-wrapper" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#BEE5FD] rounded-full blur-[120px] opacity-40 mix-blend-multiply pointer-events-none" />
                <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#FFD6E8] rounded-full blur-[120px] opacity-40 mix-blend-multiply pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col items-center text-center mb-20 space-y-6">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#E5DBFF', color: '#6B4EFF' }}>
                                <span className="text-sm font-bold tracking-wide uppercase">What We Do</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]" style={{ color: '#1A1A1A', fontFamily: 'var(--font-sans)' }}>
                                We Engineer <br />
                                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-2 inline-block" style={{ fontFamily: 'var(--font-caveat)', color: '#FF7B93' }}>Digital Impact</span>
                            </motion.h2>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                        {services.map((service, i) => {
                            return (
                                <motion.div
                                    key={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    whileHover={{ y: -8 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    variants={imageReveal}
                                    className="group bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100/80 gpu-accelerated"
                                >
                                    {/* Image Container */}
                                    <div
                                        className="relative h-[200px] overflow-hidden m-3 rounded-[20px]"
                                    >
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            style={i === 3 ? { objectPosition: 'center 20%' } : undefined}
                                        />
                                    </div>

                                    {/* Text Content */}
                                    <div className="px-6 pb-7 pt-4">
                                        <h3 className="text-[19px] font-bold tracking-tight mb-2" style={{ color: '#1A1A1A', fontFamily: 'var(--font-sans)' }}>
                                            {service.title}
                                        </h3>
                                        <p className="text-[14px] font-medium leading-[1.7]" style={{ color: '#888888' }}>
                                            {service.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                FEATURED PROJECT
            ═══════════════════════════════════════════════════ */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden anim-wrapper" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="bg-[#BEE5FD] rounded-[32px] sm:rounded-[48px] lg:rounded-[60px] p-6 sm:p-8 md:p-16 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center gap-10 sm:gap-16 gpu-accelerated">

                        {/* Playful Shapes bg */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-[40px] pointer-events-none" />
                        <div className="absolute bottom-10 left-10 grid grid-cols-5 gap-4 opacity-20">
                            {[...Array(25)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-blue-900" />)}
                        </div>

                        {/* Content */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="lg:w-1/2 space-y-10 relative z-10"
                        >
                            <div className="space-y-6">
                                <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-blue-900">
                                    <span className="text-sm font-bold tracking-wide uppercase">Featured Project</span>
                                </motion.div>
                                <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]" style={{ color: '#1A1A1A', fontFamily: 'var(--font-sans)' }}>
                                    The <br />
                                    <span className="text-5xl sm:text-6xl md:text-8xl" style={{ fontFamily: 'var(--font-caveat)', color: '#0096C7' }}>Standard</span><br />
                                    of excellence
                                </motion.h2>
                            </div>
                            <motion.p variants={fadeUp} custom={2} className="text-lg font-medium leading-relaxed text-[#4A4A4A]">
                                We create massive digital platforms. Immersive UI, heavy backend architecture, and bulletproof infrastructure—all wrapped in stunning interactive designs.
                            </motion.p>

                            <motion.a
                                variants={fadeUp}
                                custom={3}
                                href="#requirements"
                                className="group inline-flex items-center gap-3 pl-8 pr-2 py-2 bg-[#0096C7] text-white font-bold rounded-full hover:bg-[#0080AB] transition-all hover:-translate-y-1 hover:shadow-xl shadow-[0_8px_30px_rgba(0,150,199,0.35)]"
                            >
                                <span className="text-[16px]">Read Case Study</span>
                                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:rotate-[-35deg]">
                                    <ArrowRight className="w-5 h-5 text-[#0096C7]" />
                                </span>
                            </motion.a>
                        </motion.div>

                        {/* Project Image Panel */}
                        <div className="lg:w-1/2 w-full relative z-10">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                whileHover={{ scale: 1.02 }}
                                viewport={{ once: true, amount: 0.2 }}
                                variants={imageReveal}
                                className="relative aspect-[4/3] rounded-[48px] overflow-hidden border-8 border-white shadow-2xl bg-white rotate-2 transition-transform duration-700"
                            >
                                <Image
                                    src="/featured-project-v2.png"
                                    alt="Featured project showcase"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 hover:scale-110"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                PORTFOLIO
            ═══════════════════════════════════════════════════ */}
            <section id="portfolio" className="relative overflow-hidden anim-wrapper" style={{ backgroundColor: '#F8FAFC' }}>
                <div className="pt-24 lg:pt-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-center mb-8 space-y-6 flex flex-col items-center"
                        >
                            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-2" style={{ backgroundColor: '#FFD6E8', color: '#FF4D85' }}>
                                <span className="text-sm font-bold tracking-wide uppercase">Selected Work</span>
                            </motion.div>
                            <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{ color: '#1A1A1A', fontFamily: 'var(--font-sans)' }}>
                                Our massive <br className="md:hidden" />
                                <span className="text-5xl sm:text-6xl md:text-8xl inline-block mt-2" style={{ fontFamily: 'var(--font-caveat)', color: '#6B4EFF' }}>portfolio</span>
                            </motion.h2>
                        </motion.div>
                    </div>
                </div>
                {/* CircularGallery — full width, tall container for big cards */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative mt-10"
                >
                    <CircularGallery
                        items={portfolioGalleryItems}
                        bend={1.5}
                        textColor="#1A1A1A"
                        borderRadius={0.08}
                        font="bold 28px Inter"
                    />
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════
                PROCESS — bg: #A2B4C8 (sky blue)
            ═══════════════════════════════════════════════════ */}
            <section id="process" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative anim-wrapper" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="max-w-7xl mx-auto relative z-10 flex flex-col xl:flex-row gap-16 items-start">

                    {/* Left Text / Sticky Context */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="xl:w-1/3 xl:sticky xl:top-32 space-y-8"
                    >
                        <motion.h2 variants={fadeUp} custom={0} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]" style={{ color: '#1A1A1A', fontFamily: 'var(--font-sans)' }}>
                            Our <br className="hidden xl:block" />
                            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl" style={{ fontFamily: 'var(--font-caveat)', color: '#6B4EFF' }}>interactive</span>
                            <br className="hidden xl:block" />
                            features
                        </motion.h2>
                        <motion.p variants={fadeUp} custom={1} className="text-lg leading-relaxed max-w-lg" style={{ color: '#666666' }}>
                            Discover our fun and efficient workflow. We follow an agile methodology—delivering value in every sprint, adapting to feedback, and shipping with confidence.
                        </motion.p>
                        <motion.div variants={fadeUp} custom={2}>
                            <a
                                href="#requirements"
                                className="group inline-flex items-center gap-3 pl-8 pr-2 py-2 bg-[#6B4EFF] text-white font-bold rounded-full hover:bg-[#5A3DE8] transition-all hover:-translate-y-1 hover:shadow-xl shadow-[0_8px_30px_rgba(107,78,255,0.35)]"
                            >
                                <span className="text-[16px]">Get started</span>
                                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:rotate-[-35deg]">
                                    <ArrowRight className="w-5 h-5 text-[#6B4EFF]" />
                                </span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Cards Grid */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="xl:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full mt-10 xl:mt-0"
                    >

                        {/* Card 1 - Light Purple */}
                        <motion.div
                            variants={fadeUp}
                            custom={0}
                            className="relative p-7 sm:p-10 rounded-[32px] sm:rounded-[40px] overflow-hidden group min-h-[280px] sm:min-h-[320px] flex flex-col gpu-accelerated"
                            style={{ backgroundColor: '#E5DBFF' }}
                        >
                            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border-[20px] border-[#D1C0F9] opacity-70" />
                            <div className="absolute top-0 right-0 w-24 h-24 rounded-full border-[16px] border-[#D1C0F9] opacity-70" />

                            <div className="relative z-10 flex-col h-full justify-between flex flex-1">
                                <div className="w-14 h-14 rounded-[20px] bg-white flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                    <Brain className="w-6 h-6" style={{ color: '#1A1A1A' }} />
                                </div>
                                <div className="space-y-3 mt-auto pt-10">
                                    <h3 className="text-2xl font-bold tracking-tight" style={{ color: '#1A1A1A', fontFamily: 'var(--font-sans)' }}>Sprint Planning</h3>
                                    <p className="text-[16px] leading-relaxed" style={{ color: '#4A4A4A' }}>
                                        Mapping out user stories and breaking the project into manageable, high-impact sprints.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2 - Deep Purple */}
                        <motion.div
                            variants={fadeUp}
                            custom={1}
                            className="relative p-7 sm:p-10 rounded-[32px] sm:rounded-[40px] overflow-hidden group md:translate-y-12 min-h-[280px] sm:min-h-[320px] flex flex-col gpu-accelerated"
                            style={{ backgroundColor: '#6B4EFF' }}
                        >
                            <div className="absolute -top-4 -right-4 w-40 h-40 bg-[#8C74FF] rounded-full rotate-12 opacity-80" />
                            <div className="absolute top-10 right-10 w-16 h-16 bg-[#A693FF] rounded-full opacity-80" />

                            <div className="relative z-10 flex-col h-full justify-between flex flex-1">
                                <div className="w-14 h-14 rounded-[20px] bg-white/20 flex items-center justify-center shadow-sm backdrop-blur-sm transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                    <Box className="w-6 h-6 text-white" />
                                </div>
                                <div className="space-y-3 mt-auto pt-10">
                                    <h3 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-sans)' }}>Design Sprint</h3>
                                    <p className="text-[16px] leading-relaxed text-white/90">
                                        Rapid pixel-perfect UI concepts and quick validation before any code is written.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 3 - Warm Yellow */}
                        <motion.div
                            variants={fadeUp}
                            custom={2}
                            className="relative p-7 sm:p-10 rounded-[32px] sm:rounded-[40px] overflow-hidden group min-h-[280px] sm:min-h-[320px] flex flex-col mt-4 md:mt-0 gpu-accelerated"
                            style={{ backgroundColor: '#FFD166' }}
                        >
                            <div className="absolute top-8 right-8 grid grid-cols-4 gap-3 opacity-30">
                                {[...Array(16)].map((_, i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-black" />)}
                            </div>

                            <div className="relative z-10 flex-col h-full justify-between flex flex-1">
                                <div className="w-14 h-14 rounded-[20px] bg-white flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                    <Globe className="w-6 h-6" style={{ color: '#1A1A1A' }} />
                                </div>
                                <div className="space-y-3 mt-auto pt-10">
                                    <h3 className="text-2xl font-bold tracking-tight" style={{ color: '#1A1A1A', fontFamily: 'var(--font-sans)' }}>Agile Development</h3>
                                    <p className="text-[16px] leading-relaxed" style={{ color: '#4A4A4A' }}>
                                        Heavy-duty engineering in 2-week cycles with continuous CI/CD integration.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 4 - Soft Cyan */}
                        <motion.div
                            variants={fadeUp}
                            custom={3}
                            className="relative p-7 sm:p-10 rounded-[32px] sm:rounded-[40px] overflow-hidden group md:translate-y-12 min-h-[280px] sm:min-h-[320px] flex flex-col mt-4 md:mt-0 gpu-accelerated"
                            style={{ backgroundColor: '#BEE5FD' }}
                        >
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#9BD6FB] rounded-full" />
                            <div className="absolute bottom-16 right-16 w-12 h-12 bg-[#FFD166] rounded-full border-4 border-[#BEE5FD]" />

                            <div className="relative z-10 flex-col h-full justify-between flex flex-1">
                                <div className="w-14 h-14 rounded-[20px] bg-white flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                                    <Send className="w-6 h-6" style={{ color: '#1A1A1A' }} />
                                </div>
                                <div className="space-y-3 mt-auto pt-10">
                                    <h3 className="text-2xl font-bold tracking-tight" style={{ color: '#1A1A1A', fontFamily: 'var(--font-sans)' }}>Ship & Iterate</h3>
                                    <p className="text-[16px] leading-relaxed" style={{ color: '#4A4A4A' }}>
                                        Flawless deployment followed by data-driven refinements for peak performance.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                CONTACT FORM — Matching User Pinterest Image
            ═══════════════════════════════════════════════════ */}
            <section id="requirements" className="relative px-4 sm:px-6 py-16 sm:py-24 min-h-[auto] sm:min-h-[800px] flex items-center justify-center bg-gradient-to-b from-[#BAE6FD] to-[#E0F2FE] overflow-hidden anim-wrapper">

                {/* Cloud-like blurred background shapes */}
                <div className="absolute top-[20%] right-[20%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-white rounded-full blur-[80px] opacity-70 pointer-events-none" />
                <div className="absolute bottom-[10%] left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-white rounded-full blur-[100px] opacity-60 pointer-events-none" />

                <div className="max-w-[1100px] w-full mx-auto relative z-10 bg-white rounded-[24px] sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row p-2 sm:p-3 md:p-4">

                    {/* Left side: Video Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full md:w-1/2 relative rounded-[20px] sm:rounded-[32px] overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-[600px] group bg-black"
                    >
                        <motion.video
                            src="/videos/explore-bg.mp4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={imageReveal}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover rounded-[24px] shadow-2xl bg-black"
                            style={{ transform: 'scale(0.9)', transition: 'transform 0.5s ease-out' }}
                        />
                        {/* Shadow overlay so text pops safely */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                        <div className="absolute bottom-10 left-10 right-10 z-10">
                            <motion.h3
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="text-white text-4xl md:text-[54px] font-black uppercase tracking-tight leading-[1] mb-2"
                                style={{ fontFamily: 'var(--font-sans)', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                            >
                                EXPLORE.<br />
                                LEARN.<br />
                                GROW.
                            </motion.h3>
                        </div>
                    </motion.div>

                    {/* Right side: Login-style Minimalist Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-1/2 flex flex-col justify-center px-5 sm:px-8 py-8 sm:py-12 md:px-14 lg:px-20"
                    >
                        <div className="text-center mb-10 flex flex-col items-center">
                            <div className="w-14 h-14 bg-gray-50 flex items-center justify-center rounded-2xl mb-5 shadow-sm border border-gray-100">
                                <Send className="w-7 h-7 text-[#1A1A1A]" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight" style={{ color: '#1A1A1A', fontFamily: 'var(--font-sans)' }}>
                                GET IN TOUCH
                            </h2>
                            <p className="text-sm font-semibold text-gray-500 mt-2">
                                Enter your details to start your project.
                            </p>
                        </div>

                        <form className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="fullname" className="text-[13px] font-bold tracking-wide text-gray-700 ml-1">Name</label>
                                <input
                                    id="fullname"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-5 py-4 bg-[#F8FAFC] rounded-[16px] outline-none text-[15px] font-medium transition-all focus:ring-2 focus:ring-[#E5DBFF] focus:bg-white border border-gray-100 placeholder:text-gray-400"
                                    style={{ color: '#1A1A1A' }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-[13px] font-bold tracking-wide text-gray-700 ml-1">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-5 py-4 bg-[#F8FAFC] rounded-[16px] outline-none text-[15px] font-medium transition-all focus:ring-2 focus:ring-[#E5DBFF] focus:bg-white border border-gray-100 placeholder:text-gray-400"
                                    style={{ color: '#1A1A1A' }}
                                />
                            </div>
                            <div className="space-y-2 flex items-center gap-2 mt-4 ml-2">
                                <input type="checkbox" id="remember" className="rounded text-black focus:ring-black w-4 h-4" />
                                <label htmlFor="remember" className="text-xs font-semibold text-gray-600">Remember me</label>
                            </div>

                            <div className="pt-4 space-y-3">
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-[#1A1A1A] text-white text-[15px] font-bold rounded-[16px] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2"
                                >
                                    Submit Request
                                </button>

                                <button
                                    type="button"
                                    className="w-full py-4 bg-white text-[#1A1A1A] text-[15px] font-bold rounded-[16px] transition-all duration-300 border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-3"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Sign in with Google
                                </button>
                            </div>
                            <p className="text-xs text-center font-bold text-gray-500 mt-6">
                                Don&apos;t have an account? <span className="text-black cursor-pointer">Sign up</span>
                            </p>
                        </form>
                    </motion.div>

                </div>
            </section>

            <Footer />
        </main >
    );
}
