var express = require('express');
var _ = require('underscore');
var app = express();

var connections = [];
var title = "Presentation Title";
var audience = [];
var speaker = {};
var questions = require('./app-questions');
var currentQuestion = false;

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){

  socket.on("disconnect",function(){
    var member = _.findWhere(audience, {id: this.id});
    if(member){
      audience.splice(audience.indexOf(member),1);
      io.sockets.emit('audience',audience);
      console.log(`audience left: ${member.name}, ${audience.length} users left`);
    } else if (this.id === speaker.id){
      console.log("%s has left. '%s' is over", speaker.name, title);
      speaker= {};
      title = "No presentation in session"
      io.sockets.emit('end', {title: title, speaker: ''});
    }
    connections.splice(connections.indexOf(socket),1);
    socket.disconnect();
    console.log("a user disconnected, remaining sockets:"+connections.length);
  });

  socket.on('join',function(payload){
    var newMember = {
      // !!this!! refers to the socket that just emitted
      id: this.id,
      name: payload.name,
      type: 'member'
    }
    this.emit('joined',newMember);
    audience.push(newMember);
    io.sockets.emit('audience',audience);
    console.log(`audience member joined: ${payload.name} on socket ${newMember.id}`);
  })

  socket.on("start",function(payload){
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = 'speaker';
    title = payload.title;
    this.emit('joined',speaker);
    io.sockets.emit('start',{title: title, speaker: speaker.name});
    console.log("Presentation started: %s by %s", title, speaker.name);
  });

  socket.on('ask',function(question){
    currentQuestion = question;
    io.sockets.emit('ask',currentQuestion);
    console.log("Question asked is '%s'",question.q);
  });

  socket.emit("welcome",{
    title: title,
    audience: audience,
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion
  });

  connections.push(socket);
  console.log("Connected: %s sockets connected: ", connections.length);
});

console.log("Polling server is running at 'http://localhost:3000'");
