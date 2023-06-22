import { test, expect } from "vitest";
import { MessageCount } from "../type";
import { engagementMessageOverTimeDataForChart, modifySeriesDataForChart } from "../engagement-helper-utils";

const mockMessageData: MessageCount[] = [
  {
    count: "5",
    timeBucket: "2022-10-10T00:00:00.000Z",
    channelId: "825030076239577109",
  },
  {
    count: "1",
    timeBucket: "2022-10-17T00:00:00.000Z",
    channelId: "825030076239577109",
  },
  {
    count: "1",
    timeBucket: "2022-10-10T00:00:00.000Z",
    channelId: "1029806377952088074",
  },
];
const channels = [
  {
    label: "general",
    value: "825030076239577109",
    type: 0,
    guild: "825030075794587691",
    guildId: "825030075794587691",
    parentId: "825030075794587692",
    permissionOverwrites: [],
    messages: [],
    threads: [],
    nsfw: false,
    id: "825030076239577109",
    name: "general",
    rawPosition: 0,
    topic: null,
    lastMessageId: "1034437862151696414",
    rateLimitPerUser: 0,
    createdTimestamp: 1616772898493,
  },
];

test("engagementMessageOverTimeDataForChart", () => {
  const expectedOutput = {
    "825030076239577109": [
      [Date.parse("2022-10-10T00:00:00.000Z"), 5],
      [Date.parse("2022-10-17T00:00:00.000Z"), 1],
    ],
    "1029806377952088074": [[Date.parse("2022-10-10T00:00:00.000Z"), 1]],
  };
  expect(engagementMessageOverTimeDataForChart(mockMessageData)).toEqual(
    expectedOutput
  );
});

test("modifySeriesDataForChart", () => {
  const expectedOutput = [
    {
      type: "spline",
      name: "general",
      data: [
        [Date.parse("2022-10-10T00:00:00.000Z"), 5],
        [Date.parse("2022-10-17T00:00:00.000Z"), 1],
      ],
    },
  ];
  expect(modifySeriesDataForChart(mockMessageData, channels)).toEqual(expectedOutput);
  expect(modifySeriesDataForChart([{
    count: "1",
    timeBucket: "2022-10-10T00:00:00.000Z",
    channelId: "1029806377952088074",
  }], channels)).toEqual([]);
});
