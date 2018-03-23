<h1>[ ** PRÉ-REQUISITOS ** ]</h1>

Instalar o Docker, mais informações em https://www.docker.com/community-edition

<h1>[ ** EXECUÇÃO ** ]</h1>

sh setup.sh

Esta etapa irá criar as imagens e subir dois containers, sendo:
<li><b>hospital_application_1</b>: container docker com microserviço hospital, que pode ser acessado pelo endereço http://localhost:9000//api/hospital
<li><b>hospital_mongo_1</b>: container com o mongodb, para armazenar e recuperar os dados transacionados do microserviço hospital


O Processo todo é:
<li>Criar as imagens docker da aplicação e do mongodb
<li>Fazer download do node e dependências
<li>Fazer o clone do repositório git (git clone https://github.com/pbl2018ita/pbl2018.git)
<li>Executar a aplicação


<H1>[ ** EXECUTAR OS TESTES DE CAIXA PRETA ** ]</H1>

Olhar o script './Test/Test.sh'
