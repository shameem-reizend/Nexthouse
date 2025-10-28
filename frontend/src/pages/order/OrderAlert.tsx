import { toast } from "react-toastify"
import { createOrderAPI } from "../../api/modules/order.api"
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
} from "../../components/ui/alert-dialog"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom"

interface OrderAlertPropType {
    isSold: boolean,
    product_id: string,
    price: number
}

export const OrderAlert: React.FC <OrderAlertPropType> = ({isSold, product_id, price}) =>  {
    console.log(isSold)

    const navigate = useNavigate()

    const handleCreateOrder = async (product_id: string) => {
        try {
        const createdOrder = await createOrderAPI({product_id});
        if(createdOrder.success === true){
            toast.success('Order created');
            navigate('/order');
        }
        } catch (error) {
        console.log(error);
        toast.error("Failed to create order")
        }
        
    }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {!isSold ? (
              <Button
              // className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                {price ? "Buy Now" : "Get Now"}
              </Button>
            ) : (
              <Button
                disabled
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Sold out
              </Button>
            )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will create an order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleCreateOrder(product_id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
