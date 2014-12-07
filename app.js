// Modules
var http = require('http'),
	path = require('path'),
	express = require('express'),
	socketio = require('socket.io'),
	morgan = require('morgan');


// App
var app = express();
var server = http.Server(app);
var io = socketio(server);


// Configuration
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);


// Routes
app.get('/', function(req, res) {
	res.render('index', { title: 'Chat' });
});

// Socket.IO
io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('a user disconnected');
	});

	socket.on('msg', function(msg) {
		io.emit('msg', msg);
	});
});


// Start the server
server.listen(app.get('port'), function() {
	console.log('Chat starting on port ' + app.get('port'));
});