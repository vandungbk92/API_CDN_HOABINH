pipeline {
    agent any
    stages {
        stage('Init') {
            steps {
                echo 'Testing..'
            }
        }
        stage ('Deployments') {
            steps {
                echo 'Deploying to Production environment...'
                echo 'Copy project over SSH...'
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'pshp',
                        transfers:
                            [sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                execCommand: "docker build -t bvphusanhaiphongcdn ./thinklabsdev/bvphusanhaiphongcdnCI/ \
                                    && docker service rm bvphusanhaiphong_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/bvphusanhaiphongcdnCI/docker-compose.yml bvphusanhaiphong \
                                    && rm -rf ./thinklabsdev/bvphusanhaiphongcdnCIB \
                                    && mv ./thinklabsdev/bvphusanhaiphongcdnCI/ ./thinklabsdev/bvphusanhaiphongcdnCIB",
                                execTimeout: 3600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/bvphusanhaiphongcdnCI',
                                remoteDirectorySDF: false,
                                removePrefix: '',
                                sourceFiles: '*, src/'
                            )],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true
                    )
                ])
            }
        }
    }
}
