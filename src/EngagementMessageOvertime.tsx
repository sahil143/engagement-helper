import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {engagementMessageOverTimeChartOptions} from "./EngagementHelper";
import {messageCountList, channels} from './mock-data';

const EngagementMessagesOverTime = ()=>{
  const options = engagementMessageOverTimeChartOptions(messageCountList, channels);

	return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default EngagementMessagesOverTime