#!/bin/bash
# Parar a rede e remover os containers e imagens dockers
# Exemplo de uso (considerando os exemplos acima):
# ./setup-parar-rede.sh

cd ~/fabric-dev-servers
./stopFabric.sh
docker kill $(docker ps -q) && docker rm $(docker ps -aq) && docker rmi $(docker images dev-* -q)
