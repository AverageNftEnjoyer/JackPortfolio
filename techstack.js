// Select all tech icons
const techIcons = document.querySelectorAll('.tech-icon');

// Function to randomize animation delay and duration for each icon
techIcons.forEach(icon => {
    const randomDuration = Math.random() * 5 + 5; // Random duration between 5s to 10s
    const randomDelay = Math.random() * 5; // Random delay up to 5s
    icon.style.animationDuration = `${randomDuration}s`;
    icon.style.animationDelay = `${randomDelay}s`;
});
