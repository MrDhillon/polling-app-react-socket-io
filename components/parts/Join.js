var React = require('react');
import {findDOMNode} from 'react-dom';

var Join = React.createClass({
  join(){
    var userName = findDOMNode(this.refs.name).value;
    this.props.emit('join',{
      name: userName
    });
  },
  render(){
    return (
      <form action="javascript:void(0)" onSubmit={this.join}>
        <label>Full Name:</label>
        <input  ref="name"
                className="form-control"
                placeholder="enter name"
                required />
        <button className='btn btn-primary'>Join</button>
      </form>
    );
  }
});

module.exports = Join;
