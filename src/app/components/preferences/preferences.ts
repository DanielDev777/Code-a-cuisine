import { Component, effect, input, output } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient';
import { Header } from '../../shared/header/header';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-preferences',
	imports: [Header, ReactiveFormsModule],
	templateUrl: './preferences.html',
	styleUrl: './preferences.scss'
})
export class Preferences {
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
	]

	dietOptions: string[] = [
		'vegetarian',
		'vegan',
		'keto',
		'no preferences'
	]

	constructor() {
		effect(() => {
			console.log(this.ingredients());
		});
	}

	createRecipeQuery() {
		let query = {
			ingredients: this.transformedIngredientsList(),
			portions: this.portions.value,
			people: this.people.value,
			time: this.determineTime(this.time.value),
			cuisine: this.cuisine.value,
			diet: this.diet.value
		}

		this.sendRecipeQuery(query);
	}

	determineTime(value: string): string {
		if (value === 'quick') {
			return 'Up to 20 minutes';
		} else if (value === 'medium') {
			return '25-40 minutes';
		} else {
			return 'over 40 minutes';
		}
	}

	transformedIngredientsList(): string[] {
		return this.ingredients().map(element => 
			`${element.amount}${element.unit} ${element.name}`
		);
	}

	async sendRecipeQuery(data: {}) {
		const url = '/api/webhook-test/28ade059-0774-45dd-a1ea-3f7ba40eef21';
		console.log('Sending recipe query:', data);
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			
			const result = await response.json();
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			return result;
		} catch (error) {
            console.error('Error sending recipe query:', error);
            throw error;
		}
	}

	closeModal(): void {
		this.close.emit();
	}

	increaseValue(control: FormControl<number>) {
		const currentValue = control.value;
		control.setValue(currentValue + 1);
	}

	decreaseValue(control: FormControl<number>) {
		const currentValue = control.value;
		if (currentValue > 1) {
			control.setValue(currentValue - 1);
		}
	}

	capitalize(string: string) {
    	return string.charAt(0).toUpperCase() + string.slice(1)
	}
}
