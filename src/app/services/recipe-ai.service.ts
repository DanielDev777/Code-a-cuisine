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

1. Ingredients listed are available, NOT required. The model should freely omit any ingredient. It is completely acceptable for a recipe to use only a few of the provided ingredients. Using fewer ingredients is often better.
2. At least one of the 3 recipes must be a classic-style dish of the chosen cuisine, using only ingredients that genuinely fit that cuisine (even if this means using only 2–3 of the provided ingredients). Any ingredient that is not traditional for that cuisine should be omitted or moved to optional.
3. You may reduce quantities to realistic levels.
4. Avoid nontraditional heavy-starch mixes (e.g., pasta + potatoes). If the chosen cuisine is "fusion", these combinations are allowed.
5. If the chosen cuisine is NOT "fusion":
	- Omit or move to optional any ingredient that does not fit the cuisine style.
6. If the chosen cuisine IS "fusion":
	- Creative cross-cuisine combinations are allowed.

Recipes
7. Provide 3 distinct recipes (different techniques, flavors, or complexity).
8. Keep within the time limit (${data.time}) and the dietary preference (${data.diet}).
9. Scale each recipe to exactly ${data.portions} portions.
10. If more than 1 cook: assign parallel tasks labeled Chef 1, Chef 2, etc.
11. Use combined, detailed steps (avoid very short steps).
12. Suggest optional ingredients that enhance flavor.
13. Every instruction object must include a "headline" field containing a short step title (e.g., "Cook the Pasta", "Prepare the Sauce"). The headline must be in English, even if the cuisine is not.

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
        { "step": 1, "headline": "", "action": "", "assignedTo": "Chef 1", "duration": "", "tip": "" }
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
- Instructions must be detailed and combined (not too short).
- The value of recipeName must always be written in English only. No other languages are allowed, regardless of cuisine.`;
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
