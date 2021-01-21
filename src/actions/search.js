import { SEARCH_FAILURE, SEARCH_START, SEARCH_SUCCESS } from './action_type';
import { searchInDb } from './databaseQuery';

//handling search fubctiinality
function searchStart() {
  return {
    type: SEARCH_START,
  };
}

function searchSuccess(data) {
  return {
    type: SEARCH_SUCCESS,
    data: data,
  };
}

function searchFailure(error) {
  return {
    type: SEARCH_FAILURE,
    mssg: error,
  };
}

export function searchQuery(searchValue, searchBy) {
  return (dispatch) => {
    dispatch(searchStart());
    console.log('okk', searchValue, searchBy);
    searchInDb(searchValue, searchBy)
      .then((data) => {
        dispatch(searchSuccess(data));
      })
      .catch((err) => dispatch(searchFailure(err)));
  };
}

export function columnSelector(sortBy, data) {
  return (dispatch) => {
    dispatch(searchStart());

    data.sort(function (a, b) {
      return b[sortBy] - a[sortBy];
    });
    console.log('aftersort', data);
    dispatch(searchSuccess(data));
  };
}
