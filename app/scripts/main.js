'use strict';
//initializes messages variable
var serverData;
//varialble for current user
var user = 'Lil John';
//template for incoming chat data
var chatlog = _.template($('.chat-message').text());


//grabs array of data and appends it to chatlog
function renderChat(data) {
	//clears chat of existing content
	$('.chat-log').empty();
	//counts from zero - last index of data
	for (var i = 0; i < data.length - 1; i += 1) {

		//checks to make sure message property exists
		if (data[i].message) {
			//assigns variable to the data through the template
			var rendered = chatlog(data[i]);
			//appends the chatlog div with the messages
			$('.chat-log').append(rendered);
		}
	}
}

function loadChat () {
	//gets the json from tiny server, assigns that object to data
	$.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages').done(function(data) {
		//gives data obj to messages variable
		serverData = data;
		//calls getChat and passes in the array from tiny server
		renderChat(data);

	});
}

//constructor that makes a message object to be sent
function Message(user, message, time) {
	this.user = user || '';
	this.message = message || '';
	this.time = time || '';
	this.meta = 'WHOA';
}

//sends message to the server
function updateChat(info) {
	$.post('http://tiny-pizza-server.herokuapp.com/collections/chat-messages', info);
}


//when button is clicked it creates an instance of Message
$('.submit').click(function() {
	//sets whatever is in the input feild and sets it to message
	var message = $('.message').val();
	$('.message').val('');
	//sets curren epoch time as time
	var time = Date.now();
	//creates instance called outgoing
	var outgoing = new Message(user, message, time);

	//sends the data outgoing has to the server
	updateChat(outgoing);
	// $('.message').form.reset();

});

//updates the chat log every second
setInterval(loadChat, 1000);

