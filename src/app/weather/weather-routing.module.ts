import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather.component';

const routes: Routes = [
  { path: '',component: WeatherComponent }
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
