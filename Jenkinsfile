pipeline {
  agent any

  // Use NodeJS tool that you configured in Manage Jenkins → Global Tool Configuration → NodeJS
  // Make sure the name here matches exactly (e.g., "NodeJS_20")
  tools { nodejs 'NodeJS_20' }

  // Avoid the implicit auto-checkout at the very beginning (it caused the double "Checkout" log lines)
  options { timestamps(); skipDefaultCheckout(true) }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Verify NodeJS') {
      steps {
        // Windows requires 'bat' (cmd) instead of 'sh'
        bat 'node -v && npm -v'
      }
    }

    stage('Install') {
      steps {
        // Use npm ci when a lockfile exists; otherwise npm install
        bat '''
IF EXIST package-lock.json (
  npm ci
) ELSE (
  npm install
)
'''
      }
    }

    stage('Lint') {
      steps {
        bat 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        bat 'npm test -- --ci'
      }
    }

    stage('Build') {
      steps {
        bat 'npm run build'
      }
    }

    stage('Archive') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true, allowEmptyArchive: true
      }
    }
  }

  post {
    success { echo 'Build completed successfully.' }
    failure { echo 'Build failed. Check stage logs.' }
    always  { echo 'Pipeline finished.' }
  }
}