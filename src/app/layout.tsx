import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat, Titan_One, Luckiest_Guy } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const titanOne = Titan_One({ weight: "400", subsets: ["latin"], variable: "--font-chunky" });
const luckiestGuy = Luckiest_Guy({ weight: "400", subsets: ["latin"], variable: "--font-frogie" });

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
            <body className={`${plusJakarta.className} ${plusJakarta.variable} ${caveat.variable} ${titanOne.variable} ${luckiestGuy.variable}`}>{children}</body>
        </html>
    );
}

