import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Book, Noresult } from '.';
import { cartDelete, loadCartdata } from '../actions/cart';
import { columnSelectorCart } from '../actions/cart';
class Cart extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadCartdata());
  }
  deleteFromCart = (id) => {
    this.props.dispatch(cartDelete(id));
  };

  handleColumnSelector = (sortBy) => {
    if (sortBy === null) {
      return;
    }
    this.props.dispatch(columnSelectorCart(sortBy, this.props.cart.data));
  };

  render() {
    const { inProgress, error, data } = this.props.cart;
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
      <div className="book-list">
        <h2 className="cart-heading">Your Cart</h2>
        <div className="coloumn-selector">
          <select onChange={(e) => this.handleColumnSelector(e.target.value)}>
            <option disabled> -- sort by -- </option>
            <option value="bookID">BOOK ID</option>
            <option value="ratings_count">Likes</option>
            <option value="price">Price</option>
          </select>
        </div>
        {data.map((book) => {
          return (
            <Book
              book={book}
              key={book.bookID}
              from="Cart"
              deleteFromCart={this.deleteFromCart}
            />
          );
        })}
      </div>
    );
  }
}
function mapToState(state) {
  return {
    cart: state.cart,
  };
}

export default connect(mapToState)(Cart);
