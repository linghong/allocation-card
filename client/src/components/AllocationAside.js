/*
* for the left side column
* @top part: a donut chart
* @bottom part: allocation list and a submit button
* will change the display according to whether it receives allocation data or not
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

import donut from './AllocationAsideDonut';
import { lightPrimaryColor, primaryColor, defaultData } from '../utils';

class AllocationStrategies extends Component {
  componentDidMount () {
    donut.create(defaultData, '#chart');
  }

  shouldComponentUpdate (nextProps, nectState) {
    return this.props.allocation !== nextProps.allocation;
  }

  componentDidUpdate (prevProps, prevState) {
    // this.props.allocation.length === 0, we still need to destroy chart for reset
    donut.destroy('#chart');

    if (this.props.allocation.length === 0) {
      donut.create(defaultData, '#chart');
    } else {
      donut.create(this.props.allocation, '#chart');
    }
  }

  render () {
    const { allocation } = this.props;

    return (
      <div className = "allocation-aside">
        <div className = "allocation-aside-donut" id = "chart"></div>
        {
          allocation.length !== 0
            ? <div className = "allocation-aside-bottom">
              <ul>
                { allocation.map(d =>
                  <li key={d.name} >
                    <div style = {{ borderLeft: `3px solid ${d.color}` }}>{d.name}</div>
                    <div style={{ color: primaryColor }}>{d.value}%</div>
                  </li>)}
              </ul>
              <button className="round-button" type="submit" value="Submit" style={{ backgroundColor: primaryColor }} onClick={this.handleFormSubmit}>
              Submit
              </button>
            </div>
            : <div className="allocation-aside-call">
              <i className="material-icons" style={{ color: `${lightPrimaryColor}` }}>folder_open</i>
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
