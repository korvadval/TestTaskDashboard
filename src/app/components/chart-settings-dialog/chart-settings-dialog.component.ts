import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {ChartSettingDialogData, ChartSettings, ChartType, SensorsType} from "../../_types";

@Component({
  selector: 'app-chart-settings-dialog',
  templateUrl: './chart-settings-dialog.component.html',
  styleUrls: ['./chart-settings-dialog.component.scss']
})
export class ChartSettingsDialogComponent {

  chart_name_control = new FormControl('')
  chart_settings: ChartSettings | null = null
  chart_type: ChartType = 'line'

  is_none_selected = true

  constructor(
    public _dialogRef: MatDialogRef<ChartSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChartSettingDialogData,
  ) {
    if (data.chart_settings) this.chart_settings = data.chart_settings
    if (data.chart_type) this.chart_type = data.chart_type
    if (data.chart_name) this.chart_name_control.setValue(data.chart_name)
  }

  checkSelected() {
    if (this.chart_settings) {
      Object.keys(this.chart_settings).forEach((settings_key) => {
        this.chart_settings![settings_key as Partial<SensorsType>].children?.forEach(child => {
          if (child.selected) {
            this.is_none_selected = false
            return
          }
        })
      })
    }
  }

  confirm() {
    this._dialogRef.close({
      chart_settings: this.chart_settings,
      chart_type: this.chart_type,
      chart_name: this.chart_name_control.value
    });
  }

  cancel() {
    this._dialogRef.close(null);
  }
}
