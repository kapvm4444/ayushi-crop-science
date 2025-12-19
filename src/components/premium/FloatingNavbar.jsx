"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCategories } from "@/hooks/useProducts";

export default function FloatingNavbar({
  navLinks = [],
  ctaText = "Get Quote",
  ctaLink,
  onCtaClick = () => {},
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState(null);
  const pathname = usePathname();

  const { data: categories } = useCategories();

  const logo = {
    text: "Ayushi Crop Science",
    src: "/logo@2x.png",
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function slugify(text) {
    return (
      text
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "") || ""
    );
  }

  const dynamicNavLinks = navLinks.map((link) => {
    if (link.name === "Products" && categories) {
      return {
        ...link,
        dropdown: [
          { name: "All Products", href: "/products" },
          ...categories.map((cat) => ({
            name: cat.name,
            href: `/products/category/${slugify(cat.name)}`,
          })),
        ],
      };
    }
    return link;
  });

  // Use dynamicNavLinks in the render
  const visibleLinks = dynamicNavLinks.filter((link) => link.active);

  return (
    <>
      <motion.header
        layout
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out pt-6",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-6 py-3 transition-all duration-500 ease-in-out",
            "backdrop-blur-md border shadow-xl rounded-full gap-5",
            isScrolled /*|| !isHomePage*/
              ? "w-[95%] 2xl:w-[70%] transition-all bg-white/5 dark:bg-black/5 border-green-500/60"
              : "w-[95%] 2xl:w-[90%] transition-all bg-transparent border-white/40 shadow-none",
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="transition-colors">
              <img
                src={logo.src}
                alt={logo.text}
                className="h-14 w-auto object-contain"
              />
            </div>
            <span
              className={cn(
                "text-lg font-bold bg-clip-text text-transparent hidden sm:block transition-colors",
                isScrolled /*|| !isHomePage*/
                  ? "bg-gradient-to-r from-primary to-green-700"
                  : "bg-gradient-to-r from-white to-white/80",
              )}
            ></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden  lg:flex items-center text-center gap-3">
            {visibleLinks.map((link, index) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {link.dropdown ? (
                  <div
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full flex items-center gap-1 cursor-default",
                      (
                        link.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(link.href)
                      )
                        ? "bg-primary text-white shadow-md"
                        : isScrolled
                          ? "text-primary hover:bg-primary hover:text-white [text-shadow:2px_2px_2px_rgba(0,0,0,0.2)]"
                          : "text-white hover:bg-white/20",
                    )}
                  >
                    {link.name}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full flex items-center gap-1",
                      (
                        link.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(link.href)
                      )
                        ? "bg-primary text-white shadow-md"
                        : isScrolled
                          ? "text-primary hover:bg-primary hover:text-white [text-shadow:2px_2px_2px_rgba(0,0,0,0.2)]"
                          : "text-white hover:bg-white/20",
                    )}
                  >
                    <div className="">{link.name}</div>
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.dropdown && hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/3 -translate-x-1/3 pt-4 w-56"
                    >
                      <div
                        className={cn(
                          "backdrop-blur-2xl rounded-xl shadow-2xl overflow-hidden p-2 border transition-all duration-300",
                          isScrolled /*|| !isHomePage*/
                            ? "bg-white/70 dark:bg-black/70 border-green-500/50"
                            : "bg-black/40 border-white/20",
                        )}
                      >
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-3 text-sm rounded-lg transition-colors font-medium",
                              isScrolled /*|| !isHomePage*/
                                ? "text-neutral-700 dark:text-neutral-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600"
                                : "text-white/90 hover:bg-white/10 hover:text-white",
                            )}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {ctaLink ? (
              <Link href={ctaLink}>
                <Button size="sm" className="rounded-full px-6 hidden lg:flex">
                  {ctaText}
                </Button>
              </Link>
            ) : (
              <Button
                size="sm"
                className="rounded-full px-6 hidden lg:flex"
                onClick={onCtaClick}
              >
                {ctaText}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden",
                isScrolled /*|| !isHomePage*/
                  ? "text-foreground"
                  : "text-white",
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
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-28 px-6 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 text-center pb-10">
              {visibleLinks.map((link, index) => (
                <div key={link.name} className="flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    {link.dropdown ? (
                      <div
                        onClick={() =>
                          setMobileExpandedIndex(
                            mobileExpandedIndex === index ? null : index,
                          )
                        }
                        className={cn(
                          "text-2xl font-medium transition-colors hover:text-primary cursor-pointer",
                          mobileExpandedIndex === index
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {link.name}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "text-2xl font-medium transition-colors hover:text-primary",
                          (
                            link.href === "/"
                              ? pathname === "/"
                              : pathname.startsWith(link.href)
                          )
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
                    {link.dropdown && (
                      <button
                        onClick={() =>
                          setMobileExpandedIndex(
                            mobileExpandedIndex === index ? null : index,
                          )
                        }
                        className="p-2"
                      >
                        <ChevronDown
                          className={cn(
                            "h-6 w-6 transition-transform",
                            mobileExpandedIndex === index ? "rotate-180" : "",
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {link.dropdown && mobileExpandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-4 mt-4 w-full bg-secondary/20 rounded-xl"
                      >
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="py-3 text-lg text-muted-foreground hover:text-primary transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
