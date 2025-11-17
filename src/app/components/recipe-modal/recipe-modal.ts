import { Component, input, output } from '@angular/core';
import { Recipe } from '../../services/recipe-ai.service';

@Component({
	selector: 'app-recipe-modal',
	imports: [],
	templateUrl: './recipe-modal.html',
	styleUrl: './recipe-modal.scss'
})
export class RecipeModal {
	recipe = input.required<Recipe>();
	close = output<void>();

	closeModal(): void {
		this.close.emit();
	}
}
