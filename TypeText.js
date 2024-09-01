document.addEventListener('DOMContentLoaded', function () {
    const text = 'Based in Pittsburgh, PA';
    const speed = 80; //Typing Speed
    const typingElement = document.getElementById('typing-text');
  
    let index = 0;
  
    function typeText() {
      if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, speed);
      }
    }
    typeText();
  });