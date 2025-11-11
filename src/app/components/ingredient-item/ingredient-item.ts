import { Component, ChangeDetectionStrategy, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ingredient } from '../../interfaces/ingredient';

@Component({
	selector: 'app-ingredient-item',
	imports: [FormsModule],
	templateUrl: './ingredient-item.html',
	styleUrl: './ingredient-item.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientItem {
	item = input.required<Ingredient>();
	index = input.required<number>();
	isEditing = input.required<boolean>();

	edit = output<number>();
	save = output<{ index: number; amount: number; unit: string }>();
	cancel = output<void>();
	remove = output<number>();

	editAmount = signal<number>(0);
	editUnit = signal('g');

	startEdit() {
		this.editAmount.set(this.item().amount);
		this.editUnit.set(this.item().unit);
		this.edit.emit(this.index());
	}

	saveEdit() {
		this.save.emit({
			index: this.index(),
			amount: this.editAmount(),
			unit: this.editUnit()
		});
	}

	cancelEdit() {
		this.cancel.emit();
	}

	removeItem() {
		this.remove.emit(this.index());
	}
}
