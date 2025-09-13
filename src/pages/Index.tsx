import { CoffeeList } from "@/components/CoffeeList";
import { AppHeader } from "@/components/AppHeader";
import { useCoffee } from "@/hooks/useCoffee";
import { useFavorites } from "@/hooks/useFavorites";

const Index = () => {
  const { data: coffees } = useCoffee();
  const { getFavoriteCount } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <AppHeader 
        favoriteCount={getFavoriteCount()} 
        totalCoffees={coffees?.length || 0} 
      />
      
      <main className="container mx-auto px-4 py-8">
        <CoffeeList />
      </main>
    </div>
  );
};

export default Index;
