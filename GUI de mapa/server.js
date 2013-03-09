var express = require('express'),
	cons    = require('consolidate'),
	swig    = require('swig');

var app = express();

swig.init({
	cache : false
});

app.use( express.static('./public') );

app.engine('.html', cons.swig);
app.set('view engine','html');
app.set('views', './views');

app.get('/',function (req, res) {
	res.render('home');
});

app.listen(3000);
console.log("Funcionando en puerto 3000");