import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Check, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import ConfirmDialog from "./ConfirmDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductForAdminAPI } from "../../api/modules/admin.api";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

export interface ProductProp {
  product_id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  isFree: boolean;
  isSold: boolean;
  isExchangeEnabled: boolean;
  user: {
    user_id: string;
    name: string;
    email: string;
  };
  category: {
    category_name: string;
  };
}

const ProductTable = ({ data }: { data: ProductProp[] }) => {
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState<string | undefined>(undefined);
  let total = 0;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (product_id: string) => deleteProductForAdminAPI(product_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      toast.success("Deleted successfully");
    },
    onError: () => toast.error("Something went wrong"),
  });

  const handleDelete = () => {
    if (!productId) return;
    mutate(productId);
  };

  return (
    <div className="bg-white p-3 w-full overflow-x-auto rounded-lg shadow-sm ">
      {show && (
        <ConfirmDialog
          open={show}
          setOpen={setShow}
          message="Are you sure to delete this product?."
          onConfirm={handleDelete}
        />
      )}
      <Table className="hidden xl:table mx-auto">
        <TableCaption>A list of complete products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="capitalize text-slate-500 text-xs sm:text-sm ">
              SI.NO
            </TableHead>
            <TableHead className="capitalize text-slate-500 text-xs sm:text-sm">
              name
            </TableHead>
            <TableHead className="capitalize text-slate-500 text-xs sm:text-sm ">
              category
            </TableHead>
            <TableHead className="capitalize text-slate-500 text-xs sm:text-sm">
              description
            </TableHead>
            <TableHead className="capitalize text-slate-500 text-xs sm:text-sm ">
              image
            </TableHead>
            <TableHead className="capitalize text-slate-500 text-xs sm:text-sm">
              price
            </TableHead>
            <TableHead className="capitalize text-slate-500 text-xs sm:text-sm ">
              isFree
            </TableHead>
            <TableHead className="capitalize text-slate-500 text-xs sm:text-sm ">
              isSold
            </TableHead>
            <TableHead className="capitalize text-slate-500 text-xs sm:text-sm ">
              User
            </TableHead>
            <TableHead className="capitalize text-slate-500 text-xs sm:text-sm">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-x-auto">
          {data.map((product, index) => {
            total = product.price + total;
            return (
              <TableRow key={product.product_id} className="text-xs sm:text-sm">
                <TableCell className="pl-4 ">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-center">{index + 1}</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Product-ID: {product.product_id}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="capitalize">{product.name}</TableCell>
                <TableCell className="capitalize">
                  {product.category.category_name}
                </TableCell>
                <TableCell className="capitalize">
                  {product.description}
                </TableCell>
                <TableCell className="">
                  <img
                    className="w-15 h-15"
                    src={product.image}
                    alt={product.name}
                  />
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="">
                  {product.isFree === true ? (
                    <Badge className="bg-emerald-600 uppercase">Free</Badge>
                  ) : (
                    <Badge
                      className="bg-slate-300 uppercase"
                      variant={"secondary"}
                    >
                      Priced
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="">
                  {product.isSold === true ? (
                    <Check className="text-emerald-400" />
                  ) : (
                    <X className="text-red-600" />
                  )}
                </TableCell>
                <TableCell className="">
                  <div className="flex flex-col">
                    <span>{product.user.email}</span>
                    <span className="capitalize">{product.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-3 ">
                    <Button
                      className="rounded-3xl text-xs font-medium px-2.5 bg-red-500 hover:bg-red-400"
                      disabled={isPending}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShow(true);
                        setProductId(product.product_id);
                      }}
                    >
                      {isPending ? "Processing" : "Delete"}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-end font-semibold">
              Total: {total}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="xl:hidden grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {data.map((product, index) => (
          <div
            key={index}
            className="flex flex-col min-h-50 border border-gray-200 rounded-lg shadow-sm p-4 bg-white"
          >
            <div className="flex min-h-[80%] gap-4">
              <div className=" sm:w-1/2">
                <p className="text-xs font-semibold text-gray-500 uppercase  tracking-wide mb-2">
                  {product.category.category_name}
                </p>
                <div className="sm:w-[70%]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-32 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:w-1/2 space-y-1">
                <p className="text-lg font-semibold text-gray-800 ">
                  {product.name.slice(0, 13)}..
                </p>
                <p className="text-sm font-medium text-gray-600">
                  ₹{product.price}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    product.isSold ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {product.isSold ? "Sold" : "Available"}
                </p>
                <p className="text-xs text-gray-500">
                  Seller: {product.user.name}
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center mt-4">
              <Button
                className="bg-red-100 text-red-700 hover:bg-red-200 active:bg-red-200 text-sm font-medium"
                disabled={isPending}
                onClick={(e) => {
                  e.stopPropagation();
                  setShow(true);
                  setProductId(product.product_id);
                }}
              >
                {isPending ? "Processing" : "Delete"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
