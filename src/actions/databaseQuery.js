//all database call as promises
import getDatabase from '../config';
import {
  DATA_LOADING_START,
  DATA_LOADING_SUCCESS,
  DATA_LOADING_FAILURE,
} from './action_type';

const db = getDatabase();
const url =
  'https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json';

function dataLoadingStart() {
  return {
    type: DATA_LOADING_START,
  };
}

function dataLoadingSuccess() {
  return {
    type: DATA_LOADING_SUCCESS,
  };
}

function dataLoadingFailure(error) {
  return {
    type: DATA_LOADING_FAILURE,
    mssg: error,
  };
}

export function loadData() {
  return (dispatch) => {
    db.on('ready', function () {
      db.books.count(function (count) {
        if (count > 0) {
          console.log('hlo we have count');
        } else {
          console.log('Database is empty. Populating from ajax call...');
          dispatch(dataLoadingStart());
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              db.books.bulkAdd(data);
            })
            .then(() => {
              dispatch(dataLoadingSuccess());
            })
            .catch((err) => {
              dispatch(dataLoadingFailure(err));
            });
        }
      });
    });
  };
}

export function searchInDb(searchValue, searchBy) {
  return new Promise((resolve, reject) => {
    if (searchValue == undefined || searchBy === undefined) {
      reject('Inavalid input');
    }
    if (searchBy === 'bookID') {
      searchValue = parseInt(searchValue);
      if (isNaN(searchValue)) {
        reject('Invalid Book Id Only Number Are Allowed');
        return;
      }
      db.books
        .where('bookID')
        .equals(searchValue)
        .toArray()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } else {
      db.books
        .where(searchBy)
        .startsWithAnyOfIgnoreCase(searchValue)
        .toArray()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    }
  });
}

export function addInCart(bookObj) {
  console.log('addObj', bookObj);
  return new Promise((resolve, reject) => {
    db.cart
      .add(bookObj)
      .then((data) => {
        console.log('added');
        resolve(bookObj);
      })
      .catch((err) => reject(err));
  });
}

export function removeFromCart(bookID) {
  return new Promise((resolve, reject) => {
    db.cart
      .delete(bookID)
      .then((data) => {
        console.log('deleted');
        resolve(bookID);
      })
      .catch((err) => reject(err));
  });
}

export function getAllCartData() {
  return new Promise((resolve, reject) => {
    db.cart
      .toArray()
      .then((data) => {
        console.log('okk dome', data);
        resolve(data);
      })
      .catch((err) => {
        console.log('errpr', err);
        reject(err);
      });
  });
}
