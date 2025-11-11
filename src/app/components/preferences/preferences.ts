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
