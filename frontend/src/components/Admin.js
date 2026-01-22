import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiSave, FiTrash2, FiPlus, FiLogOut, FiLock, FiEdit2, FiX } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Admin.css';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = process.env.REACT_APP_API_URL || "";

const Admin = ({ portfolioData, onUpdate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [editingProject, setEditingProject] = useState(null); // { type: 'personal'|'company', id: string }
  const [editTechInput, setEditTechInput] = useState('');
  const [skillDetails, setSkillDetails] = useState({});
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    about: portfolioData?.about || {},
    newPersonalProject: {
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: ''
    },
    newCompanyProject: {
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: ''
    },
    techInput: '',
    editingProject: {
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: ''
    },
    newSkill: {
      name: '',
      description: '',
      useCases: '',
      bestPractices: []
    },
    editingSkill: {
      name: '',
      description: '',
      useCases: '',
      bestPractices: []
    },
    skillPracticeInput: '',
    editSkillPracticeInput: ''
  });

  useEffect(() => {
    checkAuth();
    fetchSkillDetails();
  }, []);

  useEffect(() => {
    if (portfolioData) {
      fetchSkillDetails();
    }
  }, [portfolioData]);

  const fetchSkillDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/portfolio/skills`);
      setSkillDetails(response.data || {});
    } catch (error) {
      console.error('Error fetching skill details:', error);
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.valid) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('authToken');
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginData);
      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      alert('Invalid credentials');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const handleAboutUpdate = async () => {
    const token = localStorage.getItem('authToken');
    setLoading(true);
    try {
      await axios.post(`${API_URL}/portfolio/about`, formData.about, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('About section updated successfully!');
      onUpdate();
    } catch (error) {
      alert('Error updating about section');
    }
    setLoading(false);
  };

  const handleAddProject = async (type) => {
    const token = localStorage.getItem('authToken');
    const projectData = type === 'personal' ? formData.newPersonalProject : formData.newCompanyProject;
    
    if (!projectData.title || !projectData.description) {
      alert('Please fill in title and description');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/portfolio/projects/${type}`, projectData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`${type === 'personal' ? 'Personal' : 'Company'} project added successfully!`);
      setFormData({
        ...formData,
        [`new${type.charAt(0).toUpperCase() + type.slice(1)}Project`]: {
          title: '',
          description: '',
          technologies: [],
          githubUrl: '',
          liveUrl: ''
        },
        techInput: ''
      });
      onUpdate();
    } catch (error) {
      alert('Error adding project');
    }
    setLoading(false);
  };

  const handleDeleteProject = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    const token = localStorage.getItem('authToken');
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/portfolio/projects/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Project deleted successfully!');
      onUpdate();
    } catch (error) {
      alert('Error deleting project');
    }
    setLoading(false);
  };

  const addTechnology = (type) => {
    if (!formData.techInput.trim()) return;
    const projectKey = `new${type.charAt(0).toUpperCase() + type.slice(1)}Project`;
    setFormData({
      ...formData,
      [projectKey]: {
        ...formData[projectKey],
        technologies: [...formData[projectKey].technologies, formData.techInput.trim()]
      },
      techInput: ''
    });
  };

  const removeTechnology = (type, index) => {
    const projectKey = `new${type.charAt(0).toUpperCase() + type.slice(1)}Project`;
    setFormData({
      ...formData,
      [projectKey]: {
        ...formData[projectKey],
        technologies: formData[projectKey].technologies.filter((_, i) => i !== index)
      }
    });
  };

  const handleEditProject = (type, project) => {
    setEditingProject({ type, id: project.id });
    setFormData({
      ...formData,
      editingProject: {
        title: project.title || '',
        description: project.description || '',
        technologies: [...(project.technologies || [])],
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || ''
      }
    });
    setEditTechInput('');
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({
      ...formData,
      editingProject: {
        title: '',
        description: '',
        technologies: [],
        githubUrl: '',
        liveUrl: ''
      }
    });
    setEditTechInput('');
  };

  const handleUpdateProject = async () => {
    if (!editingProject) return;
    
    const token = localStorage.getItem('authToken');
    const projectData = formData.editingProject;
    
    if (!projectData.title || !projectData.description) {
      alert('Please fill in title and description');
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${API_URL}/portfolio/projects/${editingProject.type}/${editingProject.id}`, projectData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`${editingProject.type === 'personal' ? 'Personal' : 'Company'} project updated successfully!`);
      handleCancelEdit();
      onUpdate();
    } catch (error) {
      alert('Error updating project');
    }
    setLoading(false);
  };

  const addEditTechnology = () => {
    if (!editTechInput.trim()) return;
    setFormData({
      ...formData,
      editingProject: {
        ...formData.editingProject,
        technologies: [...formData.editingProject.technologies, editTechInput.trim()]
      }
    });
    setEditTechInput('');
  };

  const removeEditTechnology = (index) => {
    setFormData({
      ...formData,
      editingProject: {
        ...formData.editingProject,
        technologies: formData.editingProject.technologies.filter((_, i) => i !== index)
      }
    });
  };

  // Skill Management Functions
  const handleAddSkill = async () => {
    if (!formData.newSkill.name || !formData.newSkill.description || !formData.newSkill.useCases) {
      alert('Please fill in skill name, description, and use cases');
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please login first');
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        name: formData.newSkill.name.trim(),
        description: formData.newSkill.description.trim(),
        useCases: formData.newSkill.useCases.trim(),
        bestPractices: Array.isArray(formData.newSkill.bestPractices) ? formData.newSkill.bestPractices : []
      };

      console.log('Sending request to:', `${API_URL}/portfolio/skills`);
      console.log('Request data:', requestData);
      
      const response = await axios.post(`${API_URL}/portfolio/skills`, requestData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response:', response.data);
      alert('Skill detail added successfully!');
      setFormData({
        ...formData,
        newSkill: {
          name: '',
          description: '',
          useCases: '',
          bestPractices: []
        },
        skillPracticeInput: ''
      });
      fetchSkillDetails();
      onUpdate();
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);
      
      let errorMessage = 'Unknown error';
      if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || 
                      error.response.data?.errors?.[0]?.msg || 
                      `Server error: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'No response from server. Please check if backend server is running on port 5000.';
      } else {
        errorMessage = error.message;
      }
      
      alert(`Error adding skill: ${errorMessage}`);
    }
    setLoading(false);
  };

  const handleEditSkill = (skillName) => {
    const skill = skillDetails[skillName];
    if (!skill) return;
    
    setEditingSkill(skillName);
    setFormData({
      ...formData,
      editingSkill: {
        name: skill.title || skillName,
        description: skill.description || '',
        useCases: skill.useCases || '',
        bestPractices: Array.isArray(skill.bestPractices) ? [...skill.bestPractices] : []
      },
      editSkillPracticeInput: ''
    });
  };

  const handleUpdateSkill = async () => {
    if (!editingSkill) return;
    
    if (!formData.editingSkill.description || !formData.editingSkill.useCases) {
      alert('Please fill in description and use cases');
      return;
    }

    const token = localStorage.getItem('authToken');
    setLoading(true);
    try {
      await axios.put(`${API_URL}/portfolio/skills/${editingSkill}`, formData.editingSkill, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Skill updated successfully!');
      setEditingSkill(null);
      setFormData({
        ...formData,
        editingSkill: {
          name: '',
          description: '',
          useCases: '',
          bestPractices: []
        },
        editSkillPracticeInput: ''
      });
      fetchSkillDetails();
      onUpdate();
    } catch (error) {
      alert('Error updating skill: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  const handleDeleteSkill = async (skillName) => {
    if (!window.confirm(`Are you sure you want to delete details for "${skillName}"?`)) return;

    const token = localStorage.getItem('authToken');
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/portfolio/skills/${skillName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Skill deleted successfully!');
      fetchSkillDetails();
      onUpdate();
    } catch (error) {
      alert('Error deleting skill: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  const handleCancelEditSkill = () => {
    setEditingSkill(null);
    setFormData({
      ...formData,
      editingSkill: {
        name: '',
        description: '',
        useCases: '',
        bestPractices: []
      },
      editSkillPracticeInput: ''
    });
  };

  const addSkillPractice = () => {
    if (!formData.skillPracticeInput.trim()) return;
    setFormData({
      ...formData,
      newSkill: {
        ...formData.newSkill,
        bestPractices: [...formData.newSkill.bestPractices, formData.skillPracticeInput.trim()]
      },
      skillPracticeInput: ''
    });
  };

  const removeSkillPractice = (index) => {
    setFormData({
      ...formData,
      newSkill: {
        ...formData.newSkill,
        bestPractices: formData.newSkill.bestPractices.filter((_, i) => i !== index)
      }
    });
  };

  const addEditSkillPractice = () => {
    if (!formData.editSkillPracticeInput.trim()) return;
    setFormData({
      ...formData,
      editingSkill: {
        ...formData.editingSkill,
        bestPractices: [...formData.editingSkill.bestPractices, formData.editSkillPracticeInput.trim()]
      },
      editSkillPracticeInput: ''
    });
  };

  const removeEditSkillPractice = (index) => {
    setFormData({
      ...formData,
      editingSkill: {
        ...formData.editingSkill,
        bestPractices: formData.editingSkill.bestPractices.filter((_, i) => i !== index)
      }
    });
  };

  // ReactQuill modules configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'align',
    'link'
  ];

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <motion.div
          className="login-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FiLock className="login-icon" />
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="login-hint">Default: username: admin, password: admin123</p>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut /> Logout
        </button>
      </div>

      <div className="admin-content">
        <motion.section
          className="admin-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>About Section</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.about.name || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  about: { ...formData.about, name: e.target.value }
                })}
              />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.about.title || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  about: { ...formData.about, title: e.target.value }
                })}
              />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={formData.about.description || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  about: { ...formData.about, description: e.target.value }
                })}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.about.email || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  about: { ...formData.about, email: e.target.value }
                })}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.about.location || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  about: { ...formData.about, location: e.target.value }
                })}
              />
            </div>
            <div className="form-group full-width">
              <label>Skills (comma separated)</label>
              <input
                type="text"
                placeholder="JavaScript, React, Node.js, Python"
                value={formData.about.skills ? formData.about.skills.join(', ') : ''}
                onChange={(e) => setFormData({
                  ...formData,
                  about: {
                    ...formData.about,
                    skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  }
                })}
              />
            </div>
          </div>
          <button onClick={handleAboutUpdate} disabled={loading} className="save-btn">
            <FiSave /> Save About Section
          </button>
        </motion.section>

        <motion.section
          className="admin-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2>Manage Skills & Technologies</h2>
          <p style={{ marginBottom: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
            Manage skill details for skills listed in the About section. Add Description, Use Cases, and Best Practices. 
            These details will be shown when users click on skills in the About section.
          </p>

          {!editingSkill ? (
            <>
              <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Add Skill Detail</h3>
              <p style={{ marginBottom: '1rem', color: '#666', fontSize: '0.85rem' }}>
                Select a skill from your About section list below, or type a new skill name. Add details that will show when users click on the skill.
              </p>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Skill Name * (Select from About section or type new)</label>
                  <select
                    value={formData.newSkill.name}
                    onChange={(e) => {
                      const selectedSkill = e.target.value;
                      if (selectedSkill && skillDetails[selectedSkill]) {
                        // If skill already has details, load them for editing
                        handleEditSkill(selectedSkill);
                      } else {
                        setFormData({
                          ...formData,
                          newSkill: { ...formData.newSkill, name: selectedSkill }
                        });
                      }
                    }}
                    onInput={(e) => {
                      // Allow custom input
                      if (!formData.about.skills?.includes(e.target.value)) {
                        setFormData({
                          ...formData,
                          newSkill: { ...formData.newSkill, name: e.target.value }
                        });
                      }
                    }}
                  >
                    <option value="">-- Select a skill from About section --</option>
                    {formData.about.skills && formData.about.skills.length > 0 ? (
                      formData.about.skills.map((skill, idx) => (
                        <option key={idx} value={skill}>
                          {skill} {skillDetails[skill] ? '✓ (has details)' : '(no details)'}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No skills in About section yet</option>
                    )}
                  </select>
                  <input
                    type="text"
                    value={formData.newSkill.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      newSkill: { ...formData.newSkill, name: e.target.value }
                    })}
                    placeholder="Or type skill name manually (e.g., Python, JavaScript, React)"
                    style={{ marginTop: '0.5rem' }}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Description *</label>
                  <textarea
                    value={formData.newSkill.description}
                    onChange={(e) => setFormData({
                      ...formData,
                      newSkill: { ...formData.newSkill, description: e.target.value }
                    })}
                    rows="4"
                    placeholder="Enter a detailed description of the skill/technology"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Use Cases *</label>
                  <textarea
                    value={formData.newSkill.useCases}
                    onChange={(e) => setFormData({
                      ...formData,
                      newSkill: { ...formData.newSkill, useCases: e.target.value }
                    })}
                    rows="3"
                    placeholder="e.g., Web Development, Data Science, Machine Learning, API Development"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Best Practices</label>
                  <div className="tech-input-group">
                    <input
                      type="text"
                      value={formData.skillPracticeInput}
                      onChange={(e) => setFormData({ ...formData, skillPracticeInput: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkillPractice();
                        }
                      }}
                      placeholder="Add best practice and press Enter"
                    />
                    <button type="button" onClick={addSkillPractice}>
                      <FiPlus />
                    </button>
                  </div>
                  <div className="tech-tags">
                    {formData.newSkill.bestPractices.map((practice, index) => (
                      <span key={index} className="tech-tag">
                        {practice}
                        <button onClick={() => removeSkillPractice(index)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={handleAddSkill} disabled={loading} className="add-btn">
                <FiPlus /> Add Skill Detail
              </button>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3>Edit Skill: {editingSkill}</h3>
                <button onClick={handleCancelEditSkill} className="cancel-btn">
                  <FiX /> Cancel
                </button>
              </div>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Description *</label>
                  <textarea
                    value={formData.editingSkill.description}
                    onChange={(e) => setFormData({
                      ...formData,
                      editingSkill: { ...formData.editingSkill, description: e.target.value }
                    })}
                    rows="4"
                    placeholder="Enter a detailed description of the skill/technology"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Use Cases *</label>
                  <textarea
                    value={formData.editingSkill.useCases}
                    onChange={(e) => setFormData({
                      ...formData,
                      editingSkill: { ...formData.editingSkill, useCases: e.target.value }
                    })}
                    rows="3"
                    placeholder="e.g., Web Development, Data Science, Machine Learning, API Development"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Best Practices</label>
                  <div className="tech-input-group">
                    <input
                      type="text"
                      value={formData.editSkillPracticeInput}
                      onChange={(e) => setFormData({ ...formData, editSkillPracticeInput: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addEditSkillPractice();
                        }
                      }}
                      placeholder="Add best practice and press Enter"
                    />
                    <button type="button" onClick={addEditSkillPractice}>
                      <FiPlus />
                    </button>
                  </div>
                  <div className="tech-tags">
                    {formData.editingSkill.bestPractices.map((practice, index) => (
                      <span key={index} className="tech-tag">
                        {practice}
                        <button onClick={() => removeEditSkillPractice(index)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={handleUpdateSkill} disabled={loading} className="save-btn">
                <FiSave /> Update Skill Detail
              </button>
            </>
          )}

          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>
              Skills from About Section ({formData.about.skills?.length || 0})
            </h3>
            {formData.about.skills && formData.about.skills.length > 0 ? (
              <div className="projects-list">
                {formData.about.skills.map((skillName, idx) => {
                  const hasDetails = skillDetails[skillName];
                  return (
                    <div key={idx} className="project-item">
                      <div>
                        <strong>{skillName}</strong>
                        {hasDetails ? (
                          <>
                            <span style={{ marginLeft: '0.5rem', color: '#10b981', fontSize: '0.85rem' }}>✓ Details Added</span>
                            <div style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                              {skillDetails[skillName].description?.substring(0, 100)}...
                            </div>
                          </>
                        ) : (
                          <span style={{ marginLeft: '0.5rem', color: '#ef4444', fontSize: '0.85rem' }}>⚠ No details yet</span>
                        )}
                      </div>
                      <div className="project-actions">
                        <button
                          onClick={() => hasDetails ? handleEditSkill(skillName) : setFormData({
                            ...formData,
                            newSkill: { ...formData.newSkill, name: skillName, description: '', useCases: '', bestPractices: [] },
                            skillPracticeInput: ''
                          })}
                          className="edit-btn"
                          disabled={!!editingSkill}
                          title={hasDetails ? 'Edit details' : 'Add details'}
                        >
                          <FiEdit2 />
                        </button>
                        {hasDetails && (
                          <button
                            onClick={() => handleDeleteSkill(skillName)}
                            className="delete-btn"
                            disabled={!!editingSkill}
                            title="Delete details"
                          >
                            <FiTrash2 />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: '#666', fontStyle: 'italic' }}>
                No skills in About section. Please add skills in the "About Section" above first.
              </p>
            )}
          </div>
          
          {Object.keys(skillDetails).filter(skill => !formData.about.skills?.includes(skill)).length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#ef4444' }}>
                Orphaned Skill Details (not in About section)
              </h3>
              <div className="projects-list">
                {Object.keys(skillDetails).filter(skill => !formData.about.skills?.includes(skill)).map((skillName) => (
                  <div key={skillName} className="project-item">
                    <div>
                      <strong>{skillName}</strong>
                      <div style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                        {skillDetails[skillName].description?.substring(0, 100)}...
                      </div>
                    </div>
                    <div className="project-actions">
                      <button
                        onClick={() => handleEditSkill(skillName)}
                        className="edit-btn"
                        disabled={editingSkill === skillName}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skillName)}
                        className="delete-btn"
                        disabled={!!editingSkill}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.section>

        <motion.section
          className="admin-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Add Personal Project</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Title</label>
              <input
                type="text"
                value={formData.newPersonalProject.title}
                onChange={(e) => setFormData({
                  ...formData,
                  newPersonalProject: { ...formData.newPersonalProject, title: e.target.value }
                })}
              />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <ReactQuill
                theme="snow"
                value={formData.newPersonalProject.description}
                onChange={(value) => setFormData({
                  ...formData,
                  newPersonalProject: { ...formData.newPersonalProject, description: value }
                })}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter project description (supports rich text formatting)"
              />
            </div>
            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                value={formData.newPersonalProject.githubUrl}
                onChange={(e) => setFormData({
                  ...formData,
                  newPersonalProject: { ...formData.newPersonalProject, githubUrl: e.target.value }
                })}
              />
            </div>
            <div className="form-group">
              <label>Live URL</label>
              <input
                type="url"
                value={formData.newPersonalProject.liveUrl}
                onChange={(e) => setFormData({
                  ...formData,
                  newPersonalProject: { ...formData.newPersonalProject, liveUrl: e.target.value }
                })}
              />
            </div>
            <div className="form-group full-width">
              <label>Technologies</label>
              <div className="tech-input-group">
                <input
                  type="text"
                  value={formData.techInput}
                  onChange={(e) => setFormData({ ...formData, techInput: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology('personal');
                    }
                  }}
                  placeholder="Add technology and press Enter"
                />
                <button type="button" onClick={() => addTechnology('personal')}>
                  <FiPlus />
                </button>
              </div>
              <div className="tech-tags">
                {formData.newPersonalProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                    <button onClick={() => removeTechnology('personal', index)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => handleAddProject('personal')} disabled={loading} className="add-btn">
            <FiPlus /> Add Personal Project
          </button>
        </motion.section>

        <motion.section
          className="admin-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2>Add Company Project</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Title</label>
              <input
                type="text"
                value={formData.newCompanyProject.title}
                onChange={(e) => setFormData({
                  ...formData,
                  newCompanyProject: { ...formData.newCompanyProject, title: e.target.value }
                })}
              />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <ReactQuill
                theme="snow"
                value={formData.newCompanyProject.description}
                onChange={(value) => setFormData({
                  ...formData,
                  newCompanyProject: { ...formData.newCompanyProject, description: value }
                })}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Enter project description (supports rich text formatting)"
              />
            </div>
            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                value={formData.newCompanyProject.githubUrl}
                onChange={(e) => setFormData({
                  ...formData,
                  newCompanyProject: { ...formData.newCompanyProject, githubUrl: e.target.value }
                })}
              />
            </div>
            <div className="form-group">
              <label>Live URL</label>
              <input
                type="url"
                value={formData.newCompanyProject.liveUrl}
                onChange={(e) => setFormData({
                  ...formData,
                  newCompanyProject: { ...formData.newCompanyProject, liveUrl: e.target.value }
                })}
              />
            </div>
            <div className="form-group full-width">
              <label>Technologies</label>
              <div className="tech-input-group">
                <input
                  type="text"
                  value={formData.techInput}
                  onChange={(e) => setFormData({ ...formData, techInput: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology('company');
                    }
                  }}
                  placeholder="Add technology and press Enter"
                />
                <button type="button" onClick={() => addTechnology('company')}>
                  <FiPlus />
                </button>
              </div>
              <div className="tech-tags">
                {formData.newCompanyProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                    <button onClick={() => removeTechnology('company', index)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => handleAddProject('company')} disabled={loading} className="add-btn">
            <FiPlus /> Add Company Project
          </button>
        </motion.section>

        {editingProject && (
          <motion.section
            className="admin-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2>Edit {editingProject.type === 'personal' ? 'Personal' : 'Company'} Project</h2>
              <button onClick={handleCancelEdit} className="cancel-btn">
                <FiX /> Cancel
              </button>
            </div>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.editingProject.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    editingProject: { ...formData.editingProject, title: e.target.value }
                  })}
                />
              </div>
              <div className="form-group full-width">
                <label>Description</label>
                <ReactQuill
                  theme="snow"
                  value={formData.editingProject.description}
                  onChange={(value) => setFormData({
                    ...formData,
                    editingProject: { ...formData.editingProject, description: value }
                  })}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Enter project description (supports rich text formatting)"
                />
              </div>
              <div className="form-group">
                <label>GitHub URL</label>
                <input
                  type="url"
                  value={formData.editingProject.githubUrl}
                  onChange={(e) => setFormData({
                    ...formData,
                    editingProject: { ...formData.editingProject, githubUrl: e.target.value }
                  })}
                />
              </div>
              <div className="form-group">
                <label>Live URL</label>
                <input
                  type="url"
                  value={formData.editingProject.liveUrl}
                  onChange={(e) => setFormData({
                    ...formData,
                    editingProject: { ...formData.editingProject, liveUrl: e.target.value }
                  })}
                />
              </div>
              <div className="form-group full-width">
                <label>Technologies</label>
                <div className="tech-input-group">
                  <input
                    type="text"
                    value={editTechInput}
                    onChange={(e) => setEditTechInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addEditTechnology();
                      }
                    }}
                    placeholder="Add technology and press Enter"
                  />
                  <button type="button" onClick={addEditTechnology}>
                    <FiPlus />
                  </button>
                </div>
                <div className="tech-tags">
                  {formData.editingProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                      <button onClick={() => removeEditTechnology(index)}>×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleUpdateProject} disabled={loading} className="save-btn">
              <FiSave /> Update Project
            </button>
          </motion.section>
        )}

        <motion.section
          className="admin-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2>Manage Projects</h2>
          <div className="projects-list">
            <div className="projects-category">
              <h3>Personal Projects ({portfolioData?.personalProjects?.length || 0})</h3>
              {portfolioData?.personalProjects?.map((project) => (
                <div key={project.id} className="project-item">
                  <div>
                    <strong>{project.title}</strong>
                    <div 
                      className="project-description-preview" 
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  </div>
                  <div className="project-actions">
                    <button
                      onClick={() => handleEditProject('personal', project)}
                      className="edit-btn"
                      disabled={editingProject?.id === project.id}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteProject('personal', project.id)}
                      className="delete-btn"
                      disabled={!!editingProject}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="projects-category">
              <h3>Company Projects ({portfolioData?.companyProjects?.length || 0})</h3>
              {portfolioData?.companyProjects?.map((project) => (
                <div key={project.id} className="project-item">
                  <div>
                    <strong>{project.title}</strong>
                    <div 
                      className="project-description-preview" 
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />
                  </div>
                  <div className="project-actions">
                    <button
                      onClick={() => handleEditProject('company', project)}
                      className="edit-btn"
                      disabled={editingProject?.id === project.id}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDeleteProject('company', project.id)}
                      className="delete-btn"
                      disabled={!!editingProject}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Admin;


