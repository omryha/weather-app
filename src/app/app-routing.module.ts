import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '',pathMatch: 'full',redirectTo: '/weather' },
  { path: 'weather',loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule) }
]

@NgModule({
  declarations: [AppComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
