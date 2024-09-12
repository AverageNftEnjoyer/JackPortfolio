// Function to move the icons randomly and ensure they bounce off the walls
function moveIcons() {
    const icons = document.querySelectorAll('.floating-icon');

    icons.forEach(icon => {
        const rect = icon.getBoundingClientRect(); // Get the current position of the icon
        const maxX = window.innerWidth - icon.clientWidth; // Maximum X boundary for the icon
        const maxY = window.innerHeight - icon.clientHeight; // Maximum Y boundary for the icon
        let currentX = rect.left;
        let currentY = rect.top;

        // Generate random movement values for X and Y within a range
        let randomX = Math.floor(Math.random() * (maxX / 5)) - (maxX / 10); // Random X movement
        let randomY = Math.floor(Math.random() * (maxY / 5)) - (maxY / 10); // Random Y movement
        const randomDuration = Math.floor(Math.random() * 5000) + 3000; // Random duration between 3-8 seconds

        // Check if the icon will move out of bounds on X axis, and reverse direction if necessary
        if (currentX + randomX > maxX || currentX + randomX < 0) {
            randomX = -randomX;
        }

        // Check if the icon will move out of bounds on Y axis, and reverse direction if necessary
        if (currentY + randomY > maxY || currentY + randomY < 0) {
            randomY = -randomY;
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
