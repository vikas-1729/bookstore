import { CART_FAILURE, CART_START, CART_SUCCESS } from '../actions/action_type';

let initialState = {
  inProgress: false,
  error: null,
  data: [],
};

//reducer releated to cart
export default function (state = initialState, action) {
  switch (action.type) {
    case CART_START:
      return {
        ...state,
        inProgress: true,
      };
    case CART_SUCCESS:
      let newArray = [];

      let whatAction = action.data.add;

      if (whatAction === 0) {
        //delete
        newArray = state.data.filter((book) => book.bookID !== action.data.id);
      } else if (whatAction === 1) {
        //add
        newArray = [action.data.obj, ...state.data];
      } else if (whatAction === 2) {
        //intialise
        newArray = [...action.data.data];
      }

      return {
        ...state,
        inProgress: false,
        data: newArray,
      };
    case CART_FAILURE:
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
