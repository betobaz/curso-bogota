var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

var cons = require('consolidate');

var users = {}

server.listen(3000);

app.engine('.html', cons.jade);
app.set('view engine', 'html');

app.use(express.static('./public'));

app.get('/', function (req, res) {
	res.render('index',{
		titulo : 'Applicacion Grip',
		users  : users
	});
});

var connection = function(socket){
	console.log('connect', Object.keys(users) );
		
	socket.on('move', function(user){
		users[user.id] = user;
		socket.broadcast.emit('move', user);
	});

	socket.on('disconnect', function(){
		delete users[socket.store.id];
		io.sockets.emit('remove', {id:socket.store.id});
	});
}

io.sockets.on('connection', connection)
