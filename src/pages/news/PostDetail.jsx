import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/layout/Layout";
import AuroraHero from "@/components/premium/AuroraHero";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    User,
    ArrowLeft,
    MapPin,
    Clock,
    Check,
    Copy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

// Import Hooks
import { useNews } from "@/hooks/useNews";
import { useBlogs } from "@/hooks/useBlogs";
import { useEvent } from "@/hooks/useEvent";

// --- Presentation Component ---
const PostDetailView = ({
    data,
    typeLabel,
    backLink,
    backLabel,
    displayLabel,
}) => {
    const [isCopied, setIsCopied] = useState(false);

    if (!data) return null;

    // Normalize data
    const { title, date, author, location, time, image, description } = data;

    // Format Date safely
    const formattedDate = date
        ? new Date(date).toLocaleDateString([], {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        toast.success("Link copied to clipboard!", {
            style: {
                background: "#333",
                color: "#fff",
            },
        });

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <Layout>
            <AuroraHero
                title={title}
                compact={true}
                backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
            />

            <div className="container px-4 mx-auto py-12">

                <Link
                    to={backLink}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to {backLabel}
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Main Image */}
                        <div className="bg-card border rounded-3xl overflow-hidden shadow-xl aspect-video relative group">
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="bg-card/50 border rounded-3xl p-6 md:p-10 shadow-sm">
                            <div
                                className="prose prose-lg dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />

                            <div className="border-t mt-12 pt-8 flex justify-between items-center">
                                <div className="text-muted-foreground font-medium">
                                    Share this article:
                                </div>
                                <div className="relative">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full relative"
                                        onClick={handleCopyLink}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isCopied ? (
                                                <motion.div
                                                    key="check"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                >
                                                    <Check className="h-4 w-4" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="copy"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    exit={{ scale: 0 }}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                    {/* Sidebar / Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        {/* Info Card */}
                        <div className="sticky top-24 space-y-4">
                            {/* Date Pill */}
                            {date && (
                                <div className="bg-card border rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                        <Calendar className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Date</p>
                                        <p className="font-semibold">{formattedDate}</p>
                                    </div>
                                </div>
                            )}

                            {/* Author Pill */}
                            {author && (
                                <div className="bg-card border rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Author</p>
                                        <p className="font-semibold">{author}</p>
                                    </div>
                                </div>
                            )}

                            {/* Location Pill (Events) */}
                            {location && (
                                <div className="bg-card border rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Location</p>
                                        <p className="font-semibold">{location}</p>
                                    </div>
                                </div>
                            )}

                            {/* Time Pill (Events) */}
                            {time && (
                                <div className="bg-card border rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Time</p>
                                        <p className="font-semibold">{time}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

// --- Loading Component ---
const LoadingView = ({ backLink, backLabel, displayLabel }) => (
    <Layout>
        <AuroraHero
            title={displayLabel}
            compact={true}
            backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
        />
        <div className="container px-4 mx-auto py-12">
            <div className="flex items-center gap-2 mb-8">
                <Skeleton className="h-4 w-24" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="aspect-video w-full rounded-3xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <Skeleton className="h-20 w-full rounded-2xl" />
                    <Skeleton className="h-20 w-full rounded-2xl" />
                    <Skeleton className="h-20 w-full rounded-2xl" />
                </div>
            </div>
        </div>
    </Layout>
);

// --- Error/Not Found Component ---
const ErrorView = ({ backLink, backLabel }) => (
    <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Post Not Found</h1>
            <Link to={backLink}>
                <Button>Back to {backLabel}</Button>
            </Link>
        </div>
    </Layout>
);

// --- Wrappers ---

const BlogPost = () => {
    const { slug } = useParams();
    const { blogData, isLoading, error } = useBlogs(slug);

    // The API might return an array with one item or the object directly. Handle both.
    const data =
        Array.isArray(blogData) && blogData.length > 0
            ? blogData[0]
            : blogData || null;

    useEffect(() => {
        if (error) toast.error("Failed to load blog post");
    }, [error]);

    if (isLoading)
        return (
            <LoadingView
                backLink="/blogs"
                backLabel="Blogs"
                displayLabel="Insights"
            />
        );

    // If we're done loading and don't have data, or have an error
    if (!data || error) return <ErrorView backLink="/blogs" backLabel="Blogs" />;

    return (
        <PostDetailView
            data={data}
            backLink="/blogs"
            backLabel="Blogs"
            displayLabel="Insights"
        />
    );
};

const NewsPost = () => {
    const { slug } = useParams();
    const { news, isLoading, error } = useNews(slug);

    const data = Array.isArray(news) && news.length > 0 ? news[0] : news || null;

    useEffect(() => {
        if (error) toast.error("Failed to load news post");
    }, [error]);

    if (isLoading)
        return (
            <LoadingView
                backLink="/news"
                backLabel="News"
                displayLabel="News & Updates"
            />
        );

    if (!data || error) return <ErrorView backLink="/news" backLabel="News" />;

    return (
        <PostDetailView
            data={data}
            backLink="/news"
            backLabel="News"
            displayLabel="News & Updates"
        />
    );
};

const EventPost = () => {
    const { slug } = useParams();
    const { eventData, isLoading, error } = useEvent(slug);

    const data =
        Array.isArray(eventData) && eventData.length > 0
            ? eventData[0]
            : eventData || null;

    useEffect(() => {
        if (error) toast.error("Failed to load event details");
    }, [error]);

    if (isLoading)
        return (
            <LoadingView
                backLink="/events-media"
                backLabel="Events"
                displayLabel="Events & Media"
            />
        );

    if (!data || error)
        return <ErrorView backLink="/events-media" backLabel="Events" />;

    return (
        <PostDetailView
            data={data}
            backLink="/events-media"
            backLabel="Events & Media"
            displayLabel="Events & Media"
        />
    );
};

// --- Main Router Component ---
export default function PostDetail() {
    const { pathname } = useLocation();

    const isBlog = pathname.includes("/blogs");
    const isEvent = pathname.includes("/events-media");

    if (isBlog) return <BlogPost />;
    if (isEvent) return <EventPost />;
    return <NewsPost />;
}
