document.querySelectorAll('.move-on-hover').forEach((icon) => {
  icon.addEventListener('mouseenter', function (e) {
    const rect = icon.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const iconCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = mouseX - iconCenterX;
    const deltaY = mouseY - iconCenterY;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const normalizedDeltaX = deltaX / distance;
    const normalizedDeltaY = deltaY / distance;

    const moveDistance = 20; 

    const translateX = -normalizedDeltaX * moveDistance;
    const translateY = -normalizedDeltaY * moveDistance;

    icon.style.transform = `translate(${translateX}px, ${translateY}px)`;
  });

  icon.addEventListener('mouseleave', function () {
    // Reset transform
    icon.style.transform = 'translate(0, 0)';
  });
});

document.querySelectorAll('.nav-button').forEach((button) => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('glow-shake');
  });

  button.addEventListener('mouseleave', () => {
    button.classList.remove('glow-shake');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const message = "Any inquiries or questions, please contact me below!";
  const messageElement = document.getElementById("typed-message");
  let index = 0;

  function typeMessage() {
    if (index < message.length) {
      messageElement.innerHTML += message.charAt(index);
      index++;
      setTimeout(typeMessage, 50); 
    } else {
      messageElement.style.fontWeight = "bold"; 
      messageElement.style.textDecoration = "underline"; 
    }
  }

  typeMessage();
});
