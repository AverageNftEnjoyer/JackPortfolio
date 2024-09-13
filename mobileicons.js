// Function to initialize the floating icons
function initializeIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach(icon => {
        // Make the icons visible after typing effect finishes
        icon.style.visibility = 'visible';
        icon.style.display = 'block';
        
        // Set initial random positions for the icons
        const container = document.querySelector('#main-content');
        const containerRect = container.getBoundingClientRect();
        const posX = Math.random() * (containerRect.width - 50); // Random X position
        const posY = Math.random() * (containerRect.height - 50); // Random Y position

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
