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
            for (var j = 0; j < 10; j++) {
                var dadGif = $('<img>');
                var ratingDadsDiv = $('<div>');
                var rating = $('<div>');
                $(dadGif).attr('src', response.data[j].images.fixed_height.url);
                $(dadGif).attr('height', '150px');
                $(rating).html('Rating: ' + response.data[j].rating);
                $(rating).addClass('rating');
                $(ratingDadsDiv).addClass('rating-div');
                $(ratingDadsDiv).append(rating);
                $(ratingDadsDiv).append(dadGif);
                $('#dads').append(ratingDadsDiv);
            }
        });
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