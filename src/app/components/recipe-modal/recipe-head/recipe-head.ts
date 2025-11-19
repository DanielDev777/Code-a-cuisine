import { Component, input } from '@angular/core';
import { Recipe } from '../../../interfaces/recipe';

@Component({
  selector: 'app-recipe-head',
  imports: [],
  templateUrl: './recipe-head.html',
  styleUrl: './recipe-head.scss',
})
export class RecipeHead {
	recipe = input.required<Recipe>();

	getTimePreference() {
		if (this.recipe().timePreference === '25-40 minutes') {
			return 'Medium';
		} else if (this.recipe().timePreference === 'Up to 20 minutes') {
			return 'Quick';
		} else {
			return 'Complex';
		}
	}
}
