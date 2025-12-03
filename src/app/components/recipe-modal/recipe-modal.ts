import { Component, input, output, computed, effect, inject } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { Header } from '../../shared/header/header';
import { RecipeHead } from "./recipe-head/recipe-head";
import { RecipeAiService } from '../../services/recipe-ai.service';
import { RouterLink } from "@angular/router";

@Component({
	selector: 'app-recipe-modal',
	imports: [Header, RecipeHead, RouterLink],
	templateUrl: './recipe-modal.html',
	styleUrl: './recipe-modal.scss'
})
export class RecipeModal {
	recipeAiService = inject(RecipeAiService);
	recipe = input.required<Recipe>();
	close = output<void>();

	constructor() {
		effect(() => {
			console.log('Recipe data:', this.recipe());
		});
	}

	closeModal(): void {
		this.close.emit();
	}
}
