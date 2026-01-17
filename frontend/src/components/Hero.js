import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import './Hero.css';

const Hero = ({ about }) => {
  const socialLinks = about?.socialLinks || {};

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check theme from document
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('theme-dark'));

  useEffect(() => {
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('theme-dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="home">
      {/* Moving Clouds Background - Only in Light Mode */}
      {!isDark && (
        <div className="clouds-container">
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
          <div className="cloud cloud4"></div>
          <div className="cloud cloud5"></div>
        </div>
      )}

      {/* Stars Background - Only in Dark Mode */}
      {isDark && (
        <>
          <div className="stars-container">
            {/* Twinkling Stars */}
            <div className="star star1"></div>
            <div className="star star2"></div>
            <div className="star star3"></div>
            <div className="star star4"></div>
            <div className="star star5"></div>
            <div className="star star6"></div>
            <div className="star star7"></div>
            <div className="star star8"></div>
            <div className="star star9"></div>
            <div className="star star10"></div>
            <div className="star star11"></div>
            <div className="star star12"></div>
            <div className="star star13"></div>
            <div className="star star14"></div>
            <div className="star star15"></div>
            <div className="star star16"></div>
            <div className="star star17"></div>
            <div className="star star18"></div>
            <div className="star star19"></div>
            <div className="star star20"></div>
          </div>
          
          {/* Shooting Stars */}
          <div className="shooting-star shooting-star-1"></div>
          <div className="shooting-star shooting-star-2"></div>
          <div className="shooting-star shooting-star-3"></div>
        </>
      )}

      {/* Flying Birds - Both Light and Dark Mode */}
      <div className="birds-container">
        <div className="bird bird1">
          <svg width="45" height="30" viewBox="0 0 45 30" className="bird-svg" preserveAspectRatio="xMidYMid meet">
            {/* Bird Body */}
            <ellipse cx="22" cy="15" rx="6" ry="4" className="bird-body-svg"/>
            {/* Bird Head */}
            <circle cx="15" cy="13" r="3.5" className="bird-head-svg"/>
            {/* Bird Beak */}
            <path d="M11 13 L8 12 L11 11 Z" className="bird-beak-svg"/>
            {/* Left Wing */}
            <ellipse cx="18" cy="15" rx="8" ry="5" className="bird-wing-svg bird-wing-left-svg" transform="rotate(-20 18 15)"/>
            {/* Right Wing */}
            <ellipse cx="26" cy="15" rx="8" ry="5" className="bird-wing-svg bird-wing-right-svg" transform="rotate(20 26 15)"/>
            {/* Bird Tail */}
            <path d="M28 15 L35 12 L35 18 Z" className="bird-tail-svg"/>
          </svg>
        </div>
        <div className="bird bird2">
          <svg width="45" height="30" viewBox="0 0 45 30" className="bird-svg" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="22" cy="15" rx="6" ry="4" className="bird-body-svg"/>
            <circle cx="15" cy="13" r="3.5" className="bird-head-svg"/>
            <path d="M11 13 L8 12 L11 11 Z" className="bird-beak-svg"/>
            <ellipse cx="18" cy="15" rx="8" ry="5" className="bird-wing-svg bird-wing-left-svg" transform="rotate(-20 18 15)"/>
            <ellipse cx="26" cy="15" rx="8" ry="5" className="bird-wing-svg bird-wing-right-svg" transform="rotate(20 26 15)"/>
            <path d="M28 15 L35 12 L35 18 Z" className="bird-tail-svg"/>
          </svg>
        </div>
        <div className="bird bird3">
          <svg width="45" height="30" viewBox="0 0 45 30" className="bird-svg" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="22" cy="15" rx="6" ry="4" className="bird-body-svg"/>
            <circle cx="15" cy="13" r="3.5" className="bird-head-svg"/>
            <path d="M11 13 L8 12 L11 11 Z" className="bird-beak-svg"/>
            <ellipse cx="18" cy="15" rx="8" ry="5" className="bird-wing-svg bird-wing-left-svg" transform="rotate(-20 18 15)"/>
            <ellipse cx="26" cy="15" rx="8" ry="5" className="bird-wing-svg bird-wing-right-svg" transform="rotate(20 26 15)"/>
            <path d="M28 15 L35 12 L35 18 Z" className="bird-tail-svg"/>
          </svg>
        </div>
        <div className="bird bird4">
          <svg width="45" height="30" viewBox="0 0 45 30" className="bird-svg" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="22" cy="15" rx="6" ry="4" className="bird-body-svg"/>
            <circle cx="15" cy="13" r="3.5" className="bird-head-svg"/>
            <path d="M11 13 L8 12 L11 11 Z" className="bird-beak-svg"/>
            <ellipse cx="18" cy="15" rx="8" ry="5" className="bird-wing-svg bird-wing-left-svg" transform="rotate(-20 18 15)"/>
            <ellipse cx="26" cy="15" rx="8" ry="5" className="bird-wing-svg bird-wing-right-svg" transform="rotate(20 26 15)"/>
            <path d="M28 15 L35 12 L35 18 Z" className="bird-tail-svg"/>
          </svg>
        </div>
      </div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I'm
          </motion.div>
          
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {about?.name || 'Your Name'}
          </motion.h1>
          
          <motion.h2
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {about?.title || 'Full Stack Developer'}
          </motion.h2>
          
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {about?.description || 'Passionate developer creating amazing web experiences'}
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              <FiMail /> Get In Touch
            </button>
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FiTwitter />
              </a>
            )}
          </motion.div>
        </motion.div>

      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;








