import React, { useState } from 'react';
import emailjs from 'emailjs-com';



const Help = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Replace these with your actual EmailJS values
    const serviceId = 'service_sepfri1539'; // e.g., 'service_xyz'
    const templateId = 'template_frisept201554'; // e.g., 'template_abc'
    const publicKey = 'DeeyWGcO3WVXJ-uDJ'; // e.g., 'user_123456'
  
  
    
  // Send email using EmailJS
  emailjs.send(serviceId, templateId, formData, publicKey)
  .then((response) => {
    console.log('SUCCESS!', response.status, response.text);
    alert('Email sent successfully!'); // Alert to confirm email was sent
    // Reset form after successful submission
    setFormData({ name: '', email: '', message: '' });
  }, (err) => {
    console.error('FAILED...', err);
    alert('Failed to send email. Please try again.'); // Alert for failure
  });


  };
  
  
  

  return (
  
    <div className="help-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Help;
