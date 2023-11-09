import {Component} from '@angular/core';
import {v4 as uuid4} from 'uuid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  charts: string[] = []

  constructor() {
  }

  generateChartId(): string {
    return 'CHART_' + uuid4()
  }

  addChart() {
    this.charts.push(this.generateChartId())
  }

  deleteChart(chart_id: string) {
    const index = this.charts.findIndex(id => id === chart_id)
    this.charts.splice(index, 1)
  }
}
