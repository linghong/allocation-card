import axios from 'axios';

export const FETCH_INDEXDATA = 'FETCH_INDEXDATA';
export const UPDATE_ALLOCATIONDATA = 'UPDATE_ALLOCATIONDATA';
export const SET_INDEXDATA = 'FETCH_INDEXDATA';
const FETCH_DATAFAIL = 'FETCH_DATAFAIL';

// redux-thunk
export const fetchIndexData = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:4000/index');
    dispatch(setIndexData(res));
  } catch (err) {
    dispatch(fetchDataFail(err));
  }
};

export function setIndexData (payload) {
  return {
    type: SET_INDEXDATA,
    payload
  };
}

export function fetchDataFail (payload) {
  return {
    type: FETCH_DATAFAIL,
    payload
  };
}

export function updateAllocationData (data) {
  return {
    type: UPDATE_ALLOCATIONDATA,
    data
  };
}
