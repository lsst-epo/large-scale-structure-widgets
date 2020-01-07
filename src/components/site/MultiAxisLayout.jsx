import React from 'react';
import Nouislider from 'nouislider-react';
import debounce from 'lodash/debounce';
import API from './API';
import MultiAxisScatter from './MultiAxisScatter';
import 'nouislider/distribute/nouislider.css';
import './StyleSlider.css';

class MultiAxisLayout extends React.PureComponent {
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
      temp.push(obj.redshift);
      temp.push(obj.Dec);
      array.push(temp);
    }
    return array;
  }

  render() {
    const timer = debounce(this.onUpdate, 15);
    const { minimum, maximum, filterData, formatData } = this.state;
    return (
      <div>
        {formatData && (
          <MultiAxisScatter
            maximum={maximum}
            shouldTrim
            dataProp={formatData}
            altData={filterData}
          />
        )}
        <div
          style={{
            marginTop: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {minimum && maximum && (
            <Nouislider
              onUpdate={timer}
              range={{ min: minimum, max: maximum }}
              start={[minimum, maximum]}
              tooltips={[true, true]}
              connect
            />
          )}
        </div>
      </div>
    );
  }
}

export default MultiAxisLayout;
