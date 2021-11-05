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
                        configName: 'swarm1',
                        transfers:
                            [sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/pktunganhcdn ./thinklabsdev/pktunganhcdnCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/pktunganhcdn \
                                    && docker service rm pktunganh_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/pktunganhcdnCI/docker-compose.yml pktunganh \
                                    && rm -rf ./thinklabsdev/pktunganhcdnCIB \
                                    && mv ./thinklabsdev/pktunganhcdnCI/ ./thinklabsdev/pktunganhcdnCIB",
                                execTimeout: 600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/pktunganhcdnCI',
                                remoteDirectorySDF: false,
                                removePrefix: '',
                                sourceFiles: '*, src/'
                            )],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: false
                    )
                ])
            }
        }
    }
}
