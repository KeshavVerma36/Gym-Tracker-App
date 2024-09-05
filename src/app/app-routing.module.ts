import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutPageComponent } from './workout-page/workout-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'workout', component: WorkoutPageComponent },
  { path: 'exercises/:routine', component: MainPageComponent },
  { path: '', redirectTo: '/workout', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
