
echo "\n\n[ Teste de chamada via cURL ]\n\n\n"

echo "\n\n1. [ Teste 1 - listando todos os hospitais cadastrados ]---------\n\n"
curl -X GET http://localhost:9000/api/hospital

echo "\n\n2. [ Teste 2 - listando o hospital com ID = 1 ]------------------\n\n"
curl -X GET http://localhost:9000/api/hospital/1

echo "\n\n3. [ Teste 3 - cadastrando um hospital com ID = 4 ]--------------\n\n"
curl -X POST http://localhost:9000/api/hospital -H "Content-Type: application/json"  -d '{"id":"4", "nome": "hospital 4", "leitos": "10", "utilizados": "5", "vagas": "5" }'

echo "\n\n4. [ Teste 4 - listando o hospital com ID =4 ]-------------------\n\n"
curl -X GET http://localhost:9000/api/hospital/4

echo "\n\n5. [ Teste 5 - apagando o hospital com ID = 4 ]------------------\n\n"
curl -X DELETE http://localhost:9000/api/hospital/4

echo "\n\n6. [ Teste 6 - listando todos os hospitais cadastrados ]---------\n\n"
curl -X GET http://localhost:9000/api/hospital
