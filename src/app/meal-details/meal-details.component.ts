import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealsService } from '../meals.service';
import { IMeal, Meal } from '../interfaces/imeal';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCarrot, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule], // 💡 Asegura que FontAwesomeModule está aquí
  templateUrl: './meal-details.component.html',
  styleUrl: './meal-details.component.sass'
})
export class MealDetailsComponent implements OnInit {
  meal: IMeal | null = null;
  carrot = faCarrot; // 💡 Agrega un ícono aquí
  arrowLeft = faArrowLeft

  constructor(
    private route: ActivatedRoute,
    private mealsService: MealsService,
    private library: FaIconLibrary
  ) {
    library.addIcons(faCarrot); // 💡 Agregar icono a la librería
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadMeal(+id);
      }
    });
  }

  async loadMeal(id: number) {
    try {
      const response: IMeal | null = await this.mealsService.getMealById(id);
      if (response && response.meals.length > 0) {
        this.meal = response;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  getIngredients(meal: Meal): string[] {
    const ingredients: string[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = (meal as any)[`strIngredient${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(ingredient);
      }
    }

    return ingredients;
  }

  openYoutubeVideo(url: string) {
    window.open(url, '_blank');
  }
}
