import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardBody from 'react-md/lib/Cards/CardText';
import TextField from 'react-md/lib/TextFields/TextField';
import './StyleCard.css';

class InputBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      redshiftVal1: 0,
      redshiftVal2: 0,
    };
  }

  handleChange = name => event => {
    const { onUserInput } = this.props;
    this.setState({
      [name]: event,
    });
    onUserInput(name, event);
  };

  render() {
    return (
      <Card className="card">
        <CardBody>
          <h2>
            Enter the range of redshift values you would like to see. <br />
          </h2>
          <div>
            <span style={{ margin: '10px' }} className="inline">
              From
            </span>
            <span>
              <TextField
                id="inline-text-input-1"
                type="number"
                style={{ maxWidth: '200px' }}
                className="inline-block"
                label=""
                onChange={this.handleChange('redshiftVal1')}
                lineDirection="center"
                placeholder="Type Number Here"
              />
            </span>
            <span style={{ margin: '10px' }} className="inline">
              to
            </span>
            <span>
              <TextField
                id="inline-text-input-2"
                type="number"
                style={{ maxWidth: '200px' }}
                className="inline-block"
                label=""
                onChange={this.handleChange('redshiftVal2')}
                lineDirection="center"
                placeholder="Type Number Here"
              />
            </span>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default InputBox;
