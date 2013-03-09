var http    = require('http'),
	express = require('express'),
	faye    = require('faye'),
	cons    = require('consolidate'),
	app     = express();

// Create hhtp server
var server = http.createServer(app);

var messages = {}

app.use(express.static('./public'));

app.engine('.html',cons.swig);
app.set("view engine","html");
app.set("views", "./views");

app.get('/', function (req, res) {
	res.render('home');
});

app.get('/:chatRoom', function (req,res) {
	res.render('chat-room',{
		messages : messages['/' + req.params.chatRoom]
	});
});

// Create faye server
var fayeServer = new faye.NodeAdapter({mount: '/faye'});

extension = {
	incoming : function(message, callback){
		if ( message.channel.indexOf('meta') === -1 ){
			console.log(message.channel);

			if(!messages[message.channel]){
				messages[message.channel] = [];
			}

			messages[message.channel].push(message.data);
		}

		callback(message);
	}
}


fayeServer.addExtension(extension);
fayeServer.attach(server);

server.listen(3000)
console.log('Server listening to port 3000')