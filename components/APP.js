import React from "react";
var io = require('socket.io-client');
var Header = require("./parts/Header");

var APP = React.createClass({

	getInitialState(){
		return{
			status: 'disconnected'
		}
	},

	componentWillMount(){
		this.socket = io('http://localhost:3000');
		// this referes to the instant of our app component
		this.socket.on('connect', this.connect);
	},
	connect(){
		console.log(this.socket.id);
		this.setState({status: 'connected'});
	},
	render() {
		return (
			<div>
				<Header title="New Header" status={this.state.status} />
			</div>
		);
	}
});

module.exports = APP;
