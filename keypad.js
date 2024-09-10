let inputCode = ""; 

// Function to handle input
function enterNumber(num) {
    inputCode += num; 
    document.getElementById('output').textContent = inputCode; 
    if (inputCode.length > 4) {
        inputCode = "";
        document.getElementById('output').textContent = inputCode; 
    }
}

// Function to handle submitting the code
function submitCode() {
    if (inputCode === "1987") {
        playFullScreenVideo(); 
    } else {
        alert("Incorrect code! Try again."); // Handle incorrect code
    }
    inputCode = ""; // Reset the input after submission
    document.getElementById('output').textContent = inputCode; // Reset display
}

// Function to handle clearing the input
function clearOutput() {
    inputCode = ""; // Reset the input
    document.getElementById('output').textContent = inputCode; // Reset display
}

// Function to play the full-screen video
function playFullScreenVideo() {
    const video = document.createElement('video');
    video.src = "assets/1987.mp4"; // Correct path to the video in the assets folder
    video.controls = false; // No controls needed for this task
    video.autoplay = true; // Auto play the video
    video.style.position = "fixed"; // Make it cover the full screen
    video.style.top = 0;
    video.style.left = 0;
    video.style.width = "100vw"; // Full width of the viewport
    video.style.height = "100vh"; // Full height of the viewport
    video.style.zIndex = 9999; // Bring it to the front
    video.style.backgroundColor = "black"; // Ensure there's no background flash

    // Automatically go full screen if supported
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { // Firefox
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { // IE/Edge
        video.msRequestFullscreen();
    }

    // Append the video to the body
    document.body.appendChild(video);

    // Event listener to remove video after it ends
    video.onended = function () {
        document.body.removeChild(video); // Remove the video element after playback
    };
}
