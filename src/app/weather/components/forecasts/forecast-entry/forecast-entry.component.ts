import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from 'src/app/models/forecast.model';

@Component({
  selector: 'app-forecast-entry',
  templateUrl: './forecast-entry.component.html',
  styleUrls: ['./forecast-entry.component.scss'],
})
export class ForecastEntryComponent implements OnInit {
  @Input() forecast: Forecast;

  constructor() {}

  ngOnInit(): void {}
}
