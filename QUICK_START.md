# Quick Start Guide

## Installation Steps

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```bash
# Windows PowerShell
Copy-Item env.example.txt .env

# Or manually create .env with:
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Start backend:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### 2. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
npm start
```

### 3. Access the Website

- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
  - Username: `admin`
  - Password: `admin123`

## Next Steps

1. Go to Admin Panel and update your information
2. Add your personal projects
3. Add your company projects
4. Customize colors and styling in `frontend/src/index.css`

That's it! Your portfolio website is ready! 🎉



