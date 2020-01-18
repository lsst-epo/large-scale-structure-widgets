import React from 'react';
import Nouislider from 'nouislider-react';
import API from './API';
import Page from './Page';
import Chart from './Chart';
import 'nouislider/distribute/nouislider.css';
import './StyleSlider.css';

class Practice extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      sliderVal1: 0,
      sliderVal2: 0,
      minimum: null,
      maximum: null,
      formatData: null,
      filterData: null,
      didChange: false,
    };
  }

  componentDidMount() {
    API.get('static-data/SDSS_SpecGals_DR8_25000.json').then(res => {
      this.setState(prevState => ({
        ...prevState,
        data: res.data,
        minimum: this.getMin(res.data.galaxies),
        maximum: this.getMax(res.data.galaxies),
        formatData: this.createArray(res.data.galaxies),
      }));
    });
  }

  handleUpdate = value => {
    const { data } = this.state;
    let newArray = [];
    if (Object.keys(data).length !== 0) {
      const arrObj = data.galaxies;
      newArray = arrObj.filter(obj => {
        return obj.redshift >= value[0] && obj.redshift <= value[1];
      });
    }
    this.setState(prevState => ({
      ...prevState,
      sliderVal1: parseFloat(value[0], 10),
      sliderVal2: parseFloat(value[1], 10),
      didChange: true,
      filterData: newArray,
    }));
  };

  getMax(arrObj) {
    let temp = 0;
    for (let i = 0; i < arrObj.length; i += 1) {
      const obj = arrObj[i];
      if (obj.redshift > temp) {
        temp = obj.redshift;
      }
    }
    return temp;
  }

  getMin(arrObj) {
    let temp = 1000;
    for (let i = 0; i < arrObj.length; i += 1) {
      const obj = arrObj[i];
      if (obj.redshift < temp) {
        temp = obj.redshift;
      }
    }
    return temp;
  }

  createArray(arrObj) {
    const array = [];
    for (let i = 0; i < arrObj.length; i += 1) {
      const { RA, redshift, Dec } = arrObj[i];
      array.push([RA, redshift, Dec]);
    }
    return array;
  }

  resetSlider = value => {
    this.setState(prevState => ({
      ...prevState,
      didChange: value,
    }));
  };

  render() {
    const { minimum, maximum, filterData, formatData, didChange } = this.state;
    return (
      <Page previous="/phase1" next="/phase3">
        {filterData && formatData && (
          <Chart
            sliderChange={didChange}
            bigData={formatData}
            largeBool
            trimBool
            highlightSeries={filterData}
            sliderFunc={this.resetSlider}
          />
        )}

        {minimum && maximum && (
          <Nouislider
            onUpdate={this.handleUpdate}
            range={{ min: minimum, max: maximum }}
            start={[minimum, maximum]}
            tooltips={[true, true]}
            connect
          />
        )}
      </Page>
    );
  }
}
export default Practice;
