'use strict' //forca o javascript ser mais criterioso, para falhar durante a compilacao

const http = require('http');
const app = require('../src/app'); //nossa app
const server = http.createServer(app); 

//socket.io - precisa melhorar este bloco. acho que nao deve ficar aqui.
const io = require('socket.io').listen(server);
const kafka = require('../src/services/KafkaService');

io.sockets.on('connection', function (client) {
    client.on('toServer', function (message) {
        kafka.send(JSON.stringify(message));
    }); 

    kafka.consumer.on('message', function (message) {
        client.emit('toClient', message.value);

        var setor;

        let ocorrencia = JSON.parse(message.value);

        //banco de especialidades
        let bdEspecialidade = [
            {lesao: "fratura", areacorporal: "cabeca", gravidade: "emergencia", setor: "ortopedia e traumatologia"},
            {lesao: "escoriacao", areacorporal: "cabeca", gravidade: "nao urgente", setor: "clinica medica"},
            {lesao: "ferimento", areacorporal: "cabeca", gravidade: "pouco urgente", setor: "clinica medica"},
            {lesao: "contusao", areacorporal: "cabeca", gravidade: "pouco urgente", setor: "clinica medica"},
            {lesao: "traumatismo", areacorporal: "cabeca", gravidade: "urgente", setor: "ortopedia e traumatologia"},
        ];

        //matching de vitima com especialidade
        for (let i = 0; i < bdEspecialidade.length; i++) {
            if ((bdEspecialidade[i].lesao == ocorrencia.message.lesao) && (bdEspecialidade[i].areacorporal == ocorrencia.message.areacorporal) && (bdEspecialidade[i].gravidade == ocorrencia.message.gravidade)) {
                setor = bdEspecialidade[i].setor;
                client.emit('toClient', "Especialidade requisitada: " + setor);
            }
        }

        //banco de leitos do hospital HC
        let bdHospital = {
            id: 3,
            hospital: "HC",
            location: { lat: 37.434234, lng: -122.23424 },
            leitos: [
                {id: 1, setor: "ortopedia e traumatologia"},
                {id: 2, setor: "clinica medica"}
            ]
        };

        //matching e reserva de leito
        for (let i = 0; i < bdHospital.leitos.length; i++) {
            if (bdHospital.leitos[i].setor == setor) {
                //leito encontrado
                client.emit('toClient', "Leito encontrado no hospital: " + bdHospital.hospital);

                //reserva de leito
                var reserva = {
                    vitima: ocorrencia.message.vitima,
                    hospital: bdHospital.hospital,
                    leito: bdHospital.leitos[i].setor
                };

                //realiza a reserva do leito
                //kafka.send(JSON.stringify(reserva));
                client.emit('toClient', "Reserva realizada: " + JSON.stringify(reserva));
            }
        }
    });
});

server.listen(process.env.PORT || 3000);