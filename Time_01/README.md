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
<p>

  <b>A US105 (vaga), faz integração com a US106 (ESPECIALISTA), US107 (PLANTONISTAS), ambas descritas acima e US108 (LEITO do TS#02)</b>

  <li> uri: https://stagihobd-ts02.herokuapp.com/leitos
  <li> Comando para chamada do serviço: <code>curl -X GET https://stagihobd-ts02.herokuapp.com/leitos?hospital=hc&status=livre</code>

</p>

<p>

<li> <b>US105 - Microserviço para retornar VAGAS DISPONÍVEIS de um hospital.</b></br>
<li> uri: https://pbl2018-hospital-vaga.herokuapp.com/api/vagas
<li> JSON de retorno: <code>
  {"from":"hc","to":"cross","content":{"hospital":{"identificador":"123456","nome":"hc","leitos":[{"_id":"5abecfd3a447514b314339a6","setor":"ortopedia e traumatologia","andar":"1","ala":"A","tipo":"uti"},{"_id":"5abecffca447514b314339a7","setor":"ortopedia e traumatologia","andar":"1","ala":"A","tipo":"uti"},{"_id":"5abf8f3c70dd04200b2e4441","setor":"ortopedia e traumatologia","andar":"1","ala":"A","tipo":"uti"},{"_id":"5ac23392734d1d4f8af990f7","setor":"emergencia","andar":"terreo","ala":"A","tipo":"UTI"},{"_id":"5ac7acf0734d1d2fb5426480","setor":"ortopedia e traumatologia","andar":"10","ala":"B","tipo":"uti"},{"_id":"5ac8fd3c734d1d2fb542f5f1","setor":"emergencia","andar":"3","ala":"C","tipo":"enfermaria"},{"_id":"5ac8fd82734d1d2fb542f60b","setor":"ortopedia e traumatologia","andar":"7","ala":"A","tipo":"uti"},{"_id":"5ac8ff33734d1d2fb542f6c5","setor":"ortopedia e traumatologia","andar":"10","ala":"B","tipo":"uti"},{"_id":"5ac8ff52734d1d2fb542f6d6","setor":"ortopedia e traumatologia","andar":"7","ala":"A","tipo":"uti"},{"_id":"5ac8ff61734d1d2fb542f6df","setor":"ortopedia e traumatologia","andar":"10","ala":"A","tipo":"uti"},{"_id":"5ac8ff73734d1d2fb542f6ef","setor":"ortopedia e traumatologia","andar":"9","ala":"B","tipo":"uti"},{"_id":"5ac8ff8a734d1d2fb542f6f6","setor":"emergencia","andar":"4","ala":"A","tipo":"uti"},{"_id":"5ac8ffa1734d1d2fb542f6fe","setor":"emergencia","andar":"3","ala":"D","tipo":"enfermaria"},{"_id":"5ac8ffc2734d1d2fb542f700","setor":"emergencia","andar":"5","ala":"A","tipo":"uti"},{"_id":"5ac8ffda734d1d2fb542f703","setor":"emergencia","andar":"4","ala":"B","tipo":"uti"},{"_id":"5ac8fff5734d1d2fb542f711","setor":"emergencia","andar":"5","ala":"D","tipo":"enfermaria"},{"_id":"5ac90008734d1d2fb542f716","setor":"ortopedia e traumatologia","andar":"9","ala":"D","tipo":"enfermaria"},{"_id":"5ac90021734d1d2fb542f71a","setor":"emergencia","andar":"6","ala":"B","tipo":"uti"},{"_id":"5ac90032734d1d2fb542f726","setor":"ortopedia e traumatologia","andar":"7","ala":"D","tipo":"enfermaria"},{"_id":"5ac90040734d1d2fb542f728","setor":"emergencia","andar":"5","ala":"A","tipo":"uti"},{"_id":"5ac9004f734d1d2fb542f72a","setor":"emergencia","andar":"6","ala":"D","tipo":"enfermaria"},{"_id":"5ac90091734d1d2fb542f754","setor":"emergencia","andar":"5","ala":"D","tipo":"enfermaria"},{"_id":"5ac900a3734d1d2fb542f756","setor":"emergencia","andar":"3","ala":"C","tipo":"enfermaria"},{"_id":"5ac900ae734d1d2fb542f758","setor":"ortopedia e traumatologia","andar":"7","ala":"D","tipo":"enfermaria"},{"_id":"5ac900bb734d1d2fb542f75a","setor":"emergencia","andar":"5","ala":"D","tipo":"enfermaria"},{"_id":"5ac900cb734d1d2fb542f762","setor":"emergencia","andar":"3","ala":"C","tipo":"enfermaria"},{"_id":"5ac900db734d1d2fb542f764","setor":"emergencia","andar":"6","ala":"C","tipo":"enfermaria"},{"_id":"5ac900e8734d1d2fb542f765","setor":"emergencia","andar":"4","ala":"A","tipo":"uti"},{"_id":"5ac90138734d1d2fb542f77e","setor":"ortopedia e traumatologia","andar":"8","ala":"B","tipo":"uti"},{"_id":"5ac90165734d1d2fb542f79a","setor":"emergencia","andar":"3","ala":"B","tipo":"uti"},{"_id":"5ac90172734d1d2fb542f7a0","setor":"emergencia","andar":"4","ala":"A","tipo":"uti"},{"_id":"5ac90182734d1d2fb542f7a4","setor":"emergencia","andar":"4","ala":"B","tipo":"uti"},{"_id":"5ac90197734d1d2fb542f7ae","setor":"emergencia","andar":"3","ala":"A","tipo":"uti"},{"_id":"5ac901a4734d1d2fb542f7b5","setor":"ortopedia e traumatologia","andar":"9","ala":"C","tipo":"enfermaria"},{"_id":"5ac901b8734d1d2fb542f7bb","setor":"emergencia","andar":"4","ala":"D","tipo":"enfermaria"},{"_id":"5ac901c7734d1d2fb542f7be","setor":"ortopedia e traumatologia","andar":"9","ala":"A","tipo":"uti"},{"_id":"5ac901d7734d1d2fb542f7bf","setor":"emergencia","andar":"3","ala":"D","tipo":"enfermaria"},{"_id":"5ac901eb734d1d2fb542f7c3","setor":"ortopedia e traumatologia","andar":"7","ala":"D","tipo":"enfermaria"},{"_id":"5ac901ff734d1d2fb542f7cc","setor":"emergencia","andar":"4","ala":"D","tipo":"enfermaria"},{"_id":"5ac90211734d1d2fb542f7d7","setor":"ortopedia e traumatologia","andar":"9","ala":"C","tipo":"enfermaria"},{"_id":"5ac90222734d1d2fb542f7dc","setor":"emergencia","andar":"6","ala":"C","tipo":"enfermaria"},{"_id":"5ac90245734d1d2fb542f7e6","setor":"emergencia","andar":"4","ala":"C","tipo":"enfermaria"},{"_id":"5ac90258734d1d2fb542f7e8","setor":"ortopedia e traumatologia","andar":"9","ala":"D","tipo":"enfermaria"},{"_id":"5ac9027b734d1d2fb542f7ea","setor":"ortopedia e traumatologia","andar":"8","ala":"D","tipo":"enfermaria"},{"_id":"5ac902ae734d1d2fb542f80c","setor":"emergencia","andar":"4","ala":"C","tipo":"enfermaria"},{"_id":"5ac902bb734d1d2fb542f818","setor":"emergencia","andar":"6","ala":"A","tipo":"uti"},{"_id":"5ac902dc734d1d2fb542f826","setor":"emergencia","andar":"5","ala":"C","tipo":"enfermaria"},{"_id":"5ac902ee734d1d2fb542f82a","setor":"emergencia","andar":"5","ala":"D","tipo":"enfermaria"},{"_id":"5ac90300734d1d2fb542f830","setor":"ortopedia e traumatologia","andar":"9","ala":"D","tipo":"enfermaria"},{"_id":"5ac90312734d1d2fb542f84a","setor":"emergencia","andar":"6","ala":"B","tipo":"uti"},{"_id":"5ac90324734d1d2fb542f853","setor":"ortopedia e traumatologia","andar":"7","ala":"A","tipo":"uti"},{"_id":"5ac9033a734d1d2fb542f856","setor":"ortopedia e traumatologia","andar":"7","ala":"B","tipo":"uti"},{"_id":"5ac90347734d1d2fb542f859","setor":"emergencia","andar":"5","ala":"C","tipo":"enfermaria"},{"_id":"5ac90353734d1d2fb542f85f","setor":"emergencia","andar":"3","ala":"D","tipo":"enfermaria"},{"_id":"5ac9035f734d1d2fb542f860","setor":"emergencia","andar":"4","ala":"D","tipo":"enfermaria"},{"_id":"5ac9036f734d1d2fb542f864","setor":"emergencia","andar":"5","ala":"A","tipo":"uti"},{"_id":"5ac903a2734d1d2fb542f872","setor":"ortopedia e traumatologia","andar":"7","ala":"A","tipo":"uti"},{"_id":"5ac903ae734d1d2fb542f874","setor":"emergencia","andar":"6","ala":"C","tipo":"enfermaria"},{"_id":"5ac903bf734d1d2fb542f878","setor":"ortopedia e traumatologia","andar":"9","ala":"D","tipo":"enfermaria"},{"_id":"5ac903cb734d1d2fb542f879","setor":"ortopedia e traumatologia","andar":"7","ala":"D","tipo":"enfermaria"},{"_id":"5ac903d7734d1d2fb542f87b","setor":"emergencia","andar":"4","ala":"C","tipo":"enfermaria"},{"_id":"5ac906e3734d1d2fb542f9ef","setor":"emergencia","andar":"4","ala":"B","tipo":"uti"},{"_id":"5ac906f9734d1d2fb542fa05","setor":"emergencia","andar":"5","ala":"A","tipo":"uti"},{"_id":"5ac90707734d1d2fb542fa11","setor":"emergencia","andar":"4","ala":"D","tipo":"enfermaria"},{"_id":"5ac9071c734d1d2fb542fa14","setor":"emergencia","andar":"6","ala":"D","tipo":"enfermaria"},{"_id":"5ac9072c734d1d2fb542fa18","setor":"emergencia","andar":"3","ala":"C","tipo":"enfermaria"},{"_id":"5ac9073c734d1d2fb542fa1b","setor":"ortopedia e traumatologia","andar":"9","ala":"D","tipo":"enfermaria"},{"_id":"5ac9074a734d1d2fb542fa1d","setor":"ortopedia e traumatologia","andar":"10","ala":"D","tipo":"enfermaria"},{"_id":"5ac90758734d1d2fb542fa21","setor":"ortopedia e traumatologia","andar":"10","ala":"D","tipo":"enfermaria"},{"_id":"5ac9076a734d1d2fb542fa27","setor":"ortopedia e traumatologia","andar":"8","ala":"B","tipo":"uti"},{"_id":"5ac90777734d1d2fb542fa29","setor":"ortopedia e traumatologia","andar":"9","ala":"B","tipo":"uti"},{"_id":"5ac9078f734d1d2fb542fa43","setor":"ortopedia e traumatologia","andar":"9","ala":"A","tipo":"uti"},{"_id":"5ac907a3734d1d2fb542fa5c","setor":"ortopedia e traumatologia","andar":"8","ala":"A","tipo":"uti"},{"_id":"5ac907b3734d1d2fb542fa73","setor":"emergencia","andar":"4","ala":"D","tipo":"enfermaria"},{"_id":"5ac907cb734d1d2fb542fa7e","setor":"ortopedia e traumatologia","andar":"8","ala":"B","tipo":"uti"},{"_id":"5ac907d9734d1d2fb542fa84","setor":"emergencia","andar":"6","ala":"B","tipo":"uti"},{"_id":"5ac907ee734d1d2fb542fa85","setor":"ortopedia e traumatologia","andar":"9","ala":"C","tipo":"enfermaria"},{"_id":"5ac90814734d1d2fb542fa8a","setor":"emergencia","andar":"6","ala":"B","tipo":"uti"},{"_id":"5ac90820734d1d2fb542fa8f","setor":"emergencia","andar":"6","ala":"B","tipo":"uti"},{"_id":"5ac90820734d1d2fb542fa90","setor":"emergencia","andar":"6","ala":"B","tipo":"uti"}],"plantonista":{"_id":"123000","especialidade":"cirurgia","disponivel":true,"__v":0}}}}
</code>
<li> Comando para chamada do serviço: <code>curl -X GET https://pbl2018-hospital-vaga.herokuapp.com/api/vagas</code>
</p><br><br>


</p>
