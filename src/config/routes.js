// Unified routes configuration for both React Router and Navbar
export const routesConfig = [
  {
    path: "/",
    name: "Home",
    showInNav: true,
  },
  {
    path: "/about",
    name: "About Us",
    showInNav: true,
    dropdown: [
      { name: "Who we are", href: "/about/who-we-are" },
      { name: "Vision & Mission", href: "/about/vision-mission" },
      { name: "Our USP", href: "/about/usp" },
      { name: "Infrastructure", href: "/about/infrastructure" },
      { name: "Manufacturing & QA", href: "/about/manufacturing" },
      { name: "Environment", href: "/about/environment" },
      { name: "CSR Activities", href: "/about/csr" },
      { name: "Testimonials", href: "/about/testimonials" },
    ],
  },
  {
    path: "/products",
    name: "Products",
    showInNav: true,
    dropdown: [{ name: "All Products", href: "/products" }],
  },
  {
    path: "/gallery",
    name: "Gallery",
    showInNav: true,
  },
  {
    path: "/news",
    name: "News & Updates",
    showInNav: true,
    dropdown: [
      { name: "News", href: "/news" },
      { name: "Events & Media", href: "/events-media" },
      { name: "Blogs", href: "/blogs" },
    ],
  },
  {
    path: "/careers",
    name: "Careers",
    showInNav: true,
  },
  {
    path: "/contact",
    name: "Contact Us",
    showInNav: true,
  },
  // Hidden routes for router generation
  {
    path: "/products/category/:categoryId",
    name: "Product Category",
    showInNav: false,
  },
  { path: "/products/:id", name: "Product Details", showInNav: false },
  { path: "/careers/apply/:id", name: "Job Apply", showInNav: false },

  // News & Blogs routes
  { path: "/events-media", name: "Events & Media", showInNav: false },
  { path: "/blogs", name: "Blogs", showInNav: false },
  { path: "/news/:slug", name: "Post Details", showInNav: false },
  { path: "/events-media/:slug", name: "Post Details", showInNav: false },
  { path: "/blogs/:slug", name: "Post Details", showInNav: false },

  { path: "/about/who-we-are", name: "Who We Are", showInNav: false },
  { path: "/about/vision-mission", name: "Vision & Mission", showInNav: false },
  { path: "/about/usp", name: "Our USP", showInNav: false },
  { path: "/about/infrastructure", name: "Infrastructure", showInNav: false },
  { path: "/about/manufacturing", name: "Manufacturing", showInNav: false },
  { path: "/about/environment", name: "Environment", showInNav: false },
  { path: "/about/csr", name: "CSR", showInNav: false },
  { path: "/about/testimonials", name: "Testimonials", showInNav: false },
  { path: "/become-dealer", name: "Become a Dealer", showInNav: false },
  { path: "/dealer-application", name: "Dealer Application", showInNav: false },
  { path: "static/:slug", name: "Static Page", showInNav: false },
];

// Export nav links for navbar (filtered to only show in nav)
export const navLinks = routesConfig
  .filter((route) => route.showInNav)
  .map((route) => ({
    name: route.name,
    href: route.path,
    active: true,
    dropdown: route.dropdown,
  }));
