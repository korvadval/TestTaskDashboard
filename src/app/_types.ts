export enum SensorsType {
  temperatures = 'temperatures',
  humidity = 'humidity',
  illumination = 'illumination'
}

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

export type ChartType = 'bar' | 'line'
export type ChartSettings = {
  temperatures: CheckItem,
  illumination: CheckItem,
  humidity: CheckItem,
}
export type ChartSettingDialogData = { chart_settings: ChartSettings, chart_type: ChartType, chart_name: string }
export type CheckItem = {
  name: string;
  selected: boolean;
  children?: CheckItem[];
  value: string
}
