// Function to initialize the floating movement of the icons
function floatIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon'); // Get all icons with the floating-icon class
    const container = document.querySelector('#main-content'); // Main container reference
    const pittsburghText = document.querySelector('.location'); // The element that contains the Pittsburgh, PA text

    const containerRect = container.getBoundingClientRect(); // Get the container dimensions
    const textRect = pittsburghText.getBoundingClientRect(); // Get the Pittsburgh, PA text dimensions

    floatingIcons.forEach(icon => {
        // Increase the size of the icons
        icon.style.width = '80px'; // Set the width to 80px
        icon.style.height = '80px'; // Set the height to 80px

        let posX = Math.random() * containerRect.width; // Random starting horizontal position
        let posY = textRect.bottom + 40 + Math.random() * 100; // Start icons around 40px below the text, with a random vertical offset
        let speedX = 1 + Math.random() * 1.5; // Random horizontal speed for each icon
        let speedY = 0.5 + Math.random() * 0.5; // Random vertical floating speed for each icon
        let directionY = Math.random() < 0.5 ? 1 : -1; // Random initial direction for vertical movement (up or down)

        // Position the icon initially
        icon.style.position = 'absolute';
        icon.style.left = `${posX}px`;
        icon.style.top = `${posY}px`;

        function animateIcon() {
            // Move the icon horizontally
            posX += speedX;

            // Move the icon vertically in a floating manner (up and down)
            posY += speedY * directionY;

            // Reverse vertical direction if the icon reaches a certain vertical limit (to simulate floating)
            if (posY <= textRect.bottom + 20 || posY >= textRect.bottom + 120) {
                directionY *= -1; // Reverse direction
            }

            // If the icon moves off the right side of the screen, reset it to the left
            if (posX > containerRect.width) {
                posX = -icon.offsetWidth; // Move it just off the left edge of the screen
            }

            // Apply the updated position to the icon
            icon.style.transform = `translate(${posX}px, ${posY - textRect.bottom}px)`;

            // Continue animating
            requestAnimationFrame(animateIcon);
        }

        // Start the animation for this icon
        animateIcon();
    });
}

// Initialize the floating effect when the page loads
document.addEventListener('DOMContentLoaded', floatIcons);
