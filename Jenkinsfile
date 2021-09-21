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
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/phusanhaiphongcdn ./thinklabsdev/phusanhaiphongcdnCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/phusanhaiphongcdn \
                                    && docker service rm danhuong_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/phusanhaiphongcdnCI/docker-compose.yml bvphusanphaiphong \
                                    && rm -rf ./thinklabsdev/phusanhaiphongcdnCIB \
                                    && mv ./thinklabsdev/phusanhaiphongcdnCI/ ./thinklabsdev/phusanhaiphongcdnCIB",
                                execTimeout: 600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/phusanhaiphongcdnCI',
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
