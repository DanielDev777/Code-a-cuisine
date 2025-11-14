import { Component, effect, inject, input, output } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient';
import { Header } from '../../shared/header/header';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeAiService } from '../../services/recipe-ai.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-preferences',
	imports: [Header, ReactiveFormsModule],
	templateUrl: './preferences.html',
	styleUrl: './preferences.scss'
})
export class Preferences {
	private recipeAiService = inject(RecipeAiService);
	private router = inject(Router);
	
	close = output<void>();
	ingredients = input.required<Ingredient[]>();

	portions = new FormControl<number>(2, { nonNullable: true });
	people = new FormControl<number>(1, { nonNullable: true });
	time = new FormControl<string>('quick', { nonNullable: true });
	cuisine = new FormControl<string>('german', { nonNullable: true });
	diet = new FormControl<string>('no preferences', { nonNullable: true });

	cuisineOptions: string[] = [
		'german',
		'italian',
		'indian',
		'japanese',
		'gourmet',
		'fusion'
	];

	dietOptions: string[] = ['vegetarian', 'vegan', 'keto', 'no preferences'];

	constructor() {
		effect(() => {
			console.log(this.ingredients());
		});
	}

	createRecipeQuery(): void {
		const queryData = this.buildQueryData();
		const prompt = this.recipeAiService.generatePrompt(queryData);
		
		this.router.navigate(['/results']);
		this.sendRecipeRequest(prompt);
	}

	private buildQueryData() {
		return {
			ingredients: this.transformedIngredientsList(),
			portions: this.portions.value,
			people: this.people.value,
			time: this.determineTime(this.time.value),
			cuisine: this.cuisine.value,
			diet: this.diet.value
		};
	}

	private sendRecipeRequest(prompt: string): void {
		this.recipeAiService.sendRecipeQuery({
			prompt,
			model: 'gpt-5-nano',
			temperature: 0.7,
			maxTokens: 3000
		}).catch(error => console.error('Failed to generate recipes:', error));
	}

	determineTime(value: string): string {
		const timeMap: Record<string, string> = {
			'quick': 'Up to 20 minutes',
			'medium': '25-40 minutes'
		};
		return timeMap[value] || 'over 40 minutes';
	}

	transformedIngredientsList(): string[] {
		return this.ingredients().map(
			(element) => `${element.amount}${element.unit} ${element.name}`
		);
	}

	closeModal(): void {
		this.close.emit();
	}

	increaseValue(control: FormControl<number>): void {
		control.setValue(control.value + 1);
	}

	decreaseValue(control: FormControl<number>): void {
		if (control.value > 1) {
			control.setValue(control.value - 1);
		}
	}

	capitalize(string: string): string {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}
