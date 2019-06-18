/*
* components on the right
* @top: buttons toggle
* @middle: displays index and a table receive input
* @bottom: summary and conform the strategery
* when the input % reaches 100 the button will be inabled, there are also color changes according to that
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchIndexData, updateAllocationData } from '../actions/index';
import AllocationMainTable from './AllocationMainTable';
import AllocationMainChoiceToggle from './AllocationMainChoiceToggle';
import { primaryColor } from '../utils';

class AllocationMain extends Component {
  constructor (props) {
    super(props);

    this.state = {
      allocationSum: 0,
      buttonDisabled: true // when the totall allocation is not 100, submiting data is disabled
    };

    // fetch the index data from faked server
    this.props.fetchIndexData();
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  allocationSummary = () => {
    const { allocationSum } = this.state;
    // when the total allocation on the bottom left turns to 100
    const buttonStatus = allocationSum === 100 ? 'active' : 'inactive';
    const borderStatus = allocationSum === 100 ? 'green' : 'red';

    return (
      <div className="allocation-summary">
        <div className="allocation-summary-total" style={{ color: primaryColor }} >
          <div
            className={ `allocation-summary-sum ${borderStatus}`}
            type="number"
            name="sum"
          > { `${allocationSum}%` }
          </div>
          <label>Total Allocation </label>
        </div>
        <div className="allocation-summary-control" style={{ color: primaryColor }}>
          <label style={{ color: primaryColor }} onClick={ this.handleReset } >
            Reset
          </label>
          {
            this.state.buttonDisabled
              ? <button className={`allocation-summary-conform round-button ${buttonStatus}`} style={{ backgroundColor: primaryColor }} type="submit" value="Submit" disabled onClick={this.handleFormSubmit}>
              Conform
              </button>
              : <button className={`allocation-summary-conform   round-button ${buttonStatus}`} style={{ backgroundColor: primaryColor }} type="submit" value="Submit" onClick={this.handleFormSubmit}>
                Conform
              </button>
          }
        </div>
      </div>
    );
  }

  onInputChange = (dataObj) => {
    const allocationSum = Object.keys(dataObj).reduce((allocationSum, key) => allocationSum + parseInt(dataObj[key] || 0), 0);

    if (allocationSum === 100) {
      this.setState({ buttonDisabled: false });
    }
    this.setState({ allocationSum, ...dataObj });
  }

  handleReset = () => {
    Object.keys(this.state).forEach(key => {
      let newState = this.state;
      newState[key] = 0;
      this.setState(newState);

      this.setState({ buttonDisabled: true });
    });
    this.props.updateAllocationData([]);
  }

  handleFormSubmit = (e) => {
    if (this.state.allocationSum !== 100) return;
    e.preventDefault();

    // this data is used to draw the aside chart and list, so only the data for allocation strategy  will send to the reducer,
    let allocation = [];
    const state = this.state;
    for (let key in state) {
      if (state.hasOwnProperty(key) & key !== 'allocationSum' & key !== 'buttonDisabled') {
        allocation.push({ name: key, value: state[key] });
      }
    }
    this.props.updateAllocationData(allocation);
  }

  render () {
    return (
      <div
        className = "allocation-main"
      >
        <AllocationMainChoiceToggle />
        <AllocationMainTable
          index={ this.props.index }
          handleInputChange={ this.onInputChange }
          allocation={this.state}
        />
        { this.allocationSummary() }
      </div>
    );
  }
}

export default connect(null, { fetchIndexData, updateAllocationData })(AllocationMain);
