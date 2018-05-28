#!/bin/bash
clear && echo "Iniciando o tutorial"

#! Se o projeto fabric-server já existir deve ser apagado
if [ ! -d "~/sprint3/blockchain/fabric-server" ]; then
    rm -rf ~/sprint3/blockchain/fabric-server
fi

#! Entrando no diretório de blockchain do projeto stagiho-bd
cd ~/sprint3/blockchain/

#! Criando e Acessando o diretório de trabalho fabric-server
mkdir fabric-server && cd fabric-server

#! Fazendo download do fabric-dev-servers, composer do Hyperledger
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz

#! Descompactando o aquivo do fabric-dev-servers
tar -vzxf fabric-dev-servers.tar.gz

#! Baixando as imagens docker para rodar a rede
./downloadFabric.sh

#! Iniciando as imagens, para possibilitar a criação da rede
./startFabric.sh

#! Iniciando a configuração para a criação da rede stagihobd
yo hyperledger-composer:businessnetwork

#! Se o projeto criado se chamar stagihobd
if [ ! -d "~/sprint3/blockchain/fabric-server/stagihobd" ]; then
    #! O diretório deve ser apagado e 
    rm -rf ~/sprint3/blockchain/fabric-server/stagihobd

    #! Copiar os dados do projeto do GIT
    cp -R ~/sprint3/blockchain/app ~/sprint3/blockchain/fabric-server/stagihobd
fi

cd stagihobd/

#! Criar e configurar a rede stagihobd
composer archive create -t dir -n .
./createPeerAdminCard.sh
composer network install --card PeerAdmin@hlfv1 --archiveFile stagihobd@0.0.1.bna
composer network start --networkName stagihobd --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card
composer network ping --card admin@stagihobd
composer-rest-server