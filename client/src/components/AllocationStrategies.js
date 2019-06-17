import React, { Component } from 'react';
import { connect } from 'react-redux';

import donut from './AllocationStrategiesDonut';
import { lightPrimaryColor, primaryColor, bcakgroundPrimaryColor, defaultData } from '../utils';

class AllocationStrategies extends Component {
  componentDidMount () {
    donut.create(defaultData, '#chart');
  }

  shouldComponentUpdate (nextProps, nectState) {
    return this.props.allocation !== nextProps.allocation;
  }

  componentDidUpdate (prevProps, prevState) {
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
                    <div>{d.name}</div>
                    <div style = {{ borderLeft: `3px solid ${d.color}`, color: `${primaryColor}` }}>{d.value}%</div>
                  </li>)}
              </ul>
              <button className = "round-button" type="submit" value="Submit" style = {bcakgroundPrimaryColor} onClick={this.handleFormSubmit}>
              Submit
              </button>
            </div>
            : <div className = "allocation-aside-call">
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
