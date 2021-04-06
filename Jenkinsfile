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
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/aibolit4file ./thinklabsdev/aibolit4fileCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/aibolit4file \
                                    && docker service rm aibolit4_aibolit4file || true \
                                    && docker stack deploy -c ./thinklabsdev/aibolit4fileCI/docker-compose.yml aibolit4 \
                                    && rm -rf ./thinklabsdev/aibolit4fileCIB \
                                    && mv ./thinklabsdev/aibolit4fileCI/ ./thinklabsdev/aibolit4fileCIB",
                                execTimeout: 600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/aibolit4fileCI',
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
