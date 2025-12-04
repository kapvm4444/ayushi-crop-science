import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function TopLoadingBar() {
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 800) // Simulate loading time
        return () => clearTimeout(timer)
    }, [location])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ scaleX: 0, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
                />
            )}
        </AnimatePresence>
    )
}
