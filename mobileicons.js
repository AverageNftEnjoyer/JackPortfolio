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
