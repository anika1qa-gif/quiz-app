pipeline {
  agent any
  tools { nodejs 'NodeJS_20' }   // MUST match the name in Manage Jenkins → Global Tool Configuration
  options { timestamps(); skipDefaultCheckout(true) } // avoid implicit duplicate checkout

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Verify NodeJS') {
      steps {
        bat 'node -v && npm -v'
      }
    }

    stage('Install') {
      steps {
        // Prefer reproducible installs; fallback if no lockfile
        bat '''
IF EXIST package-lock.json (
  npm ci
) ELSE (
  npm install
)
'''
      }
    }

    stage('Lint')  { steps { bat 'npm run lint' } }
    stage('Test')  { steps { bat 'npm test -- --ci' } }
    stage('Build') { steps { bat 'npm run build' } }

    stage('Archive') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true, allowEmptyArchive: true
      }
    }
  }

  post {
    success { echo '✅ Build completed successfully.' }
    failure { echo '❌ Build failed. Check stage logs.' }
    always  { echo 'ℹ️ Pipeline finished.' }
  }
}
``