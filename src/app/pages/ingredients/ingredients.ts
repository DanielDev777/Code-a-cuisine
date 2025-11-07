import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Header } from '../../shared/header/header';

interface Ingredient {
	name: string;
	amount: number;
	unit: string;
}

@Component({
	selector: 'app-ingredients',
	imports: [Header],
	templateUrl: './ingredients.html',
	styleUrl: './ingredients.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ingredients {
	isSelectOpen = signal(false);
	ingredient = signal('');
	amount = signal<number | null>(null);
	unit = signal('gram');
	ingredientsList = signal<Ingredient[]>([]);

	toggleSelect() {
		this.isSelectOpen.update((isOpen) => !isOpen);
	}

	closeSelect() {
		setTimeout(() => this.isSelectOpen.set(false), 100);
	}
}
