import React from 'react';

const Book = (props) => {
  const { book, from } = props;
  console.log('obj', props);

  let rating = Math.floor(book['average_rating']);
  let starArray = [];
  let starNotArray = [];
  for (let i = 0; i < rating; i++) {
    starArray.push(
      <img height="30" width="30" src="images/star1.svg" alt="start" key={i} />
    );
  }
  for (let i = rating; i < 5; i++) {
    starNotArray.push(
      <img height="30" width="30" src="images/star2.svg" alt="start1" key={i} />
    );
  }

  return (
    <div className="book-container">
      <div className="left-part">
        <div className="img-container">
          <img src="images/book1.svg" alt="book" />
        </div>
      </div>
      <div className="middle-part">
        <div className="middle-left">
          <div className="title">
            <span>{book.title}</span>
          </div>
          <div className="author">
            <span>
              <strong>By &nbsp;</strong>
              {book.authors}
            </span>
          </div>
          <div className="rating">
            {starArray}
            {starNotArray}
          </div>
        </div>
        <div className="middle-right">
          <div className="likes">
            <img height="50" width="50" src="images/like.svg" alt="likes" />
            <span>{book['ratings_count']}</span>
          </div>
          <div className="lang">
            <span>
              <strong>lang:</strong>
              {book['language_code']}{' '}
            </span>
            <br />
            <span>
              <strong>ISB:</strong>
              {book.isbn}
            </span>
          </div>
        </div>
      </div>
      <div className="right-part">
        <div className="add-cart">
          {from === 'BookList' ? (
            <div>
              {props.isInCart(book['bookID']) ? (
                <button onClick={() => props.deleteFromCart(book['bookID'])}>
                  Remove From Cart
                </button>
              ) : (
                <button onClick={() => props.addToCart(book['bookID'])}>
                  Add to cart
                </button>
              )}
            </div>
          ) : (
            <div>
              <button onClick={() => props.deleteFromCart(book['bookID'])}>
                Delete From Cart
              </button>
            </div>
          )}
        </div>
        <div className="price">
          <span>Rs {book.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
