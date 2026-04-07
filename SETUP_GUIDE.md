# Setup Guide - For Python Developers

## Important Note
This is **not a Java project** — this is a **Node.js (JavaScript)** project. It is just as easy as Python!

## Check Prerequisites

### 1. Is Node.js Installed?
Run these commands in your Terminal/PowerShell:
```bash
node --version
npm --version
```

If a version number appears (e.g., `v18.0.0`), then Node.js is already installed! ✅

### 2. If Node.js Is Not Installed:
- **Download**: https://nodejs.org/
- **Download the LTS version** (recommended)
- Install it (select all default options)
- Restart your computer
- Check `node --version` again

---

## Installation Steps (Step-by-Step)

### STEP 1: Backend Setup

#### 1.1 Navigate to the Backend Folder in the Terminal
```bash
cd backend
```

#### 1.2 Install Dependencies
Just as you use `pip install` in Python, here you use `npm install`:
```bash
npm install
```
**This may take some time** (2-5 minutes) — please be patient. Once you see "added X packages," the installation was successful! #### 1.3 Create Environment File

**In Windows PowerShell:**
```powershell
Copy-Item env.example.txt .env
```

**Or create it manually:**
1. Open the `env.example.txt` file located in the `backend` folder.
2. Copy all of its contents.
3. Create a new file named `.env` (starting with a dot).
4. Paste the contents into it.

The `.env` file should contain the following:
```
PORT=5000
JWT_SECRET=my-super-secret-key-12345
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_USERNAME=aman.mittal.backend@gmail.com
ADMIN_PASSWORD=Aman_Backend@123
```

#### 1.4 Start the Backend Server
```bash
npm start
```

**You should see a success message:**
```
🚀 Server running on port 5000
📍 Environment: development
```

⚠️ **Keep the terminal open** — the server is running in the background!

---

### STEP 2: Frontend Setup (In a New Terminal)

#### 2.1 Open a NEW Terminal/Command Prompt
**Important:** Do not close the first terminal (the backend is running there).

#### 2.2 Navigate to the Frontend Folder
```bash
cd frontend
```
(Not the backend terminal—the NEW terminal!)

#### 2.3 Install Dependencies
```bash
npm install
```
This will take some time again (3–5 minutes).

#### 2.4 Start the Frontend
```bash
npm start
```

**A browser window will open automatically** at `http://localhost:3000`! ---

## Accessing the Website

### Main Website:
- Go to your browser: **http://localhost:3000**
- Your portfolio should be visible here.

### Admin Panel (To Edit Content):
- Go to your browser: **http://localhost:3000/admin**
- Log in:
- **Username**: `admin`
- **Password**: `Aman_Backend@123`

---

## Common Issues & Solutions

### Issue 1: "node command not found"
**Solution**: Node.js is not installed.
- Install it from https://nodejs.org/
- Restart your computer.

### Issue 2: Port Already in Use (Error: EADDRINUSE)
**Backend port conflict:**
- Change `PORT=5001` (instead of 5000) in the `.env` file.

**Frontend port conflict:**
- In the terminal, run `set PORT=3001` (Windows) or `export PORT=3001` (Mac/Linux).
- Then run `npm start`.

### Issue 3: Error during `npm install`
**Solution:**
```bash
# Clear the cache
npm cache clean --force

# Try again
npm install
```

### Issue 4: "Module not found" errors
**Solution:**
- Ensure you are in the correct folder (`backend` or `frontend`).
- Delete the `node_modules` folder.
- Run `npm install` again.

---

## Development Workflow

### Normal Use:
1. **Backend terminal** - `npm start` (running)
2. **Frontend terminal** - `npm start` (running)
3. **Browser** - http://localhost:3000

### After Editing Code:
- **Frontend**: Auto-reloads (save your changes, and the browser will update).
- **Backend**: If you used `npm run dev`, it will auto-reload.
- Otherwise, restart manually: Press `Ctrl+C`, then run `npm start`.

### To Stop:
- By pressing `Ctrl+C` in both terminals

---

## Python vs Node.js Comparison (Easy Understanding)

| Python Node.js (Yeh Project)
|-------|---------|
| `pip install package` | `npm install package` |
| `python app.py` | `node server.js` |
| `python -m venv venv` | `npm install` (auto handles) |
| `pip freeze > requirements.txt` | `package.json` (auto maintained) |
| Virtual environment `node_modules` folder |

---

## First Time Setup Summary

```bash
# Terminal 1 - Backend
cd backend
npm install
# create .env file (steps above)
npm start

# Terminal 2 - Frontend (NAI TERMINAL)
cd frontend
npm install
npm start

# in browser:
# http://localhost:3000 - Main website
# http://localhost:3000/admin - Admin panel
```

---

## Help needed?

If any error occurs:
1. **Make a full copy of the error message**
2. **Terminal output screenshot lo**
3. **Tell me in which step the error occurred**

It is absolutely easy to become a Python developer - Node.js is also similar! 🚀