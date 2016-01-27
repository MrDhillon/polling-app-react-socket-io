import React from "react";
var io = require('socket.io-client');
var Header = require("./parts/Header");

var APP = React.createClass({
	componentWillMount(){
		this.socket = io('http://localhost:3000');
		// this referes to the instant of our app component
		this.socket.on('connect', this.connect);
	},
	connect(){
		console.log(this.socket.id);
	},
	render() {
		return (
			<div>
				<Header title="New Header" />
			</div>
		);
	}
});

module.exports = APP;
