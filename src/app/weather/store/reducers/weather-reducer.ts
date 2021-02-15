import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Forecast } from 'src/app/models/forecast.model';
import * as weatherActions from '../actions/weather-actions';

export const weatherAdapter = createEntityAdapter<Forecast>({
  selectId: (forecast: Forecast) => forecast.name, // city name
});

export interface State extends EntityState<Forecast> {}

export const INITIAL_STATE: State = weatherAdapter.getInitialState();

export function reducer(
  state = INITIAL_STATE,
  { type, payload }: weatherActions.All
) {
  switch (type) {
    case weatherActions.SEARCH_CITY_FORECAST_SUCCESS: {
      return { ...state, ...weatherAdapter.addOne(payload as Forecast, state) };
    }

    default:
      return state;
  }
}
