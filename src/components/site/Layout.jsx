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

  onUpdate = () => value => {
    this.setState({
      sliderVal1: parseFloat(value[0], 10),
      sliderVal2: parseFloat(value[1], 10),
    });
  };

  createArray(arrObj) {
    let max = 0;
    let min = 1000;
    const array = [];
    for (let i = 0; i < arrObj.length; i++) {
      const obj = arrObj[i];
      const temp = [];
      if (obj.redshift > max) {
        max = obj.redshift;
      }
      if (obj.redshift < min) {
        min = obj.redshift;
      }
      temp.push(obj.RA);
      temp.push(obj.Dec);
      temp.push(obj.redshift);
      array.push(temp);
    }
    return { data: array, maximum: max, minimum: min };
  }

  render() {
    const { data, sliderVal1, sliderVal2 } = this.state;
    let newArray = [];
    let infoObj = { data: {}, maximum: null, minimum: null };
    if (Object.keys(data).length !== 0) {
      infoObj = this.createArray(data.galaxies);
      const arrObj = data.galaxies;
      newArray = arrObj.filter(obj => {
        return obj.redshift >= sliderVal1 && obj.redshift <= sliderVal2;
      });
      if (
        sliderVal1 === Number(infoObj.minimum.toFixed(2)) &&
        sliderVal2 === Number(infoObj.maximum.toFixed(2))
      ) {
        newArray = [];
      }
    }

    return (
      <div>
        <Chart bigData={infoObj.data} highlightSeries={newArray} />

        {infoObj.minimum && infoObj.maximum && (
          <Nouislider
            onUpdate={this.onUpdate()}
            range={{ min: infoObj.minimum, max: infoObj.maximum }}
            start={[infoObj.minimum, infoObj.maximum]}
            connect
          />
        )}
        {sliderVal1 && (
          <div style={{ position: 'relative', left: '0%', top: '35px' }}>
            {sliderVal1}
          </div>
        )}
        {sliderVal2 && (
          <div style={{ position: 'relative', left: '50%', top: '10px' }}>
            {sliderVal2}
          </div>
        )}
      </div>
    );
  }
}
export default Practice;
