var onReady = function () {
	var grid = new Grid();
	grid.render( $('#grid') );

	$.each($('#grid').data().values, function(i, user){
		grid.pintar(user.x, user.y, user.color, user.id);
	});

	window.client = io.connect(window.location.href);


	client.on('connect', function (socket) {
		window.user = {
			id : client.socket.sessionid,
			x : 10,
			y : 10,
			color : '#000000'
		}

		client.emit('move', user);
		grid.pintar(user.x, user.y, user.color, user.id);
	});

	key('up, down, left, right', function(event){
		grid.clear(user.id);
		
		if(event.keyIdentifier === "Right"){
			user.x++;
		}

		if(event.keyIdentifier === "Left"){
			user.x--;
		}

		if(event.keyIdentifier === "Up"){
			user.y--;
		}

		if(event.keyIdentifier === "Down"){
			user.y++;
		}
		
		grid.pintar(user.x, user.y, user.color, user.id);
		client.emit('move', user);
	});

	client.on('move', function(user){
		grid.clear(user.id)
		grid.pintar(user.x, user.y, user.color, user.id);
	});

	client.on('remove', function(user){
		grid.clear(user.id);
	});

}

$(document).on('ready', onReady)