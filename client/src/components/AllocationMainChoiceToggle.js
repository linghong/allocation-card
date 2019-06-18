import React, { Component } from 'react';

import { secondaryColor, lightSecondaryColor } from '../utils';
import { getDynamicStyles } from 'jss';

class AllocationMainChoiceToggle extends Component {

  constructor (props) {
    super(props);
    this.state = {
      surrenderCharge: true, // when true, the left button is on
      initialPremium: true // when true, the left button is on
    };
  }

  toggleSurrenderButton = () => {
    console.log('111', this.state)
    this.setState({
      surrenderCharge: !this.state.surrenderCharge
    });
  }

  togglePremiumButton = () => {
    this.setState({
      initialPremium: !this.state.initialPremium
    });
  }

  getStyle = (target) => {
    let leftStyle;
    let rightStyle;
    if (this.state !== null && this.state[target] === true) {
      leftStyle = { backgroundColor: secondaryColor };
      rightStyle = { color: lightSecondaryColor };
    } else {
      leftStyle = { color: lightSecondaryColor };
      rightStyle = { backgroundColor: secondaryColor };
    }
    return { leftStyle, rightStyle };
  }

  render () {
    const surrenderCharge = this.getStyle('surrenderCharge');
    const initialPremium = this.getStyle('initialPremium');

    return (
      <div className="allocation-choice">
        <div className="allocation-choice-item" >
          <label>SURRENDER CHARGE PERIOD </label>
          <div className="switch-button" value="surrenderCharge" onClick= { this.toggleSurrenderButton } >
            <button className="button-active" style = {surrenderCharge.leftStyle} >5-Years</button>
            <button className="button-inactive" style={surrenderCharge.rightStyle}>7-Years</button>
          </div>
        </div>
        <div className="allocation-choice-item">
          <label>INITIAL PREMIUM</label>
          <div className="switch-button" onClick = {this.togglePremiumButton}>
            <button className="button-active" style = {initialPremium.leftStyle} >$25K-$100K</button>
            <button className="button-inactive" style={initialPremium.rightStyle}>$100K+</button>
          </div>
        </div>
      </div>
    );
  };
};

export default AllocationMainChoiceToggle;
