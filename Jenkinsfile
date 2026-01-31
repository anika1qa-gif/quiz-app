
pipeline {
  agent {
    docker {
      image 'node:20-alpine'
      args '-u root:root'
    }
  }
  options { timestamps(); ansiColor('xterm') }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install') { steps { sh 'npm install' } }
    stage('Lint') { steps { sh 'npm run lint' } }
    stage('Test') { steps { sh 'npm test -- --ci' } }
    stage('Build') { steps { sh 'npm run build' } }
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
