import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { SearchFilters } from "@/hooks/useSearch";

interface SearchBarProps {
  filters: SearchFilters;
  onQueryChange: (query: string) => void;
  onSortChange: (sortBy: SearchFilters["sortBy"], sortOrder: SearchFilters["sortOrder"]) => void;
  onReset: () => void;
  totalResults: number;
}

export const SearchBar = ({ 
  filters, 
  onQueryChange, 
  onSortChange, 
  onReset, 
  totalResults 
}: SearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search coffee drinks or ingredients..."
          value={filters.query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {filters.query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onQueryChange("")}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSortChange("name", "asc")}>
              Name (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("name", "desc")}>
              Name (Z-A)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("ingredients", "asc")}>
              Ingredients (Fewer first)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("ingredients", "desc")}>
              Ingredients (More first)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {(filters.query || filters.sortBy !== "name" || filters.sortOrder !== "asc") && (
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground self-center">
        {totalResults} coffee{totalResults !== 1 ? 's' : ''} found
      </div>
    </div>
  );
};