import FloatingNavbar from "@/components/premium/FloatingNavbar";
import Footer from "./Footer";
import { navLinks } from "@/config/routes";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <FloatingNavbar
        navLinks={navLinks}
        logo={{ text: "Ayushi Crop Science", src: "/logo.png" }}
        ctaText="Become a Dealer"
        ctaLink="/become-dealer"
      />

      {/* Main content area - grows to fill space */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
