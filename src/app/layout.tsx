import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
    title: "Build Dreams | The 3D Website Architect",
    description: "Sculpt your digital future in real-time 3D.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${plusJakarta.className} ${plusJakarta.variable} ${caveat.variable}`}>{children}</body>
        </html>
    );
}

