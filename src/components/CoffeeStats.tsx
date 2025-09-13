import { Coffee as CoffeeData } from "@/types/coffee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coffee, Heart, TrendingUp, Zap } from "lucide-react";

interface CoffeeStatsProps {
  coffees: CoffeeData[];
  favoriteCount: number;
}

export const CoffeeStats = ({ coffees, favoriteCount }: CoffeeStatsProps) => {
  const totalCoffees = coffees.length;
  
  // Get most common ingredients
  const ingredientCounts = coffees.reduce((acc, coffee) => {
    if (Array.isArray(coffee.ingredients)) {
      coffee.ingredients.forEach(ingredient => {
        acc[ingredient] = (acc[ingredient] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const topIngredients = Object.entries(ingredientCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const averageIngredients = totalCoffees > 0 
    ? (Object.values(ingredientCounts).reduce((sum, count) => sum + count, 0) / totalCoffees).toFixed(1)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Coffee Drinks</CardTitle>
          <Coffee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCoffees}</div>
          <p className="text-xs text-muted-foreground">Available drinks</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Your Favorites</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{favoriteCount}</div>
          <p className="text-xs text-muted-foreground">Saved drinks</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Ingredients</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageIngredients}</div>
          <p className="text-xs text-muted-foreground">Per drink</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Ingredient</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold truncate">
            {topIngredients[0]?.[0] || "None"}
          </div>
          <p className="text-xs text-muted-foreground">
            {topIngredients[0]?.[1] || 0} drinks
          </p>
        </CardContent>
      </Card>

      {topIngredients.length > 1 && (
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Popular Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {topIngredients.map(([ingredient, count]) => (
                <Badge key={ingredient} variant="outline" className="text-xs">
                  {ingredient} ({count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};