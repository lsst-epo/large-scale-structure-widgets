import React from 'react';
import ReactEcharts from 'echarts-for-react';
import PropTypes from 'prop-types';
import Card from './Card';

class Chart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      graphData: {},
      clickedPt: {},
      selectedPt: [],
      hover: false,
      hoverPt: null,
    };
  }

  onChartClick = params => {
    let ptArr = [];
    if (params.seriesIndex === 0) {
      ptArr = params.value;
    } else if (params.seriesIndex === 2) {
      ptArr = [params.value.RA, params.value.Dec, params.value.redshift];
    }
    if (params.seriesIndex !== 1) {
      this.setState(prevState => ({
        ...prevState,
        selectedPt: [...prevState.selectedPt, ptArr],
        clickedPt: params.value,
      }));
    }
  };

  getEvent() {
    const onEvents = {
      click: this.onChartClick,
    };
    return onEvents;
  }

  formatTooltipPoint = (color, string) => {
    return (
      "<span style='display:inline-block;width:10px;height:10px;border-radius:50%;background-color:" +
      color +
      ";margin-right:5px;'></span><span>" +
      string +
      '</span>'
    );
  };

  getTooltipFormat = params => {
    const dat = params.value;
    let string = '';
    let color = '';
    if (Array.isArray(params.value)) {
      string = dat[0].toFixed(2) + ', ' + dat[1].toFixed(2);
      color = '#A8D0E6';
    } else {
      string =
        dat.RA.toFixed(2) +
        ', ' +
        dat.Dec.toFixed(2) +
        ', ' +
        dat.redshift.toFixed(2);
      color = '#374785';
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

  clearArray() {
    this.setState(prevState => ({
      ...prevState,
      selectedPt: [],
    }));
  }

  getOption() {
    let { bigData } = this.props;
    const {
      highlightSeries,
      largeBool,
      trimBool,
      sliderChange,
      sliderFunc,
    } = this.props;
    const { selectedPt } = this.state;

    let opacityNum = 1;
    let ptColor = '#A8D0E6';
    if (!trimBool) {
      opacityNum = 0.25;
      ptColor = '#374785';
    }
    if (sliderChange) {
      this.clearArray();
      sliderFunc(false);
    }

    if (Object.keys(bigData).length === 0) {
      return {};
    }
    if (trimBool && highlightSeries.length !== 0) {
      bigData = [];
    }

    return {
      title: {
        text: 'Exploring Observable Universe',
      },
      legend: this.getLegend(),
      dataset: {
        source: highlightSeries,
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
            { min: 0, max: 0.09, color: '#ffbaba' },
            { min: 0.09, max: 0.15, color: '#ff5252' },
            { min: 0.15, max: 0.2, color: ' #a70000' },
          ],
          outOfRange: {
            color: ['#000'],
          },
        },
      ],

      color: ['#A8D0E6', '#54ff', '#374785'],
      series: [
        {
          name: 'Data Point',
          symbolSize: 8,
          type: 'scatter',
          legendHoverLink: true,
          large: largeBool,
          data: bigData,
          largeThreshold: 1000,
          itemStyle: {
            opacity: opacityNum,
          },
        },
        {
          name: 'Selected Data Point',
          symbolSize: 8,
          type: 'scatter',
          data: selectedPt,
          emphasis: {
            itemStyle: {
              color: '#374785',
            },
          },
        },
        {
          name: 'Highlighted Data Point',
          symbolSize: 8,
          type: 'scatter',
          large: largeBool,
          itemStyle: {
            color: ptColor,
          },
          largeThreshold: 1000,
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
    const { selectedPt } = this.state;
    return (
      <div
        style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}
      >
        <ReactEcharts
          onEvents={this.getEvent()}
          style={{ height: '600px', width: '50%' }}
          option={this.getOption()}
        />
        {selectedPt.length !== 0 && <Card data={selectedPt} />}
      </div>
    );
  }
}

Chart.propTypes = {
  sliderChange: PropTypes.bool,
  largeBool: PropTypes.bool,
  trimBool: PropTypes.bool,
  bigData: PropTypes.array,
  sliderFunc: PropTypes.func,
  highlightSeries: PropTypes.array,
};

export default Chart;
