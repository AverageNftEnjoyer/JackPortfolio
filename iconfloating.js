document.addEventListener('DOMContentLoaded', function () {
    const text = 'Based in Pittsburgh, PA';
    const speed = 80; // Typing speed
    const typingElement = document.getElementById('typing-text');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const textElements = document.querySelectorAll('.intro-text h1, .intro-text .greeting, .details');
    const container = document.getElementById('main-content');
    const containerRect = container.getBoundingClientRect();

    let index = 0;

    function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const spawnMargin = 140; // Margin from the edges to prevent icons from being partially outside the screen
    const iconSize = 75; // Assuming each icon has a consistent width and height

    const spawnPoints = [
        { x: spawnMargin, y: spawnMargin }, // Top left corner
        { x: containerRect.width - iconSize - spawnMargin + 100, y: spawnMargin }, // Top right corner
        { x: (containerRect.width - iconSize) / 2, y: spawnMargin }, // Middle 
        { x: spawnMargin, y: containerRect.height / 4 }, // New spawn point at top left of the text
        { x: containerRect.width - iconSize - spawnMargin + 100, y: containerRect.height / 4 } // New spawn point at top right of the text
    ];

    function isCollidingWithText(x, y, iconWidth, iconHeight) {
        for (const text of textElements) {
            const textRect = text.getBoundingClientRect();
            if (
                x < textRect.right &&
                x + iconWidth > textRect.left &&
                y < textRect.bottom &&
                y + iconHeight > textRect.top
            ) {
                return true; 
            }
        }
        return false; 
    }

    // Initialize positions and velocities for floating icons
    function initializeIcons() {
        floatingIcons.forEach((icon, index) => {
            icon.style.display = 'block'; // Show icons after initial setup

            const spawnPoint = spawnPoints[index % spawnPoints.length];

            let posX = spawnPoint.x + window.scrollX; 
            let posY = spawnPoint.y + window.scrollY;

            // Ensure no initial overlap with text
            while (isCollidingWithText(posX, posY, icon.offsetWidth, icon.offsetHeight)) {
                posX = getRandomInRange(containerRect.left + spawnMargin, containerRect.right - iconSize - spawnMargin);
                posY = getRandomInRange(containerRect.top + spawnMargin, containerRect.bottom - iconSize - spawnMargin);
            }

            icon.dataset.posX = posX;
            icon.dataset.posY = posY;

            // Increased range for faster speeds
            icon.dataset.velX = getRandomInRange(-4, 3.5) || 1; // Velocity in X direction
            icon.dataset.velY = getRandomInRange(-4, 3.5) || 1; // Velocity in Y direction

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
            textElements.forEach((text) => {
                const textRect = text.getBoundingClientRect();
                const iconRect = icon.getBoundingClientRect();

                if (
                    iconRect.left < textRect.right &&
                    iconRect.right > textRect.left &&
                    iconRect.top < textRect.bottom &&
                    iconRect.bottom > textRect.top
                ) {
                    // Collision detected, reverse direction and apply an offset
                    if (iconRect.left < textRect.right && iconRect.right > textRect.left) {
                        velX = -velX; // Reverse X velocity
                        posX += velX * 2; // Move the icon away from the collision area
                    }
                    if (iconRect.top < textRect.bottom && iconRect.bottom > textRect.top) {
                        velY = -velY; // Reverse Y velocity
                        posY += velY * 2; // Move the icon away from the collision area
                    }
                }
            });

            // Reverse direction when hitting the container boundaries
            if (posX <= containerRect.left || posX >= containerRect.right - icon.offsetWidth) {
                velX = -velX; // Ensure it doesn't stop moving
            }
            if (posY <= containerRect.top || posY >= containerRect.bottom - icon.offsetHeight) {
                velY = -velY; // Ensure it doesn't stop moving
            }

            // Apply updated positions and velocities
            icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
            icon.dataset.posX = posX;
            icon.dataset.posY = posY;
            icon.dataset.velX = velX;
            icon.dataset.velY = velY;
        });

        // Request the next frame
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
