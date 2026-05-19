export interface Recipe {
  id: string;
  title: string;
  image: string;
  duration: string;
  difficulty: string;
  description: string;
  ingredients: string[];
  rating: number;
  cookingInstructions: string[];
}
