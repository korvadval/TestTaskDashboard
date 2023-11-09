import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSettingsDialogComponent } from './chart-settings-dialog.component';

describe('ChartSettingsDialogComponent', () => {
  let component: ChartSettingsDialogComponent;
  let fixture: ComponentFixture<ChartSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSettingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
