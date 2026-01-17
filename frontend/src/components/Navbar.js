import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiHome } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ isDark, setIsDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/admin', label: 'Admin', icon: <FiUser /> }
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Portfolio</span>
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          
          {/* Theme Toggle - Sun/Moon */}
          <div className="nav-theme-toggle" onClick={handleThemeToggle} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleThemeToggle()} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <div className={`theme-avatar ${isDark ? 'theme-moon' : 'theme-sun'}`}>
              {/* Compact heat waves for sun */}
              {!isDark && (
                <>
                  <div className="theme-heat-wave theme-heat-wave-1"></div>
                  <div className="theme-heat-wave theme-heat-wave-2"></div>
                </>
              )}
              {/* Compact fog for moon */}
              {isDark && (
                <>
                  <div className="theme-fog theme-fog-1"></div>
                  <div className="theme-fog theme-fog-2"></div>
                </>
              )}
            </div>
          </div>
        </div>

        <button 
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;



