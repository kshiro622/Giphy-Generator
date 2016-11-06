$(document).ready(function(){	
	
//variables
	var topics = ['Phil Dunphy', 'Ray Barone', 'Mufasa', 'Michael Bluth', 'Red Foreman', 'Danny Tanner'];

//app flow
	initialize();

	$('.dad-button').on('click', function(){
		var dadName = $(this).data('name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dadName + "&api_key=dc6zaTOxFJmzC&limit=10";
	
		$.ajax({
				url: queryURL,
	            method: 'GET'
	    	})
         	.done(function(response) {
            	console.log(response);
            	for (var j = 0; j < 10; j++){
            		var dadGif = $('<img>');
            		var ratingDiv = $('<div>');
            		$(dadGif).attr('src', response.data[j].images.fixed_height.url);
            		$(dadGif).attr('height', '150px');
            		$(ratingDiv).append('Rating: ' + response.data[j].rating);
            		$('#dads').append(ratingDiv);
            		$('#dads').append(dadGif);
            	}
            });
    });

    $('#add-dad').on('click', function(){
    	var input = $('#dad-input').val();
    })


//functions
	function initialize() {
		for (var i = 0; i < topics.length; i++){
			var button = $('<button>');
			$(button).addClass('dad-button');
			$(button).text(topics[i]);
			$(button).attr('data-name', topics[i]);
			$('#dad-buttons').append(button);
		};
	};
});