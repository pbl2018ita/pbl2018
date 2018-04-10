# STAGIHO-BD

#Time Scrum 01

<h3>Resumo da SPRINT #1</h3>

<h3>Macro Esquema de Integração - SPRINT #1</h3>

<img src="diagramas/macro-visao-sprint1.png">


Foram desenvolvidas 3 US's, sendo elas:

<p>
  <li> <b>US106 - Microserviço para retornar ESPECIALISTAS de um hospital.</b></br>
  <li> uri: https://stagihobd-ts01.herokuapp.com/api/especialistas/disponivel
  <li> JSON de retorno: <code>
    [{"_id":"123000",
    "especialidade":"cirurgia",
    "disponivel":true,
    "__v":0},
    {"_id":"987456",
    "especialidade":"anestesia",
    "disponivel":true,
    "__v":0}]
  </code>
  <li> Comando para chamada do serviço: <code>curl -X GET https://stagihobd-ts01.herokuapp.com/api/especialistas/disponivel</code>
</p><br><br>

<p>
  <li><b>US107 - Microserviço para retornar PLANTONISTAS  de um hospital.</b><br><br>
  <li> uri: https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista
  <li> JSON de retorno: <code>
    [{"id":1,"nome":"Jean Carlos","crm":123000,"hospital":"hospital 1"},{"id":2,"nome":"José","crm":222222,"hospital":"hospital 2"},{"id":3,"nome":"Wilson","crm":333333,"hospital":"hospital 1"},{"id":4,"nome":"Tales","crm":444444,"hospital":"hospital 2"},{"id":5,"nome":"Guilherme","crm":555555,"hospital":"hospital 1"}]
  </code>
  <li> Comando para chamada do serviço: <code>curl -X GET https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista</code>
</p><br><br>

<li><b>US105 - Microserviço para retornar se há VAGAS em um hospital. Para haver vaga em um hospital é importante ter especialista, plantonista e leito disponível.</b>
<p><br><br>

  <b>A US105 (vaga), faz integração com a US106 (ESPECIALISTA), US107 (PLANTONISTAS), ambas descritas acima e US108 (LEITO do TS#02)</b>

  <li> uri: https://stagihobd-ts02.herokuapp.com/leitos
  <li> Comando para chamada do serviço: <code>curl -X GET https://stagihobd-ts02.herokuapp.com/leitos -H "Content-Type: application/json"  -d '{"hospital": "hc", "status":"livre"}'</code>

</p>
