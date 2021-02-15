import { Forecast } from '../../models/forecast.model';

export function createForecastMock(): Forecast {
  return {
    cod: 200,
    id: 4887398,
    name: 'Chicago',
    main: {
      temp: 255.72,
      feels_like: 247.4,
      temp_min: 255.37,
      temp_max: 256.15,
      pressure: 1030,
      humidity: 71,
    },
    weather: [
      {
        id: 600,
        main: 'Snow',
        description: 'light snow',
        icon: '13n',
      },
    ],
  };
}
