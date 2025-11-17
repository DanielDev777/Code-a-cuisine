import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Recipe, RecipeAiService } from '../../services/recipe-ai.service';
import { Header } from '../../shared/header/header';
import { Router } from '@angular/router';
import { RecipeModal } from '../../components/recipe-modal/recipe-modal';

@Component({
	selector: 'app-results',
	imports: [Header, RecipeModal],
	templateUrl: './results.html',
	styleUrl: './results.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Results {
	recipeAiService = inject(RecipeAiService);
	private router = inject(Router);

	cuisine = signal('italian');
	timePreference = signal('medium');
	diet = signal('');

	isModalVisible = signal(false);
	selectedRecipe = signal<Recipe | null>(null);

	ngOnInit() {
		const state = history.state;
		if (state.cuisine) {
			this.cuisine.set(state.cuisine);
			this.timePreference.set(state.timePreference);
			this.diet.set(state.diet);
		}
	}

	isLoading = this.recipeAiService.isLoading;
	recipes = this.recipeAiService.recipes;
	error = this.recipeAiService.error;

	goBack(): void {
		this.router.navigate(['/ingredients']);
	}

	showModal(recipe: Recipe) {
		this.selectedRecipe.set(recipe);
		this.isModalVisible.set(true);
	}

	hideModal() {
		this.isModalVisible.set(false);
		this.selectedRecipe.set(null);
	}

	loadMockData(): void {
		const mockRecipes: Recipe[] = [
			{
				recipeName:
					'Pesto-Roasted Tomato Pasta with Garlic and Paprika',
				description:
					'Bright, herby pasta tossed with roasted tomato and garlic, finished with a cheesy hit of parmesan-style notes from the cheese.',
				prepTime: '10 minutes',
				cookTime: '25 minutes',
				totalTime: '35 minutes',
				servings: 2,
				difficulty: 'Easy',
				requiredIngredients: [
					{
						amount: '200 g',
						name: 'Pasta',
						preparation: 'dry, uncooked'
					},
					{
						amount: '200 g',
						name: 'Tomato',
						preparation: 'cut into wedges'
					},
					{
						amount: '1 piece',
						name: 'Paprika',
						preparation: 'cut into strips'
					},
					{
						amount: '60 ml',
						name: 'Pesto',
						preparation: 'use as sauce'
					},
					{ amount: '100 g', name: 'Cheese', preparation: 'grated' },
					{
						amount: '2 cloves',
						name: 'Garlic',
						preparation: 'minced'
					}
				],
				optionalIngredients: [
					{ amount: 'to taste', name: 'Salt', purpose: 'seasoning' },
					{
						amount: 'to taste',
						name: 'Black Pepper',
						purpose: 'seasoning'
					},
					{
						amount: '2-3 leaves',
						name: 'Fresh Basil',
						purpose: 'aroma and garnish'
					}
				],
				instructions: [
					{
						step: 1,
						action: 'Fill a large pot with water, add a pinch of salt, and bring to a boil.',
						assignedTo: 'Person 1',
						duration: '5 minutes',
						tip: 'Use a lid to speed up the boil'
					},
					{
						step: 2,
						action: 'Prepare vegetables: cut tomatoes into wedges, slice paprika into strips, and mince garlic.',
						assignedTo: 'Person 1',
						duration: '5 minutes',
						tip: 'Keep garlic separate to avoid burning'
					},
					{
						step: 3,
						action: 'When water boils, add pasta and cook until al dente (about 8-9 minutes).',
						assignedTo: 'Person 1',
						duration: '9 minutes',
						tip: 'Reserve 1/4 cup pasta water'
					},
					{
						step: 4,
						action: 'In a large skillet, sauté tomatoes and paprika with a splash of water for 6-8 minutes until softened; add garlic in the last minute.',
						assignedTo: 'Person 1',
						duration: '8 minutes',
						tip: 'Stir occasionally to prevent sticking'
					},
					{
						step: 5,
						action: 'Stir in pesto with the tomato mixture; loosen with reserved pasta water if needed.',
						assignedTo: 'Person 1',
						duration: '2 minutes',
						tip: 'Taste and adjust seasoning with salt and pepper'
					},
					{
						step: 6,
						action: 'Drain pasta and add to the skillet; toss to coat.',
						assignedTo: 'Person 1',
						duration: '2 minutes',
						tip: 'If sauce seems thick, add a splash of pasta water'
					},
					{
						step: 7,
						action: 'Sprinkle grated cheese over the hot pasta and toss until melted; garnish with basil if using.',
						assignedTo: 'Person 1',
						duration: '2 minutes',
						tip: 'Extra cheese is optional'
					}
				],
				nutritionalInfo: {
					perServing: {
						energy: '590 kcal',
						fat: '22 g',
						saturatedFat: '9 g',
						carbohydrates: '86 g',
						sugar: '9 g',
						protein: '25 g',
						fiber: '4 g',
						sodium: '420 mg'
					}
				},
				tips: [
					'For extra brightness, add a squeeze of lemon or a pinch of chili flakes.'
				],
				storage:
					'Store leftovers in an airtight container in the fridge for up to 2 days. Reheat in microwave or on the stovetop.'
			},
			{
				recipeName: 'Paprika Roasted Potatoes with Pesto-Tomato Pasta',
				description:
					'Crispy paprika potatoes served alongside a tomato-pesto pasta, making a hearty, rustic Italian-inspired plate.',
				prepTime: '10 minutes',
				cookTime: '30 minutes',
				totalTime: '40 minutes',
				servings: 2,
				difficulty: 'Medium',
				requiredIngredients: [
					{
						amount: '400 g',
						name: 'Potato',
						preparation: 'cut into 2 cm cubes'
					},
					{
						amount: '2 cloves',
						name: 'Garlic',
						preparation: 'minced'
					},
					{
						amount: '1 piece',
						name: 'Paprika',
						preparation: 'cut into chunks'
					},
					{ amount: '200 g', name: 'Tomato', preparation: 'diced' },
					{
						amount: '150 g',
						name: 'Pasta',
						preparation: 'dry, uncooked'
					},
					{
						amount: '60 ml',
						name: 'Pesto',
						preparation: 'used as sauce'
					},
					{ amount: '100 g', name: 'Cheese', preparation: 'grated' }
				],
				optionalIngredients: [
					{ amount: 'to taste', name: 'Salt', purpose: 'seasoning' },
					{
						amount: 'to taste',
						name: 'Black Pepper',
						purpose: 'seasoning'
					},
					{
						amount: 'a few sprigs',
						name: 'Fresh Parsley',
						purpose: 'color and aroma'
					}
				],
				instructions: [
					{
						step: 1,
						action: 'Preheat oven to 200C. Line a tray for the potatoes.',
						assignedTo: 'Person 1',
						duration: '2 minutes',
						tip: 'Gather all ingredients before starting'
					},
					{
						step: 2,
						action: 'Toss potatoes with paprika; spread on the tray and roast for 25 minutes, turning halfway.',
						assignedTo: 'Person 1',
						duration: '25 minutes',
						tip: 'No oil is required; you can add a splash of water if sticking occurs'
					},
					{
						step: 3,
						action: 'Meanwhile, bring a pot of salted water to boil and cook pasta 8-9 minutes until al dente.',
						assignedTo: 'Person 1',
						duration: '9 minutes',
						tip: 'Reserve a little pasta water'
					},
					{
						step: 4,
						action: 'In a skillet, sauté garlic briefly, add diced tomato and simmer 4-5 minutes; stir in pesto.',
						assignedTo: 'Person 1',
						duration: '6 minutes',
						tip: 'Season if desired'
					},
					{
						step: 5,
						action: 'Drain pasta and toss with the tomato-pesto sauce; fold in half of the cheese to melt.',
						assignedTo: 'Person 1',
						duration: '2 minutes',
						tip: 'Add pasta water if needed for sauce looseness'
					},
					{
						step: 6,
						action: 'Plate pasta with roasted potatoes on the side; sprinkle remaining cheese on top.',
						assignedTo: 'Person 1',
						duration: '1 minute',
						tip: 'Garnish with parsley if using'
					}
				],
				nutritionalInfo: {
					perServing: {
						energy: '748 kcal',
						fat: '25 g',
						saturatedFat: '8 g',
						carbohydrates: '105 g',
						sugar: '12 g',
						protein: '26 g',
						fiber: '5 g',
						sodium: '430 mg'
					}
				},
				tips: [
					'If you want extra creaminess, reserve a little pasta water and loosen the sauce a bit more.'
				],
				storage:
					'Leftovers refrigerate up to 2 days. Reheat gently on the stove or in the microwave.'
			},
			{
				recipeName:
					'Pesto-Tomato Pasta Bake with Crispy Garlic Paprika Potatoes',
				description:
					'An oven-baked pasta dish where pasta is bound with tomato and pesto, topped with cheese and baked until bubbly, paired with crispy paprika potatoes.',
				prepTime: '15 minutes',
				cookTime: '25 minutes',
				totalTime: '40 minutes',
				servings: 2,
				difficulty: 'Medium',
				requiredIngredients: [
					{
						amount: '200 g',
						name: 'Pasta',
						preparation: 'dry, uncooked'
					},
					{ amount: '200 g', name: 'Tomato', preparation: 'diced' },
					{
						amount: '1 piece',
						name: 'Paprika',
						preparation: 'cut into wedges'
					},
					{
						amount: '80 ml',
						name: 'Pesto',
						preparation: 'mixed into sauce'
					},
					{ amount: '100 g', name: 'Cheese', preparation: 'grated' },
					{
						amount: '2 cloves',
						name: 'Garlic',
						preparation: 'minced'
					},
					{
						amount: '400 g',
						name: 'Potato',
						preparation: 'cut into wedges'
					}
				],
				optionalIngredients: [
					{ amount: 'to taste', name: 'Salt', purpose: 'seasoning' },
					{
						amount: 'to taste',
						name: 'Black Pepper',
						purpose: 'seasoning'
					},
					{
						amount: 'a few leaves',
						name: 'Fresh Basil',
						purpose: 'garnish'
					}
				],
				instructions: [
					{
						step: 1,
						action: 'Preheat oven to 180C for the bake. Line two trays: one for potatoes, one for the pasta bake.',
						assignedTo: 'Person 1',
						duration: '2 minutes',
						tip: 'Prepare all ingredients before starting'
					},
					{
						step: 2,
						action: 'Parboil pasta for 4-5 minutes; drain.',
						assignedTo: 'Person 1',
						duration: '5 minutes',
						tip: 'Lightly undercook so it finishes in the bake'
					},
					{
						step: 3,
						action: 'In a skillet, sauté garlic briefly, add tomatoes, simmer 4-5 minutes; stir in pesto.',
						assignedTo: 'Person 1',
						duration: '6 minutes',
						tip: 'Season to taste'
					},
					{
						step: 4,
						action: 'In a baking dish, mix parboiled pasta with the tomato-pesto sauce; fold in half the cheese.',
						assignedTo: 'Person 1',
						duration: '7 minutes',
						tip: 'Evenly distribute for uniform baking'
					},
					{
						step: 5,
						action: 'Top with remaining cheese and bake in the oven for 15-20 minutes until bubbly and golden.',
						assignedTo: 'Person 1',
						duration: '20 minutes',
						tip: 'Broil for a quick finish if you like extra browning'
					},
					{
						step: 6,
						action: 'Meanwhile, toss potato wedges with paprika and minced garlic; spread on the second tray and roast for 20-25 minutes.',
						assignedTo: 'Person 1',
						duration: '25 minutes',
						tip: 'Shake the tray halfway for even crispness'
					},
					{
						step: 7,
						action: 'Remove dishes from oven; plate pasta bake with crispy potatoes on the side; garnish with basil if using.',
						assignedTo: 'Person 1',
						duration: '2 minutes',
						tip: 'Let bake settle 2 minutes before serving'
					}
				],
				nutritionalInfo: {
					perServing: {
						energy: '850 kcal',
						fat: '32 g',
						saturatedFat: '11 g',
						carbohydrates: '110 g',
						sugar: '14 g',
						protein: '30 g',
						fiber: '6 g',
						sodium: '520 mg'
					}
				},
				tips: [
					'Allow the bake to rest a few minutes before serving to help it set.',
					'Add a few fresh basil leaves after baking for color.'
				],
				storage:
					'Leftovers keep in the fridge for up to 2 days. Reheat in oven or microwave.'
			}
		];
		this.recipeAiService.setMockRecipes(mockRecipes);
	}
}
