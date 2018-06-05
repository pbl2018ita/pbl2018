#!/bin/bash
# $1 = nome da app (exemplo: teste)
# $2 = arquivo de pacote da app .bna (exemplo: teste@0.0.1.bna)
# $3 = cartão do admin da rede (exemplo: admin@teste)
#
# Exemplo de uso (considerando os exemplos acima):
# ./setup-atualizar-rede.sh teste teste@0.0.1.bna admin@teste

cd ~/fabric-dev-servers && ./stopFabric.sh && docker kill $(docker ps -q) && docker rm $(docker ps -aq) && docker rmi $(docker images dev-* -q)

echo '[Passo 01].......: Iniciando os containers'
cd ~/fabric-dev-servers && sudo ./startFabric.sh

echo '[Passo 02].......: Empacotando a aplicação'
cd $1 && composer archive create -t dir -n .

echo '[Passo 03].......: Criando um novo cartao admin'
cd .. && ./createPeerAdminCard.sh && cd $1

echo '[Passo 04].......: Instalando a rede'
composer network install --card PeerAdmin@hlfv1 --archiveFile $2

echo '[Passo 05].......: Iniciando a rede'
composer network start --networkName $1 --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

echo '[Passo 06].......: Iniciando a rede'
composer card import --file networkadmin.card

echo '[Passo 07].......: Ativando o cartao na rede'
composer network ping --card $3

echo '[Passo 08].......: Ativando o composer-rest-server'
composer-rest-server
