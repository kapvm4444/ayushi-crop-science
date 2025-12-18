import ProductDetails from "@/pages/ProductDetails";

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug } = params;
  return {
    title: `Product Details - ${slug} | Ayushi Crop Science`,
    description: "Detailed view of our agricultural product.",
  };
}

export default async function ProductDetailsPage(props) {
  const params = await props.params;
  const { slug } = params;
  return <ProductDetails slug={slug} />;
}
