import { useQuery } from "@tanstack/react-query";
import { Coffee } from "@/types/coffee";

const fetchCoffeeData = async (): Promise<Coffee[]> => {
  const response = await fetch("https://api.sampleapis.com/coffee/hot");
  if (!response.ok) {
    throw new Error("Failed to fetch coffee data");
  }
  return response.json();
};

export const useCoffee = () => {
  return useQuery({
    queryKey: ["coffee"],
    queryFn: fetchCoffeeData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};