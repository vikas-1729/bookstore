//search reducers
import {
  SEARCH_FAILURE,
  SEARCH_START,
  SEARCH_SUCCESS,
} from '../actions/action_type';

let initialState = {
  inProgress: false,
  error: null,
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_START:
      return {
        ...state,
        inProgress: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        inProgress: false,
        data: action.data,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        inProgress: false,
        error: action.mssg,
      };
    default:
      return {
        ...state,
      };
  }
}
