import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import type { CategoryType } from "../../pages/product/MyProducts";

export function FilterCategory({
  category,
  setSelectCategory,
}: {
  category: CategoryType[] | null;
  setSelectCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [position, setPosition] = useState("All");

  const handleChange = (value: string) => {
    setPosition(value);
    setSelectCategory(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="min-w-40 px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 text-sm font-medium rounded-xl flex items-center justify-between"
        >
          <span>Filter by</span>
          <span className="truncate max-w-[100px] text-gray-900">
            {position === "All" ? "All" : position.slice(0, 15)}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleChange}>
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          {category?.map((ct: CategoryType) => (
            <DropdownMenuRadioItem value={ct.category_name}>
              {ct.category_name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
