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
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/bvyenbinhcdn ./thinklabsdev/bvyenbinhcdnCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/bvyenbinhcdn \
                                    && docker service rm bvyenbinh_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/bvyenbinhcdnCI/docker-compose.yml bvyenbinh\
                                    && rm -rf ./thinklabsdev/bvyenbinhcdnCIB \
                                    && mv ./thinklabsdev/bvyenbinhcdnCI/ ./thinklabsdev/bvyenbinhcdnCIB",
                                execTimeout: 600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/bvyenbinhcdnCI',
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
