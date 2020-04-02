 var gifs = ["Wfh", "Tgif", "Dog", "Quarantine", "git"];

 // displayGifInfo function now re-renders the HTML to display the appropriate content.
 function displayGifsInfo() {

     var gif = $(this).attr('data-name');
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
     // Creates AJAX call for the specific gif being
     $.ajax({
         url: queryURL,
         method: 'GET'
     }).done(function(response) {
         console.log(response); //test display
         $("img").remove(); //remove the classes to resest the container
         $("p").remove();
         var results = response.data;

         for (var i = 0; i < results.length; i++) {
             var still_image = $('<div class="item">').append('<img src=' + results[i].images.fixed_height_still.url + ' class="still" id="' + i + '">');
             var p = still_image.append($('<p>').text("Rating: " + results[i].rating));
             var a = $('#gifsView').prepend(still_image);
             a.prepend(p);
         }
         //animate gif on click
         $(document).on("click", ".still", function() {
             x = $("img").attr("class");
             y = $(this).attr("id");
             $(this).attr("src", response.data[y].images.fixed_height.url);
             $(this).attr("class", "move");
         });
         //still gif on click
         $(document).on("click", ".move", function() {
             x = $("img").attr("class");
             y = $(this).attr("id");
             $(this).attr("src", response.data[y].images.fixed_height_still.url);
             $(this).attr("class", "still");
         });
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
