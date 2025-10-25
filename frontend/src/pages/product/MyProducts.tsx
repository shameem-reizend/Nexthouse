import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { fetchCategoryApi } from "../../api/modules/category.api";
import { HandshakeIcon } from "lucide-react";
import ListProducts from "../../components/products/ListProducts";
import { fetchUserProductsApi } from "../../api/modules/product.api";
import type { ProductType } from "./Products";

export interface CategoryType {
  category_id: string;
  category_name: string;
}

const MyProducts = () => {
  const [category, setCategory] = useState<CategoryType[] | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchingCategory = async () => {
    const response = await fetchCategoryApi();
    setCategory(response.data.data.categories);
  };
  const fetchingUserProducts = async () => {
    const response = await fetchUserProductsApi();
    setProducts(response.data.data);
  };
  useEffect(() => {
    fetchingCategory();
    fetchingUserProducts();
  }, []);
  return (
    <div>
      <div className="mx-auto mt-10 max-w-[85%] border border-gray-400 min-h-[350px] flex flex-col items-center justify-center">
        <HandshakeIcon size={"75px"} className="mb-8" />
        <p className="text-md font-bold md:text-xl  text-gray-800 dark:text-gray-100 mb-2">
          Start selling today — your product deserves to be seen!
        </p>
        <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
          List your product for free or set your own price and reach buyers
          quickly.
        </p>

        <div className="mt-10">
          <AddProduct category={category} onProductAdded={fetchingUserProducts}/>
        </div>
      </div>
      <div className="mx-auto max-w-[85%] mt-2  min-h-[400px]">
        <ListProducts products={products} />
      </div>
    </div>
  );
};

export default MyProducts;
