/*
* a table used to receiving input from users
* it can only input %
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { primaryColor, lightPrimaryColor, lightSecondaryColor } from '../utils';

class AllocationMainTable extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  renderRow = (d) => {
    if (d.name && d.options !== undefined && d.options[0] && d.options[0].value !== undefined) {
      // convert it into a string, keeping only 2 decimals
      // incase the coming data is a string, or a number but not a number with two decimal digits.
      const value = parseFloat(d.options[0].value).toFixed(2);

      const { allocation } = this.props;
      const allocationVal = (allocation[d.name] && allocation[d.name] !== 0) ? `${allocation[d.name]}` : '';

      // % is added on the input area to avoid to confuse users whether it is the dollar amount or percentage
      return (
        <tr key = { d.name }>
          <td> { d.name } </td>
          <td>
            <span>{ value }%</span><span style={{ color: `${lightSecondaryColor}` }}>Cap</span>
            <input
              type="text" name={d.name} style={{ border: `1px solid ${lightPrimaryColor}`, color: primaryColor }} onChange={this.handleDataChange}
              value={ `${allocationVal}%`}
            />
          </td>
        </tr>
      );
    } else {
      console.log(`index data for ${d} has an error!`);
    }
  };

  handleDataChange = (e) => {
    // input type is a string
    let inputVal = e.target.value;

    if (inputVal.indexOf('%') === -1) return;
    inputVal = inputVal.slice(0, -1);
    let newState = this.state;
    newState[e.target.name] = parseInt(inputVal);

    this.props.handleInputChange(newState);
  };

  render () {
    const { index } = this.props;
    if (index.length === 0) return null;

    return (
      <table className="allocation-table">
        <thead style={{ color: primaryColor }}>
          <tr>
            <th>Index Crediting Strategied</th>
            <th>1-Year P2P</th>
          </tr>
        </thead>
        <tbody >
          { index.map(d => this.renderRow(d)) }
        </tbody>
      </table>
    );
  }
};

function mapStateToProps (state) {
  return {
    index: state.Index.index
  };
}

export default connect(mapStateToProps, null)(AllocationMainTable);
