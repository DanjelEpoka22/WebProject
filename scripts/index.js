$(document).ready(function() {
    
    function createSnowflakes() {
        var numberOfSnowflakes = 20; 
        var snowflakeContainer = $('body'); 

        for (var i = 0; i < numberOfSnowflakes; i++) {
            var snowflake = $('<div class="snowflake">&#10052;</div>'); 

            
            var size = Math.random() * 10 + 10; 
            var leftPosition = Math.random() * 100; 
            var animationDuration = Math.random() * 6 + 7; 

            snowflake.css({
                'font-size': size + 'px',
                'left': leftPosition + '%',
                'animation-duration': animationDuration + 's'
            });

           
            snowflakeContainer.append(snowflake);

            
            setTimeout(function() {
                snowflake.remove();
            }, animationDuration * 1000); 
        }
    }

    
    setInterval(createSnowflakes, 1000); 
    $('#theme-toggle').click(function() {
        $('body').toggleClass('dark-mode');
    });

    $('#show-meme-btn').click(function() {
        $('#meme').fadeIn(); 
    });

   
    $('#close-meme').click(function() {
        $('#meme').fadeOut(); 
    });
    
});
