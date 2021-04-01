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
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/bvhoabinhfile ./thinklabsdev/bvhoabinhfileCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/bvhoabinhfile \
                                    && docker service rm bvhoabinh_bvhoabinhfile || true \
                                    && docker stack deploy -c ./thinklabsdev/bvhoabinhfileCI/docker-compose.yml bvhoabinh \
                                    && rm -rf ./thinklabsdev/bvhoabinhfileCIB \
                                    && mv ./thinklabsdev/bvhoabinhfileCI/ ./thinklabsdev/bvhoabinhfileCIB",
                                execTimeout: 600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/bvhoabinhfileCI',
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
