# Guide to Installing Node.js

## Step 1: Download Node.js

1. Open the website: **https://nodejs.org/**
2. Download the **LTS version** (located on the left side – recommended)
- LTS = Long Term Support (stable version)
3. An `.msi` file will be downloaded (for Windows)

## Step 2: Install

1. Run the downloaded file
2. Keep clicking the **"Next"** button
3. Check the **"I accept"** checkbox
4. Keep the **Installation path** at its default setting (do not change it)
5. **Important**: **CHECK** the "Automatically install the necessary tools" checkbox
6. Click the **Install** button
7. Wait for the installation to complete (this may take 2-3 minutes)

## Step 3: Verify Installation

1. Open a **New Command Prompt/Terminal** (make sure to open a *new* one after installation)
2. Type:
```bash
node --version
```
3. If a version number appears (e.g., `v20.10.0`), it was successful! ✅

4. Next, check this as well:
```bash
npm --version
```
5. If a version number appears (e.g., `10.2.3`), it's perfect! ✅

## Step 4: Restart Computer (Optional but Recommended)

Restart your computer once to ensure everything is set up properly.

## Done! 🎉

You are now ready to run Node.js projects!

---

## Troubleshooting

### If you see "node command not found":
- Restart your computer
- Open a new terminal window
- Verify whether Node.js was installed correctly

### If nothing appears when checking the version:
- Perform the installation again
- Run the installation with Administrator rights

---

**Note**: If you are prompted for a password or administrator rights while installing Node.js, please grant permission.