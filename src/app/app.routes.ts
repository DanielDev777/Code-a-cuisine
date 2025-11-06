import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { Ingredients } from './pages/ingredients/ingredients';
import { Cookbook } from './pages/cookbook/cookbook';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'ingredients', component: Ingredients },
    { path: 'cookbook', component: Cookbook }
];
