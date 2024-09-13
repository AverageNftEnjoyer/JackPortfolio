// Function to initialize the floating icons
function initializeIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
        const screenWidth = 100;
    const screenHeight = 100;

    // Get the position of the typing effect text (to position the icons below it)
    const typingElement = document.getElementById('typing-text');
    const typingRect = typingElement.getBoundingClientRect(); // Get the position of the text element

    floatingIcons.forEach(icon => {
        // Make the icons visible after typing effect finishes
        icon.style.visibility = 'visible';
        icon.style.display = 'block';
        
        // Set initial random positions for the icons based on screen size
        const posX = Math.random() * (screenWidth - 50); // Random X position
        const posY = typingRect.bottom + Math.random() * 100; // Position icons below the typing text

        // Apply the initial position
        icon.style.transform = `translate(${posX}px, ${posY}px)`;
    });
}

// Typing effect function
function typingEffect(callback) {
    const text = 'Based in Pittsburgh, PA';
    const speed = 80; // Typing speed
    const typingElement = document.getElementById('typing-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            // Once the typing is complete, call the callback function
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    // Start the typing effect
    type();
}

// Initialize the typing effect when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    typingEffect(function() {
        initializeIcons(); // Initialize icons after typing is complete
    });
});
