import React from 'react';
import PropTypes from 'prop-types';
import './StyleCard.css';

class Card extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getColor = coors => {
    const redshift = coors[2];
    if (redshift < 0.09) {
      return '#ffbaba';
    }

    if (redshift < 0.15) {
      return '#ff5252';
    }

    return '#a70000';
  };

  render() {
    const { data } = this.props;
    return (
      <table className="table">
        <tbody>
          <tr className="tr">
            <th className="th">Index</th>
            <th className="th">RA</th>
            <th className="th">Dec</th>
            <th className="th">Redshift</th>
          </tr>
          {data.map((coors, index) => {
            const key = `row-${index}`;
            return (
              <tr className="tr" key={key}>
                <td className="th">
                  {index}
                  <span
                    style={{ backgroundColor: this.getColor(coors) }}
                    className="circle"
                  />
                </td>
                <td className="th">{coors[0]}</td>
                <td className="th">{coors[1]}</td>
                <td className="th">{coors[2]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Card.propTypes = {
  data: PropTypes.array,
};

export default Card;
