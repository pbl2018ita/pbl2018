
echo "\n\n[ Teste de chamada via cURL ]\n\n\n"

echo "\n\n1. [ Teste 1 - listando todos os especialistas cadastrados ]---------\n\n"
curl -X GET https://stagihobd-ts01.herokuapp.com/api/especialistas

echo "\n\n1. [ Teste 2 - listando todos os especialistas disponiveis ]---------\n\n"
curl -X GET https://stagihobd-ts01.herokuapp.com/api/especialistas/disponivel

echo "\n\n3. [ Teste 3 - cadastrando um especialista com ID = 123456 ]--------------\n\n"
curl -X POST https://stagihobd-ts01.herokuapp.com/api/especialistas -H "Content-Type: application/json"  -d '{"_id":"123456", "especialidade": "TESTE", "disponivel": true , "__v": 0}'

echo "\n\n1. [ Teste 4 - listando todos os especialistas cadastrados ]---------\n\n"
curl -X GET https://stagihobd-ts01.herokuapp.com/api/especialistas

echo "\n\n5. [ Teste 5 - apagando o especialista com ID = 4 ]------------------\n\n"
curl -X DELETE https://stagihobd-ts01.herokuapp.com/api/especialistas/123456

echo "\n\n6. [ Teste 6 - listando todos os especialistas cadastrados ]---------\n\n"
curl -X GET https://stagihobd-ts01.herokuapp.com/api/especialistas
