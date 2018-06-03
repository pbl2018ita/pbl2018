#!/bin/bash
# $1 = nome da app (exemplo: teste)
# $2 = arquivo de pacote da app .bna (exemplo: teste@0.0.1.bna)
# $3 = cartão do admin da rede (exemplo: admin@teste)
#
# Exemplo de uso (considerando os exemplos acima):
# ./setup-criar-rede.sh teste teste@0.0.1.bna admin@teste

clear  && echo '[Passo 01].......: Iniciando os containers'
cd ~/fabric-dev-servers && sudo ./startFabric.sh && yo hyperledger-composer:businessnetwork
cd ~ && ./setup-atualizar-rede.sh $1 $2 $3
