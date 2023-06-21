import { Channel, MessageCount } from "./type";

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

export const engagementMessageOverTimeChartOptions = (
  msg: MessageCount[],
  channels: Channel[]
) => {
  const seriesData = Object.entries(engagementMessageOverTimeDataForChart(msg))
    .filter(([, value]) => value.length > 1)
    .map(([key, data]) => {
      return {
        name: channels.find((ch) => ch.id === key)?.label,
        data,
      };
    });

  return {
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
      startOnTick: false,
      tickInterval: 24 * 3600 * 1000,
      plotLines: [{
        color: '#FF0000',
        width: 2,
        value: 5
    }]
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },
    series: seriesData,
  };
};
