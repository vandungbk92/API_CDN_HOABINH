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
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/bvtrieusoncdn ./thinklabsdev/bvtrieusoncdnCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/bvtrieusoncdn \
                                    && docker service rm bvtrieuson_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/bvtrieusoncdnCI/docker-compose.yml bvtrieuson \
                                    && rm -rf ./thinklabsdev/bvtrieusoncdnCIB \
                                    && mv ./thinklabsdev/bvtrieusoncdnCI/ ./thinklabsdev/bvtrieusoncdnCIB",
                                execTimeout: 600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/bvtrieusoncdnCI',
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
