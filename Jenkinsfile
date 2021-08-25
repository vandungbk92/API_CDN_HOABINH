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
                                execCommand: "docker build -t registry.thinklabs.com.vn:5000/bvthoxuancdn ./thinklabsdev/bvthoxuancdnCI/ \
                                    && docker image push registry.thinklabs.com.vn:5000/bvthoxuancdn \
                                    && docker service rm bvthoxuan_cdn || true \
                                    && docker stack deploy -c ./thinklabsdev/bvthoxuancdnCI/docker-compose.yml bvthoxuan \
                                    && rm -rf ./thinklabsdev/bvthoxuancdnCIB \
                                    && mv ./thinklabsdev/bvthoxuancdnCI/ ./thinklabsdev/bvthoxuancdnCIB",
                                execTimeout: 600000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: './thinklabsdev/bvthoxuancdnCI',
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
