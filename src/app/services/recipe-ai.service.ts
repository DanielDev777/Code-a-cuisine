import { Injectable, signal } from '@angular/core';
import { Recipe, RecipeResponse } from '../interfaces/recipe';

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
		return `You are a professional chef assistant. Generate 3 recipe options based on:

INGREDIENTS: ${data.ingredients.join(', ')}
PORTIONS: ${data.portions}
COOKING TIME LIMIT: ${data.time}
COOKS: ${data.people}
CUISINE: ${data.cuisine}
DIET: ${data.diet}

INSTRUCTIONS
Ingredients

1. Ingredients listed are available, not mandatory. Use only what fits the recipe concept.
2. You may reduce quantities to realistic levels.
3. Avoid nontraditional heavy-starch mixes (e.g., pasta + potatoes) unless part of traditional or intentional fusion cuisine. Use small amounts if included.
4. If an ingredient clashes with the cuisine, you may omit it or move it to optional.
5. Follow the cuisine style unless fusion makes more sense given the ingredients.

Recipes
6. Provide 3 distinct recipes (different techniques, flavors, or complexity).
7. Keep within the time limit (${data.time}) and the dietary preference (${data.diet}).
8. Scale each recipe to exactly ${data.portions} portions.
9. If more than 1 cook: assign parallel tasks labeled Chef 1, Chef 2, etc.
10. Use combined, detailed steps (avoid very short steps).
11. Suggest optional ingredients that enhance flavor.

Output Requirements
Return only valid JSON with this structure:

{
  "recipes": [
    {
      "recipeName": "",
      "description": "",
      "prepTime": "",
      "cookTime": "",
      "totalTime": "",
      "servings": ${data.portions},
      "timePreference": "${data.time}",
      "cuisine": "${data.cuisine}",
      "diet": "${data.diet}",
      "numberOfCooks": ${data.people},
      "requiredIngredients": [
        { "amount": "", "name": "", "preparation": "" }
      ],
      "optionalIngredients": [
        { "amount": "", "name": "", "purpose": "" }
      ],
      "instructions": [
        { "step": 1, "action": "", "assignedTo": "Chef 1", "duration": "", "tip": "" }
      ],
      "nutritionalInfo": {
        "perServing": {
          "energy": "",
          "fat": "",
          "saturatedFat": "",
          "carbohydrates": "",
          "sugar": "",
          "protein": "",
          "fiber": "",
          "sodium": ""
        }
      },
      "tips": [ "" ],
      "storage": ""
    }
  ]
}


IMPORTANT RULES:
- Output only valid JSON, no text before or after.
- Provide exactly 3 recipes unless impossible.
- All nutrition values must be realistic.
- Every instruction step must have a duration and a tip.
- Every optional ingredient must have a purpose.
- Include prepTime, totalTime, and a tips array for each recipe.
- All nutritional fields must appear under nutritionalInfo.perServing.
- Follow dietary preference ${data.diet} strictly.
- Always include these fields exactly as written:
	- timePreference: "${data.time}"
	- cuisine: "${data.cuisine}"
	- diet: "${data.diet}"
	- numberOfCooks: ${data.people}
	- Keep cooking time within ${data.time}.
- If ${data.people} > 1, assign tasks across chefs in parallel; if not, assign all to Chef 1.
- Instructions must be detailed and combined (not too short).`;
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
