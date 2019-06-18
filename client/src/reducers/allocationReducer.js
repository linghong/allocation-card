import { SET_INDEXDATA, UPDATE_ALLOCATIONDATA } from '../actions';

import { schemeBlues } from 'd3-scale-chromatic';
import { scaleOrdinal } from 'd3-scale';
const defaultState = {
  index: [],
  allocation: []
};

export default function allocation (state = defaultState, action) {
  switch (action.type) {
    case SET_INDEXDATA:
      return {
        ...state,
        index: action.payload.data
      };
    case UPDATE_ALLOCATIONDATA:

      let data = action.data;

      // less than 3 the d3 displays error when run the color scheme function.
      let num = data.length || 3;
      var color = scaleOrdinal(schemeBlues[num]);

      let allocation = [];
      data.forEach(d => {
        allocation.push({
          name: d.name,
          value: d.value,
          color: color(d.name)
        });
      });

      return {
        ...state,
        allocation: allocation
      };
    default:
      return state;
  }
}
