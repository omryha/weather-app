import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { StoreModule } from '@ngrx/store';
import { WeatherService } from './services/weather.service';
import * as fromWeather from './store/reducers';
import { SearchComponent } from './components/search/search.component';
import { ForecastsComponent } from './components/forecasts/forecasts.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ForecastEntryComponent } from './components/forecasts/forecast-entry/forecast-entry.component';

@NgModule({
  declarations: [
    WeatherComponent,
    SearchComponent,
    ForecastsComponent,
    ForecastComponent,
    ForecastEntryComponent,
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('weather', fromWeather.reducers),
  ],
  providers: [WeatherService],
})
export class WeatherModule {}
