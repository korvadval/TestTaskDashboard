import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {ChartsDataService} from "../../services/charts-data.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import { ChartSettingsDialogComponent} from "../chart-settings-dialog/chart-settings-dialog.component";
import {take} from 'rxjs/operators';
import {ChartSettingDialogData, ChartSettings, ChartType, ExampleServerData, SensorsType} from "../../_types";


@UntilDestroy()
@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  is_init = false

  chartOptions: Highcharts.Options | null = null

  chart_name: string = 'Example chart name'
  chart_type: ChartType = 'line'
  chart_settings: ChartSettings = {
    temperatures: {
      name: 'Temperature',
      selected: false,
      value: SensorsType.temperatures,
      children: [
        {name: 'Sensor #1', selected: false, value: 'sens_1'},
        {name: 'Sensor #2', selected: false, value: 'sens_2'},
        {name: 'Sensor #3', selected: false, value: 'sens_3'},
        {name: 'Sensor #4', selected: false, value: 'sens_4'},
      ],
    },
    illumination: {
      name: 'Illumination',
      selected: false,
      value: SensorsType.illumination,
      children: [
        {name: 'Sensor #1', selected: false, value: 'sens_1'},
        {name: 'Sensor #2', selected: false, value: 'sens_2'},
        {name: 'Sensor #3', selected: false, value: 'sens_3'},
        {name: 'Sensor #4', selected: false, value: 'sens_4'},
      ],
    },
    humidity: {
      name: 'Humidity',
      selected: false,
      value: SensorsType.humidity,
      children: [
        {name: 'Sensor #1', selected: false, value: 'sens_1'},
        {name: 'Sensor #2', selected: false, value: 'sens_2'},
        {name: 'Sensor #3', selected: false, value: 'sens_3'},
        {name: 'Sensor #4', selected: false, value: 'sens_4'},
      ],
    },
  }
  chart_data: ExampleServerData | null = null

  constructor(
    private _chartData: ChartsDataService,
    private _datePipe: DatePipe,
    private _dialog: MatDialog
  ) {
    this._chartData.exampleServerData$.pipe(untilDestroyed(this))
      .subscribe((chart_data) => {
        if (chart_data) {
          this.chart_data = chart_data
          this.setChatOptions()
        }
      })
  }

  private setChatOptions() {
    this.chartOptions = null

    const buf_series: Highcharts.SeriesOptionsType[] = []
    Object.keys(this.chart_settings).forEach((settings_key) => {
      const one_settings = this.chart_settings[settings_key as Partial<SensorsType>]
      one_settings.children?.forEach(child => {
        if (child.selected) {
          buf_series.push({
            name: one_settings.name + ' ' + child.name,
            type: this.chart_type,
            data: this.chart_data![one_settings.value as Partial<SensorsType>].map((data) => data.values[child.value as 'sens_1' | 'sens_2' | 'sens_3' | 'sens_4'])
          })
        }
      })
    })

    setTimeout(() => this.chartOptions = {
      title: {
        text: this.chart_name
      },
      xAxis: {
        categories: this.chart_data?.temperatures.map((data) => this._datePipe.transform(data.date, 'dd/MM/YY') as string)
      },
      series: buf_series,
    }, 300)

  }

  openChartSettingsDialog() {
    this._dialog.open(ChartSettingsDialogComponent, {
      data: {chart_settings: this.chart_settings, chart_type: this.chart_type, chart_name: this.chart_name}
    }).afterClosed().pipe(take(1))
      .subscribe((result: ChartSettingDialogData) => {
        if (result) {
          this.chart_type = result.chart_type
          this.chart_settings = result.chart_settings
          this.chart_name = result.chart_name
          this.setChatOptions()
        }
        this.is_init = true
      })
  }

  ngOnInit(): void {
    this.openChartSettingsDialog()
  }
}
