import { Injectable, signal } from '@angular/core';

export interface Recipe {
	recipeName: string;
	description: string;
	prepTime: string;
	cookTime: string;
	totalTime: string;
	servings: number;
	difficulty: string;
	requiredIngredients: {
		amount: string;
		name: string;
		preparation: string;
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

@Injectable({
	providedIn: 'root'
})
export class RecipeAiService {
	private isLoadingSignal = signal<boolean>(false);
	private recipesSignal = signal<Recipe[]>([]);
	private errorSignal = signal<string | null>(null);

	isLoading = this.isLoadingSignal.asReadonly();
	recipes = this.recipesSignal.asReadonly();
	error = this.errorSignal.asReadonly();

	setMockRecipes(recipes: Recipe[]): void {
		this.recipesSignal.set(recipes);
		this.isLoadingSignal.set(false);
		this.errorSignal.set(null);
	}

	generatePrompt(data: {
		ingredients: string[];
		portions: number;
		people: number;
		time: string;
		cuisine: string;
		diet: string;
	}): string {
		return `You are a professional chef assistant. Generate THREE different recipe options based on the following requirements:

INGREDIENTS AVAILABLE: ${data.ingredients.join(', ')}
PORTIONS NEEDED: ${data.portions}
NUMBER OF PEOPLE COOKING: ${data.people}
COOKING TIME LIMIT: ${data.time}
CUISINE TYPE: ${data.cuisine}
DIETARY PREFERENCES: ${data.diet}

INSTRUCTIONS:
1. Generate 3 different recipes that use the available ingredients in different ways
2. Each recipe should offer variety (different cooking methods, flavor profiles, or complexity)
3. Ensure each recipe fits within the specified time limit
4. Respect the dietary preferences (${data.diet})
5. Scale each recipe for exactly ${data.portions} portions
6. If ${data.people} people are cooking together, assign specific tasks to each person (Cook 1, Cook 2, etc.) to work in parallel
7. Provide step-by-step instructions that are clear and easy to follow
8. Suggest optional ingredients (like spices or garnishes) that would enhance each dish but are not essential
9. Only provide fewer than 3 recipes if it's absolutely impossible to create 3 different viable options with the given ingredients

RESPONSE FORMAT:
Respond ONLY with valid JSON in exactly this structure (no additional text before or after):

{
  "recipes": [
    {
      "recipeName": "Name of the dish",
      "description": "Brief 1-2 sentence description of the dish",
      "prepTime": "X minutes",
      "cookTime": "X minutes",
      "totalTime": "X minutes",
      "servings": ${data.portions},
      "difficulty": "Easy/Medium/Hard",
      "requiredIngredients": [
        {
          "amount": "quantity with unit",
          "name": "ingredient name",
          "preparation": "how to prepare (e.g., 'diced', 'chopped')"
        }
      ],
      "optionalIngredients": [
        {
          "amount": "quantity with unit",
          "name": "ingredient name",
          "purpose": "why this enhances the dish"
        }
      ],
      "instructions": [
        {
          "step": 1,
          "action": "Detailed instruction for this step",
          "assignedTo": "Cook 1",
          "duration": "X minutes",
          "tip": "Optional helpful tip for this step"
        }
      ],
      "nutritionalInfo": {
        "perServing": {
          "energy": "X kcal",
          "fat": "X g",
          "saturatedFat": "X g",
          "carbohydrates": "X g",
          "sugar": "X g",
          "protein": "X g",
          "fiber": "X g",
          "sodium": "X mg"
        }
      },
      "tips": [
        "General cooking tip or serving suggestion"
      ],
      "storage": "How to store leftovers and for how long"
    }
  ]
}

IMPORTANT RULES:
- Return ONLY the JSON object with an array of 3 recipes, no markdown formatting, no code blocks, no explanations
- Ensure all JSON is valid and properly escaped
- All numerical values in nutritionalInfo should be realistic estimates
- For ${data.people} people cooking: distribute tasks efficiently across all people so they can work simultaneously
- If only 1 person is cooking, assign all steps to "Cook 1"
- Keep cooking time within ${data.time}
- Make sure each recipe follows ${data.diet} dietary requirements strictly
- Provide exactly 3 recipes unless absolutely impossible with the given constraints`;
	}

	async sendRecipeQuery(data: object): Promise<RecipeResponse> {
		this.setLoadingState();
		const { controller, timeoutId } = this.createRequestTimeout();

		try {
			const response = await this.makeApiRequest(data, controller);
			clearTimeout(timeoutId);
			
			const result = await this.parseResponse(response);
			this.handleSuccess(result);
			return result;
		} catch (error) {
			clearTimeout(timeoutId);
			this.handleError(error);
			throw error;
		}
	}

	private setLoadingState(): void {
		this.isLoadingSignal.set(true);
		this.errorSignal.set(null);
	}

	private createRequestTimeout(): { controller: AbortController; timeoutId: number } {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 300000);
		return { controller, timeoutId };
	}

	private async makeApiRequest(data: object, controller: AbortController): Promise<Response> {
		const url = '/api/webhook-test/28ade059-0774-45dd-a1ea-3f7ba40eef21';
		return await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
			signal: controller.signal
		});
	}

	private async parseResponse(response: Response): Promise<RecipeResponse> {
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const responseText = await response.text();
		const parsed = JSON.parse(responseText);
		return this.extractRecipes(parsed);
	}

	private extractRecipes(parsed: any): RecipeResponse {
		if (parsed.message) {
			return typeof parsed.message === 'string' 
				? JSON.parse(parsed.message) 
				: parsed.message;
		}
		
		if (parsed.recipes) {
			return parsed;
		}
		
		if (Array.isArray(parsed)) {
			return { recipes: parsed };
		}

		throw new Error('Unexpected response format');
	}

	private handleSuccess(result: RecipeResponse): void {
		if (!result.recipes || !Array.isArray(result.recipes)) {
			throw new Error('Response does not contain a valid recipes array');
		}
		this.recipesSignal.set(result.recipes);
		this.isLoadingSignal.set(false);
	}

	private handleError(error: unknown): void {
		this.isLoadingSignal.set(false);
		
		if (error instanceof Error && error.name === 'AbortError') {
			const errorMsg = 'Recipe generation timed out. Please try again.';
			this.errorSignal.set(errorMsg);
			throw new Error(errorMsg);
		}
		
		const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
		this.errorSignal.set(errorMsg);
	}

	capitalize(string: string): string {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}
