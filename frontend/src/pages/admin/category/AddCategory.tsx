import { PlusCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useState } from "react";
import { AddCategoryAPI } from "../../../api/modules/category.api";
import { toast } from "react-toastify";

interface AddCategoryProps{
    getCategories:()=>void;
}
function AddCategory({getCategories}:AddCategoryProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await AddCategoryAPI({ category_name: name });
      if (response.success == true) {
        setName("");
        getCategories();
        toast.success("New Category Created");
        setOpen(false)
      }
    } catch (error) {
      console.log(error);
      toast.error("Category Creation Failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-500 text-white font-bold py-2 px-4  flex items-center gap-2 cursor-pointer"
          >
            <span>
              <PlusCircle />
            </span>
            New Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Enter your category details here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="category_name">Category Name</Label>
              <Input
                id="category_name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                className="cursor-pointer"
                onClick={handleCreateCategory}
              >
                Create Category
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default AddCategory;
