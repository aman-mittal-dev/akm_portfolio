import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode, FiBriefcase, FiX } from 'react-icons/fi';
import './Projects.css';

const Projects = ({ personalProjects, companyProjects }) => {
  // Combine company + personal projects so they show together
  const allProjects = [
    ...(companyProjects || []).map((project) => ({ ...project, _type: 'company' })),
    ...(personalProjects || []).map((project) => ({ ...project, _type: 'personal' })),
  ];

  const [expandedProject, setExpandedProject] = useState(null);

  // Function to truncate HTML description
  const truncateDescription = (html, maxLength = 150) => {
    if (!html) return '';
    // Remove HTML tags for length calculation
    const text = html.replace(/<[^>]*>/g, '');
    if (text.length <= maxLength) return html;
    // Find a good breaking point
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    const cutPoint = lastSpace > 0 ? lastSpace : maxLength;
    return text.substring(0, cutPoint) + '...';
  };

  const ProjectCard = ({ project, type }) => {
    const isExpanded = expandedProject === project.id;
    const truncatedDesc = truncateDescription(project.description);
    const fullDesc = project.description;

    return (
      <>
        <motion.div
          className="project-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <div className="project-header">
            <div className="project-icon">
              {type === 'personal' ? <FiCode /> : <FiBriefcase />}
            </div>
            <div className="project-links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FiGithub />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                  <FiExternalLink />
                </a>
              )}
            </div>
          </div>
          <h3 className="project-title">
            {project.title}
            <span className="project-type-label">
              {type === 'personal' ? 'Personal Project' : 'Company Project'}
            </span>
          </h3>
          <div 
            className="project-description" 
            dangerouslySetInnerHTML={{ __html: truncatedDesc }}
          />
          {project.technologies && project.technologies.length > 0 && (
            <div className="project-tech">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
              {project.technologies.length > 4 && (
                <span className="tech-tag">+{project.technologies.length - 4}</span>
              )}
            </div>
          )}
          <button 
            className="view-more-btn"
            onClick={() => setExpandedProject(project.id)}
          >
            View More Details
          </button>
        </motion.div>

        {/* Modal for full description */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="project-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedProject(null)}
            >
              <motion.div
                className="project-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h2>{project.title}</h2>
                  <button 
                    className="modal-close-btn"
                    onClick={() => setExpandedProject(null)}
                    aria-label="Close"
                  >
                    <FiX />
                  </button>
                </div>
                <div className="modal-content">
                  <div className="modal-links">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <FiGithub /> GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <FiExternalLink /> Live Demo
                      </a>
                    )}
                  </div>
                  <div 
                    className="modal-description" 
                    dangerouslySetInnerHTML={{ __html: fullDesc }}
                  />
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="modal-tech">
                      <h4>Technologies Used:</h4>
                      <div className="project-tech">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return (
    <section className="projects" id="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Work Experience & Projects</h2>
          <p className="section-subtitle">
            Company projects and personal projects shown together
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {allProjects.length > 0 ? (
            allProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                type={project._type}
              />
            ))
          ) : (
            <div className="no-projects">
              <FiBriefcase className="no-projects-icon" />
              <p>No projects added yet. Add some in the admin panel!</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;








