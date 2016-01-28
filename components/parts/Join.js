var React = require('react');
import {findDOMNode} from 'react-dom';
import {Link} from 'react-router';

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
        <Link to="/speaker">Join as Speaker</Link>
      </form>
    );
  }
});

module.exports = Join;
