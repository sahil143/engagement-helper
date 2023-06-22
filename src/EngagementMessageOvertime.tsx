import * as React from 'react';
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {engagementMessageOverTimeChartOptions} from "./engagement-helper-utils";
import {messageCountList, channels} from './mock-data';

const EngagementMessagesOverTime: React.FC = () => {
  const options = engagementMessageOverTimeChartOptions(messageCountList, channels);

	return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default EngagementMessagesOverTime