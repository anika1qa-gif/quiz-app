pipeline {
  agent any
  tools { nodejs 'NodeJS_20' }
  options { timestamps() }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install')  { steps { sh 'npm install' } }
    stage('Lint')     { steps { sh 'npm run lint' } }
    stage('Test')     { steps { sh 'npm test -- --ci' } }
    stage('Build')    { steps { sh 'npm run build' } }
    stage('Archive')  { steps { archiveArtifacts artifacts: 'dist/**', fingerprint: true, allowEmptyArchive: true } }
  }
}