import { useState, useMemo } from "react";
import { Coffee } from "@/types/coffee";

export interface SearchFilters {
  query: string;
  sortBy: "name" | "ingredients";
  sortOrder: "asc" | "desc";
}

export const useSearch = (coffees: Coffee[] | undefined) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    sortBy: "name",
    sortOrder: "asc"
  });

  const filteredAndSortedCoffees = useMemo(() => {
    if (!coffees) return [];

    let filtered = coffees.filter((coffee) => {
      const title = coffee.title?.toLowerCase() || "";
      const ingredients = Array.isArray(coffee.ingredients) 
        ? coffee.ingredients.join(" ").toLowerCase() 
        : "";
      const query = filters.query.toLowerCase();
      
      return title.includes(query) || ingredients.includes(query);
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (filters.sortBy === "name") {
        const aTitle = a.title || "";
        const bTitle = b.title || "";
        comparison = aTitle.localeCompare(bTitle);
      } else if (filters.sortBy === "ingredients") {
        const aCount = Array.isArray(a.ingredients) ? a.ingredients.length : 0;
        const bCount = Array.isArray(b.ingredients) ? b.ingredients.length : 0;
        comparison = aCount - bCount;
      }
      
      return filters.sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [coffees, filters]);

  const updateQuery = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
  };

  const updateSort = (sortBy: SearchFilters["sortBy"], sortOrder: SearchFilters["sortOrder"]) => {
    setFilters(prev => ({ ...prev, sortBy, sortOrder }));
  };

  const resetFilters = () => {
    setFilters({
      query: "",
      sortBy: "name",
      sortOrder: "asc"
    });
  };

  return {
    filters,
    filteredAndSortedCoffees,
    updateQuery,
    updateSort,
    resetFilters
  };
};