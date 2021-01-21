//reducer related to data loading
import {
  DATA_LOADING_FAILURE,
  DATA_LOADING_START,
  DATA_LOADING_SUCCESS,
} from '../actions/action_type';

let initialState = {
  inProgress: false,
  dataLoaded: true,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_LOADING_START:
      return {
        inProgress: true,
        dataLoaded: false,
      };
    case DATA_LOADING_SUCCESS:
      return {
        inProgress: false,
        dataLoaded: true,
      };
    case DATA_LOADING_FAILURE:
      return {
        inProgress: false,
        dataLoaded: false,
        error: action.mssg,
      };
    default:
      return {
        ...state,
      };
  }
}
