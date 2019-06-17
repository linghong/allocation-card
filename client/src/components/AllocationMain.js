import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchIndexData, updateAllocationData } from '../actions/index';
import AllocationMainTable from './AllocationMainTable';

class AllocationMain extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sum: 0,
      buttonDisabled: true
    };
    this.props.fetchIndexData();
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  allocationChoice = (label, left, right) => {
    return (
      <div className="allocation-choice">
        <div className="allocation-choice-item">
          <label>SURRENDER CHARGE PERIOD </label>
          <div className="switch-button">
            <button className="button-active">5-Years</button>
            <button className="button-inactive">7-Years</button>
          </div>
        </div>
        <div className="allocation-choice-item">
          <label>INITIAL PREMIUM</label>
          <div className="switch-button">
            <button className="button-active">$25K-$100K</button>
            <button className="button-inactive">$100K+</button>
          </div>
        </div>
      </div>
    );
  }

  allocationSummary = () => {
    const buttonStatus = this.state.sum === 100 ? 'active' : 'inactive';
    const disable = this.state.disabled;
    return (
      <div className="allocation-summary">
        <div className="allocation-summary-total">
          <div
            className="allocation-summary-sum"
            type="number"
            name="sum"
          > { `${this.state.sum}%` }
          </div>
          <label>Total Allocation </label>
        </div>
        <div className="allocation-summary-control">
          <label onClick = { this.handleReset }>
            Reset
          </label>
          {
            this.state.buttonDisabled
              ? <button className ={`allocation-summary-conform round-button ${buttonStatus}`} type="submit" value="Submit" disabled onClick={this.handleFormSubmit}>
              Conform
              </button>
              : <button className ={`allocation-summary-conform   round-button ${buttonStatus}`} type="submit" value="Submit" onClick={this.handleFormSubmit}>
                Conform
              </button>
          }
        </div>
      </div>
    );
  }

  onInputChange = (dataObj) => {
    const sum = Object.keys(dataObj).reduce((sum, key) => sum + parseInt(dataObj[key] || 0), 0);
    if (sum === 100) {
      this.setState({ buttonDisabled: false });
    }
    this.setState({ sum, ...dataObj });
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
    if (this.state.sum !== 100) return;
    e.preventDefault();

    let allocation = [];
    const state = this.state;
    for (let key in state) {
      if (state.hasOwnProperty(key) & key !== 'sum' & key !== 'buttonDisabled') {
        allocation.push({ name: key, value: state[key] });
      }
    }
    this.props.updateAllocationData(allocation);
  }

  render () {
    return (
      <form
        className = "allocation-main"
      >
        { this.allocationChoice() }
        <AllocationMainTable
          index = { this.props.index }
          handleInputChange= { this.onInputChange }
          allocation={this.state}
        />
        { this.allocationSummary() }
      </form>
    );
  }
}

export default connect(null, { fetchIndexData, updateAllocationData })(AllocationMain);
