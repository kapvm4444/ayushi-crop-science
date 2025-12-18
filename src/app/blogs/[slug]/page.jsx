import PostDetail from "@/pages/news/PostDetail";

export async function generateMetadata(props) {
    const params = await props.params;
    const { slug } = params;
    return {
        title: `Blog - ${slug} | Ayushi Crop Science`,
    };
}

export default function BlogDetailPage() {
    return <PostDetail />;
}
