import { useState } from "react";
import { useCoffee } from "@/hooks/useCoffee";
import { useSearch } from "@/hooks/useSearch";
import { useFavorites } from "@/hooks/useFavorites";
import { CoffeeCard } from "./CoffeeCard";
import { SearchBar } from "./SearchBar";
import { CoffeeStats } from "./CoffeeStats";
import { CoffeeDetail } from "./CoffeeDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Coffee } from "@/types/coffee";

export const CoffeeList = () => {
  const { data: coffees, isLoading, error, refetch } = useCoffee();
  const { getFavoriteCount } = useFavorites();
  const { filters, filteredAndSortedCoffees, updateQuery, updateSort, resetFilters } = useSearch(coffees);
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="aspect-video w-full" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium text-destructive">Failed to load coffee data</h3>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!coffees || coffees.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No coffee drinks found</h3>
        <p className="text-muted-foreground">Check back later for more delicious options!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CoffeeStats coffees={coffees} favoriteCount={getFavoriteCount()} />
      
      <SearchBar
        filters={filters}
        onQueryChange={updateQuery}
        onSortChange={updateSort}
        onReset={resetFilters}
        totalResults={filteredAndSortedCoffees.length}
      />

      {filteredAndSortedCoffees.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No coffee drinks match your search</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          <Button onClick={resetFilters} variant="outline" className="mt-4">
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedCoffees.map((coffee) => (
            <CoffeeCard 
              key={coffee.id} 
              coffee={coffee} 
              onViewDetails={setSelectedCoffee}
            />
          ))}
        </div>
      )}

      <CoffeeDetail
        coffee={selectedCoffee}
        isOpen={!!selectedCoffee}
        onClose={() => setSelectedCoffee(null)}
      />
    </div>
  );
};