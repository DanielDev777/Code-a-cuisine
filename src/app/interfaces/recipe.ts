export interface Recipe {
	recipeName: string;
	description: string;
	prepTime: string;
	cookTime: string;
	totalTime: string;
	servings: number;
	difficulty?: string;
	timePreference: string;
	cuisine: string;
	diet: string;
	numberOfCooks: number;
	requiredIngredients: {
		amount: string;
		name: string;
		preparation?: string;
	}[];
	optionalIngredients: {
		amount: string;
		name: string;
		purpose: string;
	}[];
	instructions: {
		step: number;
		action: string;
		assignedTo: string;
		duration: string;
		tip: string;
	}[];
	nutritionalInfo: {
		perServing: {
			energy: string;
			fat: string;
			saturatedFat: string;
			carbohydrates: string;
			sugar: string;
			protein: string;
			fiber: string;
			sodium: string;
		};
	};
	tips: string[];
	storage: string;
}

export interface RecipeResponse {
	recipes: Recipe[];
}
