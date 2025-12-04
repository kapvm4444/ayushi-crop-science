import { lazy, Suspense } from 'react'
import TopLoadingBar from '@/components/ui/loading-bar'
import { routesConfig } from '@/config/routes'

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const Products = lazy(() => import("./pages/Products"))
const ProductDetails = lazy(() => import("./pages/ProductDetails"))
const Contact = lazy(() => import("./pages/Contact"))
const Gallery = lazy(() => import("./pages/Gallery"))
const Careers = lazy(() => import("./pages/Careers"))
const JobApply = lazy(() => import("./pages/JobApply"))
const News = lazy(() => import("./pages/News"))
const NewsDetails = lazy(() => import("./pages/NewsDetails"))
const BecomeDealer = lazy(() => import("./pages/BecomeDealer"))
const ProductCategory = lazy(() => import("./pages/ProductCategory"))

// About Sub-pages
const WhoWeAre = lazy(() => import("./pages/about/WhoWeAre"))
const VisionMission = lazy(() => import("./pages/about/VisionMission"))
const USP = lazy(() => import("./pages/about/USP"))
const Infrastructure = lazy(() => import("./pages/about/Infrastructure"))
const Manufacturing = lazy(() => import("./pages/about/Manufacturing"))
const Environment = lazy(() => import("./pages/about/Environment"))
const CSR = lazy(() => import("./pages/about/CSR"))
const Testimonials = lazy(() => import("./pages/about/Testimonials"))

// Map component names to actual components
const componentMap = {
    "Home": Home,
    "About Us": About,
    "Products": Products,
    "Product Details": ProductDetails,
    "Product Category": ProductCategory,
    "Contact Us": Contact,
    "Gallery": Gallery,
    "Careers": Careers,
    "Job Apply": JobApply,
    "News & Updates": News,
    "News Details": NewsDetails,
    "Become a Dealer": BecomeDealer,

    // Sub-pages
    "Who We Are": WhoWeAre,
    "Vision & Mission": VisionMission,
    "Our USP": USP,
    "Infrastructure": Infrastructure,
    "Manufacturing": Manufacturing,
    "Environment": Environment,
    "CSR": CSR,
    "Testimonials": Testimonials,
}

// Generate routes from config
const routes = routesConfig.map(route => ({
    path: route.path,
    element: (
        <Suspense fallback={<TopLoadingBar />}>
            {componentMap[route.name] && (() => {
                const Component = componentMap[route.name]
                return <Component />
            })()}
        </Suspense>
    ),
}))

export default routes
