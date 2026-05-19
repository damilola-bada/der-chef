import { mockRecipes } from '../data/mockRecipes';
import { Recipe } from '../types/recipe';

export async function fetchRecipes(): Promise<Recipe[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return mockRecipes;
}

export async function fetchRecipeById(id: string): Promise<Recipe | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockRecipes.find((recipe) => recipe.id === id);
}
