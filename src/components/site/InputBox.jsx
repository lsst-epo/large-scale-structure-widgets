import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardBody from 'react-md/lib/Cards/CardText';
import TextField from 'react-md/lib/TextFields/TextField';
import './StyleCard.css';

class InputBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      redshiftVal1: '',
      redshiftVal2: '',
    };
  }

  handleChange = name => event => {
    console.log(name);
    console.log(event);
    this.setState({
      [name]: event,
    });
  };

  render() {
    return (
      <Card className='card'>
        <CardBody>
          <div>
            <span style={{ marginRight: '20px' }} className="inline">
              Enter the range of redshift values you would like to see. From
            </span>
            <span>
              <TextField
                id="inline-text-input-1"
                type="text"
                style={{ maxWidth: '200px' }}
                className="inline-block"
                label=""
                onChange={this.handleChange('redshiftVal1')}
                lineDirection="center"
                placeholder="Type Text Here"
              />
            </span>
            <span style={{ marginLeft: '20px' }} className="inline">
              to
            </span>
            <span>
              <TextField
                id="inline-text-input-2"
                type="text"
                style={{ maxWidth: '200px' }}
                className="inline-block"
                label=""
                onChange={this.handleChange('redshiftVal2')}
                lineDirection="center"
                placeholder="Type Text Here"
              />
            </span>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default InputBox;
