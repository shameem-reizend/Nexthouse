import { useCallback, useEffect, useState } from "react";
import { fetchProductsApi } from "../../api/modules/product.api";
import ProductDisplay from "../../components/products/ProductDisplay";

export interface ProductType {
  product_id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  isFree: boolean;
  isSold: boolean;
  category: {
    category_id: string;
    category_name: string;
  };
}

const Products = () => {
  const [products, setProducts] = useState<null | ProductType[]>(null);

  const items = ["All", "Free", "Paid"];

  const [filter, setFilter] = useState<string>("All");

  const handleTabChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  const filteredProducts =
    filter === "Free"
      ? products?.filter((p) => p.isFree)
      : filter == "Paid"
      ? products?.filter((p) => !p.isFree)
      : products;

  console.log("the filtered ", filteredProducts);

  const fetching = async () => {
    const response = await fetchProductsApi();
    setProducts(response.data.data);
  };

  useEffect(() => {
    fetching();
  }, []);
  return (
    <div className="min-h-screen w-full py-10 px-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
          🛒 Explore Our Marketplace
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Discover high-quality products from various categories. Add them to
          your cart and enjoy seamless shopping!
        </p>
      </div>
      <div className="flex justify-center gap-4 mb-6 border-b border-gray-300 ">
        {items.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-2 text-sm font-medium ${
              filter == tab
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-indigo-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Products Grid */}
      <div
        className="w-full grid gap-8 px-6 py-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg 
        grid-cols-[repeat(auto-fit,minmax(300px,1fr))] dark:bg-gray-900/80"
      >
        {filteredProducts?.length === 0 ? (
          <div className="text-center text-gray-500 col-span-full py-10 text-lg font-medium">
            Nothing to show
          </div>
        ) : (
          filteredProducts?.map((prod: ProductType) => (
            <ProductDisplay key={prod.product_id} product={prod} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
