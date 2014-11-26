// Modules
var http = require('http'),
	express = require('express'),
	socketio = require('socketio'),
	morgan = require('morgan');


// App
var app = express();
var server = http.Server(app);
var socket = socketio(server);


// Configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port' process.env.PORT || 3000);


// Routes
app.get('/', function(req, res) {
	res.render('index', { title: 'Chat' });
});


// Start the server
server.listen(app.get('port'), function() {
	console.log('Chat starting on port ' + app.get('port'));
});