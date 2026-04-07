import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Loading from './components/Loading';
import { API_BASE_URL } from './config/api';

const DEFAULT_PORTFOLIO_DATA = {
  about: {
    name: 'Aman Kumar Mittal',
    title: 'Python Developer',
    description: 'Passionate developer creating amazing web experiences',
    email: 'aman.mittal.backend@gmail.com',
    location: 'Your Location',
    skills: [],
    socialLinks: {},
  },
  skillDetails: {},
  personalProjects: [],
  companyProjects: [],
};

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    // Load theme from localStorage or default to false
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  // Apply theme globally
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('theme-dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/portfolio`, { timeout: 8000 });
      setPortfolioData(response.data);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setPortfolioData(DEFAULT_PORTFOLIO_DATA);
      setError('Live data is unavailable right now. Showing default portfolio data.');
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="App">
        {error && (
          <div className="error-container">
            <h2>Notice</h2>
            <p>{error}</p>
            <button onClick={fetchPortfolioData}>Retry</button>
          </div>
        )}
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Hero about={portfolioData?.about} />
                <About about={portfolioData?.about} />
                <Projects 
                  personalProjects={portfolioData?.personalProjects || []}
                  companyProjects={portfolioData?.companyProjects || []}
                />
                <Contact about={portfolioData?.about} />
              </>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <Admin 
                portfolioData={portfolioData}
                onUpdate={fetchPortfolioData}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



