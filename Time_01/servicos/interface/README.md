<p>
    Microserviço FACEDE, para simlificar a comunicação dos microserviços ao BlockChain
    <code>
        <li>TODO: Integrar com o microserviço do BlockChain
    </code>
</p>

<p>
    <b>Iniciar aplicação:</b><br>
    <code>npm start</code><br>
</p>

<p>
    <b>URI:</b><br>
    <code>http://localhost:3000/api/paciente</code><br>
</p>


<p>
    <b>Chamando o método POST:</b><br>
    <code>curl -X POST -H "Content-Type: application/json" -d '{"cpf":"111.111.111-12"}' http://localhost:3000/api/paciente</code><br><br>

    <b>Observação:</b> É possível fazer busca, por (o sistema considera exatamente essa ordem para busca):
    <li>CPF (formato CPF = XXX.XXX.XXX-XX)
    <li>RG (formato RG = XX.XXX.XXX-X)
    <li>Telefone (formato telefone = +XX XX XXXXX-XXXX)
    <li>Número SUS (formato sus = XXXXXXXXXXX XXXX)<br><br>
    <li>Nome

    <b>Retorno Esperado:</p><br>
    <code>
        {"result":"46070d4bf934fb0d4b06d9e2c46e346944e322444900a435d7d9a95e6d7435f5"}
    </code>
</p>