import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import FloatingNavbar from "@/components/premium/FloatingNavbar";
import Footer from "@/layout/Footer";
import { navLinks } from "@/config/routes";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
});

export const metadata = {
    title: "Ayushi Crop Science",
    description: "Empowering farmers with advanced crop protection solutions.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
            <body className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
                <Providers>
                    <FloatingNavbar
                        navLinks={navLinks}
                        ctaText="Become a Dealer"
                        ctaLink="/become-dealer"
                    />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
