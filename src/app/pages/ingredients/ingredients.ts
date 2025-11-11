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
import { IngredientItem } from '../../components/ingredient-item/ingredient-item';
import { Preferences } from '../../components/preferences/preferences';

@Component({
	selector: 'app-ingredients',
	imports: [Header, ReactiveFormsModule, FormsModule, IngredientItem, Preferences],
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
	duplicateError = signal(false);
	nextstepAvailable = signal(false);
	isModalVisible = signal(false);

	ingredientValue = signal('');

	ingredientsList = computed(() => this.ingredientsService.getIngredientsList()());

	constructor() {
		this.ingredientControl.valueChanges.subscribe((value) => {
			this.ingredientValue.set(value || '');
			this.duplicateError.set(false);
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
		this.duplicateError.set(false);
	}

	private getFormValues() {
		return {
			name: this.ingredientControl.value || '',
			amount: this.amountControl.value || 0,
			unit: this.unitControl.value || 'g'
		};
	}

	private isDuplicateIngredient(name: string): boolean {
		return this.ingredientsList().some(
			(item) => item.name.toLowerCase() === name.toLowerCase()
		);
	}

	private resetForm(): void {
		this.ingredientControl.setValue('');
		this.amountControl.setValue(null);
		this.unitControl.setValue('g');
		this.duplicateError.set(false);
	}

	addToList() {
		const { name, amount, unit } = this.getFormValues();
		if (!name || !amount) {
			return;
		}
		if (this.isDuplicateIngredient(name)) {
			this.duplicateError.set(true);
			return;
		}

		const newIngredient: Ingredient = { name, amount, unit };
		this.ingredientsService.addIngredient(newIngredient);
		this.checkIngredientsLength();
		this.resetForm();
	}

	checkIngredientsLength() {
		if (this.ingredientsList().length >= 4) {
			this.nextstepAvailable.set(true);
		}
	}

	editIngredient(index: number) {
		this.editingIndex.set(index);
	}

	saveEdit(event: { index: number; amount: number; unit: string }) {
		const currentIngredient = this.ingredientsList()[event.index];
		const updatedIngredient: Ingredient = {
			name: currentIngredient.name,
			amount: event.amount,
			unit: event.unit
		};
		this.ingredientsService.updateIngredient(event.index, updatedIngredient);
		this.editingIndex.set(null);
	}

	cancelEdit() {
		this.editingIndex.set(null);
	}

	removeIngredient(index: number) {
		this.ingredientsService.removeIngredient(index);
	}

	showModal() {
		this.isModalVisible.set(true);
	}

	hideModal() {
		this.isModalVisible.set(false);
	}
}
