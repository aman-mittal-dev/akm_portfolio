# Setup Guide (Hindi) - Python Developer Ke Liye

## Important Note
Yeh **Java project nahi hai** - yeh **Node.js (JavaScript)** project hai. Python ki tarah hi easy hai!

## Prerequisites Check Karein

### 1. Node.js Install Hai Ya Nahi?
Terminal/PowerShell mein yeh command run karein:
```bash
node --version
npm --version
```

Agar version number aata hai (jaise `v18.0.0`), to Node.js already installed hai! ✅

### 2. Agar Node.js Install Nahi Hai:
- **Download**: https://nodejs.org/ 
- **LTS version download karein** (recommended)
- Install karein (sab default options select karein)
- Computer restart karein
- Phir se `node --version` check karein

---

## Installation Steps (Step-by-Step)

### STEP 1: Backend Setup

#### 1.1 Terminal Mein Backend Folder Mein Jaayein
```bash
cd backend
```

#### 1.2 Dependencies Install Karein
Python mein `pip install` hota hai, yahan `npm install` hai:
```bash
npm install
```
**Time lag sakta hai** (2-5 minutes) - sabar karein. Jab "added X packages" dikhe, to successful hai!

#### 1.3 Environment File Banao

**Windows PowerShell mein:**
```powershell
Copy-Item env.example.txt .env
```

**Ya manually banao:**
1. `backend` folder mein `env.example.txt` file kholo
2. Copy karo sab content
3. Nayi file banao `.env` naam se (dot se start)
4. Content paste karo

`.env` file mein yeh hona chahiye:
```
PORT=5000
JWT_SECRET=my-super-secret-key-12345
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

#### 1.4 Backend Server Start Karein
```bash
npm start
```

**Success dikhna chahiye:**
```
🚀 Server running on port 5000
📍 Environment: development
```

⚠️ **Terminal ko open rakhein** - server chal raha hai background mein!

---

### STEP 2: Frontend Setup (Nayi Terminal Mein)

#### 2.1 NAYI Terminal/Command Prompt Kholein
**Important**: Pehli terminal ko close mat karo (backend chal raha hai wahan)

#### 2.2 Frontend Folder Mein Jaayein
```bash
cd frontend
```
(Backend wali terminal nahi, NAYI terminal!)

#### 2.3 Dependencies Install Karein
```bash
npm install
```
Phir se time lagega (3-5 minutes).

#### 2.4 Frontend Start Karein
```bash
npm start
```

**Automatic browser khul jayega** `http://localhost:3000` par!

---

## Website Access Karne Ke Liye

### Main Website:
- Browser mein jao: **http://localhost:3000**
- Yahan apna portfolio dikh raha hoga

### Admin Panel (Content Edit Karne Ke Liye):
- Browser mein jao: **http://localhost:3000/admin**
- Login karein:
  - **Username**: `admin`
  - **Password**: `admin123`

---

## Common Issues & Solutions

### Issue 1: "node command not found"
**Solution**: Node.js install nahi hai
- https://nodejs.org/ se install karein
- Computer restart karein

### Issue 2: Port Already in Use (Error: EADDRINUSE)
**Backend port conflict:**
- `.env` file mein `PORT=5001` (5000 ki jagah) karein

**Frontend port conflict:**
- Terminal mein `set PORT=3001` (Windows) ya `export PORT=3001` (Mac/Linux)
- Phir `npm start` karein

### Issue 3: npm install mein error
**Solution:**
```bash
# Cache clear karein
npm cache clean --force

# Phir se try karein
npm install
```

### Issue 4: Module not found errors
**Solution:**
- Ensure aap correct folder mein ho (`backend` ya `frontend`)
- `node_modules` folder delete karo
- `npm install` phir se run karo

---

## Development Workflow

### Normal Use:
1. **Backend terminal** - `npm start` (chal raha hai)
2. **Frontend terminal** - `npm start` (chal raha hai)
3. **Browser** - http://localhost:3000

### Code Edit Karne Ke Baad:
- **Frontend**: Auto-reload hota hai (save karo, browser update hoga)
- **Backend**: Agar `npm run dev` use kiya, to auto-reload hoga
  - Ya manually restart: `Ctrl+C` press karo, phir `npm start`

### Stop Karne Ke Liye:
- Dono terminals mein `Ctrl+C` press karo

---

## Python vs Node.js Comparison (Easy Understanding)

| Python | Node.js (Yeh Project) |
|--------|----------------------|
| `pip install package` | `npm install package` |
| `python app.py` | `node server.js` |
| `python -m venv venv` | `npm install` (auto handles) |
| `pip freeze > requirements.txt` | `package.json` (auto maintained) |
| Virtual environment | `node_modules` folder |

---

## First Time Setup Summary

```bash
# Terminal 1 - Backend
cd backend
npm install
# .env file banao (steps above)
npm start

# Terminal 2 - Frontend (NAYI TERMINAL)
cd frontend
npm install
npm start

# Browser mein:
# http://localhost:3000 - Main website
# http://localhost:3000/admin - Admin panel
```

---

## Help Chahiye?

Agar koi error aaye:
1. **Error message ko full copy karein**
2. **Terminal output screenshot lo**
3. **Konsi step mein error aaya** batao

Python developer ho to bilkul easy hai - Node.js bhi similar hi hai! 🚀



