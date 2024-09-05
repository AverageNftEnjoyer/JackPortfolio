document.querySelectorAll('.move-on-hover').forEach((icon) => {
  icon.addEventListener('mouseenter', function (e) {
    const rect = icon.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const iconCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate the direction
    const deltaX = mouseX - iconCenterX;
    const deltaY = mouseY - iconCenterY;

    // Normalize the deltas to calculate diagonal movement
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const normalizedDeltaX = deltaX / distance;
    const normalizedDeltaY = deltaY / distance;

    // Set movement distance
    const moveDistance = 20; // You can adjust this value for more or less movement

    // Apply diagonal transform for opposite movement
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

