import { toast } from "react-toastify";
import { createOrderAPI } from "../../api/modules/order.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Switch } from "../../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState } from "react";
import { useProducts } from "../../components/products/ProductProvider";

interface OrderAlertPropType {
  isSold: boolean;
  product_id: string;
  price: number;
  exchangeStatus: boolean;
}

export const OrderAlert: React.FC<OrderAlertPropType> = ({
  isSold,
  product_id,
  price,
  exchangeStatus,
}) => {
  const navigate = useNavigate();
  const [enableExchange, setEnableExchange] = useState(false);
  const { myProducts } = useProducts();

  const [selectedExchangeProductId, setSelectedExchangeProductId] =
    useState<string>("");

  const selected = myProducts.find(
    (p) => p.product_id === selectedExchangeProductId
  );
  const handleCreateOrder = async (product_id: string) => {
    try {
      const orderFormData = new FormData();
      orderFormData.append("product_id", product_id);
      orderFormData.append(
        "exchange_product_id",
        selectedExchangeProductId && selectedExchangeProductId
      );

      const createdOrder = await createOrderAPI(orderFormData);
      console.log("The order", createdOrder);
      if (createdOrder.success === true) {
        toast.success("Order created");
        navigate("/order");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create order");
    }
  };

  const handleClose = () => {
    setSelectedExchangeProductId("");
    setEnableExchange(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {!isSold ? (
          <Button>{price ? "Buy Now" : "Get Now"}</Button>
        ) : (
          <Button
            disabled
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Sold out
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will create an order.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {exchangeStatus ? (
          <>
            <h2 className="font-bold text-[18px] mt-3">
              This Product is available for an exchange
            </h2>

            <div className="flex items-center space-x-3">
              <Switch
                id="exchange-switch"
                checked={enableExchange}
                onCheckedChange={setEnableExchange}
              />
              <label htmlFor="exchange-switch" className="text-sm font-medium">
                Do you want to exchange with your product?
              </label>
            </div>

            {enableExchange && (
              <div className="mt-3">
                <label className="text-sm font-medium mb-2 block">
                  Select a product to exchange
                </label>
                <Select
                  value={selectedExchangeProductId}
                  onValueChange={setSelectedExchangeProductId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your product">
                      {selected ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={selected.image}
                            alt="selected"
                            className="w-8 h-8 object-cover rounded-md border border-gray-300 dark:border-slate-600"
                          />
                          <span className="font-medium text-slate-800 dark:text-white">
                            {selected.name}
                          </span>
                        </div>
                      ) : null}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="min-w-full">
                    {myProducts.length > 0 ? (
                      myProducts.map((p) => (
                        <SelectItem
                          key={p.product_id}
                          value={p.product_id}
                          className="w-full rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between gap-4 dark:border-slate-700 p-3">
                            <div className="shrink-0">
                              <img
                                src={p.image}
                                alt="product"
                                className="w-16 h-16 object-cover rounded-md border border-gray-300 dark:border-slate-600"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-base font-semibold text-slate-800 dark:text-white line-clamp-1">
                                {p.name}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                {p.description?.slice(0, 50)}...
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="text-gray-400 p-2 text-sm">
                        No products available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        ) : (
          <div className="mt-3 flex items-center gap-2">
            <span
              className={
                "text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
              }
            >
              No Exchange Available
            </span>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleCreateOrder(product_id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
