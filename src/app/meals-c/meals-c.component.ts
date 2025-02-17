import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MealsService } from '../meals.service';
import { IMeals } from '../interfaces/imeals';
import { RouterModule } from '@angular/router';
import { ICategories } from '../interfaces/icategorys';

@Component({
  selector: 'app-meals-c',
  imports: [CommonModule, RouterModule],
  templateUrl: './meals-c.component.html',
  styleUrl: './meals-c.component.sass'
})
export class MealsCComponent implements OnInit {
  meals: IMeals | null = null;
  categories: ICategories | null = null;
  selectedCategory: string | null = null;
  filterType: string = "c"; // Valor predeterminado: 'c' para categorías

  constructor(private mealsService: MealsService) { }

  ngOnInit() {
    this.loadMeals(this.filterType);
    this.loadFilters(this.filterType); // Cargar filtros con el tipo predeterminado
  }

  async loadMeals(filterType: string) {
    try {
      const response = await this.mealsService.getMealsByCategory(this.selectedCategory, filterType );
      if (response) {
        this.meals = response;
      }
    } catch (error) {
      console.log("error loading the meals", error);
    }
  }

  async loadFilters(filterType: string) {
    try {
      const response = await this.mealsService.getAllFiters(filterType);
      if (response) {
        this.categories = response;
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

  onCategoryChange(event: Event) {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
    this.loadMeals(this.filterType);
  }

  onFilterChange(event: Event) {
    this.filterType = (event.target as HTMLSelectElement).value; // Actualizar el tipo de filtro
    this.loadFilters(this.filterType); // Recargar los filtros con el nuevo tipo
  }

  // Función para determinar qué propiedad mostrar en el dropdown
  getCategoryProperty(category: any): string {
    switch (this.filterType) {
      case "c":
        return category.strCategory; // Mostrar categorías
      case "a":
        return category.strArea; // Mostrar áreas
      case "i":
        return category.strIngredient; // Mostrar ingredientes
      default:
        return category.strCategory; // Valor predeterminado
    }
  }
}