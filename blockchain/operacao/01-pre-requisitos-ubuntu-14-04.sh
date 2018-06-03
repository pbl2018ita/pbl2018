#!/bin/bash
sudo apt update && sudo apt upgrade && sudo apt install -y python-software-properties
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install -y nodejs && sudo apt-get remove -y docker docker-engine docker.io && sudo apt-get update
sudo apt-get install -y linux-image-extra-$(uname -r) linux-image-extra-virtual && sudo apt-get update
sudo apt-get install -y apt-transport-https  ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update && sudo apt-get install -y docker-ce
sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

#! GIT
sudo add-apt-repository ppa:git-core/ppa && sudo apt-get update && sudo apt-get install -y git

#! Python
sudo apt-get update && sudo apt-get install -y python2.7 && sudo apt-get install -y python-pip

#! Hyperledger Fabrica Composer
curl -O https://hyperledger.github.io/composer/latest/prereqs-ubuntu.sh && chmod u+x prereqs-ubuntu.sh && ./prereqs-ubuntu.sh

#! fabric-dev-servers
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz
sudo ./downloadFabric.sh
sudo ./startFabric.sh

cd ~/.nvm/versions/node/v8.11.2/lib/node_modules/
npm install composer-cli && npm install composer-rest-server
npm install generator-hyperledger-composer && npm install yo && npm install composer-playground

cd ~
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v8.11.2/lib/node_modules/
