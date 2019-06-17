import React, { Component } from 'react';
import { connect } from 'react-redux';

import { select } from 'd3-selection';

import { createDonut } from './AllocationStrategiesDonut';

class AllocationStrategies extends Component {
  componentDidMount () {
    const defaultData = [
      { name: 'default', value: 100 }
    ];
    createDonut(defaultData, select('#chart'));
  }

  componentDidUpdate () {
    createDonut(this.props.allocation, select('#chart'));
  }

  render () {
    const { allocation } = this.props;
    console.log("a", allocation)
    return (
      <div className = "allocation-aside">
        <div className = "allocation-aside-donut" id = "chart"></div>
        {
          allocation.length !== 0
            ? <div>
              <ul>
                { allocation.map(d =>
                  <li key={d.name}> <span>{d.name}</span><span>{d.value}%</span></li>)}
              </ul>
              <button className = "round-button" type="submit" value="Submit" onClick={this.handleFormSubmit}>
              Conform
              </button>
            </div>
            : <div className = "allocation-aside-call">
              <i className="material-icons icon-size-small">folder_open</i>
              <p>Please input desired allocation into available strategies to enable analysis and further actions</p>
            </div>
        }
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    allocation: state.Index.allocation
  };
}

export default connect(mapStateToProps, null)(AllocationStrategies);
