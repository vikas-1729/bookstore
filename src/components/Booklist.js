import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { cartAdd, cartDelete } from '../actions/cart';

import { Book, Noresult } from './index';
import { columnSelector, searchQuery } from '../actions/search';
class Booklist extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const url = this.props.location.search;
    let query = queryString.parse(url);
    if (query.searchValue == undefined || query.searchBy === undefined) {
      return;
    } else {
      this.props.dispatch(searchQuery(query.searchValue, query.searchBy));
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const urlPrev = prevProps.location.search;
    const prevQuery = queryString.parse(urlPrev);
    const urlCurr = this.props.location.search;
    const currQuery = queryString.parse(urlCurr);
    if (
      prevQuery &&
      currQuery &&
      prevQuery.searchValue !== currQuery.searchValue &&
      prevQuery.searchBy !== currQuery.searchBy
    ) {
      //dispatch an action

      this.props.dispatch(
        searchQuery(currQuery.searchValue, currQuery.searchBy)
      );
    }
  }
  isInCart = (id) => {
    if (id === undefined) {
      return;
    }
    const { data: cartArray } = this.props.cart;
    let index = cartArray.findIndex((x) => x.bookID === id);
    return !(index === -1);
  };
  deleteFromCart = (id) => {
    this.props.dispatch(cartDelete(id));
  };
  addToCart = (id) => {
    const { data } = this.props.search;
    let obj = data.find((obj) => obj.bookID === id);
    if (obj === undefined) {
      return;
    }
    this.props.dispatch(cartAdd(obj));
  };
  handleColumnSelector = (sortBy) => {
    if (sortBy === null) {
      return;
    }
    this.props.dispatch(columnSelector(sortBy, this.props.search.data));
  };
  render() {
    const { inProgress, error, data } = this.props.search;

    if (inProgress) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h2>Wait a sec ...</h2>
          <div className="loader"></div>
        </div>
      );
    } else if (error) {
      return <div className="error-dailog">{error}</div>;
    } else if (data.length === 0) {
      return <Noresult />;
    }
    return (
      <div>
        <div className="coloumn-selector">
          <select onChange={(e) => this.handleColumnSelector(e.target.value)}>
            <option disabled> -- sort by -- </option>
            <option value="bookID">BOOK ID</option>
            <option value="ratings_count">Likes</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="book-list">
          {data.map((book) => {
            return (
              <Book
                book={book}
                key={book.bookID}
                from="BookList"
                isInCart={this.isInCart}
                deleteFromCart={this.deleteFromCart}
                addToCart={this.addToCart}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
function mapToState(state) {
  return {
    search: state.search,
    cart: state.cart,
  };
}

export default connect(mapToState)(Booklist);
