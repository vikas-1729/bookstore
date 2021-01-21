import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { searchQuery } from '../actions/search';
const Navbar = (props) => {
  let [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState('bookID');
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(e) {
    console.log('okk', searchValue, searchBy);
    if (e.key === 'Enter') {
      //check validation if searchBy
      searchValue = searchValue.trim();
      if (searchValue.length == 0) {
        alert('There must be value in search input');
        return;
      }
      switch (searchBy) {
        case 'bookID':
          let numbers = /^[0-9]+$/;
          if (!searchValue.match(numbers)) {
            alert('Book Id must be ineteger');
            return;
          }
          break;

        default:
          break;
      }

      const { dispatch } = props;

      dispatch(searchQuery(searchValue, searchBy));
      setRedirect(true);
      window.location.href = `search?searchValue=${searchValue}&searchBy=${searchBy}`;
    }
  }

  const { inProgress } = props;

  return (
    <div>
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img height="60px" width=" 50px" src="images/logo.svg" alt="logo" />
          </Link>
          <Link to="/">
            <div className="logo-name">Book Store</div>
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input
            required
            placeholder="Enter the text select the option and press enter"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => handleSubmit(e)}
            disabled={inProgress}
          />
          <select
            onChange={(e) => setSearchBy(e.target.value)}
            value={searchBy}
          >
            <option value="title">Title</option>
            <option value="bookID">Id</option>
            <option value="authors">Author</option>
          </select>
        </div>
        <div className="right-nav">
          <div className="user">
            <img src="images/cart.svg" alt="cart" id="user-dp" />
          </div>

          <div className="nav-links">
            <ul>
              <li>
                {' '}
                <Link to="/Cart" style={{ fontSize: '1.5rem' }}>
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

function mapToState(state) {
  return {
    inProgress: state.search.inProgress,
  };
}
export default connect(mapToState)(Navbar);
