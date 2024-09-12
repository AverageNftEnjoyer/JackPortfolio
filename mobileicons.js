// Utility function to get a random number within a given range
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to check for collisions with text elements
function isCollidingWithElements(x, y, iconWidth, iconHeight) {
    const textElements = document.querySelectorAll('.intro-text h1, .details'); // Text elements to avoid

    for (const element of textElements) {
        const elementRect = element.getBoundingClientRect();
        if (
            x < elementRect.right &&
            x + iconWidth > elementRect.left &&
            y < elementRect.bottom &&
            y + iconHeight > elementRect.top
        ) {
            return true;
        }
    }
    return false;
}

// Function to initialize the icons and set their spawn locations
function initializeIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon'); // Select floating icons
    const container = document.querySelector('#main-content'); // Main container reference
    const detailsSection = document.querySelector('.details'); // Reference to the details section
    const containerRect = container.getBoundingClientRect(); // Get the container dimensions
    const detailsRect = detailsSection.getBoundingClientRect(); // Get the details section dimensions
    const iconSize = 30; // Set the icon size (for collision and positioning)

    const halfLength = Math.floor(floatingIcons.length / 2); // Divide icons into two halves

    floatingIcons.forEach((icon, index) => {
        icon.style.display = 'block'; // Ensure the icon is visible

        let posX, posY;

        // First half of icons spawn above the intro text
        if (index < halfLength) {
            do {
                posX = getRandomInRange(containerRect.left, containerRect.right - iconSize); // X within container
                posY = getRandomInRange(containerRect.top, detailsRect.top - iconSize); // Y above the details
            } while (isCollidingWithElements(posX, posY, icon.offsetWidth, icon.offsetHeight));
        }
        // Second half of icons spawn below the details section
        else {
            do {
                posX = getRandomInRange(containerRect.left, containerRect.right - iconSize); // X within container
                posY = getRandomInRange(detailsRect.bottom, containerRect.bottom - iconSize); // Y below the details
            } while (isCollidingWithElements(posX, posY, icon.offsetWidth, icon.offsetHeight));
        }

        // Set initial position and velocity for each icon
        icon.dataset.posX = posX;
        icon.dataset.posY = posY;
        icon.dataset.velX = getRandomInRange(-2, 2) || 1; // Smaller random X velocity
        icon.dataset.velY = getRandomInRange(-2, 2) || 1; // Smaller random Y velocity

        // Apply the initial position to the icon
        icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
        icon.style.visibility = 'visible'; // Ensure the icon is visible
    });

    animateIcons(); // Start the animation
}

// Function to animate the icons
function animateIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon'); // Select floating icons
    const container = document.querySelector('#main-content'); // Main container reference
    const containerRect = container.getBoundingClientRect(); // Get container bounds

    floatingIcons.forEach(icon => {
        let posX = parseFloat(icon.dataset.posX);
        let posY = parseFloat(icon.dataset.posY);
        let velX = parseFloat(icon.dataset.velX);
        let velY = parseFloat(icon.dataset.velY);

        // Update icon position based on velocity
        posX += velX;
        posY += velY;

        // Check boundaries and reverse direction if necessary
        if (posX <= 0 || posX >= containerRect.width - icon.clientWidth) {
            velX = -velX; // Reverse X direction
        }
        if (posY <= 0 || posY >= containerRect.height - icon.clientHeight) {
            velY = -velY; // Reverse Y direction
        }

        // Update the transform position and store new values
        icon.style.transform = `translate(${posX}px, ${posY}px)`;
        icon.dataset.posX = posX;
        icon.dataset.posY = posY;
        icon.dataset.velX = velX;
        icon.dataset.velY = velY;
    });

    // Continue the animation
    requestAnimationFrame(animateIcons);
}

// Initialize the icons when the page loads
document.addEventListener('DOMContentLoaded', initializeIcons);
