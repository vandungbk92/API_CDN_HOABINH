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
                        configName: 'medibox01',
                        transfers:
                            [sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                execCommand: "docker build -t pkmediboxcdn ./thinklabsdev/pkmediboxcdnCI/ \
                                    && docker service rm pkmedibox_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/pkmediboxcdnCI/docker-compose.yml pkmedibox \
                                    && rm -rf ./thinklabsdev/pkmediboxcdnCIB \
                                    && mv ./thinklabsdev/pkmediboxcdnCI/ ./thinklabsdev/pkmediboxcdnCIB",
                                execTimeout: 600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/pkmediboxcdnCI',
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
