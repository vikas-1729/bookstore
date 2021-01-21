import React from 'react';
import { Link } from 'react-router-dom';

const Noresult = (props) => {
  return (
    <div>
      No search Result to show....
      <br></br> Please Enter some text while here are some famous referemce
      <ul>
        <li>
          <Link to={`${encodeURI('/search?searchValue=Harry&searchBy=title')}`}>
            Harry
          </Link>
        </li>
        <li>
          <Link to={`${encodeURI('/search?searchValue=J.k&searchBy=authors')}`}>
            J.K Rowling
          </Link>
        </li>
        <li>
          <Link to={`${encodeURI('/search?searchValue=Emma&searchBy=title')}`}>
            Emma
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Noresult;
