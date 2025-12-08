import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Toaster } from "sonner";
import TopLoadingBar from "@/components/ui/loading-bar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import routes from "./routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function AppRoutes() {
  const element = useRoutes(routes);
  if (!element) return null;
  return element;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
            <TopLoadingBar />
            <AppRoutes />
            <Toaster />
          </div>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
