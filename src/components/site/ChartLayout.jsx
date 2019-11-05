import React from 'react';
import API from './API';
import InputBox from './InputBox';
import ScatterPlot from './ScatterPlot';

class Practice extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      redshiftVal1: 0,
      redshiftVal2: 0,
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

  handleUserInput = (name, value) => {
    if (value !== '.') {
      this.setState({
        [name]: parseFloat(value, 10),
      });
    }
  };

  render() {
    const { data, redshiftVal1, redshiftVal2 } = this.state;
    let temp = redshiftVal2;
    let newArray = [];
    if (Object.keys(data).length !== 0) {
      if (redshiftVal2 === 0 && redshiftVal1 === 0) {
        newArray = data.galaxies;
      } else {
        if (isNaN(redshiftVal2)) {
          temp = 1;
        }
        const arrObj = data.galaxies;
        newArray = arrObj.filter(function(obj) {
          return obj.redshift >= redshiftVal1 && obj.redshift <= temp;
        });
      }
    }
    return (
      <div>
        <InputBox onUserInput={this.handleUserInput} />
        <ScatterPlot data={newArray} />
      </div>
    );
  }
}
export default Practice;
