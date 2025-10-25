import { HeartIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export interface ProductProps {
  product_id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  isFree: boolean;
  isSold: boolean;
}

const removeLike = async (product_id: string) => {
  const response = await axios.delete("http://localhost:5000/liked", {
    data: { product_id },
    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
  });
  return response.data;
};

const Product = ({ product }: { product: ProductProps }) => {
  const queryClient = useQueryClient();

  const { name, description, price, isFree, isSold } = product;
  const { mutate } = useMutation({
    mutationFn: (product_id: string) => removeLike(product_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedProducts"] });
      toast.success("Removed from favorites");
    },
  });

  return (
    <div className="w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="relative md:w-2/5 w-full">
        <div className="overflow-hidden h-48 sm:h-52 md:h-full">
          <img
            src={
              "https://cdn.pixabay.com/photo/2015/01/09/02/45/laptop-593673_960_720.jpg"
            }
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Heart Button */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 cursor-pointer w-7 h-7 sm:w-9 sm:h-9 bg-white/90 flex justify-center items-center rounded-full shadow-md hover:scale-110 transition">
            <HeartIcon
              className="h-4 w-4 sm:h-5 sm:w-5 text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                mutate(product.product_id);
              }}
            />
          </div>

          {/* Sold Badge */}
          {isSold && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full uppercase tracking-wider">
                Sold Out
              </span>
            </div>
          )}

          {/* Free Badge */}
          {isFree && !isSold && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <span className="bg-green-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wide shadow-md">
                Free
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-3 sm:p-5 md:p-6 flex flex-col justify-between flex-1 bg-linear-to-br from-zinc-300 to-zinc-700 ">
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-slate-600 transition-colors">
            {name}
          </h3>
          <p className="text-white text-xs sm:text-sm md:text-base mb-2 sm:mb-3 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 sm:mt-3 flex-wrap gap-2 sm:gap-3">
          <div>
            {isFree ? (
              <span className="font-semibold tracking-wide text-white bg-green-700 py-0.5 px-2 sm:px-3 rounded-2xl uppercase text-xs sm:text-sm">
                Free
              </span>
            ) : (
              <span className="text-base sm:text-lg md:text-xl font-bold text-zinc-700">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ${
              isSold
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-zinc-700 text-white hover:bg-zinc-800 active:scale-95"
            }`}
            disabled={isSold}
          >
            {isSold ? "Sold Out" : isFree ? "Get Now" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
