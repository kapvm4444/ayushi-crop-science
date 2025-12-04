import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TextHoverEffect from "@/components/premium/TextHoverEffect";

const SOCIAL_LINKS_DATA = [
  { icon: <Facebook className="h-5 w-5" />, href: "#" },
  { icon: <Twitter className="h-5 w-5" />, href: "#" },
  { icon: <Instagram className="h-5 w-5" />, href: "#" },
  { icon: <Linkedin className="h-5 w-5" />, href: "#" },
];

const QUICK_LINKS_DATA = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const CONTACT_INFO_DATA = [
  {
    icon: <MapPin className="h-5 w-5 text-primary shrink-0" />,
    text: "123 Agriculture Lane, Green Valley, India",
  },
  {
    icon: <Phone className="h-5 w-5 text-primary shrink-0" />,
    text: "+91 98765 43210",
  },
  {
    icon: <Mail className="h-5 w-5 text-primary shrink-0" />,
    text: "info@ayushicrop.com",
  },
];

export default function Footer({
  brandName = "Ayushi Crop Science",
  brandDesc = "Empowering farmers with advanced crop protection solutions. We are dedicated to sustainable agriculture and higher yields.",
  socialLinks = SOCIAL_LINKS_DATA,
  quickLinks = QUICK_LINKS_DATA,
  contactInfo = CONTACT_INFO_DATA,
}) {
  const [socials] = useState(socialLinks);
  const [links] = useState(quickLinks);
  const [contacts] = useState(contactInfo);

  return (
    <footer className="bg-secondary/30 border-t pt-16 pb-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 relative z-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt={brandName}
                className="h-20 w-auto object-contain"
              />
              <span className="text-xl font-bold">{brandName}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {brandDesc}
            </p>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              {contacts.map((info, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  {info.icon}
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get updates on new products and farming tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Text Hover Effect Background */}
        <div className="w-full h-[15rem] md:h-[20rem] flex items-center justify-center relative opacity-20 mt-10">
          <TextHoverEffect text="ACS" />
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground relative z-10">
          <p>
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
