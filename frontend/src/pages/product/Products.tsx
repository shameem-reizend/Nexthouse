import { useCallback, useEffect, useState } from "react";
import { fetchProductsApi } from "../../api/modules/product.api";
import ProductDisplay from "../../components/products/ProductDisplay";
import { useProducts } from "../../components/products/ProductProvider";

export interface ProductType {
  product_id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  isFree: boolean;
  isSold: boolean;
  isExchangeEnabled: boolean;
  category: {
    category_id: string;
    category_name: string;
  };
  user: UserType;
  likedBy: LikedByType[];
}
export interface LikedByType {
  id: string;
  user: UserType;
  product: ProductType;
}
export interface UserType {
  user_id: string;
  name: string;
  email: string;
  phone_number: string;
}

const Products = () => {
  // const [products, setProducts] = useState<null | ProductType[]>(null);
  const { user_id } = JSON.parse(localStorage.getItem("userData") || "{}");

  const { buyProducts, setBuyProducts } = useProducts();
  const items = ["All", "Free", "Paid"];

  const [filter, setFilter] = useState<string>("All");
  const [likedProducts, setLikedProducts] = useState<string[]>([]);

  const handleTabChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  const handleLike = (id: string) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const filteredProducts =
    filter === "Free"
      ? buyProducts?.filter((p) => p.isFree)
      : filter == "Paid"
      ? buyProducts?.filter((p) => !p.isFree)
      : buyProducts;

  const fetching = async () => {
    const response = await fetchProductsApi();
    setBuyProducts(response.data.data);
    const likedIds = response.data.data
      ?.filter((prod: ProductType) =>
        prod.likedBy.some((like: LikedByType) => like.user.user_id === user_id)
      )
      .map((prod: ProductType) => prod.product_id);
    if (likedIds) {
      setLikedProducts(likedIds);
    }
  };

  useEffect(() => {
    fetching();
  }, []);
  return (
    <div className="min-h-screen w-full">
      {/* Header Section */}
      <div className="text-center mb-15 min-w-full  flex flex-col md:flex-row">
        <div className=" md:flex-1 ">
          <img
            src="./shopping.png"
            alt="shpping_img"
            width={"50%"}
            className="w-[30%] md:w-[50%]"
          />
        </div>
        <div className=" flex-2 md:flex-3">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white pl-4 mt-6 ">
            Explore Our Marketplace
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl  mx-auto">
            Discover high-quality products from various categories. Add them to
            your cart and enjoy seamless shopping!
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-4  mb-6 border-b border-gray-300 ">
        {items.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-2 text-lg font-medium ${
              filter == tab
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Products Grid */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-900">
          <div className="container max-w-full mx-auto">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {filteredProducts?.length === 0 ? (
          <div className="text-center text-gray-500 col-span-full py-10 text-lg font-medium">
            No Products Available
          </div>
        ) : (
          filteredProducts?.map((prod: ProductType) => {
            return (
              <ProductDisplay
                key={prod.product_id}
                product={prod}
                liked={likedProducts}
                onLike={handleLike}
              />
            );
          })
        )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Products;
