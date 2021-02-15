import * as actionsWeather from '../actions/weather-actions';
import * as fromWeather from './weather-reducer';
import { reducer } from './weather-reducer';
import { createForecastMock } from '../../mock/forecast';

describe('Weather reducer', () => {
  it('Should handle initial state', () => {
    expect(
      fromWeather.reducer(undefined, {
        type: undefined,
        payload: undefined,
      })
    ).toBe(fromWeather.INITIAL_STATE);
  });

  it('should handle SEARCH_CITY_FORECAST_SUCCESS', () => {
    expect(
      reducer(fromWeather.INITIAL_STATE, {
        type: actionsWeather.SEARCH_CITY_FORECAST_SUCCESS,
        payload: createForecastMock(),
      }).entities
    ).toBeDefined();
  });
});
