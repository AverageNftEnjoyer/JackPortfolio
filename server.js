import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch'; // Use `import` instead of `require`
import path from 'path';

// Load environment variables
dotenv.config();

// Set up Express
const app = express();
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const emailData = {
    service_id: 'service_biujgst',
    template_id: 'template_xxvv7ak',
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    template_params: {
      user_name: name,
      user_email: email,
      message: message,
    },
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) throw new Error('Failed to send email');

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
