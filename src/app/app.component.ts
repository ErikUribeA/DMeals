import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MealsService } from './meals.service';
import { IMeal } from './interfaces/imeal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'DMeals';
  randomMeal: IMeal | null = null;
  utensils = faUtensils

  constructor(private mealService: MealsService ) {}

  ngOnInit(){
    this.loadRandomMeal()
    console.log(this.randomMeal?.meals)
  }

  async loadRandomMeal() {
    try{
      const response = await this.mealService.getRandomMeal()
      if(response){
        this.randomMeal = response
      }
    } catch(error){
      console.error("Error:", error)
    }
  }

}
