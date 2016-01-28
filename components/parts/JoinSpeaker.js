var React = require('react');
import {findDOMNode} from 'react-dom';

var JoinSpeaker = React.createClass({
  start(){
    var speakerName = findDOMNode(this.refs.name).value;
    var title = findDOMNode(this.refs.title).value;
    console.log(title);
    this.props.emit('start',{
      name: speakerName,
      title: title
    });
  },
  render(){
    return (
      <form action="javascript:void(0)" onSubmit={this.start}>
        <label>Full Name:</label>
        <input ref         ="name"
               className   ="form-control"
               placeholder ="Enter your name"
               required />

        <label>Presentation Title</label>
        <input  ref         ="title"
                className   ="form-control"
                placeholder ="Enter presentation title"
                required />
        <button className='btn btn-primary'>Join</button>
      </form>
    );
  }
});

module.exports = JoinSpeaker;
