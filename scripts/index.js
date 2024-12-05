$(document).ready(function() {
    // Function to create snowflakes dynamically
    function createSnowflakes() {
        var numberOfSnowflakes = 20; // Reduced number of snowflakes to 20
        var snowflakeContainer = $('body'); // Add snowflakes to the body of the page

        for (var i = 0; i < numberOfSnowflakes; i++) {
            var snowflake = $('<div class="snowflake">&#10052;</div>'); // Snowflake symbol

            // Randomize snowflake size, position, and fall speed
            var size = Math.random() * 10 + 10; // Snowflake size between 10px and 20px
            var leftPosition = Math.random() * 100; // Random X position
            var animationDuration = Math.random() * 6 + 7; // Slow fall speed between 7s and 13s

            snowflake.css({
                'font-size': size + 'px',
                'left': leftPosition + '%',
                'animation-duration': animationDuration + 's'
            });

            // Append snowflake to the page
            snowflakeContainer.append(snowflake);

            // Remove snowflakes after they fall off-screen
            setTimeout(function() {
                snowflake.remove();
            }, animationDuration * 1000); // Remove after the animation duration
        }
    }

    // Create snowflakes every 1 second (1000ms) to reduce load
    setInterval(createSnowflakes, 1000); // Create snowflakes at 1-second intervals
    $('#theme-toggle').click(function() {
        $('body').toggleClass('dark-mode');
    });

    $('#show-meme-btn').click(function() {
        $('#meme').fadeIn(); // Show the meme section with a fade-in effect
    });

    // Close the meme when the Close Meme button is clicked
    $('#close-meme').click(function() {
        $('#meme').fadeOut(); // Hide the meme section with a fade-out effect
    });
    
});
