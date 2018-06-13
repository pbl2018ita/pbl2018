# Teste 001: Cadastrar uma Autorizacao
echo "Teste 001: Cadastrar uma Autorizacao"
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"autorizacaoID": "000000", "hospitalID": "9999", "pacienteID":"PACIENTE 9999","status": "AUTORIZADO"}' 'http://localhost:3000/api/atendimento-hospital-autorizacao'

# Teste 002: Consultar uma Autorizacao
echo "Teste 002: Consultar uma Autorizacao"
curl -X GET http://localhost:3000/api/atendimento-hospital-autorizacao/000000

# Teste 003: Mudar o status da Autorizacao para CONFIRMADO
echo "Teste 003: Mudar o status da Autorizacao para CONFIRMADO"
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"autorizacaoID": "000000", "hospitalID": "9999", "pacienteID":"PACIENTE 9999","status": "CONFIRMADO"}' 'http://localhost:3000/api/atendimento-hospital-autorizacao'

# Teste 004: Mudar o status da Autorizacao para FINALIZADO
echo "Teste 004: Mudar o status da Autorizacao para FINALIZADO"
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"autorizacaoID": "000000", "hospitalID": "9999", "pacienteID":"PACIENTE 9999","status": "FINALIZADO"}' 'http://localhost:3000/api/atendimento-hospital-autorizacao'

