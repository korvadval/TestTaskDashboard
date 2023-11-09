import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {untilDestroyed} from "@ngneat/until-destroy";
import {filter} from "rxjs/operators";

export type DateRange = {
  start: number,
  end: number
}

export type OneDayData = {
  date: number,
  values: {
    sens_1: number,
    sens_2: number,
    sens_3: number,
    sens_4: number,
  }
}

export type ExampleServerData = {
  temperatures: Array<OneDayData>,
  humidity: Array<OneDayData>,
  illumination: Array<OneDayData>,
}

export enum ServerDataType {
  temperatures = 'temperatures',
  humidity = 'humidity',
  illumination = 'illumination'
}

@Injectable({
  providedIn: 'root'
})
export class ChartsDataService {
  private _count_days: number = 30

  private _exampleServerData$ = new BehaviorSubject<ExampleServerData | null>(null)
  readonly exampleServerData$ = this._exampleServerData$.asObservable()

  private _dateRange$ = new BehaviorSubject<DateRange | null>(null)
  readonly dateRange$ = this._dateRange$.asObservable()

  set dateRange(new_range: DateRange) {
    this._dateRange$.next(new_range)
  }

  constructor() {
    this.dateRange$.subscribe((range) => {
      if (range) {
        const one_day = 1000 * 60 * 60 * 24
        this._count_days = (range.end - range.start) / one_day + 1
        this.handleRefreshData()
      }
    })
  }

  //generate an array of randoms number
  protected _getRandomSensData(min: number = 0, max: number = 100, fixed: number = 1, is_need_negative: boolean = false): number {
    let value = +(Math.random() * (max - min) + min).toFixed(fixed);
    if (is_need_negative) {
      const minus = Math.random() < 0.5 ? -1 : 1
      value *= minus
    }
    return value
  }

  protected _getDataArray(type: keyof typeof ServerDataType): Array<OneDayData> {
    const buf_data = []
    for (let i = 0; i < this._count_days; i++) {
      const date = this._dateRange$.value?.start as number
      let values = {sens_1: 0, sens_2: 0, sens_3: 0, sens_4: 0}

      switch (type) {
        case "temperatures":
          values.sens_1 = this._getRandomSensData(0, 30, 1, true)
          values.sens_2 = this._getRandomSensData(0, 30, 1, true)
          values.sens_3 = this._getRandomSensData(0, 30, 1, true)
          values.sens_4 = this._getRandomSensData(0, 30, 1, true)
          break
        case "humidity":
          values.sens_1 = this._getRandomSensData(20, 70)
          values.sens_2 = this._getRandomSensData(20, 70)
          values.sens_3 = this._getRandomSensData(20, 70)
          values.sens_4 = this._getRandomSensData(20, 70)
          break
        case "illumination":
          values.sens_1 = this._getRandomSensData(50, 500, 0)
          values.sens_2 = this._getRandomSensData(50, 500, 0)
          values.sens_3 = this._getRandomSensData(50, 500, 0)
          values.sens_4 = this._getRandomSensData(50, 500, 0)
          break
      }

      const day_data: OneDayData = {
        date: this.addDays(date, i),
        values,
      }
      buf_data.push(day_data)
    }
    return buf_data
  }

  public addDays(date: number, days: number): number {
    const start_date = new Date(date)
    start_date.setDate(start_date.getDate() + days)
    return start_date.getTime();
  }

  //fill exampleServerData with random values to simulate server response
  public handleRefreshData() {
    const buf_data: ExampleServerData = {
      temperatures: this._getDataArray(ServerDataType.temperatures),
      humidity: this._getDataArray(ServerDataType.humidity),
      illumination: this._getDataArray(ServerDataType.illumination),
    }

    this._exampleServerData$.next(buf_data)
  }


}
