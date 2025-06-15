// Function to change embedded video based on button clicked
    function embedVideo(url, button) {
        document.getElementById("video-player").src = url;
        document.getElementById("videoTitle").innerHTML = "Currently Playing: " + button.innerText;
        const buttons = document.querySelectorAll('.select-embed-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    // Auto-play the first video on page load as fast as possible
    window.onload = function() {
        // Start by embedding the first video and autoplaying it
        const firstVideoButton = document.querySelector('.select-embed-btn');
        
        if (firstVideoButton) {
            embedVideo(firstVideoButton.getAttribute('onclick').split("'")[1], firstVideoButton);
        }
    };
