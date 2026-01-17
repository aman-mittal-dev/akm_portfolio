import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import axios from 'axios';
import './Contact.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Contact = ({ about }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending...' });

    // In a real app, you would send this to your backend
    // For now, we'll simulate it
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Let's work together on your next project</p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="contact-card">
              <FiMail className="contact-icon" />
              <h3>Email</h3>
              <a href={`mailto:${about?.email || 'your.email@example.com'}`}>
                {about?.email || 'your.email@example.com'}
              </a>
            </div>
            <div className="contact-card">
              <FiMapPin className="contact-icon" />
              <h3>Location</h3>
              <p>{about?.location || 'Your Location'}</p>
            </div>
            <div className="contact-card">
              <FiPhone className="contact-icon" />
              <h3>Available</h3>
              <p>For freelance projects</p>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Your message here..."
              />
            </div>
            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
            <button type="submit" className="submit-btn" disabled={status.type === 'loading'}>
              <FiSend /> {status.type === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;



