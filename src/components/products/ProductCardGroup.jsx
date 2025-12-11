import { ProductCard } from "./ProductCard";

export function ProductCardGroup({ products }) {
    if (!products || products.length === 0) return null;

    return (
        <div className="flex flex-wrap justify-center gap-8">
            {products.map((product, i) => (
                <div
                    key={product.id || i}
                    className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] xl:w-[calc(25%-2rem)] min-w-[300px]"
                >
                    <ProductCard product={product} index={i} />
                </div>
            ))}
        </div>
    );
}
