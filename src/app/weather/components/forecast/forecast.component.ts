import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers/index';
import * as weatherActions from '../../store/actions/weather-actions';
import { Observable } from 'rxjs';
import { Forecast } from 'src/app/models/forecast.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  @Output() forecastEmitter = new EventEmitter();
  forecasts$: Observable<Forecast[]>;
  createChild = false;

  constructor(private store: Store<fromRoot.WeatherState>) {}

  ngOnInit(): void {
    this.forecasts$ = this.store.select(fromRoot.getAllForecasts);
  }

  getWeather(data: string): void {
    this.store.dispatch(new weatherActions.SearchCityForecast(data));
  }

  emitForecast(): void {
    this.forecastEmitter.emit();
    this.createChild = true;
  }
}
