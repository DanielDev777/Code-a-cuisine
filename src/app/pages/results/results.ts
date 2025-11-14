import { Component, inject } from '@angular/core';
import { RecipeAiService } from '../../services/recipe-ai.service';
import { Header } from '../../shared/header/header';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  imports: [Header],
  templateUrl: './results.html',
  styleUrl: './results.scss',
})
export class Results {
  private recipeAiService = inject(RecipeAiService);
  private router = inject(Router);
  
  isLoading = this.recipeAiService.isLoading;
  recipes = this.recipeAiService.recipes;
  error = this.recipeAiService.error;
  
  goBack(): void {
    this.router.navigate(['/ingredients']);
  }
}
