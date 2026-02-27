# 💎 WebCraft | Pursuit of Digital Perfection

![WebCraft Banner](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop)

### [✨ View Live Demo](https://requirement-page.vercel.app)

WebCraft is a high-performance, luxury-grade landing page designed for cutting-edge digital agencies. It features a sophisticated animation pipeline, 3D interactive galleries, and a liquid-smooth user experience optimized for both desktops and low-end mobile devices.

---

## 🚀 Architectural Excellence

### ⚡ Performance-First Rendering
Built with a **GPU-Accelerated Animation Pipeline**, ensuring a consistent 60fps experience:
- **Zero Layout Thrashing**: Animates exclusively via `transform` and `opacity` to avoid CPU-heavy reflows.
- **Rendering Isolation**: Implements CSS `contain: layout paint` to minimize paint areas during scroll.
- **Hardware Promotion**: Key components are promoted to independent GPU composite layers using `translateZ(0)`.

### 🎭 Cinematic Motion Design
- **High-End Easing**: Unified `cubic-bezier(0.25, 0.46, 0.45, 0.94)` easing for a snappy, luxury feel.
- **Clip-Path Reveals**: Dynamic polygon masks that "slide open" images as you scroll into view.
- **Staggered Intros**: Container-aware child animations for rhythmic, non-linear entry effects.

### 🌊 Immersive Interactions
- **3D Circular Gallery**: A low-poly, high-performance OGL-powered 3D carousel for portfolio showcase.
- **Fluid Splash Cursor**: Real-time fluid simulation that responds to touch and mouse movements with minimal CPU overhead.

---

## 🛠️ Technology Stack

| Core | Styles | Motion |
| :--- | :--- | :--- |
| **Next.js 14** | **Tailwind CSS** | **Framer Motion** |
| **TypeScript** | **Vanilla CSS3** | **OGL (WebGL)** |
| **Lucide Icons** | **Google Fonts** | **Lottie-React** |

---

## 📱 Mobile-First Optimization
- **Momentum Scrolling**: Native-feeling `-webkit-overflow-scrolling: touch` for iOS.
- **Passive Listeners**: Lag-free scrolling on mobile via non-blocking touch event listeners.
- **Responsive Scaling**: Dynamic button and typography scaling optimized for one-handed thumb interaction.

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jeeva1121/Requirement-Page.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🌏 Deployment (Vercel)

This project is optimized for **Vercel** deployment.

1. Connect your Github repository to Vercel.
2. The `next.config.mjs` is already configured for optimal production builds.
3. Deploy with one click.

---

<div align="center">
  <p>Crafted with ❤️ by the WebCraft Team</p>
</div>
