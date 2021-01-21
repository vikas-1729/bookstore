import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from '../actions/databaseQuery';

import { Navbar, BookList, Cart, Page404 } from './index';
import '../assest/javascript/index';
class App extends Component {
  componentDidMount() {
    this.props.dispatch(loadData());
  }
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    const { inProgress, dataLoaded, error } = this.props.dataLoading;
    console.log(inProgress, dataLoaded, error);
    if (inProgress) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h2>Data is Loading in IndexedDB ...</h2>
          <div className="loader"></div>
        </div>
      );
    }

    if (error) {
      return <h3>{error}</h3>;
    }

    return (
      <div>
        <button onClick={this.topFunction} id="myBtn" title="Go to top">
          Top
        </button>

        <Router>
          <Navbar />
          <Switch>
            <Route path="/search" exact component={BookList} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/" exact component={BookList} />
            <Route component={Page404} />
          </Switch>
        </Router>
      </div>
    );
  }
}
function mapToState(state) {
  return {
    dataLoading: state.dataLoading,
  };
}

export default connect(mapToState)(App);
