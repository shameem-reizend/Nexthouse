import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import type { CategoryType } from "./MyProducts";
import { Switch } from "../../components/ui/switch";
import React, {  useState } from "react";
import { addProductApi } from "../../api/modules/product.api";
import ExchangePolicy from "../../components/products/ExchangePolicy";
import { getAddressAPI } from "../../api/modules/address.api";
import NavigateAddress from "./NavigateAddress";

interface AddProductPropType {
  category: CategoryType[] | null;
  onProductAdded: () => void;
}
const AddProduct: React.FC<AddProductPropType> = ({
  category,
  onProductAdded,
}) => {
  const [open, setOpen] = useState(false);

  const [showAddressDialog, setShowAddressDialog] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectCategory, setSelectCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<number | "">("");
  const [free, setFree] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const[loading,setLoading]=useState(false)
  const [isExchangeEnabled, setExchangeEnabled] = useState(false);
  const [showPolicyDialog, setShowPolicyDialog] = useState(false);

  const handleExchangeToggle = (checked: boolean) => {
    if (checked) {
      setShowPolicyDialog(true);
    } else {
      setExchangeEnabled(false);
    }
  };
  const confirmExchangePolicy = () => {
    setExchangeEnabled(true);
    setShowPolicyDialog(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !selectCategory ||
      (!free && (price === "" || Number(price) <= 0))
    ) {
      alert("Please fill all required fields");
      return;
    }
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", free ? "0" : price.toString());
    productData.append("isFree", free.toString());
    productData.append("image", image!);
    productData.append("isExchangeEnabled", isExchangeEnabled.toString());
    console.log("productData",productData)

    try {
      setLoading(true)
      await addProductApi(selectCategory, productData);
      onProductAdded();
    } catch (error) {
      console.log(error);
      
    } finally {
      setName("");
      setDescription("");
      setSelectCategory("null");
      setPrice("");
      setFree(false);
      setOpen(false);
      setLoading(false)
    }
  };

  const handleAddProductClick = async () => {
    try {
      const response = await getAddressAPI();
      const address = response.data.address.address;
      const state = response.data.address.state;
      if (!address || !state) {
        setShowAddressDialog(true);
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };
  const handleClose=()=>{
    setShowAddressDialog(false)
    setOpen(false)
  }
  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <form>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddProductClick}
              variant="outline"
              className="bg-gray-600 text-white hover:bg-gray-700 hover:text-gray-200"
            >
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] md:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
              <DialogDescription className="mt-3">
                Provide information about your product so buyers can easily find
                it..
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter Product name "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Description</Label>
                <Input
                  id="username"
                  name="description"
                  placeholder="Add description about your product"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Select onValueChange={(value) => setSelectCategory(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a category</SelectLabel>
                      {category?.map((ct) => (
                        <SelectItem key={ct.category_id} value={ct.category_id}>
                          {ct.category_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center space-x-2">
                  <Label>Are you giving it for Free..!</Label>
                  <Switch
                    id="isFree"
                    checked={free}
                    onCheckedChange={() => setFree(!free)}
                  />
                  <Label htmlFor="isFree">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Label>Do you want to enable Exchange?</Label>
                  <Switch
                    id="isExchangeEnabled"
                    checked={isExchangeEnabled}
                    onCheckedChange={handleExchangeToggle}
                  />
                  <Label htmlFor="isExchangeEnabled">
                    {isExchangeEnabled ? "Enabled" : "No"}
                  </Label>
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>

                <Input
                  disabled={free}
                  id="price"
                  name="price"
                  type="number"
                  placeholder={
                    !free ? "Add Price" : "Thankyou for giving it free"
                  }
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </div>
              <div className="grid gap-3">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleSubmit} disabled={loading}>
                {loading?"Submitting":"Submit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
        <ExchangePolicy
          showPolicyDialog={showPolicyDialog}
          setShowPolicyDialog={setShowPolicyDialog}
          confirmExchangePolicy={confirmExchangePolicy}
        />

        <NavigateAddress
          setShowAddressDialog={setShowAddressDialog}
          showAddressDialog={showAddressDialog}
        />
      </Dialog>
    </>
  );
};

export default AddProduct;
