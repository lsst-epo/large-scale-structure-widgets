import React from 'react';
import ReactEcharts from 'echarts-for-react';
import API from './API';

class Practice extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      graphData: {},
    };
  }

  componentDidMount() {
    API.get('static-data/SDSS_SpecGals_DR8_25000.json').then(res => {
      console.log(res.data);
      this.setState(prevState => ({
        ...prevState,
        data: res.data,
      }));
      this.parseDataEcharts();
    });
  }

  parseDataEcharts() {
    const dataArr = [];
    const { data } = this.state;
    if (Object.keys(data).length !== 0) {
      for (let i = 0; i < data.galaxies.length; i += 1) {
        const point = data.galaxies[i];
        const coor = [];
        coor.push(point.RA);
        coor.push(point.Dec);
        dataArr.push(coor);
      }
      this.setState(prevState => ({
        ...prevState,
        graphData: dataArr,
      }));
    }
  }

  onChartClick(params){
    console.log(params);
    console.log(params.color)
  }

  getEvent() {
    const onEvents = {
        'click': this.onChartClick,
    }
    return onEvents;
  };

  getOption() {
    const { graphData } = this.state;
    const obj = {
      title: {
        text: 'Exploring Observable Universe',
      },
      tooltip: {
        formatter: params => {
          const data = params.data || [0, 0];
          return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
        },
        axisPointer: {
          type: 'cross',
        },
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
          symbolSize: 3,
          data: graphData,
          type: 'scatter',
        },
      ],
    };
    return obj;
  }

  render() {
    const { graphData } = this.state;
    console.log(graphData);
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
