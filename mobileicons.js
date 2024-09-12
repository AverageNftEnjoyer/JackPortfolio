document.addEventListener('DOMContentLoaded', function () {
    const text = 'Based in Pittsburgh, PA';
    const speed = 80; // Typing speed for the typing effect
    const typingElement = document.getElementById('typing-text');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const textElements = document.querySelectorAll('.intro-text h1, .intro-text .greeting, .details, .move-on-hover');
    const container = document.getElementById('main-content');
    const containerRect = container.getBoundingClientRect();

    // Select the details section to apply the larger barrier
    const detailsSection = document.querySelector('.details');
    const detailsRect = detailsSection.getBoundingClientRect();
    const exclusionMargin = 150; // Adjusted margin for mobile
    const textBuffer = 50; // Smaller buffer for mobile devices
    const iconSize = 50; // Smaller icon size for mobile devices

    let index = 0;

    // Function to generate random numbers within a given range
    function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Check if the icon is colliding with the text elements or the details section
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

    // Initialize floating icons and their positions
    function initializeIcons() {
        const halfLength = Math.floor(floatingIcons.length / 2); // Divide the icons into two groups

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
            icon.dataset.velX = getRandomInRange(-3, 3) || 1; // Slower velocities for mobile
            icon.dataset.velY = getRandomInRange(-3, 3) || 1;

            // Apply initial position
            icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
            icon.style.visibility = 'visible'; // Make icons visible after setting their initial position
        });

        animateIcons(); // Start the animation
    }

    // Animate the floating icons to move around within the container
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
                        velX = -velX; // Reverse X velocity if colliding with text
                        posX += velX * 2; // Move the icon away from the collision area
                    }
                    if (iconRect.top < elementRect.bottom && iconRect.bottom > elementRect.top) {
                        velY = -velY; // Reverse Y velocity if colliding with text
                        posY += velY * 2;
                    }
                }
            });

            if (posX <= containerRect.left || posX >= containerRect.right - icon.offsetWidth) {
                velX = -velX; // Reverse direction on X axis
            }
            if (posY <= containerRect.top || posY >= containerRect.bottom - icon.offsetHeight) {
                velY = -velY; // Reverse direction on Y axis
            }

            icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
            icon.dataset.posX = posX;
            icon.dataset.posY = posY;
            icon.dataset.velX = velX;
            icon.dataset.velY = velY;
        });

        requestAnimationFrame(animateIcons); // Recursively call to animate continuously
    }

    // Typing effect function for the text
    function typingEffect() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typingEffect, speed);
        } else {
            initializeIcons(); // Initialize icons after typing effect completes
        }
    }

    // Hide icons before typing starts
    floatingIcons.forEach(icon => {
        icon.style.visibility = 'hidden';
    });

    // Start typing effect
    typingEffect();
});
