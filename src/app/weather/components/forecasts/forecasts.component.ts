import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Forecast } from 'src/app/models/forecast.model';
import * as fromRoot from '../../store/reducers/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.scss'],
})
export class ForecastsComponent implements OnInit {
  forecasts$: Observable<Forecast[]>;

  constructor(private store: Store<fromRoot.WeatherState>) {}

  ngOnInit(): void {
    this.forecasts$ = this.store.select(fromRoot.getAllForecasts);
  }
}
