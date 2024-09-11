let inputCode = ""; 

// Function to handle input
function enterNumber(num) {
    playKeyClickSound(); // Play sound for each key click
    inputCode += num; 
    document.getElementById('output').textContent = inputCode; 
    if (inputCode.length > 4) {
        inputCode = "";
        document.getElementById('output').textContent = inputCode; 
    }
}

// Function to handle submitting the code
function submitCode() {
    playKeyClickSound(); // Play sound for submit button
    if (inputCode === "1987") {
        playFullScreenVideo(); 
    } else {
        alert("Incorrect code! Try again."); 
    }
    inputCode = ""; 
    document.getElementById('output').textContent = inputCode; 
}

// Function to handle clearing the input
function clearOutput() {
    playKeyClickSound(); // Play sound for clear button
    inputCode = ""; 
    document.getElementById('output').textContent = inputCode; 
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

    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { 
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { 
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { 
        video.msRequestFullscreen();
    }

    document.body.appendChild(video);

    video.onended = function () {
        document.body.removeChild(video); 
    };
}

function playKeyClickSound() {
    const audio = new Audio("assets/keyclick.mp3"); 
    audio.play();
}
