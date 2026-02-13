# Personal Portfolio Website

A modern, secure, and fully functional portfolio website with both frontend and backend. This website allows you to showcase your personal projects, company projects, and information about yourself.

## Features

✨ **Modern UI/UX Design**
- Beautiful, responsive design with smooth animations
- Mobile-friendly layout
- Modern gradient themes and glassmorphism effects

🔒 **Security Features**
- JWT-based authentication for admin panel
- Rate limiting to prevent abuse
- Helmet.js for security headers
- Input validation and sanitization
- CORS protection

🎨 **Frontend Features**
- React-based single-page application
- Smooth scroll navigation
- Project showcase with tabs (Personal & Company)
- Contact form
- Admin panel for content management

⚙️ **Backend Features**
- RESTful API with Express.js
- JWT authentication
- File-based data storage (easily upgradeable to database)
- Protected routes for admin operations
- Error handling and logging

## Project Structure

```
Apni_website/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── portfolio.js     # Portfolio CRUD operations
│   ├── data/
│   │   └── portfolio.json   # Data storage (auto-created)
│   ├── server.js            # Main server file
│   ├── package.json
│   └── .env.example         # Environment variables template
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.js     # About section
│   │   │   ├── Admin.js     # Admin panel
│   │   │   ├── Contact.js   # Contact form
│   │   │   ├── Hero.js      # Hero section
│   │   │   ├── Navbar.js    # Navigation
│   │   │   ├── Projects.js  # Projects showcase
│   │   │   └── Loading.js   # Loading component
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
# Windows PowerShell
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

4. Edit `.env` file and set your configuration:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Aman_Backend@123
```

5. Start the backend server:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, for custom API URL):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

### Viewing Your Portfolio

1. Open `http://localhost:3000` in your browser
2. Navigate through different sections:
   - **Hero Section**: Introduction
   - **About**: Your information and skills
   - **Projects**: Personal and company projects
   - **Contact**: Contact form and information

### Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Login with default credentials:
   - **Username**: `admin`
   - **Password**: `Aman_Backend@123`

⚠️ **Important**: Change these credentials in production!

3. In the admin panel, you can:
   - Update your about section (name, title, description, skills, etc.)
   - Add personal projects
   - Add company projects
   - Delete projects

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `Aman_Backend@123`

**Change these immediately in production!**

To change the admin password:
1. Go to `backend/routes/auth.js`
2. Update the `ADMIN_PASSWORD` or hash a new password using bcrypt

## Security Features

- ✅ JWT token authentication
- ✅ Rate limiting (100 requests per 15 minutes per IP)
- ✅ Helmet.js security headers
- ✅ Input validation
- ✅ CORS protection
- ✅ Password hashing (bcrypt)

## Technologies Used

### Frontend
- React 18
- React Router
- Framer Motion (animations)
- Axios (API calls)
- React Icons

### Backend
- Node.js
- Express.js
- JWT (authentication)
- Bcrypt (password hashing)
- Helmet (security)
- Express Rate Limit
- Express Validator

## Customization

### Change Colors

Edit `frontend/src/index.css` to change the color scheme:
```css
:root {
  --primary-color: #6366f1;    /* Your primary color */
  --secondary-color: #8b5cf6;  /* Your secondary color */
  /* ... */
}
```

### Change Fonts

Update the Google Fonts link in `frontend/public/index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

### Add More Sections

1. Create a new component in `frontend/src/components/`
2. Add it to `frontend/src/App.js`
3. Create corresponding API routes in `backend/routes/portfolio.js` if needed

## Deployment

### Backend Deployment

1. Set `NODE_ENV=production` in your `.env` file
2. Change `JWT_SECRET` to a strong random string
3. Update `FRONTEND_URL` to your frontend domain
4. Deploy to services like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS EC2

### Frontend Deployment

1. Build the production version:
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Image upload for projects
- [ ] Blog section
- [ ] Email notifications for contact form
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Multi-language support

## Troubleshooting

### Port already in use
If port 5000 or 3000 is already in use:
- Backend: Change `PORT` in `.env`
- Frontend: Set `PORT=3001` in environment variables

### CORS errors
Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL

### Authentication not working
- Check JWT_SECRET is set in backend `.env`
- Verify token is being stored in browser localStorage
- Check browser console for errors

## License

This project is open source and available for personal use.

## Support

For issues or questions, please check the code comments or create an issue in the repository.

---

Made with ❤️ for your portfolio



