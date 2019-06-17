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
    console.log("this.props.allocation", this.props.allocation);


    createDonut(this.props.allocation, select('#chart'));
  }

  allocationList = <div>List</div>;
  callAction = <div>icon</div>;

  render () {
    return (
      <div className = "allocation-aside">
        <div className = "allocation-aside-donut" id = "chart"></div>
        <div className = "allocation-aside-call">
          <i className="material-icons icon-size-small">folder_open</i>
          <p>Please input desired allocation into available strategies to enable analysis and further actions</p>
        </div>
      </div>
    );
  }
};

function mapStateToProps (state) {
  console.log("st", state)
  return {
    allocation: state.Index.allocation
  };
}

export default connect(mapStateToProps, null)(AllocationStrategies);
