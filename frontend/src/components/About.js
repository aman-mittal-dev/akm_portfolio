import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiMail, FiCode, FiAward, FiX } from 'react-icons/fi';
import axios from 'axios';
import './About.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const About = ({ about }) => {
  const skills = about?.skills || [];
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillDetails, setSkillDetails] = useState({});

  useEffect(() => {
    fetchSkillDetails();
  }, []);

  const fetchSkillDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/portfolio/skills`);
      setSkillDetails(response.data || {});
    } catch (error) {
      console.error('Error fetching skill details:', error);
      setSkillDetails({});
    }
  };

  // Get skill details from API or default
  const getSkillDetails = (skillName) => {
    const normalizedName = skillName.trim();
    const skillFromAPI = skillDetails[normalizedName];
    
    if (skillFromAPI) {
      return {
        title: skillFromAPI.title || normalizedName,
        description: skillFromAPI.description || `${normalizedName} is a technology/skill used in software development.`,
        bestPractices: Array.isArray(skillFromAPI.bestPractices) && skillFromAPI.bestPractices.length > 0
          ? skillFromAPI.bestPractices
          : [
              'Follow industry best practices',
              'Stay updated with latest versiohttps://www.linkedin.com/in/aman-kumar-mittal-4984561a0',
              'Write clean, maintainable code',
              'Document your work properly',
              'Test thoroughly before deployment'
            ],
        useCases: skillFromAPI.useCases || 'Software Development, Web Applications, System Design'
      };
    }
    
    // Default fallback if skill not found in API
    return {
      title: normalizedName,
      description: `${normalizedName} is a technology/skill used in software development. Admin add details in the admin panel to customize this information.`,
      bestPractices: [
        'Follow industry best practices',
        'Stay updated with latest versions',
        'Write clean, maintainable code',
        'Document your work properly',
        'Test thoroughly before deployment'
      ],
      useCases: 'Software Development, Web Applications, System Design'
    };
  };

  // Handle skill click
  const handleSkillClick = (skill) => {
    setSelectedSkill(getSkillDetails(skill));
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSkill(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle Location card click - open Google Maps
  const handleLocationClick = () => {
    const location = about?.location || 'Your Location';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
  };

  // Handle Email card click - open email client
  const handleEmailClick = () => {
    const email = about?.email || 'your.email@example.com';
    window.location.href = `mailto:${email}`;
  };

  // Handle Role card click - search definition on Google
  const handleRoleClick = () => {
    const role = about?.title || 'Full Stack Developer';
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(role + ' definition')}`;
    window.open(searchUrl, '_blank');
  };

  // Handle Experience card click - scroll to projects section
  const handleExperienceClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know more about me</p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="info-card clickable-card" 
              onClick={handleLocationClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleLocationClick()}
              aria-label="Click to view location on map"
            >
              <FiMapPin className="info-icon" />
              <div>
                <h3>Location</h3>
                <p>{about?.location || 'Your Location'}</p>
              </div>
            </div>
            <div 
              className="info-card clickable-card" 
              onClick={handleEmailClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleEmailClick()}
              aria-label="Click to send email"
            >
              <FiMail className="info-icon" />
              <div>
                <h3>Email</h3>
                <p>{about?.email || 'your.email@example.com'}</p>
              </div>
            </div>
            <div 
              className="info-card clickable-card" 
              onClick={handleRoleClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleRoleClick()}
              aria-label="Click to search role definition"
            >
              <FiCode className="info-icon" />
              <div>
                <h3>Role</h3>
                <p>{about?.title || 'Full Stack Developer'}</p>
              </div>
            </div>
            <div 
              className="info-card clickable-card" 
              onClick={handleExperienceClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleExperienceClick()}
              aria-label="Click to view projects"
            >
              <FiAward className="info-icon" />
              <div>
                <h3>Experience</h3>
                <p>Building amazing applications</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-skills"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="skills-title">Skills & Technologies</h3>
            <motion.div
              className="skills-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="skill-item clickable-skill"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleSkillClick(skill)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleSkillClick(skill)}
                    aria-label={`Click to learn more about ${skill}`}
                  >
                    {skill}
                  </motion.div>
                ))
              ) : (
                <p className="no-skills">Add your skills in the admin panel</p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Skill Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedSkill && (
          <motion.div
            className="skill-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              className="skill-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="skill-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <FiX />
              </button>
              
              <div className="skill-modal-content">
                <h2 className="skill-modal-title">{selectedSkill.title}</h2>
                
                <div className="skill-modal-section">
                  <h3>Description</h3>
                  <p>{selectedSkill.description}</p>
                </div>

                <div className="skill-modal-section">
                  <h3>Best Practices</h3>
                  <ul className="skill-practices-list">
                    {selectedSkill.bestPractices.map((practice, idx) => (
                      <li key={idx}>{practice}</li>
                    ))}
                  </ul>
                </div>

                <div className="skill-modal-section">
                  <h3>Use Cases</h3>
                  <p className="skill-use-cases">{selectedSkill.useCases}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;



