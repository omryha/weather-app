import { Main } from './main.model';
import { Weather } from './weather.model';

export interface Forecast {
  weather?: Weather[];
  main?: Main;
  id?: number;
  name?: string;
  cod?: number;
}
