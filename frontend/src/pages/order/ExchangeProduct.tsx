import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import type { ProductType } from "../product/Products";

interface ExchangePolicyProps {
  showExchangeProductDialog: boolean;
  setShowExchangeProductDialog: (open: boolean) => void;
  product: ProductType | null;
}

function ExchangeProduct({
  showExchangeProductDialog,
  setShowExchangeProductDialog,
  product,
}: ExchangePolicyProps) {
  return (
    <Dialog
      open={showExchangeProductDialog}
      onOpenChange={setShowExchangeProductDialog}
    >
      <DialogContent className="sm:max-w-[580px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Exchangeable Product Details
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            View full details of this exchangeable product.
          </DialogDescription>
        </DialogHeader>

        {/* Product Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-4">
          <div className="h-40 w-40 border rounded-lg overflow-hidden shadow-sm">
            <img
              src={product?.image}
              alt={product?.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <p className="text-2xl font-semibold text-gray-700 capitalize">
              {product?.name}
            </p>
            <p className="text-sm text-gray-600 ">
              Category:{" "}
              <span className="font-medium text-gray-800">
                {product?.category?.category_name || "N/A"}
              </span>
            </p>
            <p className="text-gray-700 text-sm line-clamp-3">
              {product?.description || "No description available."}
            </p>
            {product?.price ?
            <p className="text-md font-semibold text-green-600">
             Price ₹{product?.price ? product.price : null}
            </p>:
            <p className="text-md font-semibold text-orange-600">Product marked as Free</p>
            }
          </div>
        </div>

        {/* Footer Buttons */}
        <DialogFooter className="flex justify-end mt-6">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => setShowExchangeProductDialog(false)}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ExchangeProduct;
