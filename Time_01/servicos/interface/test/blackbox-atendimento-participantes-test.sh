
# Teste 001: Cadastrar um Hospital (http://localhost:3000/api/atendimento-hospital)
echo "Teste 001: Cadastrar um Hospital (http://localhost:3000/api/atendimento-hospital)"
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "stagihobd.atendimento.HospitalParticipant", "hospitalID": "9999", "nome": "HC", "cnpj": "60.448.040/0001-22", "endereco": "Av Dr Eneas C De Aguiar", "numero": "255", "cep": "05403-000", "bairro": "Cerqueira Cesar", "municipio": "São Paulo", "uf": "SP" }' 'http://localhost:3000/api/atendimento-hospital'

# Teste 002: Consultar o Hospital cadastrado
echo "Teste 001: Cadastrar um Hospital (http://localhost:3000/api/atendimento-hospital/9999)"
curl -X GET http://localhost:3000/api/atendimento-hospital/9999 

# Teste 003: Cadastrar um médico
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ "$class": "stagihobd.atendimento.MedicoParticipant", "crm": "999999", "nome": "Medico 999999" }' 'http://localhost:3000/api/atendimento-medico'

# Teste 004: Consultar um médico
curl -X GET http://localhost:3000/api/atendimento-medico/999999

# Teste 005: Cadastrar um médico Especialista
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ "$class": "stagihobd.atendimento.MedicoParticipant", "especialidade": "especialidade 999999e", "crm": "999999e", "nome": "Medico 999999e" }' 'http://localhost:3000/api/atendimento-especialista'

# Teste 006: Consultar um médico Especialista
curl -X GET http://localhost:3000/api/atendimento-especialista/999999e