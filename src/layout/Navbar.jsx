import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS_DATA = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [navLinks] = useState(NAV_LINKS_DATA);
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
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-md",
                isScrolled || !isHomePage
                    ? "bg-background/80 border-border py-2 shadow-sm"
                    : "bg-transparent border-white/40 py-4",
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                        <Leaf className="h-6 w-6 text-primary" />
                    </div>
                    <span className={cn(
                        "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-700",
                        !isScrolled && isHomePage && "from-white to-white/80"
                    )}>
                        Ayushi Crop Science
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                location.pathname === link.href
                                    ? "text-primary"
                                    : isScrolled || !isHomePage
                                        ? "text-muted-foreground"
                                        : "text-white/80 hover:text-white",
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button size="sm" className="rounded-full px-6">
                        Get Quote
                    </Button>
                </nav>

                {/* Mobile Nav */}
                <Sheet>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <div className="flex flex-col gap-8 mt-8">
                            <div className="flex items-center gap-2">
                                <Leaf className="h-6 w-6 text-primary" />
                                <span className="text-lg font-bold">Ayushi Crop Science</span>
                            </div>
                            <nav className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-primary",
                                            location.pathname === link.href
                                                ? "text-primary"
                                                : "text-muted-foreground",
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Button className="w-full mt-4">Get Quote</Button>
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
