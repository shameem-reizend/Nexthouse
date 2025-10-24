import type { ProductType } from "../../pages/product/Products";
import { Button } from "../ui/button";

const ProductDisplay = ({ product }: { product: ProductType }) => {
  return (
    <div
      key={product.product_id}
      className="mx-auto flex flex-col w-full sm:w-full md:w-[300px] lg:w-[350px] h-[400px] bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700m overflow-hidden"
      style={{
        background: "#0f172a",
        backgroundImage:
          "radial-gradient(circle at 10% 20%, rgba(199, 92, 244, 0.1) 0%, transparent 20%)",
      }}
    >
      <img
        className="w-full h-[200px] object-cover"
        src={product.image}
        alt="product image"
      />
      <div className="flex flex-col justify-between px-5">
        <div>
          <h5 className="text-lg font-semibold text-white dark:text-white mt-2">
            {product.name}
          </h5>
          <div className="flex items-center mt-2.5 mb-5">
            <p className="text-gray-300 text-md line-clamp-2">
              {product.description.slice(0, 35)}
            </p>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-gray-300 text-sm font-medium">John Doe</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {product.price ? (
            <span className="text-emerald-500 font-bold text-lg mt-3">
              Rs.{product.price}
            </span>
          ) : (
            <span className="text-orange-500 font-bold text-lg mt-3">Free</span>
          )}
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
