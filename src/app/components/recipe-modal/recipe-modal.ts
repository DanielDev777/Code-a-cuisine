import { Component, input, output, computed, effect } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { Header } from '../../shared/header/header';

@Component({
	selector: 'app-recipe-modal',
	imports: [Header],
	templateUrl: './recipe-modal.html',
	styleUrl: './recipe-modal.scss'
})
export class RecipeModal {
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
