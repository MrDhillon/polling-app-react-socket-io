import React from 'react';
var Display = require('./parts/Display');
var Join = require('./parts/Join');

var Audience = React.createClass({
  render() {
    return(
      <div>
        <Display if={this.props.status === 'connected'}>
          <p>Join the session!</p>
          <Join />
        </Display>
      </div>
    );
  }
});

module.exports = Audience;
