import * as fromWeather from './weather-reducer';
import { createFeatureSelector,createSelector } from '@ngrx/store';

export interface WeatherState {
  forecast: fromWeather.State;
}

export const reducers = {
  forecast: fromWeather.reducer
};

export const getForecastRootState = createFeatureSelector<WeatherState>('weather');

export const getForecastState = createSelector(
  getForecastRootState,
  state => state.forecast
);

export const {
  selectAll: getAllForecasts,
} = fromWeather.weatherAdapter.getSelectors(getForecastState);
