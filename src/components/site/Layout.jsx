import React from 'react';
import Nouislider from 'nouislider-react';
import API from './API';
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

  onUpdate = value => {
    const { data, sliderVal1, sliderVal2 } = this.state;
    let newArray = [];
    if (Object.keys(data).length !== 0) {
      const arrObj = data.galaxies;
      newArray = arrObj.filter(obj => {
        return obj.redshift >= sliderVal1 && obj.redshift <= sliderVal2;
      });
    }
    this.setState(prevState => ({
      ...prevState,
      sliderVal1: parseFloat(value[0], 10),
      sliderVal2: parseFloat(value[1], 10),
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
      const obj = arrObj[i];
      const temp = [];
      temp.push(obj.RA);
      temp.push(obj.Dec);
      temp.push(obj.redshift);
      array.push(temp);
    }
    return array;
  }

  render() {
    const { minimum, maximum, filterData, formatData } = this.state;

    return (
      <div>
        {filterData && formatData && (
          <Chart
            bigData={formatData}
            largeBool={false}
            trimBool={true}
            highlightSeries={filterData}
          />
        )}

        {minimum && maximum && (
          <Nouislider
            onUpdate={this.onUpdate}
            range={{ min: minimum, max: maximum }}
            start={[minimum, maximum]}
            tooltips={[true, true]}
            connect
          />
        )}
      </div>
    );
  }
}
export default Practice;
