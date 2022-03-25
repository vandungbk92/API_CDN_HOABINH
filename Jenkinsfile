pipeline {
    agent any
    stages {
        stage('Init') {
            steps {
                echo 'Testing..'
                telegramSend(message: 'Building job: $PROJECT_NAME ... - Link: $BUILD_URL', chatId: -721410839)
            }
        }
        stage ('Deployments') {
            steps {
                echo 'Deploying to Production environment...'
                echo 'Copy project over SSH...'
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'swarm1',
                        transfers:
                            [sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/bvducgiangcdn ./thinklabsdev/bvducgiangcdnCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/bvducgiangcdn \
                                    && docker service rm bvducgiang_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/bvducgiangcdnCI/docker-compose.yml bvducgiang \
                                    && rm -rf ./thinklabsdev/bvducgiangcdnCIB \
                                    && mv ./thinklabsdev/bvducgiangcdnCI/ ./thinklabsdev/bvducgiangcdnCIB",
                                execTimeout: 1200000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/bvducgiangcdnCI',
                                remoteDirectorySDF: false,
                                removePrefix: '',
                                sourceFiles: '*, src/'
                            )],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: false
                    )
                ])
                telegramSend(message: 'Build - $PROJECT_NAME – # $BUILD_NUMBER – STATUS: $BUILD_STATUS!', chatId: -721410839)
            }
        }
    }
}
