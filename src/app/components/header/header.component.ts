import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ChartsDataService} from "../../services/charts-data.service";
import {zip} from "rxjs";
import {filter} from "rxjs/operators";

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  get startDate(): AbstractControl {
    return this.range.get('start') as AbstractControl
  }

  get endDate(): AbstractControl {
    return this.range.get('end') as AbstractControl
  }

  constructor(
    private _chartData: ChartsDataService
  ) {
    const start_obs = this.range.controls['start'].valueChanges.pipe(filter(date => !!date))
    const end_obs = this.range.controls['end'].valueChanges.pipe(filter(date => !!date))
    zip(start_obs, end_obs).pipe(untilDestroyed(this)).subscribe((range_mas) => {
      if (range_mas) {
        this._chartData.dateRange = {start: range_mas[0], end: range_mas[1]}
      }
    })

    const today = new Date().getTime()
    this.startDate.setValue(today)

    const today_plus_month = this._chartData.addDays(today, 15)
    this.endDate.setValue(today_plus_month)
    this._chartData.dateRange = {start: today, end: today_plus_month}
  }
}
