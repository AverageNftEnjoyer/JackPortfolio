window.onload = function() {
  const successAnimation = document.getElementById("success-animation");
  successAnimation.classList.add("hidden"); 
};

document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault(); 

  const formData = {
    name: this.name.value,
    email: this.email.value,
    message: this.message.value
  };

  // Send form data to the back-end for secure handling of the EmailJS API call
  try {
      const response = await fetch('/send-email', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      if (response.ok) {
          const responseData = await response.json();
          console.log("SUCCESS! Email to yourself sent.", responseData);
          showSuccessMessage();
      } else {
          throw new Error("Failed to send message");
      }
  } catch (error) {
      console.error("FAILED! Couldn't send email to yourself.", error);

      const responseMessage = document.getElementById("response-message");
      if (responseMessage) {
          responseMessage.innerText = "Failed to send message. Please try again.";
      }
  }
});

// Function to show the success message and animation
function showSuccessMessage() {
  const successAnimation = document.getElementById("success-animation");
  successAnimation.classList.remove("hidden");
  successAnimation.classList.add("show");

  // Hide the form and reset
  const contactForm = document.getElementById('contact-form');
  contactForm.style.display = 'none';
  contactForm.reset();
}
