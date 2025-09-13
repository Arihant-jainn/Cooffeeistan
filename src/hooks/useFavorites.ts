import { useState, useEffect } from "react";
import { Coffee } from "@/types/coffee";
import { toast } from "@/hooks/use-toast";

const FAVORITES_KEY = "coffee-favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse favorites from localStorage");
      }
    }
  }, []);

  const updateFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const addToFavorites = (coffee: Coffee) => {
    if (!coffee.id) return;
    
    const newFavorites = [...favorites, coffee.id.toString()];
    updateFavorites(newFavorites);
    toast({
      title: "Added to favorites",
      description: `${coffee.title || "Coffee"} has been added to your favorites.`,
    });
  };

  const removeFromFavorites = (coffee: Coffee) => {
    if (!coffee.id) return;
    
    const newFavorites = favorites.filter(id => id !== coffee.id.toString());
    updateFavorites(newFavorites);
    toast({
      title: "Removed from favorites",
      description: `${coffee.title || "Coffee"} has been removed from your favorites.`,
    });
  };

  const toggleFavorite = (coffee: Coffee) => {
    if (isFavorite(coffee)) {
      removeFromFavorites(coffee);
    } else {
      addToFavorites(coffee);
    }
  };

  const isFavorite = (coffee: Coffee) => {
    return coffee.id ? favorites.includes(coffee.id.toString()) : false;
  };

  const getFavoriteCount = () => favorites.length;

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCount
  };
};