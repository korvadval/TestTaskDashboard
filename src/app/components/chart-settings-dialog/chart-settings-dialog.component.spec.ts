import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChartSettingsDialogComponent} from './chart-settings-dialog.component';
import {MultiCheckboxComponent} from "../multi-checkbox/multi-checkbox.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppModule} from "../../app.module";

describe('ChartSettingsDialogComponent', () => {
  let component: ChartSettingsDialogComponent;
  let fixture: ComponentFixture<ChartSettingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [
        ChartSettingsDialogComponent,
        MultiCheckboxComponent,
      ],
      providers: [[{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}}]]
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
