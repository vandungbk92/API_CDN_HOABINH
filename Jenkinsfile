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
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/danhuongcdn ./thinklabsdev/danhuongcdnCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/danhuongcdn \
                                    && docker service rm danhuong_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/danhuongcdnCI/docker-compose.yml danhuong \
                                    && rm -rf ./thinklabsdev/bvhoabinhfileCIB \
                                    && mv ./thinklabsdev/danhuongcdnCI/ ./thinklabsdev/danhuongcdnCIB",
                                execTimeout: 600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/danhuongcdnCI',
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
