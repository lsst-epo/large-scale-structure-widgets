import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardBody from 'react-md/lib/Cards/CardText';
import TextField from 'react-md/lib/TextFields/TextField';
import PropTypes from 'prop-types';
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
    this.setState(prevState => ({
      ...prevState,
      [name]: event,
    }));
    onUserInput(name, event);
  };

  renderTextField(id, redshiftKey, phrase) {
    return (
      <span>
        <TextField
          id={`inline-text-input-${id}`}
          type="number"
          style={{ maxWidth: '200px' }}
          className="inline-block"
          label=""
          onChange={this.handleChange(redshiftKey)}
          lineDirection="center"
          placeholder={phrase}
        />
      </span>
    );
  }

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
            {this.renderTextField(
              'inline-text-inline-1',
              'redshiftVal1',
              'Minimum Value: 0.02'
            )}
            <span style={{ margin: '10px' }} className="inline">
              to
            </span>
            {this.renderTextField(
              'inline-text-inline-2',
              'redshiftVal2',
              'Maximum value: 0.20'
            )}
          </div>
        </CardBody>
      </Card>
    );
  }
}

InputBox.propTypes = {
  onUserInput: PropTypes.func,
};

export default InputBox;
