// Function to move the icons randomly within the main-content container and ensure they bounce off the walls
function moveIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    const mainContent = document.querySelector('#main-content'); // Reference to the main content section
    const mainRect = mainContent.getBoundingClientRect(); // Get the position and size of #main-content

    icons.forEach(icon => {
        const iconRect = icon.getBoundingClientRect(); // Get the current position of the icon
        const maxX = mainRect.width - icon.clientWidth; // Maximum X boundary within the main-content
        const maxY = mainRect.height - icon.clientHeight; // Maximum Y boundary within the main-content

        let currentX = iconRect.left - mainRect.left; // Calculate current X relative to #main-content
        let currentY = iconRect.top - mainRect.top; // Calculate current Y relative to #main-content

        // Generate random movement values for X and Y within a smaller range to keep within the container
        let randomX = Math.floor(Math.random() * (maxX / 5)) - (maxX / 10); // Random X movement
        let randomY = Math.floor(Math.random() * (maxY / 5)) - (maxY / 10); // Random Y movement
        const randomDuration = Math.floor(Math.random() * 5000) + 3000; // Random duration between 3-8 seconds

        // Check if the icon will move out of bounds on X axis, and reverse direction if necessary
        if (currentX + randomX > maxX || currentX + randomX < 0) {
            randomX = -randomX; // Reverse direction on the X axis
        }

        // Check if the icon will move out of bounds on Y axis, and reverse direction if necessary
        if (currentY + randomY > maxY || currentY + randomY < 0) {
            randomY = -randomY; // Reverse direction on the Y axis
        }

        // Apply the transformation with a smooth transition
        icon.style.transition = `transform ${randomDuration}ms linear`;
        icon.style.transform = `translate(${currentX + randomX}px, ${currentY + randomY}px)`;
    });
}

// Repeatedly move the icons every few seconds
setInterval(moveIcons, 3000);

// Trigger initial movement when the page loads
document.addEventListener('DOMContentLoaded', moveIcons);
