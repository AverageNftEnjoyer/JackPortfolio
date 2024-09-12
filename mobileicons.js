function moveIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    const mainContent = document.querySelector('#main-content'); // Reference to the main content section
    const introText = document.querySelector('.intro-text'); // The intro text section
    const detailsSection = document.querySelector('.details'); // The details section
    const mainRect = mainContent.getBoundingClientRect(); // Get the position and size of #main-content
    const introRect = introText.getBoundingClientRect(); // Get the bounding box of intro text
    const detailsRect = detailsSection.getBoundingClientRect(); // Get the bounding box of details section

    const halfLength = Math.floor(icons.length / 2); // Divide the icons into two groups

    icons.forEach((icon, index) => {
        const iconRect = icon.getBoundingClientRect(); // Get the current position of the icon
        const maxX = mainRect.width - icon.clientWidth; // Maximum X boundary within the main-content
        let posYStart, posYEnd;

        let currentX = iconRect.left - mainRect.left; // Calculate current X relative to #main-content
        let currentY = iconRect.top - mainRect.top; // Calculate current Y relative to #main-content

        // First half of icons spawn above the intro text
        if (index < halfLength) {
            posYStart = mainRect.top; // Starting Y position (top of the main-content)
            posYEnd = introRect.top - icon.clientHeight; // Ending Y position (just above the intro text)
        } 
        // Second half of icons spawn below the details section
        else {
            posYStart = detailsRect.bottom + icon.clientHeight; // Starting Y position (just below the details section)
            posYEnd = mainRect.bottom - icon.clientHeight; // Ending Y position (bottom of the main-content)
        }

        // Generate random positions within the boundaries
        let randomX = Math.floor(Math.random() * maxX); // Random X position within the width
        let randomY = Math.floor(Math.random() * (posYEnd - posYStart)) + posYStart - mainRect.top; // Random Y position

        // Generate random movement values for X and Y
        let moveX = Math.floor(Math.random() * (maxX / 5)) - (maxX / 10); // Random X movement
        let moveY = Math.floor(Math.random() * (posYEnd / 5)) - (posYEnd / 10); // Random Y movement
        const randomDuration = Math.floor(Math.random() * 5000) + 3000; // Random duration between 3-8 seconds

        // Check if the icon will move out of bounds on X axis, and reverse direction if necessary
        if (currentX + moveX > maxX || currentX + moveX < 0) {
            moveX = -moveX; // Reverse direction on the X axis
        }

        // Check if the icon will move out of bounds on Y axis, and reverse direction if necessary
        if (currentY + moveY > posYEnd || currentY + moveY < posYStart - mainRect.top) {
            moveY = -moveY; // Reverse direction on the Y axis
        }

        // Check if the icon collides with any text elements, and reverse direction if necessary
        let colliding = false;
        [introText, detailsSection].forEach(textElement => {
            const textRect = textElement.getBoundingClientRect(); // Get bounding box of text element

            if (
                currentX + moveX < textRect.right - mainRect.left &&
                currentX + moveX + icon.clientWidth > textRect.left - mainRect.left &&
                currentY + moveY < textRect.bottom - mainRect.top &&
                currentY + moveY + icon.clientHeight > textRect.top - mainRect.top
            ) {
                colliding = true; // Mark as colliding
            }
        });

        // If colliding with text, reverse direction
        if (colliding) {
            moveX = -moveX;
            moveY = -moveY;
        }

        // Apply the initial position and movement with a smooth transition
        icon.style.transition = `transform ${randomDuration}ms linear`;
        icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

// Repeatedly move the icons every few seconds
setInterval(moveIcons, 3000);

// Trigger initial movement when the page loads
document.addEventListener('DOMContentLoaded', moveIcons);
