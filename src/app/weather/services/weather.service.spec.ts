import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { defer } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { createForecastMock } from '../mock/forecast';
import { Forecast } from '../../models/forecast.model';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('SearchService', () => {
  let httpMock: HttpTestingController;
  let weatherService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Assert that there aren't any requests pending
    httpMock.verify();
  });

  it('should be created', inject(
    [WeatherService],
    (weatherService: WeatherService) => {
      expect(weatherService).toBeTruthy();
    }
  ));

  describe('on recieving a forecast', () => {
    let httpSpy: { get: jasmine.Spy };
    const expectedForecast: Forecast = createForecastMock();

    beforeEach(() => {
      httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
      weatherService = new WeatherService(<any>httpSpy);
    });

    it('shoud get a forecast once', () => {
      httpSpy.get.and.returnValue(asyncData(expectedForecast));
      weatherService
        .getWeather('berlin-imperial')
        .subscribe(
          (data) => expect(data).toEqual(expectedForecast, 'expected forecast'),
          fail
        );
      expect(httpSpy.get.calls.count()).toBe(1, 'one call');
    });

    it('should return error when getting 404 from server', () => {
      const errorRes = new HttpErrorResponse({
        error: 'no city',
        status: 404,
        statusText: 'City was not found',
      });

      httpSpy.get.and.returnValue(asyncError(errorRes));

      weatherService.getWeather('').subscribe(
        () => fail('error expected, got forecast'),
        (error) => expect(error.message).toContain('no city')
      );
    });
  });
});
