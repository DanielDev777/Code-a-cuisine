import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RecipeAiService } from '../../services/recipe-ai.service';
import { Recipe } from '../../interfaces/recipe';
import { Header } from '../../shared/header/header';
import { Router } from '@angular/router';
import { RecipeModal } from '../../components/recipe-modal/recipe-modal';
import { MOCK_RECIPES } from './mock-recipes';

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
		this.recipeAiService.setMockRecipes(MOCK_RECIPES);
	}
}