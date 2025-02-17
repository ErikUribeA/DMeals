import { Routes } from '@angular/router';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealsCComponent } from './meals-c/meals-c.component';
const rootConfig: Routes = [
    {
        path: '',
        component: MealsCComponent,
        title: 'Home Page'
    },
    {
        path: 'meal/:id',
        component: MealDetailsComponent,
        title: 'Details Page',
    }
];

export default rootConfig;
