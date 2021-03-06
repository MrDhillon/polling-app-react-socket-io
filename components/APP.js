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
			speaker: '',
			questions: [],
			currentQuestion: false
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
		this.socket.on('start',this.start);
		this.socket.on('end',this.updateState);
		this.socket.on('ask',this.ask);
	},
	emit(eventName,payload){
		this.socket.emit(eventName,payload);
	},
	connect(){
		console.log(this.socket.id);
		var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

		if(member && member.type === 'audience'){
			this.emit('join',member)
		} else if (member && member.type === 'speaker') {
			this.emit('start',{
				name: member.name,
				title: sessionStorage.title
			});
		}

		this.setState({status: 'connected'});
	},
	disconnect(){
		this.setState({
			status: 'disconnected',
			title: 'disconnected',
			speaker: ''
		});
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
	start(presentationInfo){
		if (this.state.member.type === 'speaker'){
			sessionStorage.title = presentationInfo.title;
		}
		this.setState(presentationInfo);
	},
	ask(question){
		this.setState({currentQuestion: question});
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
				speaker: this.state.speaker,
				questions: this.state.questions,
				currentQuestion: this.state.currentQuestion
				})}
			</div>
		);
	}
});

module.exports = APP;
