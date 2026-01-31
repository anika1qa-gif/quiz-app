
# Quiz App (Vanilla JS)

A simple, responsive Quiz web app built with **HTML, CSS, and Vanilla JavaScript**. Includes a small test suite (Jest) and a build script. A ready-to-use **Jenkins Pipeline** is provided via `Jenkinsfile`.

## ✨ Features
- Multiple-choice questions with immediate feedback
- Progress indicator & final score
- Accessible keyboard navigation
- Lightweight (no frameworks)
- Unit tests for core logic

## 📦 Project Structure
```
quiz-app/
├─ src/
│  ├─ index.html
│  ├─ styles.css
│  ├─ app.js
│  ├─ questions.js
│  └─ quizCore.js
├─ tests/
│  └─ app.test.js
├─ .gitignore
├─ .eslintrc.json
├─ Jenkinsfile
├─ build.js
├─ jest.config.js
├─ package.json
├─ LICENSE
└─ README.md
```

## 🚀 Quick Start (Local)
1. **Install Node.js** (v18+ recommended): <https://nodejs.org/>
2. In a terminal, navigate to the project folder and install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. Start a local server and open the app:
   ```bash
   npm start
   ```
5. Build (outputs to `dist/`):
   ```bash
   npm run build
   ```

---

## 1) Upload to GitHub — Step-by-step
> You can use **either** the web UI or the command line. Pick one.

### Option A — Web UI (easiest)
1. Go to <https://github.com/> and click **New** (create a new repository).
2. Name it, e.g., `quiz-app`. Choose **Public** (or Private), then click **Create repository**.
3. On your computer, **zip** this project folder (if not already zipped) and **Upload files** on the repo page.
4. Drag-and-drop the entire folder contents (or the zip) and **Commit**.

### Option B — Command Line (Git)
1. Create the repo on GitHub (as above) and copy the **repository URL** (HTTPS).
2. In a terminal, from the *parent* folder, run:
   ```bash
   cd quiz-app
   git init
   git add .
   git commit -m "feat: initial commit – quiz app"
   # Rename master to main (if your Git default is master)
   git branch -M main
   # Add your GitHub remote (replace with your repo URL)
   git remote add origin https://github.com/<YOUR-USER>/quiz-app.git
   git push -u origin main
   ```

> ✅ After pushing, refresh your GitHub repo page — you should see all files.

---

## 2) Create a Jenkins Pipeline — Step-by-step
There are two common ways to run this pipeline. Pick the one that fits your Jenkins setup.

### Option A — Using a Docker Agent (Most portable)
**Prerequisites:** Jenkins has Docker available on the agent.

1. On Jenkins, click **New Item** → **Pipeline** → name it (e.g., `quiz-app-pipeline`) → **OK**.
2. Scroll to **Pipeline** → choose **Pipeline script from SCM**.
3. **SCM:** Git → add your GitHub repository URL and credentials (if private).
4. **Branch Specifier:** `*/main` (or your branch name).
5. Ensure your repo contains the provided `Jenkinsfile`.
6. Click **Save**, then **Build Now**.

**This repository already includes a `Jenkinsfile`** that uses a Node Docker image to install, test, build, and archive artifacts.

### Option B — Using Jenkins NodeJS Tool (No Docker)
**Prerequisites:** Jenkins has the **NodeJS Plugin** installed and a tool configured (e.g., `NodeJS_20`).

1. Jenkins → **Manage Jenkins** → **Global Tool Configuration** → **NodeJS** → Add installations → Name: `NodeJS_20` → (Auto-install Node 20).
2. Create a Pipeline job as above (Steps 1–5) but use the **alternative Jenkinsfile** snippet from the README (below) and paste it into the Pipeline definition (or replace the one in the repo).
3. Save and build.

---

## Jenkinsfile (Docker agent — recommended)
This is already included in the repo as `Jenkinsfile`.
```groovy
pipeline {
  agent {
    docker {
      image 'node:20-alpine'
      args '-u root:root'  // allows npm to write cache if needed
    }
  }
  options { timestamps(); ansiColor('xterm') }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps { sh 'npm install' }
    }
    stage('Lint') {
      steps { sh 'npm run lint' }
    }
    stage('Test') {
      steps { sh 'npm test -- --ci' }
    }
    stage('Build') {
      steps { sh 'npm run build' }
    }
    stage('Archive') {
      steps { archiveArtifacts artifacts: 'dist/**', fingerprint: true, allowEmptyArchive: true }
    }
  }
  post {
    success { echo '✅ Build completed successfully.' }
    failure { echo '❌ Build failed. Check stage logs.' }
    always { echo 'ℹ️ Pipeline finished.' }
  }
}
```

## Alternative Jenkinsfile (Jenkins NodeJS tool)
Use this if you **don’t** want Docker and you configured a NodeJS tool in Jenkins named `NodeJS_20`.
```groovy
pipeline {
  agent any
  tools { nodejs 'NodeJS_20' }
  options { timestamps(); ansiColor('xterm') }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps { sh 'npm install' }
    }
    stage('Lint') {
      steps { sh 'npm run lint' }
    }
    stage('Test') {
      steps { sh 'npm test -- --ci' }
    }
    stage('Build') {
      steps { sh 'npm run build' }
    }
    stage('Archive') {
      steps { archiveArtifacts artifacts: 'dist/**', fingerprint: true, allowEmptyArchive: true }
    }
  }
}
```

> 💡 **Tips**
> - If your Jenkins agent has no internet access, pre-cache npm packages or host an internal npm registry.
> - For GitHub webhooks (auto-build on push), configure a webhook in your GitHub repo pointing to Jenkins’ `/github-webhook/` endpoint and enable **GitHub hook trigger for GITScm polling** in the job.

---

## 🧪 NPM Scripts
```json
{
  "start": "http-server ./src -p 8080 -o",
  "test": "jest",
  "lint": "eslint .",
  "build": "node build.js"
}
```

## 📝 License
MIT © You
