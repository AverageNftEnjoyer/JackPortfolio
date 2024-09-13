function typingEffect() {
    const text = 'Based in Pittsburgh, PA';
    const speed = 80; // Typing speed
    const typingElement = document.getElementById('typing-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Start the typing effect
    type();
}

// Initialize the typing effect when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    typingEffect(); // Start typing effect
});

document.addEventListener('DOMContentLoaded', function () {
    // Array of all the icon paths
    const icons = [
        './assets/java.png',
        './assets/javascript.png',
        './assets/CSS.png',
        './assets/htmlNew.png',
        './assets/Databricks.png',
        './assets/Mongo.png',
        './assets/React.png',
        './assets/GIT.png',
        './assets/snowflake.png',
        './assets/TS.png',
        './assets/PYTHON.png'
    ];

    // Create 3 placeholders for the icons
    const iconContainers = document.querySelectorAll('.floating-icon');

    // Function to randomly swap the icons
    function swapIcons() {
        iconContainers.forEach((icon) => {
            // Make the icon invisible (for flash effect)
            icon.style.opacity = '0';

            // Wait for the opacity transition, then change the icon source
            setTimeout(() => {
                // Pick a random icon
                const randomIcon = icons[Math.floor(Math.random() * icons.length)];

                // Change the icon's source
                icon.setAttribute('src', randomIcon);

                // Make the icon visible again
                icon.style.opacity = '1';
            }, 300); // Wait 300ms for the fade-out effect
        });
    }

    // Call swapIcons every 2 seconds to change the icons
    setInterval(swapIcons, 2000);
});
