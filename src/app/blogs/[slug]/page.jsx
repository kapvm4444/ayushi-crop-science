import PostDetail from "@/pages/news/PostDetail";

export function generateMetadata({ params }) {
    const { slug } = params;
    return {
        title: `Blog - ${slug} | Ayushi Crop Science`,
    };
}

export default function BlogDetailPage() {
    return <PostDetail />;
}
