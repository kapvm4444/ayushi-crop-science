import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import TopLoadingBar from "@/components/ui/loading-bar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import routes from "./routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";

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
        {import.meta.env.VITE_MODE === "development" && <ReactQueryDevtools />}
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
            <TopLoadingBar />
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#000",
                  color: "#fff",
                  border: "1px solid #333",
                },
              }}
            />
          </div>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
