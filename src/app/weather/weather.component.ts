import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ChangeDetectionStrategy,
  AfterViewInit,
  ComponentFactory,
} from '@angular/core';
import { ForecastComponent } from './components/forecast/forecast.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements AfterViewInit {
  @ViewChild('forecastsContainer', { read: ViewContainerRef })
  container: ViewContainerRef;
  componentRef: any;
  factory: ComponentFactory<ForecastComponent> = this.resolver.resolveComponentFactory(
    ForecastComponent
  );

  constructor(private resolver: ComponentFactoryResolver) {}

  createForecastComponent(): void {
    this.componentRef = this.container.createComponent(this.factory);
    /*     this.componentRef.instance.forecastEmitter.subscribe(() => {
      this.container.createComponent(this.factory);
    }); */
  }

  ngAfterViewInit(): void {
    this.createForecastComponent();
  }
}
