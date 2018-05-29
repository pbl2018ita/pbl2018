<p>
    Este tutorial vai explicar todos os passos para executar o Hyperledger Fabric com o Yeoman e criar uma rede<br><br>
    É assumido que você já tenho os os pré-requisitos instalados.<br>
    Caso não tenha, por favor, veja os manuais na pasta <a href="docs">docs</a></b>
</p>

<p>
    <b><h3>Instalação</h3></b><br><br>
    Localize o arquivo <code>setup.sh</code> e execute o comando: <br>
    <code>./setup.sh</code><br><br>
    o script acima irá:<br><br>
    <li>Fazer download do aquivo https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
    <li>Extrair o aquivo do passo anterior no subdiretório fabric-servers
    <li>Fazer download das images Docker para execução do Hyperledger Fabric
    <li>Iniciar a execução das images Docker
    <li>Utilizando o 'yo' será uma rede, neste momento algumas perguntas serão feitas pelo sistema, como segue abaixo:<br><br>
    As informações em <b>negrito</b> são as respostas das perguntas
</p>
<p>
    [? Business network name: <b>stagihobd</b><br>
    [? Description: <b>Projeto STAGIHO-BD BLOCKCHAIN HC</b><br>
    [? Author name:  <b>pbl2018</b><br>
    [? Author email: <b>pbl2018@gmail.com</b><br>
    [? License: <b>Apache-2.0</b><br>
    [? Namespace: <b>stagihobd.hc</b><br>
    [? Do you want to generate an empty template network? <b>No: generate a populated sample network</b>
</p>
<p>
    [? Enter the name of the business network card to use: <b>admin@stagihobd</b><br>
    [? Specify if you want namespaces in the generated REST API: <b>always use namespaces</b><br>
    [? Specify if you want to use an API key to secure the REST API: <b>No</b><br>
    [? Specify if you want to enable authentication for the REST API using Passport: <b>No</b><br>
    [? Specify if you want to enable event publication over WebSockets: <b>Yes</b><br>
    [? Specify if you want to enable TLS security for the REST API: <b>No</b>
</p>
<p>
    Quando aparecer as mensagens abaixo o sistema está configurado e em execução:<br><br>
    Discovering types from business network definition ...<br>
    Discovered types from business network definition<br>
    Generating schemas for all types in business network definition ...<br>
    Generated schemas for all types in business network definition<br>
    Adding schemas for all types to Loopback ...<br>
    Added schemas for all types to Loopback<br>
    Web server listening at: http://localhost:3000<br>
    Browse your REST API at http://localhost:3000/explorer
</p>
<p>
    <b>Dica</b>: Se estiver rodando em um servidor de cloud, substitua o localhost pelo endereço do seu servidor.<br><br>
    Em nosso projeto foi utilizado a AWS, por isso a URL foi: http://ec2-52-89-105-48.us-west-2.compute.amazonaws.com:3000/explorer/
</p>
<p>
    <b><h3>Parando os serviços</h3></b><br>
    Entre na pasta blockchain/fabric-server e execute seguinte comando para parar o seriços e remover os container docker: <br>
    <code>./stopFabric.sh </code>
</p>
