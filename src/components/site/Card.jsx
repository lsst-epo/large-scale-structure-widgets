import React from 'react';
import './StyleCard.css';

class Card extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getColor = coors => {
    const redshift = coors[2];
    if (redshift < 0.09) {
      return '#d94e5d';
    } else if (redshift < 0.15) {
      return '#58508d';
    }
    return '#eac736';
  };

  render() {
    return (
      <table className="table">
        <tr className="tr">
          <th className="th">Index</th>
          <th className="th">RA</th>
          <th className="th">Dec</th>
          <th className="th">Redshift</th>
        </tr>
        {this.props.data.map((coors, index) => {
          return (
            <tr className="tr">
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
      </table>
    );
  }
}
export default Card;
