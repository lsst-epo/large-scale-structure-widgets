import React from 'react';
import ReactEcharts from 'echarts-for-react';
import isEqual from 'lodash/isEqual';
import API from './API';

class Practice extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      graphData: {},
      clickedPt: {},
    };
    this.onChartClick = this.onChartClick.bind(this);
    // this.getOption = this.getOption.bind(this);
  }

  componentDidMount() {
    API.get('static-data/SDSS_SpecGals_DR8_25000.json').then(res => {
      console.log(res.data);
      this.setState(prevState => ({
        ...prevState,
        data: res.data,
      }));
    });
  }

  onChartClick = params => {
    this.setState(prevState => ({
      ...prevState,
      clickedPt: params.value,
    }));
  };

  getEvent() {
    const onEvents = {
      click: this.onChartClick,
    };
    return onEvents;
  }

  getColor = params => {
    const { clickedPt } = this.state;
    const { value } = params;
    const defaultColor = '#e97a7a';
    if (value == null) {
      return '';
    }
    if (isEqual(clickedPt, value)) {
      return '#b7b7ff';
    }
    return defaultColor;
  };

  getTooltipFormat = params => {
    const dat = params.value;
    return dat.RA.toFixed(2) + ', ' + dat.Dec.toFixed(2);
  };

  getOption() {
    const { data } = this.state;
    if (Object.keys(data).length === 0) {
      return {};
    }
    return {
      title: {
        text: 'Exploring Observable Universe',
      },
      legend: {
        orient: 'vertical',
        right: 5,
      },
      dataset: {
        source: data.galaxies,
        dimensions: ['RA', 'Dec'],
      },
      tooltip: {
        formatter: this.getTooltipFormat,
      },
      xAxis: {
        name: 'RA',
        nameLocation: 'middle',
        nameGap: 25,
      },
      yAxis: {
        name: 'Dec',
        nameLocation: 'middle',
        nameGap: 25,
      },

      series: [
        {
          name: 'Data Point',
          symbolSize: 8,
          type: 'scatter',
          large: true,
          itemStyle: {
            color: params => {
              return this.getColor(params);
            },
          },
        },
      ],
      animation: false,
      dataZoom: [
        {
          type: 'slider',
          show: false,
          xAxisIndex: [0],
          minSpan: 60,
        },
        {
          type: 'slider',
          show: false,
          yAxisIndex: [0],
          minSpan: 60,
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          minSpan: 60,
        },
        {
          type: 'inside',
          yAxisIndex: [0],
          minSpan: 60,
        },
      ],
    };
  }

  render() {
    return (
      <ReactEcharts
        onEvents={this.getEvent()}
        style={{ height: '1000px' }}
        option={this.getOption()}
      />
    );
  }
}
export default Practice;
