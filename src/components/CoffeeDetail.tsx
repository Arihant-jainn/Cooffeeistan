import { Coffee } from "@/types/coffee";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Share2, X } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "@/hooks/use-toast";

interface CoffeeDetailProps {
  coffee: Coffee | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CoffeeDetail = ({ coffee, isOpen, onClose }: CoffeeDetailProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!coffee) return null;

  const title = coffee.title ?? "Unknown drink";
  const description = coffee.description ?? "No description available";
  const imageSrc = coffee.image || "/placeholder.svg";
  const ingredients = Array.isArray(coffee.ingredients) ? coffee.ingredients : [];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Coffee: ${title}`,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(
          `Check out this coffee: ${title} - ${description}`
        );
        toast({
          title: "Copied to clipboard",
          description: "Coffee details copied to clipboard!",
        });
      } catch (err) {
        toast({
          title: "Share failed",
          description: "Unable to share this coffee.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-xl font-bold pr-8">{title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={imageSrc}
              alt={`Coffee drink: ${title}`}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={isFavorite(coffee) ? "default" : "outline"}
              onClick={() => toggleFavorite(coffee)}
              className="flex-1 gap-2"
            >
              <Heart className={`h-4 w-4 ${isFavorite(coffee) ? "fill-current" : ""}`} />
              {isFavorite(coffee) ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
          
          {ingredients.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {coffee.id && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">Coffee ID: {coffee.id}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};