import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { fetchIndexData } from '../actions/index';
import AllocationMainTable from './AllocationMainTable';

class AllocationMain extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index: null,
      sum: 0
    };
    this.props.fetchIndexData();
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps !== this.props) {
      return true;
    } else if (nextState !== this.state) {
      return true;
    } else {
      return false;
    }
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
          <label>
            Reset
          </label>
          <button className="allocation-summary-conform round-button inactive" type="submit" value="Submit" onSubmit={this.handleFormSubmit}>
            Conform
          </button>
        </div>
        
      </div>
    );
  }

  render () {
    return (
      <form
        className = "allocation-main"
        onSubmit = { this.handleFormSubmit }
      >
        { this.allocationChoice() }
        <AllocationMainTable
          index = { this.props.index }
        />
        { this.allocationSummary() }
      </form>
    );
  }
}

export default connect(null, { fetchIndexData })(AllocationMain);
