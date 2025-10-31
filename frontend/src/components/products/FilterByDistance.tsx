
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




export function FilterDistance({
  item,
  handleClickForLocation,
  position
}: {
  item: number[] | null;
  handleClickForLocation: (radius: number) => void | Promise<void>;
  position:string;
}) {
  
  
  const handleChange = (value: string) => {
    
  
    if (value === "All") handleClickForLocation(0);
    else handleClickForLocation(Number(value))
  
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          className="min-w-50 px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 text-sm font-medium rounded-xl flex items-center justify-between"
        >
          <span>Filter by Distance</span>
          <span className="truncate max-w-[100px] text-gray-900">
            {position}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleChange}>
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          {item?.map((ct: number,index) => (
            <DropdownMenuRadioItem key={index} value={ct.toString()}>
              {ct}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
