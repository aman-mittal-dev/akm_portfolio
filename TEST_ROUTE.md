# Testing Skills Route

## Steps to Fix "Route not found" Error:

1. **Make sure backend server is running:**
   - Open terminal in `backend` folder
   - Run: `npm start` or `node server.js`
   - Should see: "🚀 Server running on port 5000"

2. **Check if route is accessible:**
   - Open browser and go to: `http://localhost:5000/api/portfolio/skills`
   - Should return: `{}` (empty object if no skills)

3. **Verify frontend can connect:**
   - Check browser console (F12) for any CORS errors
   - Check Network tab to see the actual request being made

4. **Common Issues:**
   - Backend server not running → Start it
   - Port 5000 already in use → Change PORT in .env
   - CORS error → Check backend CORS settings
   - Authentication token expired → Login again

## Route Structure:
- POST `/api/portfolio/skills` - Add skill detail (Protected)
- GET `/api/portfolio/skills` - Get all skill details (Public)
- GET `/api/portfolio/skills/:skillName` - Get specific skill (Public)
- PUT `/api/portfolio/skills/:skillName` - Update skill (Protected)
- DELETE `/api/portfolio/skills/:skillName` - Delete skill (Protected)
