"\n\n[ Teste de chamada via cURL ]\n\n\n"

echo "\n\n1. [ Teste 1 - listando todos os prontuários cadastrados ]---------\n\n"
curl -X GET https://pbl2018-prontuario.herokuapp.com/prontuario

echo "\n\n2. [ Teste 2 - cadastrando um prontuario com ID = 010101 ]--------------\n\n"
curl -X POST https://pbl2018-prontuario.herokuapp.com/prontuario -H "Content-Type: application/json"  -d '{"_id":"010101", "nome": "TESTE", "data_nasc": "31/01/1990" , "alergias": "insetos", "medicamentos":"aspirina", "medico_resp":"DR. Teste01", "leito":"3B"}'

echo "\n\n3. [ Teste 3 - listando um prontuario especifico com o ID = 010101 ]---------\n\n"
curl -X GET https://pbl2018-prontuario.herokuapp.com/prontuario/010101

echo "\n\n4. [ Teste 4 - apagando o prontuario de teste ]------------------\n\n"
curl -X DELETE https://pbl2018-prontuario.herokuapp.com/prontuario/010101

echo "\n\n5. [ Teste 5 - listando todos os prontuarios cadastrados ]---------\n\n"
curl -X GET https://pbl2018-prontuario.herokuapp.com/prontuario

