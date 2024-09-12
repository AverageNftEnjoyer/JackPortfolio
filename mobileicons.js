// Utility function to get a random number within a given range
function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to check for collisions with text elements
function isCollidingWithElements(x, y, iconWidth, iconHeight) {
    const textElements = document.querySelectorAll('.greeting, .intro-text h1, .details'); // Text elements to avoid

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
    const introText = document.querySelector('.intro-text'); // Reference to the intro text section
    const detailsSection = document.querySelector('.details'); // Reference to the details section
    const containerRect = container.getBoundingClientRect(); // Get the container dimensions
    const greetingRect = greetingSection.getBoundingClientRect(); // Get the greeting section dimensions
    const introRect = introText.getBoundingClientRect(); // Get the intro text section dimensions
    const detailsRect = detailsSection.getBoundingClientRect(); // Get the details section dimensions
    const iconSize = 50; // Increase the icon size for better visibility

    const halfLength = Math.floor(floatingIcons.length / 2); // Divide icons into two halves

    floatingIcons.forEach((icon, index) => {
        icon.style.display = 'block'; // Ensure the icon is visible
        icon.style.width = `${iconSize}px`; // Set the icon width
        icon.style.height = `${iconSize}px`; // Set the icon height

        let posX, posY;

        // First half of icons spawn above the greeting and intro text
        if (index < halfLength) {
            do {
                posX = getRandomInRange(0, containerRect.width - iconSize); // X within container width
                posY = getRandomInRange(0, greetingRect.top - containerRect.top - iconSize); // Y above the greeting and intro text
            } while (isCollidingWithElements(posX + containerRect.left, posY + containerRect.top, icon.offsetWidth, icon.offsetHeight));
        }
        // Second half of icons spawn below the details section
        else {
            do {
                posX = getRandomInRange(0, containerRect.width - iconSize); // X within container width
                posY = getRandomInRange(detailsRect.bottom - containerRect.top, containerRect.height - iconSize); // Y below the details
            } while (isCollidingWithElements(posX + containerRect.left, posY + containerRect.top, icon.offsetWidth, icon.offsetHeight));
        }

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

        // Check boundaries and reverse direction if necessary
        if (posX <= 0 || posX >= containerRect.width - iconWidth) {
            velX = -velX; // Reverse X direction
        }
        if (posY <= 0 || posY >= containerRect.height - iconHeight) {
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
