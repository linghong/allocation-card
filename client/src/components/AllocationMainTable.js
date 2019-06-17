import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllocationMainTable extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  renderRow = (d) => {
    if (d.name && d.options !== undefined && d.options[0] && d.options[0].value !== undefined) {
      // convert it into a string, keeping only 2 decimals
      // incase the data is a string, or a number but not a number with two decimal digits.
      const value = parseFloat(d.options[0].value).toFixed(2);

      const { allocation } = this.props;
      const allocationVal = (allocation[d.name] !== undefined && allocation[d.name] !== 0) ? `${allocation[d.name]}` : '';

      return (
        <tr key = { d.name }>
          <td> { d.name } </td>
          <td>
            <span>{ value }% Cap</span>
            <span>
              <input
                type="text" name={d.name} onChange={this.handleDataChange}
                value = {`${allocationVal}`}
              />
            </span>
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

    /* if (inputVal.slice(-1) === '%') {
      inputVal = e.target.value.slice(0, -1);
    }s */
    let newState = this.state;
    newState[e.target.name] = parseInt(inputVal);
    // this.setState(newState);
    this.props.handleInputChange(newState);
  };

  render () {
    const { index } = this.props;
    if (index.length === 0) return null;

    return (
      <table className="allocation-table">
        <thead>
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
