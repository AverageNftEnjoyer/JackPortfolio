require('dotenv').config();

const emailJSKey = process.env.EMAILJS_PUBLIC_KEY;
emailjs.init(emailJSKey);


window.onload = function() {
    const successAnimation = document.getElementById("success-animation");
    successAnimation.classList.add("hidden"); 
  };
  
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const formData = {
      name: this.name.value,
      email: this.email.value,
      message: this.message.value
    };
  
    emailjs.send("service_biujgst", "template_xxvv7ak", formData)
      .then(function(response) {
        console.log("SUCCESS! Email to yourself sent.", response.status, response.text);
        
        showSuccessMessage();
      }, function(error) {
        console.error("FAILED! Couldn't send email to yourself.", error);
  
        const responseMessage = document.getElementById("response-message");
        if (responseMessage) {
          responseMessage.innerText = "Failed to send message. Please try again.";
        }
      });
  });
  
  // Function to show the success message and animation
  function showSuccessMessage() {
    const successAnimation = document.getElementById("success-animation");
    successAnimation.classList.remove("hidden");
    
    successAnimation.classList.add("show");
      document.getElementById('contact-form').style.display = 'none';
      document.getElementById('contact-form').reset();
  }
  