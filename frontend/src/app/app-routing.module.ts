import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarComponent } from './car/car.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'create',component: CarComponent},
  {path: 'update/:id',component: CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
