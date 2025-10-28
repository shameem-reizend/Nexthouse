import { useEffect, useState } from "react";
import type { LikedByType, ProductType } from "../../pages/product/Products";
import { Button } from "../ui/button";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { likedApi } from "../../api/modules/liked.api";
import { toast as toastSooner } from "sonner";
import { OrderAlert } from "../../pages/order/OrderAlert";

const ProductDisplay = ({ product }: { product: ProductType }) => {
  const { user_id } = JSON.parse(localStorage.getItem("userData") || "{}");

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = product.likedBy.find(
      (item: LikedByType) => item.user.user_id === user_id
    );
    setIsLiked(!!liked);
  }, []);

  const handleLike = async () => {
    try {
      const response = await likedApi(product.product_id);
      console.log(response.data);
      if (response.message == "Deleted from Liked") {
        setIsLiked(false);
        toastSooner.error("Removed from Favourites");
      } else {
        setIsLiked(true);
        toastSooner.success("Added to Favourites");
      }
    } catch (error) {
      toastSooner.error("Error occured");
      console.log(error);
    }
  };

  return (
    <div
      key={product.product_id}
      className="mx-auto flex flex-col w-full sm:w-full md:w-[300px] lg:w-[350px] h-[400px] bg-white border border-gray-200 rounded-lg shadow-md
       dark:bg-gray-800 dark:border-gray-700m relative
       overflow-hidden"
      style={{
      }}
    >
      <img
        className="w-full h-[230px] object-cover hover:scale-105 transition-transform duration-300"
        src={product.image}
        alt="product image"
      />
      {product.isSold && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-semibold backdrop-blur-1xl">
          SOLD
        </div>
      )}
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
            <div>
              <p className="text-gray-800 dark:text-gray-400 text-[14px] font-medium">
                {product.user.name}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold">
                {product.user.email}
              </p>
            </div>
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
          <div className="flex gap-2">
            <Button
              onClick={handleLike}
              className="bg-gray-200 hover:bg-gray-300 text-white rounded-lg shadow-md hover:shadow-lg   transition-all duration-200"
            >
              {isLiked ? (
                <FaHeart className=" text-red-600 transition-transform duration-200 group-hover:scale-125" />
              ) : (
                <CiHeart className="text-red-700 transition-transform duration-200 group-hover:scale-125" />
              )}
            </Button>

            <OrderAlert isSold = {product.isSold} product_id ={product.product_id} price = {product.price} />

            {/* {!product.isSold ? (
              <Button
              onClick={() => handleCreateOrder(product.product_id)}
              // className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                {product?.price ? "Buy Now" : "Get Now"}
              </Button>
            ) : (
              <Button
                disabled
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Sold out
              </Button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
