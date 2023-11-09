import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/header/header.component';
import {MaterialModule} from "./modules/material.module";
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ChartViewComponent} from './components/chart-view/chart-view.component';

import {HighchartsChartModule} from "highcharts-angular";
import {MultiCheckboxComponent} from './components/multi-checkbox/multi-checkbox.component';
import {ChartSettingsDialogComponent} from './components/chart-settings-dialog/chart-settings-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ChartViewComponent,
    MultiCheckboxComponent,
    ChartSettingsDialogComponent
  ],
  imports: [
    MaterialModule,
    HighchartsChartModule,

    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,

    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
