import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { Toaster } from 'sonner'
import TopLoadingBar from '@/components/ui/loading-bar'
import ScrollToTop from '@/components/ui/ScrollToTop'
import routes from './routes'

function AppRoutes() {
    const element = useRoutes(routes)
    if (!element) return null
    return element
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
                <TopLoadingBar />
                <AppRoutes />
                <Toaster />
            </div>
        </Router>
    )
}

export default App
