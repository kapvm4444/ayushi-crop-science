import { lazy, Suspense } from 'react'
import TopLoadingBar from '@/components/ui/loading-bar'
import { routesConfig } from '@/config/routes'

const Home = lazy(() => import("./pages/Home"))
const About = lazy(() => import("./pages/About"))
const Products = lazy(() => import("./pages/Products"))
const ProductDetails = lazy(() => import("./pages/ProductDetails"))
const Contact = lazy(() => import("./pages/Contact"))

// Map component names to actual components
const componentMap = {
    "Home": Home,
    "About Us": About,
    "Products": Products,
    "Product Details": ProductDetails,
    "Contact": Contact,
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
