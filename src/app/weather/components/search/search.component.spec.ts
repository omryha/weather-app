import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { defer } from 'rxjs';
import { Store } from '@ngrx/store';
import { SearchComponent } from './search.component';
import { WeatherService } from '../../services/weather.service';
import { createForecastMock } from '../../mock/forecast';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from '../../store/effects/weather-effects';
import { FormsModule } from '@angular/forms';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('SearchBarComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let getForecastSpy: jasmine.Spy;
  let searchButton: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      const forecastMock = createForecastMock();
      const service = jasmine.createSpyObj('WeatherService', ['search']);
      getForecastSpy = service.search.and.returnValue(asyncData(forecastMock));
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          StoreModule.forRoot({}),
          EffectsModule.forRoot([WeatherEffects]),
        ],
        declarations: [SearchComponent],
        providers: [{ provide: WeatherService, useValue: service }, Store],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When click search with a city input', () => {
    beforeEach(() => {
      searchButton = fixture.nativeElement.querySelector('.btn-submit');
      fixture.detectChanges();
    });

    it('should call get search service', () => {
      component.weatherForm.setValue({
        cityName: 'Berlin',
        unitName: 'Imperial',
      });
      searchButton.click();
      fixture.detectChanges();
      expect(getForecastSpy.calls.any()).toBe(true, 'search called');
    });
  });
});
