#!/bin/bash
clear && echo "Iniciando o tutorial"

if [ ! -d "~/home/ubuntu/sprint3/blockchain/fabric-server" ]; then
    rm -rf ~/home/ubuntu/sprint3/blockchain/fabric-server
fi

cd ~/home/ubuntu/sprint3/blockchain/
mkdir fabric-server && cd fabric-server
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -vzxf fabric-dev-servers.tar.gz
cd fabric-servers/
./downloadFabric.sh
./startFabric.sh
yo hyperledger-composer:businessnetwork
cd stagihobd/
composer archive create -t dir -n .
./createPeerAdminCard.sh
composer network install --card PeerAdmin@hlfv1 --archiveFile stagihobd@0.0.1.bna
composer network start --networkName stagihobd --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card
composer network ping --card admin@stagihobd
composer-rest-server