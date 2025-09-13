import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Eye } from "lucide-react";
import { Coffee } from "@/types/coffee";
import { useFavorites } from "@/hooks/useFavorites";

interface CoffeeCardProps {
  coffee: Coffee;
  onViewDetails: (coffee: Coffee) => void;
}

export const CoffeeCard = ({ coffee, onViewDetails }: CoffeeCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const title = coffee.title ?? "Unknown drink";
  const description = coffee.description ?? "No description available";
  const imageSrc = coffee.image || "/placeholder.svg";
  const ingredients = Array.isArray(coffee.ingredients) ? coffee.ingredients : [];

  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={`Coffee drink: ${title}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(coffee);
            }}
          >
            <Heart className={`h-4 w-4 ${isFavorite(coffee) ? "fill-current text-red-500" : ""}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(coffee);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Ingredients:</h4>
            <div className="flex flex-wrap gap-1">
              {ingredients.slice(0, 3).map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {ingredient}
                </Badge>
              ))}
              {ingredients.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{ingredients.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onViewDetails(coffee)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};