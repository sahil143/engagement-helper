import { Channel, MessageCount } from "./type";
import * as Highcharts from "highcharts";

export const engagementMessageOverTimeDataForChart = (
  msgCountList: MessageCount[]
): { [key: string]: unknown[][] } => {
  return msgCountList.reduce((acc, message) => {
    if (acc[message.channelId]) {
      acc[message.channelId].push([
        Date.parse(message.timeBucket),
        parseInt(message.count),
      ]);
    } else {
      acc[message.channelId] = [
        [Date.parse(message.timeBucket), parseInt(message.count)],
      ];
    }
    return acc;
  }, {} as { [key: string]: unknown[][] });
};

export const filterSeriesDataForChart = (
  messages: MessageCount[],
  channels: Channel[]
): Highcharts.SeriesSplineOptions[] =>
  Object.entries(engagementMessageOverTimeDataForChart(messages))
    .filter(([, value]) => value.length > 1)
    .map(([key, data]) => {
      return {
        type: 'spline',
        name: channels.find((ch) => ch.id === key)?.label,
        data,
      };
    });

export const engagementMessageOverTimeChartOptions = (
  msg: MessageCount[],
  channels: Channel[]
): Highcharts.Options => {
  const series = filterSeriesDataForChart(msg, channels);
  return {
    title: {
      text: '',
    },
    chart: {
      type: "spline",
    },
    yAxis: {
      title: {
        text: null,
      },
      gridLineWidth: 0,
      tickWidth: 1,
    },
    xAxis: {
      type: "datetime",
      tickInterval: 24 * 3600 * 1000,
      plotLines: [
        {
          width: 1,
          // Hardcoded as there is no clear indication if the plot line should be on middle of xAxis or a particular datapoint
          value: Date.UTC(2022, 9, 17),
        },
      ],
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },
    tooltip: {
      shared: true,
      headerFormat: "<b>{series.name}</b><br />",
      xDateFormat: "%y-%m-%d",
      pointFormatter(): string {
        const self = this as unknown as Highcharts.Point;
        return `${self.y} messages on ${Highcharts.dateFormat(
          "%b %d",
          self.x
        )}`;
      },
    },
    series,
  };
};
