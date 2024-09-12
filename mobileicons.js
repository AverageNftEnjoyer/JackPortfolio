// Utility function to get a random number within a given range
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to check for collisions with text elements
function isCollidingWithElements(x, y, iconWidth, iconHeight) {
    const textElements = document.querySelectorAll('.greeting'); // Only check against the greeting section

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
    const greetingSection = document.querySelector('.greeting'); // Reference to the greeting section
    const containerRect = container.getBoundingClientRect(); // Get the container dimensions
    const greetingRect = greetingSection.getBoundingClientRect(); // Get the greeting section dimensions
    const iconSize = 50; // Icon size for visibility

    floatingIcons.forEach((icon) => {
        icon.style.display = 'block'; // Ensure the icon is visible
        icon.style.width = `${iconSize}px`; // Set the icon width
        icon.style.height = `${iconSize}px`; // Set the icon height

        let posX, posY;

        // Spawn icons within or near the greeting section
        do {
            posX = getRandomInRange(greetingRect.left - containerRect.left, greetingRect.right - containerRect.left - iconSize); // X within greeting section width
            posY = getRandomInRange(greetingRect.top - containerRect.top, greetingRect.bottom - containerRect.top - iconSize); // Y within or above the greeting section
        } while (isCollidingWithElements(posX + containerRect.left, posY + containerRect.top, icon.offsetWidth, icon.offsetHeight));

        // Set initial position and velocity for each icon
        icon.dataset.posX = posX;
        icon.dataset.posY = posY;
        icon.dataset.velX = getRandomInRange(-1.5, 1.5); // Moderate random X velocity
        icon.dataset.velY = getRandomInRange(-1.5, 1.5); // Moderate random Y velocity

        // Apply the initial position to the icon
        icon.style.transform = `translate(${posX}px, ${posY}px)`;
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
        const iconWidth = icon.clientWidth;
        const iconHeight = icon.clientHeight;

        // Update icon position based on velocity
        posX += velX;
        posY += velY;

        // Check boundaries and reverse direction if necessary, ensure icon stays within bounds
        if (posX <= 0) {
            posX = 0;
            velX = -velX; // Reverse X direction
        } else if (posX >= containerRect.width - iconWidth) {
            posX = containerRect.width - iconWidth;
            velX = -velX;
        }
        if (posY <= 0) {
            posY = 0;
            velY = -velY; // Reverse Y direction
        } else if (posY >= containerRect.height - iconHeight) {
            posY = containerRect.height - iconHeight;
            velY = -velY;
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
