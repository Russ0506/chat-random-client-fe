pipeline {
    agent any
    environment {
        dockerTag=getDockerTag();
        registry ="russ0506/random-chat:${dockerTag}";
        }

    stages {
        stage ('check jenkins') {
            steps {
                echo 'hello world 2ssssasssssadadaadadaddadadssaasssasaadadadadasssssssss'
            }
        }

        stage ('build image') {
            steps {
                sh "sudo docker build . -t ${registry}"
            }
        }

        stage ('deploy') {
           steps {
                sh 'sudo docker rm --force fe_app'
                sh 'sudo docker run -it -p 8082:80 -d --name fe_app ${registry}'
            }
        }
    }
}


def getDockerTag(){
    def tag  = sh script: 'git rev-parse HEAD', returnStdout: true
    return tag
}
