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
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/bvbinhdinhcdn ./thinklabsdev/bvbinhdinhcdnCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/bvbinhdinhcdn \
                                    && docker service rm bvbinhdinh_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/bvbinhdinhcdnCI/docker-compose.yml bvbinhdinh \
                                    && rm -rf ./thinklabsdev/bvbinhdinhcdnCIB \
                                    && mv ./thinklabsdev/bvbinhdinhcdnCI/ ./thinklabsdev/bvbinhdinhcdnCIB",
                                execTimeout: 1200000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/bvbinhdinhcdnCI',
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
