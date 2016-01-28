import React 							 from "react";
import io 								 from 'socket.io-client';
import Header 						 from "./parts/Header";


var APP = React.createClass({

	getInitialState(){
		return{
			status: 'disconnected',
			title : ''
		}
	},
	componentWillMount(){
		this.socket = io('http://localhost:3000');
		// this referes to the instant of our app component
		this.socket.on('connect', this.connect);
		this.socket.on('disconnect', this.disconnect);
		this.socket.on('welcome', this.welcome);
	},
	connect(){
		console.log(this.socket.id);
		this.setState({status: 'connected'});
	},
	disconnect(){
		this.setState({status: 'disconnected'});
	},
	welcome(serverState){
		this.setState({title: serverState.title});
	},
	render() {
		return (
			<div>
				<Header title={this.state.title} status={this.state.status} />
				{React.cloneElement(this.props.children,{
					title: this.state.title,
					status: this.state.status
				})}
			</div>
		);
	}
});

module.exports = APP;
