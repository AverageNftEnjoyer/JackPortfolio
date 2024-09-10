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
    const exclusionMargin = 300; // Increase the buffer size around the details section
    const textBuffer = 100; // Additional buffer space around text elements to prevent collisions
    
    let index = 0;

    function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const iconSize = 75; // Assuming each icon has a consistent width and height

    // Check if the icon would collide with any text or specific elements (like LinkedIn, GitHub, resume icons)
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

        // Ensure that the icons don't spawn within the `.details` section + extra buffer
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

    // Initialize positions and velocities for floating icons
    function initializeIcons() {
        const halfLength = Math.floor(floatingIcons.length / 2); // Divide icons in two halves

        floatingIcons.forEach((icon, index) => {
            icon.style.display = 'block'; // Show icons after initial setup

            let posX, posY;

            // First half of icons will spawn above the text elements
            if (index < halfLength) {
                do {
                    posX = getRandomInRange(containerRect.left, containerRect.right - iconSize);
                    posY = getRandomInRange(containerRect.top, detailsRect.top - iconSize); // Above the text
                } while (isCollidingWithElements(posX, posY, icon.offsetWidth, icon.offsetHeight));

            // Second half of icons will spawn below the details section
            } else {
                do {
                    posX = getRandomInRange(containerRect.left, containerRect.right - iconSize);
                    posY = getRandomInRange(detailsRect.bottom, containerRect.bottom - iconSize); // Below the text
                } while (isCollidingWithElements(posX, posY, icon.offsetWidth, icon.offsetHeight));
            }

            icon.dataset.posX = posX;
            icon.dataset.posY = posY;

            // Set initial velocity
            icon.dataset.velX = getRandomInRange(-5, 3.5) || 1; // Velocity in X direction
            icon.dataset.velY = getRandomInRange(-5, 3.5) || 1; // Velocity in Y direction

            // Apply initial position
            icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
            icon.style.visibility = 'visible'; // Show icons after setting their position
        });

        // Start the animation
        animateIcons();
    }

    // Animate floating icons
    function animateIcons() {
        floatingIcons.forEach((icon) => {
            let posX = parseFloat(icon.dataset.posX);
            let posY = parseFloat(icon.dataset.posY);
            let velX = parseFloat(icon.dataset.velX);
            let velY = parseFloat(icon.dataset.velY);

            // Update position based on velocity
            posX += velX;
            posY += velY;

            // Check for collision with text elements
            textElements.forEach((element) => {
                const elementRect = element.getBoundingClientRect();
                const iconRect = icon.getBoundingClientRect();

                if (
                    iconRect.left < elementRect.right &&
                    iconRect.right > elementRect.left &&
                    iconRect.top < elementRect.bottom &&
                    iconRect.bottom > elementRect.top
                ) {
                    // Collision detected, reverse direction and apply an offset
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

            // Reverse direction when hitting the container boundaries
            if (posX <= containerRect.left || posX >= containerRect.right - icon.offsetWidth) {
                velX = -velX;
            }
            if (posY <= containerRect.top || posY >= containerRect.bottom - icon.offsetHeight) {
                velY = -velY;
            }

            // Apply updated positions and velocities
            icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
            icon.dataset.posX = posX;
            icon.dataset.posY = posY;
            icon.dataset.velX = velX;
            icon.dataset.velY = velY;
        });

        // Request the next frame for the animation
        requestAnimationFrame(animateIcons);
    }

    // Typing effect function
    function typingEffect() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typingEffect, speed);
        } else {
            // Once typing is complete, initialize icons
            initializeIcons();
        }
    }

    // Hide icons initially
    floatingIcons.forEach(icon => {
        icon.style.visibility = 'hidden';
        icon.style.display = 'none'; 
    });

    // Start typing effect
    typingEffect();
});
