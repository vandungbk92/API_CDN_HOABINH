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
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/bvquoctethainguyencdn ./thinklabsdev/bvquoctethainguyencdnCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/bvquoctethainguyencdn \
                                    && docker service rm bvquoctethainguyen_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/bvquoctethainguyencdnCI/docker-compose.yml bvquoctethainguyen\
                                    && rm -rf ./thinklabsdev/bvquoctethainguyencdnCIB \
                                    && mv ./thinklabsdev/bvquoctethainguyencdnCI/ ./thinklabsdev/bvquoctethainguyencdnCIB",
                                execTimeout: 600000,
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
                        verbose: false
                    )
                ])
            }
        }
    }
}
