import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryApi } from "../../api/modules/category.api";
import type { CategoryType } from "../../pages/product/MyProducts";
import { Filter, ChevronDown } from "lucide-react";

interface FilterProductProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterProduct = ({ filter, setFilter }: FilterProductProps) => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryApi,
  });

  const allCategories: CategoryType[] = categories?.data?.data?.categories ?? [];

  return (
    <div className="my-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 w-[220px] justify-between px-4 py-2"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-gray-700 font-medium">Filter</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-500 truncate max-[80px]">
              {filter || "Select"}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-60 bg-white rounded-xl shadow-lg border p-2 animate-in slide-in-from-top-1"
        align="start"
      >
         <DropdownMenuItem
            className="capitalize px-3 py-2 text-sm rounded-md cursor-pointer"
            onClick={() => setFilter("All")}
          >
            All
          </DropdownMenuItem>
        {/* CATEGORIES */}
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-gray-400 px-2">
          Categories
        </DropdownMenuLabel>
        <DropdownMenuGroup className="space-y-1 mb-2">
          {allCategories.map((category) => (
            <DropdownMenuItem
              key={category.category_name}
              className="capitalize px-3 py-2 text-sm  rounded-md cursor-pointer "
              onClick={() => setFilter(category.category_name)}
            >
              {category.category_name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* IS FREE */}
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-gray-400 px-2">
          Price Type
        </DropdownMenuLabel>
        <DropdownMenuGroup className="space-y-1 mb-2">
          <DropdownMenuItem
            className="capitalize px-3 py-2 text-sm rounded-md cursor-pointer"
            onClick={() => setFilter("Free")}
          >
            Free
          </DropdownMenuItem>
          <DropdownMenuItem
            className="capitalize px-3 py-2 text-sm rounded-md cursor-pointer"
            onClick={() => setFilter("Priced")}
          >
            Priced
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* IS SOLD */}
        <DropdownMenuLabel className="text-xs uppercase tracking-wide text-gray-400 px-2">
          Availability
        </DropdownMenuLabel>
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem
            className="capitalize px-3 py-2 text-sm rounded-md cursor-pointer"
            onClick={() => setFilter("Sold")}
          >
            Sold
          </DropdownMenuItem>
          <DropdownMenuItem
            className="capitalize px-3 py-2 text-sm rounded-md cursor-pointer"
            onClick={() => setFilter("Available")}
          >
            Available
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
};

export default FilterProduct;
