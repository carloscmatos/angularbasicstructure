# Multifarmas - Site AngularJS

## Build Status

- Branch Master (Prod)

{<img src="https://codeship.com/projects/3d506b20-3404-0134-a45a-7e765a8f3d68/status?branch=master" alt="Status?branch=master" />}

- Branch Develop (Staging)

{<img src="https://codeship.com/projects/3d506b20-3404-0134-a45a-7e765a8f3d68/status?branch=develop" alt="Status?branch=develop" />}

## Setup
- Instalar o Docker (https://docs.docker.com/engine/installation/) e o Git (https://git-scm.com/download/)
- Clone o repositório da aplicação em seu ambiente local:
    * ```$ git clone https://github.com/multifarmas/front-angularjs.git```  
- Construir a imagem do Docker da aplicação
    * Dentro do root da aplicação onde tem o Dockerfile, rodar:
        * ```$ docker build -t multifarmas/front-angularjs .```
        * ```$ docker run -d -p 8000:8000 -v /$(pwd):/home/app --name multifarmas_front_angularjs multifarmas/front-angularjs``` 
    * Se foi tudo corretamente, tente:
        * ```$ docker exec -it multifarmas_front_angularjs bash```
        * Esse comando deverá exibir um bash do contâiner recém criado
    * Pegue o IP do host do Docker:
        * ```$ docker-machine ip default```
    * Teste a aplicação visitando a url http://<host-do-docker>:8000