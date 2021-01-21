import { CART_FAILURE, CART_START, CART_SUCCESS } from './action_type';
import { addInCart, removeFromCart, getAllCartData } from './databaseQuery';

function cartStart() {
  return {
    type: CART_START,
  };
}

function cartSuccess(data) {
  return {
    type: CART_SUCCESS,
    data: data,
  };
}

function cartFailure(error) {
  return {
    type: CART_FAILURE,
    mssg: error,
  };
}

//add :0 cartDelete we give id ,1: when we have obj and 3:when we just intialise
export function cartAdd(bookObj) {
  return (dispatch) => {
    dispatch(cartStart());
    addInCart(bookObj)
      .then((obj) => dispatch(cartSuccess({ add: 1, obj: obj })))
      .catch((mssg) => dispatch(cartFailure(mssg)));
  };
}

export function cartDelete(bookID) {
  return (dispatch) => {
    dispatch(cartStart());
    removeFromCart(bookID)
      .then((id) => dispatch(cartSuccess({ add: 0, id: id })))
      .catch((mssg) => dispatch(cartFailure(mssg)));
  };
}
export function loadCartdata() {
  return (dispatch) => {
    dispatch(cartStart());
    getAllCartData()
      .then((data) => {
        console.log('data', data);
        dispatch(cartSuccess({ add: 2, data: data }));
      })
      .catch((err) => dispatch(cartFailure(err)));
  };
}

export function columnSelectorCart(sortBy, data) {
  return (dispatch) => {
    dispatch(cartStart());

    data.sort(function (a, b) {
      return b[sortBy] - a[sortBy];
    });
    console.log('aftersort', data);
    dispatch(cartSuccess({ add: 2, data: data }));
  };
}
