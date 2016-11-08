$(document).ready(function () {
    //variables
    var topics = ['Phil Dunphy', 'Ray Barone', 'Mufasa', 'Michael Bluth', 'Red Foreman', 'Danny Tanner'];
    //renders buttons the first time
    renderButtons();
    //gets and displays giphy when button is clicked
    $(document).on('click', '.dad-button', function () {
        $('#dads').empty();
        var dadName = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dadName + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            for (var j = 0; j < 10; j++) {
                var dadGif = $('<img>');
                var ratingDadsDiv = $('<div>');
                var rating = $('<div>');
                $(dadGif).attr('src', response.data[j].images.original_still.url);
                $(dadGif).attr('height', '150px');
                $(dadGif).addClass('changeGifState');
                $(dadGif).attr('data-state', 'still');
                $(dadGif).attr('data-still', response.data[j].images.original_still.url);
                $(dadGif).attr('data-animate', response.data[j].images.fixed_height.url);
                $(rating).html('Rating: ' + response.data[j].rating);
                $(rating).addClass('rating');
                $(ratingDadsDiv).addClass('rating-div');
                $(ratingDadsDiv).append(rating);
                $(ratingDadsDiv).append(dadGif);
                $('#dads').append(ratingDadsDiv);
            }
        });
    });
    //changes giphy between still and animated
    $(document.body).on('click', '.changeGifState', function () {
        var state = $(this).data('state');
        var animatedGif = $(this).data('animate');
        var stillGif = $(this).data('still');
        if (state === 'still') {
            $(this).attr('src', animatedGif);
            $(this).data('state', 'animate');
        } else {
            $(this).attr('src', stillGif);
            $(this).data('state', 'still');
        }
    });
    //adds a new button with user input
    $('#add-dad').on('click', function () {
        var input = $('#dad-input').val();
        $('#dad-input').val('');
        topics.push(input);
        renderButtons();
        return false;
    });
    //functions
    function renderButtons() {
        $('#dad-buttons').empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $('<button>');
            $(button).addClass('dad-button');
            $(button).text(topics[i]);
            $(button).attr('data-name', topics[i]);
            $('#dad-buttons').append(button);
        }
    }
});