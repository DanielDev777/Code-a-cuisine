import { Injectable, signal, computed } from '@angular/core';
import { Ingredient } from '../interfaces/ingredient';

@Injectable({
	providedIn: 'root'
})
export class IngredientsService {
	// Available ingredients from database (mock data for now)
	private availableIngredients = signal<string[]>([
		'Tomato',
		'Onion',
		'Garlic',
		'Potato',
		'Carrot',
		'Chicken',
		'Beef',
		'Pork',
		'Rice',
		'Pasta',
		'Bell Pepper',
		'Mushroom',
		'Spinach',
		'Broccoli',
		'Cucumber',
		'Lettuce',
		'Cheese',
		'Milk',
		'Eggs',
		'Butter'
	]);

	// User's selected ingredients list
	ingredientsList = signal<Ingredient[]>([]);

	// Public getters
	getAvailableIngredients() {
		return this.availableIngredients.asReadonly();
	}

	getIngredientsList() {
		return this.ingredientsList.asReadonly();
	}

	// Filter ingredients based on search term
	filterIngredients(searchTerm: string): string[] {
		const term = searchTerm.toLowerCase().trim();
		if (!term) {
			return [];
		}
		return this.availableIngredients().filter((ingredient) =>
			ingredient.toLowerCase().includes(term)
		);
	}

	// Add ingredient to user's list
	addIngredient(ingredient: Ingredient): void {
		this.ingredientsList.update((list) => [...list, ingredient]);
	}

	// Update ingredient at specific index
	updateIngredient(index: number, ingredient: Ingredient): void {
		this.ingredientsList.update((list) =>
			list.map((item, i) => (i === index ? ingredient : item))
		);
	}

	// Remove ingredient from list
	removeIngredient(index: number): void {
		this.ingredientsList.update((list) => list.filter((_, i) => i !== index));
	}

	// Clear all ingredients
	clearIngredients(): void {
		this.ingredientsList.set([]);
	}

	// Future: Load ingredients from database
	async loadIngredientsFromDatabase(): Promise<void> {
		// TODO: Replace with actual API call
		// const response = await fetch('/api/ingredients');
		// const data = await response.json();
		// this.availableIngredients.set(data);
	}

	// Future: Sync user's list to database
	async syncToDatabase(): Promise<void> {
		// TODO: Replace with actual API call
		// await fetch('/api/user/ingredients', {
		//   method: 'POST',
		//   body: JSON.stringify(this.ingredientsList())
		// });
	}
}
