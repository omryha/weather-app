import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output() searchEmitter = new EventEmitter();
  @Output() createComponentEmitter = new EventEmitter();
  cities = ['Tel Aviv', 'Chicago', 'Amsterdam', 'Berlin', 'Madrid', 'Kyiv'];

  constructor(private fb: FormBuilder) {}

  weatherForm = this.fb.group({
    cityName: ['', Validators.required],
    unitName: ['', Validators.required],
  });

  changeCity(e): void {
    this.cityName.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get cityName(): AbstractControl {
    return this.weatherForm.get('cityName');
  }

  get unitName(): AbstractControl {
    return this.weatherForm.get('unitName');
  }

  getWeather(e): void {
    const data = `${this.cityName.value}-${this.unitName.value}`;
    this.searchEmitter.emit(data);
    this.createComponentEmitter.emit();
  }
}
