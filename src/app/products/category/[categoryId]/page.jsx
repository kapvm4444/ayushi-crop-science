import ProductCategory from "@/pages/ProductCategory";

export async function generateMetadata({ params }) {
    return {
        title: `Category - Ayushi Crop Science`,
    };
}

export default function CategoryPage() {
    return <ProductCategory />;
}
