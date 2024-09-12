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
    const containerRect = container.getBoundingClientRect(); // Get the container dimensions
    const iconSize = 50; // Icon size for visibility

    floatingIcons.forEach((icon) => {
        icon.style.display = 'block'; // Ensure the icon is visible
        icon.style.width = `${iconSize}px`; // Set the icon width
        icon.style.height = `${iconSize}px`; // Set the icon height

        let posX, posY;

        // Loop until a valid position is found that does not collide with text elements
        do {
            posX = getRandomInRange(0, containerRect.width - iconSize); // X within container width
            posY = getRandomInRange(0, containerRect.height - iconSize); // Y within container height
        } while (isCollidingWithElements(posX + containerRect.left, posY + containerRect.top, icon.offsetWidth, icon.offsetHeight));

        // Set initial position and velocity for each icon
        icon.dataset.posX = posX;
        icon.dataset.posY = posY;
        icon.dataset.velX = getRandomInRange(-3.5, 1.5); // Moderate random X velocity
        icon.dataset.velY = getRandomInRange(-3.5, 1.5); // Moderate random Y velocity

        // Apply the initial position to the icon
        icon.style.transform = `translate(${posX}px, ${posY}px)`;
        icon.style.visibility = 'visible'; // Ensure the icon is visible
    });

    animateIcons(); // Start the animation
}

function animateIcons() {
    floatingIcons.forEach((icon) => {
        let posX = parseFloat(icon.dataset.posX);
        let posY = parseFloat(icon.dataset.posY);
        let velX = parseFloat(icon.dataset.velX);
        let velY = parseFloat(icon.dataset.velY);
        posX += velX;
        posY += velY;

        textElements.forEach((element) => {
            const elementRect = element.getBoundingClientRect();
            const iconRect = icon.getBoundingClientRect();

            if (
                iconRect.left < elementRect.right &&
                iconRect.right > elementRect.left &&
                iconRect.top < elementRect.bottom &&
                iconRect.bottom > elementRect.top
            ) {
                if (iconRect.left < elementRect.right && iconRect.right > elementRect.left) {
                    velX = -velX; // Reverse X velocity
                    posX += velX * 2; // Move the icon away from the collision area
                }
                if (iconRect.top < elementRect.bottom && iconRect.bottom > elementRect.top) {
                    velY = -velY; // Reverse Y velocity
                    posY += velY * 2; // Move the icon away from the collision area
                }
            }
        });

        if (posX <= containerRect.left || posX >= containerRect.right - icon.offsetWidth) {
            velX = -velX;
        }
        if (posY <= containerRect.top || posY >= containerRect.bottom - icon.offsetHeight) {
            velY = -velY;
        }
        icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
        icon.dataset.posX = posX;
        icon.dataset.posY = posY;
        icon.dataset.velX = velX;
        icon.dataset.velY = velY;
    });

    requestAnimationFrame(animateIcons);
}

// Initialize the icons when the page loads
document.addEventListener('DOMContentLoaded', initializeIcons);
