document.addEventListener('DOMContentLoaded', function () {
    const text = 'Based in Pittsburgh, PA';
    const speed = 80; // Typing speed
    const typingElement = document.getElementById('typing-text');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const textElements = document.querySelectorAll('.intro-text h1, .intro-text .greeting, .details, .move-on-hover');
    const container = document.getElementById('main-content');

    // Dynamically get the container rect each time for mobile viewport
    let containerRect = container.getBoundingClientRect();
    
    const detailsSection = document.querySelector('.details');
    let detailsRect = detailsSection.getBoundingClientRect();
    const exclusionMargin = 300; // Avoid icon collisions with text by adding margins
    const textBuffer = 100; // Buffer space to avoid collisions

    let index = 0;

    function getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    const iconSize = 50; // Icon size for mobile

    // Check if an icon collides with text elements
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
        // Check for collision with details section
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
        // Get new bounding rects to handle viewport size changes (important for mobile)
        containerRect = container.getBoundingClientRect();
        detailsRect = detailsSection.getBoundingClientRect();
        
        const halfLength = Math.floor(floatingIcons.length / 2);

        floatingIcons.forEach((icon, index) => {
            icon.style.display = 'block'; // Show icon after initialization

            let posX, posY;

            if (index < halfLength) {
                // Position first half of icons above the text
                do {
                    posX = getRandomInRange(containerRect.left, containerRect.right - iconSize);
                    posY = getRandomInRange(containerRect.top, detailsRect.top - iconSize); 
                } while (isCollidingWithElements(posX, posY, icon.offsetWidth, icon.offsetHeight));
            } else {
                // Position second half of icons below the text
                do {
                    posX = getRandomInRange(containerRect.left, containerRect.right - iconSize);
                    posY = getRandomInRange(detailsRect.bottom, containerRect.bottom - iconSize); 
                } while (isCollidingWithElements(posX, posY, icon.offsetWidth, icon.offsetHeight));
            }

            // Store initial position and velocity for each icon
            icon.dataset.posX = posX;
            icon.dataset.posY = posY;
            icon.dataset.velX = getRandomInRange(-3, 3) || 1; 
            icon.dataset.velY = getRandomInRange(-3, 3) || 1; 

            // Position icon on the screen
            icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
            icon.style.visibility = 'visible'; 
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

            // Check for collisions with text elements and reverse direction
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
                        velX = -velX;
                        posX += velX * 2; 
                    }
                    if (iconRect.top < elementRect.bottom && iconRect.bottom > elementRect.top) {
                        velY = -velY;
                        posY += velY * 2; 
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
            icon.style.transform = `translate(${posX - containerRect.left}px, ${posY - containerRect.top}px)`;
            icon.dataset.posX = posX;
            icon.dataset.posY = posY;
            icon.dataset.velX = velX;
            icon.dataset.velY = velY;
        });

        requestAnimationFrame(animateIcons);
    }

    // Typewriter effect for the intro text
    function typingEffect() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typingEffect, speed);
        } else {
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
