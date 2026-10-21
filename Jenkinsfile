pipeline {
    agent any
    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 60, unit: 'MINUTES')
    }
    parameters {
        booleanParam(name: 'STRICT_SCAN', defaultValue: false,
                     description: 'Fail the build if Trivy finds HIGH/CRITICAL issues that already have a fix')
        booleanParam(name: 'SKIP_APPROVAL', defaultValue: false,
                     description: 'Deploy without waiting for the manual approval click')
    }
    environment {
        REGISTRY  = 'rishavsingh09'
        APP_HOST  = '172.31.20.210'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Unit tests') {
            parallel {
                stage('Backend') {
                    steps {
                        sh '''
                            docker run --rm -v "$WORKSPACE/backend:/app" -w /app \
                              node:20-bookworm-slim node --test
                        '''
                    }
                }
                stage('Frontend') {
                    steps {
                        sh '''
                            docker run --rm -v "$WORKSPACE/frontend:/app" -w /app \
                              node:20-bookworm-slim node --test
                        '''
                    }
                }
            }
        }
        stage('Build images') {
            steps {
                sh '''
                    docker build -t $REGISTRY/plateworks-backend:$IMAGE_TAG backend
                    docker build -t $REGISTRY/plateworks-frontend:$IMAGE_TAG frontend
                '''
            }
        }
        stage('Trivy scan') {
            environment {
                TRIVY_EXIT = "${params.STRICT_SCAN ? '1' : '0'}"
            }
            steps {
                sh '''
                    for svc in backend frontend; do
                      docker run --rm \
                        -v /var/run/docker.sock:/var/run/docker.sock \
                        -v trivy-cache:/root/.cache/ \
                        aquasec/trivy:latest image \
                        --severity HIGH,CRITICAL --ignore-unfixed \
                        --exit-code $TRIVY_EXIT \
                        $REGISTRY/plateworks-$svc:$IMAGE_TAG
                    done
                '''
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub',
                                                  usernameVariable: 'DH_USER',
                                                  passwordVariable: 'DH_TOKEN')]) {
                    sh '''
                        echo "$DH_TOKEN" | docker login -u "$DH_USER" --password-stdin
                        docker push $REGISTRY/plateworks-backend:$IMAGE_TAG
                        docker push $REGISTRY/plateworks-frontend:$IMAGE_TAG
                        docker logout
                    '''
                }
            }
        }
        stage('Approve deploy') {
            when {
                expression { return !params.SKIP_APPROVAL }
            }
            steps {
                timeout(time: 30, unit: 'MINUTES') {
                    input message: "Deploy build #${env.BUILD_NUMBER} to production?", ok: 'Deploy'
                }
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'app-server-ssh',
                                                   keyFileVariable: 'SSH_KEY',
                                                   usernameVariable: 'SSH_USER')]) {
                    sh '''
                        SSH_OPTS="-i $SSH_KEY -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15"
                        scp $SSH_OPTS -r deploy/* $SSH_USER@$APP_HOST:/opt/plateworks/
                        ssh $SSH_OPTS $SSH_USER@$APP_HOST \
                          "chmod +x /opt/plateworks/*.sh && IMAGE_TAG=$IMAGE_TAG /opt/plateworks/deploy.sh"
                    '''
                }
            }
        }
        stage('Smoke test') {
            steps {
                sh 'curl -fsS --retry 5 --retry-delay 5 http://$APP_HOST/api/health'
            }
        }
    }
    post {
        success { echo "Build ${env.BUILD_NUMBER} is live." }
        failure { echo 'Build failed - open the red stage and read its log.' }
        always  { sh 'docker image prune -af --filter "until=48h" || true' }
    }
}
