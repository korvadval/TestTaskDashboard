import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartViewComponent} from './chart-view.component';
import {HighchartsChartComponent} from "highcharts-angular";
import {DatePipe} from "@angular/common";
import {AppModule} from "../../app.module";

describe('ChartViewComponent', () => {
  let component: ChartViewComponent;
  let fixture: ComponentFixture<ChartViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [
        ChartViewComponent,
        HighchartsChartComponent
      ],
      providers: [DatePipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
