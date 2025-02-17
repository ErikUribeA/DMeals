import { Injectable } from '@angular/core';
import { IMeals } from './interfaces/imeals';
import { ICategories } from './interfaces/icategorys';
import { IMeal } from './interfaces/imeal';


@Injectable({
  providedIn: 'root'
})
export class MealsService {
  url = 'https://www.themealdb.com/api/json/v1/1'

  constructor() { }

  async getMealsByCategory(category: string | null, filter: string): Promise<IMeals | null> {
    try {
      const response = await fetch(`${this.url}/filter.php?${filter}=${category}`)

      if (!response.ok) {
        throw new Error(`Error in the response`)
      }
      return await response.json()
    } catch (error) {
      console.log('Error:', error)
      return null;
    }
  }

  async getAllFiters(filter: string): Promise<ICategories | null> {
    try {
      const response = await fetch(`${this.url}/list.php?${filter}=list`)
      if (!response.ok) {
        throw new Error("Error in the response")
      }
      return await response.json()
    } catch (error) {
      console.log(`Error: ${error}`)
      return null;
    }
  }

  async getMealById(id: number): Promise<IMeal | null> {
    try {
      const response = await fetch(`${this.url}/lookup.php?i=${id}`)
      if (!response.ok) {
        console.error('Error in the response')
      }
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null;
    }
  }

  async getRandomMeal(): Promise<IMeal | null> {
    try {
      const response = await fetch(`${this.url}/random.php`)
      if (!response.ok){
        console.error('Error in the response')
      }
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      return null;
    }
  }
}
