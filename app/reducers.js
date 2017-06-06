import { combineReducers } from 'redux';
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  INVALIDATE_DATA
} from './actions';

function content(state = {
  isFetching: false,
  didInvalidate: true,
  data: {}
}, action) {
  switch (action.type) {
    case INVALIDATE_DATA:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  content
});

export default rootReducer;
