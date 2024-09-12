document.addEventListener('DOMContentLoaded', function () {
    const text = 'Based in Pittsburgh, PA';
    const speed = 80; // Typing speed
    const typingElement = document.getElementById('typing-text');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const textElements = document.querySelectorAll('.intro-text h1, .intro-text .greeting, .details, .move-on-hover');
    const container = document.getElementById('main-content');
    
    // Variables to hold rect and boundary data
    let containerRect;
    let detailsRect;
    let exclusionMargin = 150;
    let textBuffer = 50;
    let iconSize = 50;

    let index = 0;

    // Function to calculate container and element boundaries
    function updateBoundaries() {
        containerRect = container.getBoundingClientRect();
        const detailsSection = document.querySelector('.details');
        detailsRect = detailsSection.getBoundingClientRect();
    }

    // Utility function to get random numbers within a range
    function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Function to check collisions with text and details elements
    function isCollidingWithElements(x, y, iconWidth, iconHeight) {
        for (const element of textElements) {
            const elementRect = element.getBoundingClientRect();
            if (
                x < elementRect.right + textBuffer &&
                x + iconWidth > elementRect.left - textBuffer &&
                y < elementRect.bottom + textBuffer &&
                y + iconHeight > elementRect.top - textBuffer
            ) {
                return true;
            }
        }

        if (
            x < detailsRect.right + exclusionMargin &&
            x + iconWidth > detailsRect.left - exclusionMargin &&
            y < detailsRect.bottom + exclusionMargin &&
            y + iconHeight > detailsRect.top - exclusionMargin
        ) {
            return true;
        }

        return false;
    }

    // Function to initialize the floating icons
    function initializeIcons() {
        const halfLength = Math.floor(floatingIcons.length / 2);

        floatingIcons.forEach((icon, index) => {
            let posX, posY;

            // First half of icons should float above the text
            if (index < halfLength) {
                do {
                    posX = getRandomInRange(containerRect.left, containerRect.right - iconSize);
                    posY = getRandomInRange(containerRect.top, detailsRect.top - iconSize);
                } while (isCollidingWithElements(posX, posY, icon.offsetWidth, icon.offsetHeight));

            // Second half of icons should float below the text
            } else {
                do {
                    posX = getRandomInRange(containerRect.left, containerRect.right - iconSize);
                    posY = getRandomInRange(detailsRect.bottom, containerRect.bottom - iconSize);
                } while (isCollidingWithElements(posX, posY, icon.offsetWidth, icon.offsetHeight));
            }

            icon.dataset.posX = posX;
            icon.dataset.posY = posY;

            // Set initial velocity
            icon.dataset.velX = getRandomInRange(-3, 3) || 1;
            icon.dataset.velY = getRandomInRange(-3, 3) || 1;

            // Apply initial position
            icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
            icon.style.visibility = 'visible';
        });

        // Start the animation after initializing icons
        requestAnimationFrame(animateIcons);
    }

    // Function to animate the icons
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
                        velX = -velX; // Reverse X velocity on collision
                        posX += velX * 2; // Move away from the collision
                    }
                    if (iconRect.top < elementRect.bottom && iconRect.bottom > elementRect.top) {
                        velY = -velY; // Reverse Y velocity on collision
                        posY += velY * 2;
                    }
                }
            });

            // Bounce off container edges
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

        requestAnimationFrame(animateIcons); // Loop the animation
    }

    // Typing effect for the text
    function typingEffect() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typingEffect, speed);
        } else {
            updateBoundaries(); // Update boundaries after typing finishes
            initializeIcons(); // Initialize icons after typing
        }
    }

    // Initial setup: Hide icons and start typing effect
    floatingIcons.forEach(icon => {
        icon.style.visibility = 'hidden';
    });

    // Start the typing effect
    typingEffect();

    // Recalculate boundaries on resize to ensure correct behavior
    window.addEventListener('resize', updateBoundaries);
});
