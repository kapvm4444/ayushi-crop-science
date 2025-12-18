import PostDetail from "@/pages/news/PostDetail";

export function generateMetadata({ params }) {
    const { slug } = params;
    return {
        title: `Event - ${slug} | Ayushi Crop Science`,
    };
}

export default function EventDetailPage() {
    return <PostDetail />;
}
