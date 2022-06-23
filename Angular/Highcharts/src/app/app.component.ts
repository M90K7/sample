import { AfterViewInit, Component } from '@angular/core';

import * as Highcharts from 'highcharts';
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsAccessibility from "highcharts/modules/accessibility";

// declare let require: any; //
// require("highcharts/highcharts-more")(Highcharts);
// require("highcharts/modules/accessibility")(Highcharts);

HighchartsMore(Highcharts);
HighchartsAccessibility(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'NgHighcharts';
  chart!: Highcharts.Chart;
  options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Column Chart',
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      title: undefined,
    },
    xAxis: {
      type: 'category',
    },
    tooltip: {
      headerFormat: `<div>Date: {point.key}</div>`,
      pointFormat: `<div>{series.name}: {point.y}</div>`,
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [{
      type: "column",
      // name: 'Amount',
      data: []
    }],
  };
  ngAfterViewInit(): void {
    // this.chart = Highcharts.chart("content", this.options);
    this.createChartColumn();
  }

  private createChartColumn(): void {

    const makeData = () => {
      let date = new Date();
      const data: any[] = [];

      for (let i = 0; i < 10; i++) {
        date.setDate(new Date().getDate() + i);
        data.push({
          name: `${date.getDate()}/${date.getMonth() + 1}`,
          y: this.getRandomNumber(0, 1000),
        });
      }
      return data;
    };

    this.chart = Highcharts.chart('content' as any, this.options);

    this.chart.update({
      series: [{ data: makeData() } as any]
    }, true, true, true);


    setInterval(() => {
      this.chart.update({
        series: [{ data: makeData() } as any]
      }, true, true, true);
    }, 1500);
  }


  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
