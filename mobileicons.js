// Function to move the icons randomly
function moveIcons() {
    const icons = document.querySelectorAll('.floating-icon');
    
    icons.forEach(icon => {
      const randomX = Math.floor(Math.random() * (window.innerWidth - icon.clientWidth));
      const randomY = Math.floor(Math.random() * (window.innerHeight - icon.clientHeight));
      const randomDuration = Math.floor(Math.random() * 5000) + 3000; // Random duration between 3-8 seconds
      
      icon.style.transition = `${randomDuration}ms linear`;
      icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
  }
  
  // Repeatedly move the icons every few seconds
  setInterval(moveIcons, 3000);
  
  // Trigger initial movement when the page loads
  document.addEventListener('DOMContentLoaded', moveIcons);
  