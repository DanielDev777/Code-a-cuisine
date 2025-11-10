import {
	ChangeDetectionStrategy,
	Component,
	computed,
	signal,
	inject
} from '@angular/core';
import { Header } from '../../shared/header/header';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient';
import { IngredientsService } from '../../services/ingredients.service';

@Component({
	selector: 'app-ingredients',
	imports: [Header, ReactiveFormsModule, FormsModule],
	templateUrl: './ingredients.html',
	styleUrl: './ingredients.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ingredients {
	private ingredientsService = inject(IngredientsService);

	ingredientControl = new FormControl('');
	amountControl = new FormControl<number | null>(null);
	unitControl = new FormControl('g');

	isSelectOpen = signal(false);
	editingIndex = signal<number | null>(null);

	editAmount = signal<number>(0);
	editUnit = signal('g');

	ingredientValue = signal('');

	// Get ingredients list from service
	ingredientsList = computed(() => this.ingredientsService.getIngredientsList()());

	constructor() {
		this.ingredientControl.valueChanges.subscribe((value) => {
			this.ingredientValue.set(value || '');
		});
	}

	filteredIngredients = computed(() => {
		const value = this.ingredientValue();
		return this.ingredientsService.filterIngredients(value);
	});

	toggleSelect() {
		this.isSelectOpen.update((isOpen) => !isOpen);
	}

	closeSelect() {
		setTimeout(() => this.isSelectOpen.set(false), 100);
	}

	selectIngredient(ingredient: string) {
		this.ingredientControl.setValue(ingredient);
	}

	addToList() {
		const name = this.ingredientControl.value || '';
		const amount = this.amountControl.value || 0;
		const unit = this.unitControl.value || 'g';

		if (name && amount) {
			const newIngredient: Ingredient = { name, amount, unit };
			this.ingredientsService.addIngredient(newIngredient);

			this.ingredientControl.setValue('');
			this.amountControl.setValue(null);
			this.unitControl.setValue('g');
		}
	}

	editIngredient(index: number) {
		const ingredient = this.ingredientsList()[index];
		this.editAmount.set(ingredient.amount);
		this.editUnit.set(ingredient.unit);
		this.editingIndex.set(index);
	}

	saveEdit() {
		const index = this.editingIndex();
		if (index !== null) {
			const currentIngredient = this.ingredientsList()[index];
			const updatedIngredient: Ingredient = {
				name: currentIngredient.name,
				amount: this.editAmount(),
				unit: this.editUnit()
			};
			this.ingredientsService.updateIngredient(index, updatedIngredient);
			this.editingIndex.set(null);
		}
	}

	cancelEdit() {
		this.editingIndex.set(null);
	}

	removeIngredient(index: number) {
		this.ingredientsService.removeIngredient(index);
	}
}
