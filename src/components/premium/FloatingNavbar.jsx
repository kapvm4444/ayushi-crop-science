import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FloatingNavbar({
  navLinks = [],
  logo = {
    text: "Ayushi Crop Science",
    icon: <Leaf className="h-6 w-6 text-primary" />,
  },
  ctaText = "Get Quote",
  onCtaClick = () => { },
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 transition-all duration-500 ease-in-out",
          isScrolled || !isHomePage ? "pt-4" : "pt-6",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-6 py-3 transition-all duration-500 ease-in-out",
            "backdrop-blur-md border shadow-xl rounded-full",
            isScrolled || !isHomePage
              ? "w-[85%] md:w-[70%] translate-y-2 bg-white/5 dark:bg-black/5 border-green-500/60"
              : "w-[95%] md:w-[90%] bg-transparent border-white/40 shadow-none",
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="transition-colors">
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.text}
                  className="h-14 w-auto object-contain"
                />
              ) : (
                logo.icon
              )}
            </div>
            <span
              className={cn(
                "text-lg font-bold bg-clip-text text-transparent hidden sm:block transition-all",
                isScrolled || !isHomePage
                  ? "bg-gradient-to-r from-primary to-green-700"
                  : "bg-gradient-to-r from-white to-white/80",
              )}
            >
              {logo.text}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks
              .filter((link) => link.active)
              .map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group",
                    location.pathname === link.href
                      ? "bg-primary text-white shadow-md"
                      : isScrolled || !isHomePage
                        ? "text-primary hover:bg-primary hover:text-white"
                        : "text-white hover:bg-white/20",
                  )}
                >
                  {link.name}
                </Link>
              ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              className="rounded-full px-6 hidden md:flex"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden",
                isScrolled || !isHomePage ? "text-foreground" : "text-white",
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-28 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks
                .filter((link) => link.active)
                .map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl font-medium transition-colors hover:text-primary",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              <Button
                size="lg"
                className="w-full mt-4 rounded-full"
                onClick={onCtaClick}
              >
                {ctaText}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
