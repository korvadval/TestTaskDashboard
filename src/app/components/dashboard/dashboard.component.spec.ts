import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {ChartViewComponent} from "../chart-view/chart-view.component";
import {AppModule} from "../../app.module";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [
        DashboardComponent,
        ChartViewComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creating chart', () => {
    const old_length = component.charts.length
    component.addChart()
    expect(component.charts.length).toBe(old_length + 1)
  })

  it('deleting chart', () => {
    component.addChart()
    const old_length = component.charts.length
    component.deleteChart(component.charts[0])
    expect(component.charts.length).toBe(old_length - 1)
  })

});
