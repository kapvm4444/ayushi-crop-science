import ProductDetails from "@/pages/ProductDetails";

export async function generateMetadata({ params }) {
    const { slug } = params;
    return {
        title: `Product Details - ${slug} | Ayushi Crop Science`,
        description: "Detailed view of our agricultural product.",
    };
}

export default function ProductDetailsPage({ params }) {
    const { slug } = params;
    return <ProductDetails slug={slug} />;
}
