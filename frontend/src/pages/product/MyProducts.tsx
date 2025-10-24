import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { fetchCategoryApi } from "../../api/modules/category.api";
import { Handshake, HandshakeIcon } from "lucide-react";

export interface CategoryType {
  category_id: string;
  category_name: string;
}
const MyProducts = () => {
  const [category, setCategory] = useState<CategoryType[] | null>(null);

  const fetchingCategory = async () => {
    const response = await fetchCategoryApi();
    setCategory(response.data.data.categories);
  };
  useEffect(() => {
    fetchingCategory();
  }, []);
  return (
    <div>
      <div className="min-w-full border-2 min-h-[400px] flex flex-col items-center justify-center">
        <HandshakeIcon size={"75px"} className="mb-8"/>
        <p className="text-md font-bold md:text-xl  text-gray-800 dark:text-gray-100 mb-2">
          Start selling today — your product deserves to be seen!
        </p>
        <p className="text-sm font-medium text-slate-500 dark:text-gray-400">
          List your product for free or set your own price and reach buyers
          quickly.
        </p>

       <div className="mt-10">
         <AddProduct category={category} />
       </div>
      </div>
    </div>
  );
};

export default MyProducts;
