#!/bin/bash
# Executar uma rede novamente, sem a necessidade de atualizacao
# $1 = nome da app (exemplo: teste)
# $2 = cartão do admin da rede (exemplo: admin@teste)
# Exemplo de uso (considerando os exemplos acima):
# ./setup-iniciar-rede.sh  teste admin@teste

clear && echo 'Executar uma rede novamente (sem atualizacao)'
cd ~/fabric-dev-servers && ./startFabric.sh && cd $1
echo '[Passo 01].......: iniciando o composer-rest-server'
composer-rest-server -c $2 -n always -w true
