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
    },
    {
        path: "/products",
        name: "Products",
        showInNav: true,
    },
    {
        path: "/products/:id",
        name: "Product Details",
        showInNav: false, // Don't show dynamic routes in nav
    },
    {
        path: "/contact",
        name: "Contact",
        showInNav: true,
    },
]

// Export nav links for navbar (filtered to only show in nav)
export const navLinks = routesConfig
    .filter(route => route.showInNav)
    .map(route => ({
        name: route.name,
        href: route.path,
        active: true,
    }))
