document.addEventListener('DOMContentLoaded', function () {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const textElements = document.querySelectorAll('.intro-text h1, .intro-text .greeting, .details, .move-on-hover');
    const container = document.getElementById('main-content');
    const containerRect = container.getBoundingClientRect();
    
    // Select the details section to apply the larger barrier
    const detailsSection = document.querySelector('.details');
    const detailsRect = detailsSection.getBoundingClientRect();
    const exclusionMargin = 300; 
    const textBuffer = 100; 
    
    function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    const iconSize = 75; // Size of each icon

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

    function initializeIcons() {
        const halfLength = Math.floor(floatingIcons.length / 2); 

        floatingIcons.forEach((icon, index) => {
            icon.style.display = 'block'; // Show the icon

            let posX, posY;

            // First half of icons: Above the text
            if (index < halfLength) {
                do {
                    posX = getRandomInRange(containerRect.left, containerRect.right - iconSize);
                    posY = getRandomInRange(containerRect.top, detailsRect.top - iconSize);
                } while (isCollidingWithElements(posX, posY, icon.offsetWidth, icon.offsetHeight));

            // Second half of icons: Below the text
            } else {
                do {
                    posX = getRandomInRange(containerRect.left, containerRect.right - iconSize);
                    posY = getRandomInRange(detailsRect.bottom, containerRect.bottom - iconSize);
                } while (isCollidingWithElements(posX, posY, icon.offsetWidth, icon.offsetHeight));
            }

            icon.dataset.posX = posX;
            icon.dataset.posY = posY;

            // Set initial velocity
            icon.dataset.velX = getRandomInRange(-5, 3.5) || 1; // X velocity
            icon.dataset.velY = getRandomInRange(-5, 3.5) || 1; // Y velocity

            // Apply initial position
            icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
            icon.style.visibility = 'visible'; // Make the icon visible
        });

        animateIcons();
    }

    // Animate floating icons
    function animateIcons() {
        floatingIcons.forEach((icon) => {
            let posX = parseFloat(icon.dataset.posX);
            let posY = parseFloat(icon.dataset.posY);
            let velX = parseFloat(icon.dataset.velX);
            let velY = parseFloat(icon.dataset.velY);
            posX += velX;
            posY += velY;

            // Check for collisions with text elements
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
                        velX = -velX; // Reverse X direction
                        posX += velX * 2; // Move the icon away
                    }
                    if (iconRect.top < elementRect.bottom && iconRect.bottom > elementRect.top) {
                        velY = -velY; // Reverse Y direction
                        posY += velY * 2; // Move the icon away
                    }
                }
            });

            // Bounce off container walls
            if (posX <= containerRect.left || posX >= containerRect.right - icon.offsetWidth) {
                velX = -velX;
            }
            if (posY <= containerRect.top || posY >= containerRect.bottom - icon.offsetHeight) {
                velY = -velY;
            }

            // Update icon position
            icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
            icon.dataset.posX = posX;
            icon.dataset.posY = posY;
            icon.dataset.velX = velX;
            icon.dataset.velY = velY;
        });

        // Continuously animate
        requestAnimationFrame(animateIcons);
    }

    // Initialize and hide icons before animation starts
    floatingIcons.forEach(icon => {
        icon.style.visibility = 'hidden';
        icon.style.display = 'none'; 
    });

    // Once the page loads, initialize icons
    initializeIcons();
});
