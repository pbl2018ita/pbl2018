o "\n\n[ Teste de chamada via cURL ]\n\n\n"

echo "\n\n1. [ Teste 1 - listando todos os plantonistas cadastrados ]---------\n\n"
curl -X GET https://pbl2018-hospital-plantonista.herokuapp.com/plantonista-reserva

echo "\n\n2. [ Teste 2 - alterando um plantonista com ID = 200 para reservado]--------------\n\n"
curl -X PUT https://pbl2018-hospital-plantonista.herokuapp.com/plantonista-reserva/confirmar/200 -H "Content-Type: application/json"  -d '{"status": "reservado"}'

echo "\n\n1. [ Teste 3 - listando todos os plantonistas cadastrados ]---------\n\n"
curl -X GET https://pbl2018-hospital-plantonista.herokuapp.com/plantonista-reserva

echo "\n\n2. [ Teste 4 - alterando um plantonista com ID = 200 para finalizado]--------------\n\n"
curl -X PUT https://pbl2018-hospital-plantonista.herokuapp.com/plantonista-reserva/confirmar/200 -H "Content-Type: application/json"  -d '{"status": "finalizado"}'

echo "\n\n1. [ Teste 5 - listando todos os plantonistas cadastrados ]---------\n\n"
curl -X GET https://pbl2018-hospital-plantonista.herokuapp.com/plantonista-reserva
