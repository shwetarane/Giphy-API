 var gifs = ['dog', 'cat', 'horse', 'elephant'];

 // ========================================================

 // displayGifInfo function now re-renders the HTML to display the appropriate content. 
 function displayGifsInfo() {

     var gif = $(this).attr('data-name');
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
     // Creates AJAX call for the specific gif being 
     $.ajax({
         url: queryURL,
         method: 'GET'
     }).done(function(response) {
         console.log(response);
         $("img").remove();
         $("p").remove();
         var results = response.data;


         for (var i = 0; i < results.length; i++) {
             var gifDiv = $('<div class="item">')
             var rating = results[i].rating;
             var p = $('<p>').text("Rating: " + rating);
             var gifImage = $('<img>');
             var still = gifImage.attr('src', results[i].images.original.url);
             gifImage.attr("class", "still");
             gifDiv.append(p);
             gifDiv.append(gifImage);
             $('#gifsView').prepend(gifDiv);

         }


     });

 }

 // Generic function for displaying gif data 
 function renderButtons() {
     // Deletes the gifs prior to adding new gifs (this is necessary otherwise you will have repeat buttons)
     $('#buttonsView').empty();
     // Loops through the array of gifs
     for (var i = 0; i < gifs.length; i++) {
         var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
         a.addClass('gif'); // Added a class 
         a.addClass("btn btn-success form-control");
         a.attr('data-name', gifs[i]); // Added a data-attribute
         a.text(gifs[i]); // Provided the initial button text
         $('#buttonsView').append(a); // Added the button to the HTML
     }
 }

 // This function handles events where one button is clicked
 $('#addGif').on('click', function() {
     // This line of code will grab the input from the textbox
     var gif = $('#gif-input').val().trim();
     // The gif from the textbox is then added to our array
     gifs.push(gif);
     // Our array then runs which handles the processing of our gif array
     renderButtons();
     // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
     return false;
 });

 // Generic function for displaying the movieInfo
 $(document).on('click', '.gif', displayGifsInfo);
 // This calls the renderButtons() function
 renderButtons();
