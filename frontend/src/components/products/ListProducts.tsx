import { useState } from "react";
import type { ProductType } from "../../pages/product/Products";
import { FilterCategory } from "./FilterCategory";
import type { CategoryType } from "../../pages/product/MyProducts";

const ListProducts = ({
  products,
  category,
}: {
  products: ProductType[];
  category: CategoryType[] | null;
}) => {
  const items = ["On Sale", "Sold Out"];
  const [filter, setFilter] = useState<string>("On Sale");
  const [selectCategory, setSelectCategory] = useState("All");

  const filteredProducts =
    filter == "On Sale"
      ? products?.filter((p) => !p?.isSold)
      : filter == "Sold Out"
      ? products?.filter((p) => p?.isSold)
      : products;

  const handleTabChange = (tab: string) => {
    setFilter(tab);
  };

  const againfilter =
    selectCategory == "All"
      ? filteredProducts
      : filteredProducts.filter(
          (prod) => prod?.category.category_name == selectCategory
        );
  return (
    <div>
      {/* <div className="flex justify-between items-center"> */}
      <div className="flex justify-start ml-14 gap-4">
          {products?.length !== 0 &&
            items.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`pb-2 text-lg font-medium cursor-pointer ${
                  filter == tab
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
        </div>
        <div className="flex justify-end mr-14">
          <div className="my-6">
            <FilterCategory
              category={category}
              setSelectCategory={setSelectCategory}
            />
          </div>
        </div>
        
      {/* </div> */}
      <div className="min-w-full grid lg:grid-cols-2 xl:grid-cols-3 py-6">
        {againfilter.length == 0 ? (
          <div className="text-center font-bold text-1xl">
            No Products Available
          </div>
        ) : (
          againfilter?.map((product: ProductType) => (
            <div
              key={product?.product_id}
              className="flex  h-[200px]  border-b-2 bg-gray-100 overflow-hidden"
            >
              <div className="flex flex-col items-center justify-center  w-2/5 mx-auto">
                <img
                  className="h-[140px] w-[150px] object-cover rounded"
                  src={product?.image}
                  alt="product image"
                />
                <p className="text-gray-800 font-medium text-[14px] uppercase mt-2">
                  {product?.category?.category_name}
                </p>
              </div>

              <div className="flex flex-col items-start justify-evenly flex-1 px-4 py-3">
                <div>
                  <h5 className="text-lg font-semibold mt-1 text-gray-700 dark:text-white  capitalize line-clamp-1">
                    {product?.name}
                  </h5>
                  <p className="text-gray-500 text-md line-clamp-2">
                    {product?.description.slice(0, 35)}
                  </p>
                </div>
                <div>
                  {product.price ? (
                    <span className="text-emerald-500 font-bold text-lg">
                      Rs.{product.price}
                    </span>
                  ) : (
                    <span className="text-orange-500 font-bold text-lg">
                      Free
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListProducts;
