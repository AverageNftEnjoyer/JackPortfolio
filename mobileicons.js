document.addEventListener('DOMContentLoaded', function () {
    const text = 'Based in Pittsburgh, PA';
    const speed = 80; // Typing speed
    const typingElement = document.getElementById('typing-text');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const textElements = document.querySelectorAll('.intro-text h1, .intro-text .greeting, .details, .move-on-hover');
    const container = document.getElementById('main-content');
    const containerRect = container.getBoundingClientRect();
    
    // Select the details section to apply the larger barrier
    const detailsSection = document.querySelector('.details');
    const detailsRect = detailsSection.getBoundingClientRect();
    const exclusionMargin = 300; 
    const textBuffer = 100; 
    
    let index = 0;

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

        let posX = (containerRect.width / 2) - (icon.offsetWidth / 2); // Horizontal center
        let posY = textRect.bottom + 40; // 40px below the "Pittsburgh, PA" text


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

    requestAnimationFrame(animateIcons); // Start the animation
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

        // Check collisions with text elements and reverse velocity if necessary
        const textElements = document.querySelectorAll('.greeting, .intro-text h1, .details');
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
                }
                if (iconRect.top < elementRect.bottom && iconRect.bottom > elementRect.top) {
                    velY = -velY; // Reverse Y velocity
                }
            }
        });

        // Check boundaries and reverse direction if necessary (bounce effect)
        if (posX <= 0) {
            posX = 0;
            velX = -velX; // Reverse X direction if hitting left edge
        } else if (posX + iconWidth >= containerRect.width) {
            posX = containerRect.width - iconWidth;
            velX = -velX; // Reverse X direction if hitting right edge
        }

        if (posY <= 0) {
            posY = 0;
            velY = -velY; // Reverse Y direction if hitting top edge
        } else if (posY + iconHeight >= containerRect.height) {
            posY = containerRect.height - iconHeight;
            velY = -velY; // Reverse Y direction if hitting bottom edge
        }

        // Update the position of the icon
        icon.style.transform = `translate(${posX}px, ${posY}px)`;

        // Store updated values for the next frame
        icon.dataset.posX = posX;
        icon.dataset.posY = posY;
        icon.dataset.velX = velX;
        icon.dataset.velY = velY;
    });

    requestAnimationFrame(animateIcons); // Continue the animation loop
}
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