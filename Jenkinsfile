pipeline {
  agent any
  options { timestamps() }

  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Verify NodeJS') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
    }

    stage('Install') { steps { sh 'npm ci || npm install' } }
    stage('Lint')    { steps { sh 'npm run lint' } }
    stage('Test')    { steps { sh 'npm test -- --ci' } }
    stage('Build')   { steps { sh 'npm run build' } }

    stage('Archive') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true, allowEmptyArchive: true
      }
    }
  }
}
