document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  const options = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible");
        observer.unobserve(entry.target); // Stop observing once the animation is done
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const checkmarkIcons = document.querySelectorAll('.CheckmarkIcon');

  checkmarkIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
      icon.classList.add('hovered');
    });

    icon.addEventListener('mouseout', () => {
      icon.classList.remove('hovered');
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const arrowButtons = document.querySelectorAll('.arrow-button');

  arrowButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
      // Generate a random direction: either 1 (for 15deg) or -1 (for -15deg)
      const direction = Math.random() < 0.5 ? -1 : 1;
      // Set the direction as a CSS variable on the button
      button.style.setProperty('--direction', direction);
    });
  });
});