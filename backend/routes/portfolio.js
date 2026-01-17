const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/portfolio.json');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Read portfolio data
async function readPortfolioData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Return default structure if file doesn't exist
    return {
      about: {
        name: "Your Name",
        title: "Full Stack Developer",
        description: "Passionate developer with expertise in web technologies",
        email: "your.email@example.com",
        location: "Your Location",
        skills: ["JavaScript", "React", "Node.js", "Python"],
        socialLinks: {
          github: "https://github.com/yourusername",
          linkedin: "https://linkedin.com/in/yourusername",
          twitter: "https://twitter.com/yourusername"
        }
      },
      skillDetails: {},
      personalProjects: [],
      companyProjects: []
    };
  }
}

// Write portfolio data
async function writePortfolioData(data) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET - Public endpoint to get all portfolio data
router.get('/', async (req, res) => {
  try {
    const data = await readPortfolioData();
    res.json(data);
  } catch (error) {
    console.error('Error reading portfolio:', error);
    res.status(500).json({ message: 'Error fetching portfolio data' });
  }
});

// GET - Get about section
router.get('/about', async (req, res) => {
  try {
    const data = await readPortfolioData();
    res.json(data.about);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching about data' });
  }
});

// GET - Get personal projects
router.get('/projects/personal', async (req, res) => {
  try {
    const data = await readPortfolioData();
    res.json(data.personalProjects || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching personal projects' });
  }
});

// GET - Get company projects
router.get('/projects/company', async (req, res) => {
  try {
    const data = await readPortfolioData();
    res.json(data.companyProjects || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching company projects' });
  }
});

// POST - Update about section (Protected)
router.post('/about', authenticateToken, [
  body('name').optional().trim().notEmpty(),
  body('title').optional().trim().notEmpty(),
  body('email').optional().isEmail(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await readPortfolioData();
    data.about = { ...data.about, ...req.body };
    await writePortfolioData(data);
    res.json({ message: 'About section updated successfully', data: data.about });
  } catch (error) {
    res.status(500).json({ message: 'Error updating about section' });
  }
});

// POST - Add personal project (Protected)
router.post('/projects/personal', authenticateToken, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await readPortfolioData();
    if (!data.personalProjects) data.personalProjects = [];
    
    const newProject = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    data.personalProjects.push(newProject);
    await writePortfolioData(data);
    res.json({ message: 'Personal project added successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Error adding personal project' });
  }
});

// POST - Add company project (Protected)
router.post('/projects/company', authenticateToken, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await readPortfolioData();
    if (!data.companyProjects) data.companyProjects = [];
    
    const newProject = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    data.companyProjects.push(newProject);
    await writePortfolioData(data);
    res.json({ message: 'Company project added successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Error adding company project' });
  }
});

// PUT - Update project (Protected)
router.put('/projects/:type/:id', authenticateToken, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('technologies').isArray().withMessage('Technologies must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, id } = req.params;
    
    if (type !== 'personal' && type !== 'company') {
      return res.status(400).json({ message: 'Invalid project type' });
    }

    const data = await readPortfolioData();
    const projectArray = type === 'personal' ? data.personalProjects : data.companyProjects;
    
    const index = projectArray.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project while preserving id and createdAt
    projectArray[index] = {
      ...projectArray[index],
      ...req.body,
      id: projectArray[index].id,
      createdAt: projectArray[index].createdAt,
      updatedAt: new Date().toISOString()
    };

    await writePortfolioData(data);
    res.json({ message: 'Project updated successfully', project: projectArray[index] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
});

// DELETE - Delete project (Protected)
router.delete('/projects/:type/:id', authenticateToken, async (req, res) => {
  try {
    const { type, id } = req.params;
    
    if (type !== 'personal' && type !== 'company') {
      return res.status(400).json({ message: 'Invalid project type' });
    }

    const data = await readPortfolioData();
    const projectArray = type === 'personal' ? data.personalProjects : data.companyProjects;
    
    const index = projectArray.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    projectArray.splice(index, 1);
    await writePortfolioData(data);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
});

// POST - Add or update skill detail (Protected) - MUST BE BEFORE /skills/:skillName
router.post('/skills', authenticateToken, [
  body('name').trim().notEmpty().withMessage('Skill name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('useCases').trim().notEmpty().withMessage('Use cases are required'),
  body('bestPractices').optional().isArray().withMessage('Best practices must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: errors.array() 
      });
    }

    const data = await readPortfolioData();
    if (!data.skillDetails) data.skillDetails = {};
    
    const { name, description, useCases, bestPractices } = req.body;
    if (!name || !description || !useCases) {
      return res.status(400).json({ message: 'Name, description, and use cases are required' });
    }
    
    const skillName = name.trim();
    
    data.skillDetails[skillName] = {
      title: skillName,
      description: description.trim(),
      useCases: useCases.trim(),
      bestPractices: Array.isArray(bestPractices) ? bestPractices : []
    };
    
    await writePortfolioData(data);
    res.json({ message: 'Skill detail saved successfully', skill: data.skillDetails[skillName] });
  } catch (error) {
    console.error('Error saving skill detail:', error);
    res.status(500).json({ message: 'Error saving skill detail: ' + error.message });
  }
});

// GET - Get all skill details (Public) - MUST BE AFTER POST
router.get('/skills', async (req, res) => {
  try {
    const data = await readPortfolioData();
    res.json(data.skillDetails || {});
  } catch (error) {
    console.error('Error fetching skill details:', error);
    res.status(500).json({ message: 'Error fetching skill details' });
  }
});

// GET - Get specific skill detail (Public)
router.get('/skills/:skillName', async (req, res) => {
  try {
    const { skillName } = req.params;
    const data = await readPortfolioData();
    const skillDetails = data.skillDetails || {};
    const skill = skillDetails[skillName];
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    
    res.json(skill);
  } catch (error) {
    console.error('Error fetching skill detail:', error);
    res.status(500).json({ message: 'Error fetching skill detail' });
  }
});

// PUT - Update skill detail (Protected)
router.put('/skills/:skillName', authenticateToken, [
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('useCases').trim().notEmpty().withMessage('Use cases are required'),
  body('bestPractices').isArray().withMessage('Best practices must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { skillName } = req.params;
    const data = await readPortfolioData();
    
    if (!data.skillDetails) {
      data.skillDetails = {};
    }
    
    if (!data.skillDetails[skillName]) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    const { description, useCases, bestPractices } = req.body;
    
    data.skillDetails[skillName] = {
      ...data.skillDetails[skillName],
      description: description.trim(),
      useCases: useCases.trim(),
      bestPractices: Array.isArray(bestPractices) ? bestPractices : []
    };
    
    await writePortfolioData(data);
    res.json({ message: 'Skill detail updated successfully', skill: data.skillDetails[skillName] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating skill detail' });
  }
});

// DELETE - Delete skill detail (Protected)
router.delete('/skills/:skillName', authenticateToken, async (req, res) => {
  try {
    const { skillName } = req.params;
    const data = await readPortfolioData();
    
    if (!data.skillDetails || !data.skillDetails[skillName]) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    delete data.skillDetails[skillName];
    await writePortfolioData(data);
    res.json({ message: 'Skill detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting skill detail' });
  }
});

module.exports = router;



