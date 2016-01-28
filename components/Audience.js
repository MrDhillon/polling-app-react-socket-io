import React from 'react';
var Display = require('./parts/Display');

var Audience = React.createClass({
  render() {
    return(
      <div>
        <Display if={this.props.status === 'connected'}>
          <p>Join the session!</p>
        </Display>
      </div>
    );
  }
});

module.exports = Audience;
