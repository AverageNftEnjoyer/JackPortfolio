// Function to initialize the horizontal movement of the floating icons
function rotateIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon'); // Get all icons with the floating-icon class
    const container = document.querySelector('#main-content'); // Main container reference
    const pittsburghText = document.querySelector('.location'); // The element that contains the Pittsburgh, PA text

    const containerRect = container.getBoundingClientRect(); // Get the container dimensions
    const textRect = pittsburghText.getBoundingClientRect(); // Get the Pittsburgh, PA text dimensions

    floatingIcons.forEach(icon => {
        let posX = Math.random() * containerRect.width; // Random starting position for each icon
        let speed = 1 + Math.random() * 2; // Random speed for each icon between 1 and 3

        // Position the icon horizontally
        icon.style.position = 'absolute';
        icon.style.top = `${textRect.bottom + 20}px`; // Position the icons 20px below the "Pittsburgh, PA" text

        function animateIcon() {
            // Move the icon to the right
            posX += speed;

            // If the icon moves off the right side of the screen, reset it to the left
            if (posX > containerRect.width) {
                posX = -icon.offsetWidth; // Move it just off the left edge of the screen
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
