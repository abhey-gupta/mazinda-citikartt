'use client'

import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    issue: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add code here to handle form submission, such as sending the data to your backend.
    // For now, let's just log the form data.
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-4 md:px-14 md:py-4">
      <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
      <p className="mb-4">Have questions or feedback? Feel free to get in touch with us.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="issue" className="block text-gray-700 text-sm font-bold mb-2">
            Describe the Issue:
          </label>
          <textarea
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-black hover:opacity-70 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
