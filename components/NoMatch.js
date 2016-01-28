import React from 'react';
import {Link} from 'react-router';

var NoMatch = React.createClass ({
  render(){
    return(
      <div id="not-found">
        <h1>Whoops...</h1>
        <p>Page not Found!
        were you looking for:</p>
        <Link to="/">Audience page</Link>
        <Link to="/speaker">Speaker Page</Link>
        <Link to="/board">Board Page</Link>
      </div>
    );
  }
});

module.exports = NoMatch;
