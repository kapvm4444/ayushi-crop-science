import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TextHoverEffect from "@/components/premium/TextHoverEffect";
import { useContact } from "@/hooks/useContact";
import { useCategories } from "@/hooks/useProducts";
import { useStaticPages } from "@/hooks/useStaticPages.js";

const SOCIAL_LINKS_DATA = [
  { icon: <Facebook className="h-5 w-5" />, href: "#" },
  { icon: <Twitter className="h-5 w-5" />, href: "#" },
  { icon: <Instagram className="h-5 w-5" />, href: "#" },
  { icon: <Linkedin className="h-5 w-5" />, href: "#" },
];

const QUICK_LINKS_DATA = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/about/who-we-are" },
  { name: "Vision & Mission", href: "/about/vision-mission" },
  { name: "Our USP", href: "/about/usp" },
  { name: "Infrastructure", href: "/about/infrastructure" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

// Helper function to slugify category names
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

export default function Footer({
  brandName = "Ayushi Crop Science",
  brandDesc = "Empowering farmers with advanced crop protection solutions. We are dedicated to sustainable agriculture and higher yields.",
  quickLinks = QUICK_LINKS_DATA,
}) {
  const { contactInfo } = useContact();
  const { data: categories } = useCategories();
  const [socials, setSocials] = useState(SOCIAL_LINKS_DATA);
  const [contactDetails, setContactDetails] = useState([]);
  const [productLinks, setProductLinks] = useState([]);
  const { staticPageData, isLoading, error } = useStaticPages();

  useEffect(() => {
    if (contactInfo) {
      // Update Socials
      const newSocials = [];
      if (contactInfo.facebook)
        newSocials.push({
          icon: <Facebook className="h-5 w-5" />,
          href: contactInfo.facebook,
        });
      if (contactInfo.twitter)
        newSocials.push({
          icon: <Twitter className="h-5 w-5" />,
          href: contactInfo.twitter,
        });
      if (contactInfo.instagram)
        newSocials.push({
          icon: <Instagram className="h-5 w-5" />,
          href: contactInfo.instagram,
        });
      if (contactInfo.youtube)
        newSocials.push({
          icon: <Youtube className="h-5 w-5" />,
          href: contactInfo.youtube,
        });

      if (newSocials.length > 0) setSocials(newSocials);

      // Update Contact Details
      const mainBranch =
        contactInfo.contactBranch?.find((b) => b.preferences === 1) ||
        contactInfo.contactBranch?.[0];
      const details = [];

      if (mainBranch) {
        details.push({
          icon: <MapPin className="h-5 w-5 text-green-400 shrink-0" />,
          text: mainBranch.address,
        });
        details.push({
          icon: <Phone className="h-5 w-5 text-green-400 shrink-0" />,
          text: mainBranch.contactno,
        });
      }
      if (contactInfo.email) {
        details.push({
          icon: <Mail className="h-5 w-5 text-green-400 shrink-0" />,
          text: contactInfo.email,
        });
      }
      setContactDetails(details);
    }
  }, [contactInfo]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const links = categories.map((cat) => ({
        name: cat.name,
        href: `/products/category/${slugify(cat.name)}`,
      }));
      setProductLinks(links);
    }
  }, [categories]);

  return (
    <footer className="bg-[#052e16] text-white border-t border-green-900 pt-20 pb-4 overflow-hidden relative font-sans">
      <div className="container mx-auto px-4 relative z-10 mb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/footer-widget-logo@2x.png"
                alt={brandName}
                className="h-16 w-auto object-contain"
              />
              <span className="text-2xl font-bold font-heading tracking-wide text-white">
                {brandName}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {brandDesc}
            </p>
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-full bg-green-900/50 flex items-center justify-center text-green-400 hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-green-400 font-heading">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="h-4 w-4 text-green-600 group-hover:text-green-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-green-400 font-heading">
              Our Products
            </h3>
            {productLinks.length > 0 ? (
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="h-4 w-4 text-green-600 group-hover:text-green-400 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3">
                <li key="all-products">
                  <Link
                    to="/products"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="h-4 w-4 text-green-600 group-hover:text-green-400 transition-colors" />
                    All Products
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-6 text-green-400 font-heading">
                Contact Us
              </h3>
              <ul className="space-y-4">
                {(contactDetails.length > 0
                  ? contactDetails
                  : [
                      {
                        icon: (
                          <MapPin className="h-5 w-5 text-green-400 shrink-0" />
                        ),
                        text: "Loading address...",
                      },
                      {
                        icon: (
                          <Mail className="h-5 w-5 text-green-400 shrink-0" />
                        ),
                        text: "info@ayushicrop.com",
                      },
                    ]
                ).map((info, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-400">
                    <div className="mt-1 p-2 rounded-lg bg-green-900/30 text-green-400">
                      {info.icon}
                    </div>
                    <span className="text-sm leading-relaxed whitespace-pre-line">
                      {info.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-green-400 font-heading">
                Newsletter
              </h3>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-12 w-full rounded-lg border border-green-800 bg-green-950/50 px-4 py-2 text-sm placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-transparent transition-all"
                />
                <Button className="w-full h-12 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all">
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Text Hover Effect - Desktop Only */}
        <div className="hidden md:flex w-full items-center justify-center py-8">
          <div className="w-full h-26 z-10">
            <TextHoverEffect
              text="AYUSHI CROP SCIENCE"
              duration={0}
              autoAnimate={true}
            />
          </div>
        </div>

        <div className="border-t border-green-900 mt-4 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {!isLoading &&
              staticPageData?.map((page) => (
                <Link
                  key={page.slug}
                  to={`/static/${page.slug}`}
                  className="hover:text-green-400 transition-colors"
                >
                  {page.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
