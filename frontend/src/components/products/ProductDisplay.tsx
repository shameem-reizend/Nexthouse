import type { ProductType } from "../../pages/product/Products";
import { Button } from "../ui/button";

const ProductDisplay = ({ product }: { product: ProductType }) => {
  return (
    <div
      key={product.product_id}
      className="mx-auto flex flex-col w-full sm:w-full md:w-[300px] lg:w-[350px] h-[400px] bg-white border border-gray-200 rounded-lg shadow-md
       dark:bg-gray-800 dark:border-gray-700m 
       overflow-hidden"
      style={{}}
    >
      <img
        className="w-full h-[230px] object-cover hover:scale-105 transition-transform duration-300"
        src={product.image}
        alt="product image"
      />
      <div className="flex flex-col justify-between flex-1 px-4 py-3">
        <div>
          <h5 className="text-lg font-semibold mt-1 text-slate-800 dark:text-white  capitalize line-clamp-1">
            {product.name}
          </h5>
          <p className="text-gray-700 text-md line-clamp-2">
            {product.description.slice(0, 35)}
          </p>

          <div className="flex items-center gap-3 mt-4 ">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              John Doe
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-1 ">
          {product.price ? (
            <span className="text-emerald-500 font-bold text-lg">
              Rs.{product.price}
            </span>
          ) : (
            <span className="text-orange-500 font-bold text-lg">Free</span>
          )}
          <Button 
          // className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;

// background: "#0f172a",
// backgroundImage:
// "radial-gradient(circle at 10% 20%, rgba(199, 92, 244, 0.1) 0%, transparent 20%)",
