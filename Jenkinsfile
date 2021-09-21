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
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/bvphusanhaiphongcdn ./thinklabsdev/bvphusanhaiphongcdnCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/bvphusanhaiphongcdn \
                                    && docker service rm bvphusanhaiphong_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/bvphusanhaiphongcdnCI/docker-compose.yml bvphusanphaiphong \
                                    && rm -rf ./thinklabsdev/bvphusanhaiphongcdnCIB \
                                    && mv ./thinklabsdev/bvphusanhaiphongcdnCI/ ./thinklabsdev/bvphusanhaiphongcdnCIB",
                                execTimeout: 600000,
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
                        verbose: false
                    )
                ])
            }
        }
    }
}
