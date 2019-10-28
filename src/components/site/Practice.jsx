import React from 'react';
import ReactEcharts from 'echarts-for-react';
// import isEqual from 'lodash/isEqual';
import API from './API';
import Card from './Card';
import InputBox from './InputBox';

class Practice extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      graphData: {},
      clickedPt: {},
      selectedPt: [],
      hover: false,
      hoverPt: null,
    };
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
    // enforce same point does not get added to state array
    const ptArr = [params.value.RA, params.value.Dec, params.value.redshift];
    this.setState(prevState => ({
      ...prevState,
      selectedPt: [...prevState.selectedPt, ptArr],
      clickedPt: params.value,
    }));
  };

  getEvent() {
    const onEvents = {
      click: this.onChartClick,
    };
    return onEvents;
  }

  // getColor = params => {
  //   const { clickedPt } = this.state;
  //   const { value } = params;
  //   const defaultColor = '#e97a7a';
  //   if (value == null) {
  //     return '';
  //   }
  //   if (isEqual(clickedPt, value)) {
  //     return '#b7b7ff';
  //   }
  //   return defaultColor;
  // };

  formatTooltipPoint = (color, string) => {
    return (
      "<span style='display:inline-block;width:10px;height:10px;border-radius:50%;background-color:" +
      color +
      ";margin-right:5px;'></span><span>" +
      string +
      '</span>'
    );
  };

  getCard = () => {
    const { selectedPt } = this.state;
    if (selectedPt.length !== 0) {
      return <Card data={selectedPt} />;
    }
    return null;
  };

  getTooltipFormat = params => {
    const dat = params.value;
    let string = '';
    let color = '';
    if (Array.isArray(params.value)) {
      string = dat[0].toFixed(2) + ', ' + dat[1].toFixed(2);
      color = '#374785';
    } else {
      string =
        dat.RA.toFixed(2) +
        ', ' +
        dat.Dec.toFixed(2) +
        ', ' +
        dat.redshift.toFixed(2);
      color = '#A8D0E6';
    }
    return this.formatTooltipPoint(color, string);
  };

  getLegend = () => {
    const { selectedPt } = this.state;
    let legendPt = '';
    let legendIcon = 'none';
    if (selectedPt.length !== 0) {
      legendPt = 'Selected Data Point';
      legendIcon = 'circle';
    }
    return {
      orient: 'vertical',
      right: 5,
      data: [
        {
          name: 'Data Point',
          icon: 'circle',
        },
        {
          name: legendPt,
          icon: legendIcon,
        },
      ],
    };
  };

  getAxisInfo(title) {
    return {
      nameTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      name: title,
      nameLocation: 'middle',
      nameGap: 25,
      axisLine: {
        lineStyle: {
          color: 'black',
          opacity: 1,
        },
      },
    };
  }

  getOption() {
    const { data, selectedPt } = this.state;
    if (Object.keys(data).length === 0) {
      return {};
    }
    return {
      title: {
        text: 'Exploring Observable Universe',
      },
      legend: this.getLegend(),
      dataset: {
        source: data.galaxies,
        dimensions: ['RA', 'Dec', 'redshift'],
      },
      tooltip: {
        borderColor: '#777',
        borderWidth: 2,
        formatter: this.getTooltipFormat,
      },
      xAxis: this.getAxisInfo('RA'),
      yAxis: this.getAxisInfo('Dec'),
      visualMap: [
        {
          show: false,
          type: 'piecewise',
          dimension: 2,
          pieces: [
            // different shades
            { min: 0, max: 0.09, color: ' #ffbaba' },
            { min: 0.09, max: 0.15, color: '#ff5252' },
            { min: 0.15, max: 0.2, color: ' #a70000' },
          ],
          outOfRange: {
            color: ['#000'],
          },
        },
      ],
      color: ['#A8D0E6', '#374785'],
      series: [
        {
          name: 'Data Point',
          symbolSize: 8,
          type: 'scatter',
          legendHoverLink: true,
          large: true,
          // itemStyle: {
          //   color: params => {
          //     return this.getColor(params);
          //   },
          // },
        },
        {
          name: 'Selected Data Point',
          symbolSize: 8,
          type: 'scatter',
          data: selectedPt,
          emphasis: {
            itemStyle: {
              color: '#24305E',
            },
          },
        },
      ],
      textStyle: {
        fontFamily: 'Roboto',
      },
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
      <div>
        {this.getCard()}
        <InputBox />
        <ReactEcharts
          onEvents={this.getEvent()}
          style={{ height: '1000px' }}
          option={this.getOption()}
        />
      </div>
    );
  }
}
export default Practice;
