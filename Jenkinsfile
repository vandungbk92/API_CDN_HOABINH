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
                        configName: 'quoctethainguyen68',
                        transfers:
                            [sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                execCommand: "docker build -t bvquoctethainguyencdn ./thinklabsdev/bvquoctethainguyencdnCI/ \
                                    && docker service rm bvquoctethainguyen_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/bvquoctethainguyencdnCI/docker-compose.yml bvquoctethainguyen \
                                    && rm -rf ./thinklabsdev/bvquoctethainguyencdnCIB \
                                    && mv ./thinklabsdev/bvquoctethainguyencdnCI/ ./thinklabsdev/bvquoctethainguyencdnCIB",
                                execTimeout: 3600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/bvquoctethainguyencdnCI',
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
