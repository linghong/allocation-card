import { SET_INDEXDATA, UPDATE_ALLOCATIONDATA } from '../actions';

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
      console.log("a", action.data)
      return {
        ...state,
        allocation: action.data
      };
    default:
      return state;
  }
}
