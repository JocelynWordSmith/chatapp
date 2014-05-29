//initializes messages variable
var messages;

var chatlog = new _.template$('.blah');
//gets the json from tiny serve, assigns that object to data
$.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages', function( data ) {
  //gives data obj to messages variable
  messages = data;


  //counts from zero - last index of data
  for (var i = 0; i < data.length - 1; i += 1) {
  
  		if (data[i].message) {
  			$('.chat-messages').append(data[i].message);
  		 // console.log(data[i].message);
		  }
	}
  // $.each( data, function( key, val ) {
  //   items.push( "<li id='" + key + "'>" + val + "</li>" );
  });