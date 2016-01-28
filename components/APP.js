import React 							 from "react";
import io 								 from 'socket.io-client';
import Header 						 from "./parts/Header";


var APP = React.createClass({

	getInitialState(){
		return{
			status: 'disconnected',
			title : '',
			member: {},
			audience: [],
			speaker: ''
		}
	},
	componentWillMount(){
		this.socket = io('http://localhost:3000');
		// this referes to the instant of our app component
		this.socket.on('connect', this.connect);
		this.socket.on('disconnect', this.disconnect);
		this.socket.on('welcome', this.updateState);
		this.socket.on('joined',this.joined);
		this.socket.on('audience',this.updateAudience);
		this.socket.on('start',this.updateState);
	},
	emit(eventName,payload){
		this.socket.emit(eventName,payload);
	},
	connect(){
		console.log(this.socket.id);
		var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

		if(member){
			this.emit('join',member)
		}

		this.setState({status: 'connected'});
	},
	disconnect(){
		this.setState({status: 'disconnected'});
	},
	updateState(serverState){
		this.setState(serverState);
	},
	joined(memberData){
		sessionStorage.member = JSON.stringify(memberData);
		this.setState({member: memberData});
	},
	updateAudience(updateAudience){
		this.setState({audience: updateAudience});
	},
	render() {
		return (
			<div>
				<Header {...this.state} />
				{React.cloneElement(this.props.children,{
					title: this.state.title,
					status: this.state.status,
					member: this.state.member,
					audience: this.state.audience,
					emit: this.emit,
					speaker: this.state.speaker
				})}
			</div>
		);
	}
});

module.exports = APP;
