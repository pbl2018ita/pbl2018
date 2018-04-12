o "\n\n[ Teste de chamada via cURL ]\n\n\n"

echo "\n\n1. [ Teste 1 - listando todos os plantonistas cadastrados ]---------\n\n"
curl -X GET https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista	    

echo "\n\n2. [ Teste 2 - cadastrando um plantonista com ID = 123456 ]--------------\n\n"
curl -X POST https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista -H "Content-Type: application/json"  -d '{"_id":"123456", "nome": "TESTE", "crm": "123456" , "hospital": "hospital 1"}'

echo "\n\n3. [ Teste 3 - listando um plantonista especifico com o ID = 123456 ]---------\n\n"
curl -X GET https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista/123456

echo "\n\n4. [ Teste 4 - listando todos os plantonistas cadastrados ]---------\n\n"
curl -X GET https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista

echo "\n\n5. [ Teste 5 - apagando o plantonista com ID = 123456 ]------------------\n\n"
curl -X DELETE https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista/123456

echo "\n\n6. [ Teste 6 - listando todos os plantonistas cadastrados ]---------\n\n"
curl -X GET https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista

