$(document).ready(function () {
	window.client = new Faye.Client("/faye",{retry:5});

	$('#enviar-mensaje').click(function(){
		var msg = $('textarea').val();

		if(!msg) return;

		console.log(msg)

		client.publish(window.location.pathname, {
			text: msg
		});

		$('textarea').val('');
	});

	client.subscribe(window.location.pathname, function(message) {
		$('#chat').append('<li>'+message.text+'</li>')
	});
});