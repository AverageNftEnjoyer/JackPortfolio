document.addEventListener('DOMContentLoaded', function () {
    const text = 'Based in Pittsburgh, PA';
    const speed = 80; // Typing speed
    const typingElement = document.getElementById('typing-text');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const textElements = document.querySelectorAll('.intro-text h1, .intro-text .greeting, .details, .move-on-hover');
    const container = document.getElementById('main-content');
    const containerRect = container.getBoundingClientRect();
    
   // Function to initialize the horizontal movement of the floating icons
function rotateIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon'); // Get all icons with the floating-icon class
    const container = document.querySelector('#main-content'); // Main container reference
    const pittsburghText = document.querySelector('.location'); // The element that contains the Pittsburgh, PA text

    const containerRect = container.getBoundingClientRect(); // Get the container dimensions
    const textRect = pittsburghText.getBoundingClientRect(); // Get the Pittsburgh, PA text dimensions

    floatingIcons.forEach(icon => {
        // Increase the size of the icons
        icon.style.width = '80px'; // Set the width to 80px
        icon.style.height = '80px'; // Set the height to 80px

        let posX = -200 + Math.random() * containerRect.width; // Start icons far off to the left (-200) with random positioning
        let speed = 1 + Math.random() * 2; // Random speed for each icon between 1 and 3

        // Position the icon horizontally and below the Pittsburgh, PA text
        icon.style.position = 'absolute';
        icon.style.top = `${textRect.bottom + 40}px`; // Position the icons 40px below the "Pittsburgh, PA" text
        icon.style.left = `${posX}px`; // Add margin to the left to start them far off screen

        function animateIcon() {
            // Move the icon to the right
            posX += speed;

            // If the icon moves off the right side of the screen, reset it to the left
            if (posX > containerRect.width) {
                posX = -icon.offsetWidth - 200; // Move it far off the left edge of the screen (-200)
            }

            // Apply the transformation
            icon.style.transform = `translateX(${posX}px)`;

            // Keep animating
            requestAnimationFrame(animateIcon);
        }

        // Start the animation for this icon
        animateIcon();
    });
}

// Initialize the rotation when the page is loaded
document.addEventListener('DOMContentLoaded', rotateIcons);

function typingEffect() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typingEffect, speed);
    } else {
        initializeIcons();
    }
}

floatingIcons.forEach(icon => {
    icon.style.visibility = 'hidden';
    icon.style.display = 'none'; 
});
typingEffect();
});