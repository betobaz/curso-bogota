var express = require('express'),
	http    = require('http'),
	pony    = require('socket.io'),
	cons    = require('consolidate'),
	swig    = require('swig');

var app    = express();
var server = http.createServer(app);
var io     = pony.listen(server);

server.listen(3000);

swig.init({
	cache : false
});

var marks = [];

app.use( express.static('./public') );

app.engine('.html', cons.swig);
app.set('view engine','html');
app.set('views', './views');

app.use(express.bodyParser());
app.use(express.cookieParser());

app.get('/',function (req, res) {
	res.render('home');
});

app.post('/mark/new', function(req, res){
	marks.push({
		title : req.body.title,
		ib    : req.body.ib,
		jb    :req.body.jb
	});

	console.log('mark saved');

	res.send(200);
});

io.sockets.on('connection', function(socket){
	socket.emit('init', {
		marks : marks
	})
});
