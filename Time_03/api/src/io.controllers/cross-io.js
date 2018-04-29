'use strict';

exports.cross_io = function (io) {
    //DEFINE TOPIC
    const topic = "cross";

    const kafka = require('../services/KafkaService')(topic);

    io.sockets.on('connection', function (client) {
        client.on('toServer', function (message) {
            kafka.send(JSON.stringify(message));
        });

        kafka.consumer.on('message', function (message) {
            client.emit('toClient', "<hr>");
            client.emit('toClient', message.value);

            //teste de consumo do Mongo
            var ms = require('../services/MongoService');
            client.emit('toClient', ms.getConsult());

            var setor;

            let ocorrencia = JSON.parse(message.value);

            //banco de especialidades
            let bdEspecialidade = [
                { lesao: "fratura", areacorporal: "cabeca", gravidade: "emergencia", setor: "ortopedia e traumatologia" },
                { lesao: "escoriacao", areacorporal: "cabeca", gravidade: "nao urgente", setor: "clinica medica" },
                { lesao: "ferimento", areacorporal: "cabeca", gravidade: "pouco urgente", setor: "clinica medica" },
                { lesao: "contusao", areacorporal: "cabeca", gravidade: "pouco urgente", setor: "clinica medica" },
                { lesao: "traumatismo", areacorporal: "cabeca", gravidade: "urgente", setor: "ortopedia e traumatologia" },
            ];

            //matching de vitima com especialidade
            for (let i = 0; i < bdEspecialidade.length; i++) {
                if ((bdEspecialidade[i].lesao == ocorrencia.message.lesao) && (bdEspecialidade[i].areacorporal == ocorrencia.message.areacorporal) && (bdEspecialidade[i].gravidade == ocorrencia.message.gravidade)) {
                    setor = bdEspecialidade[i].setor;
                    client.emit('toClient', "<b>Especialidade requisitada:</b> " + setor);
                }
            }

            //banco de leitos do hospital HC
            let bdHospital = {
                id: 3,
                hospital: "HC",
                location: { lat: -23.198176, lng: -45.915881 },
                leitos: [
                    { id: 1, setor: "ortopedia e traumatologia" },
                    { id: 2, setor: "clinica medica" }
                ]
            };

            //consumo do API da Google - Matching de localizacao
            var gMaps = require('../services/GoogleMapsService');
            var dest = gMaps.getDateFromGoogleMaps([ocorrencia.message.location.lat + ' , ' + ocorrencia.message.location.lng],
                [bdHospital.location.lat + ' , ' + bdHospital.location.lng]);


            dest.asPromise()
                .then((response) => {

                    var g = response.json;
                    client.emit('toClient', "<b>Origem do Acidente:</b> " + g.origin_addresses[0]);
                    client.emit('toClient', "<b>Coordenadas do Hospital:</b> " + g.destination_addresses[0]);
                    client.emit('toClient', "<b>Tempo de Chegada:</b> " + g.rows[0].elements[0].duration.text);
                    client.emit('toClient', "<b>Distancia:</b> " + g.rows[0].elements[0].distance.text);
                })
                .catch((err) => {
                    console.log(err);
                });


            //matching e reserva de leito
            for (let i = 0; i < bdHospital.leitos.length; i++) {
                if (bdHospital.leitos[i].setor == setor) {
                    //leito encontrado
                    client.emit('toClient', "<b>Leito encontrado no hospital:</b> " + bdHospital.hospital);

                    //reserva de leito
                    var reserva = {
                        vitima: ocorrencia.message.vitima,
                        hospital: bdHospital.hospital,
                        leito: bdHospital.leitos[i].setor
                    };

                    //realiza a reserva do leito
                    //kafka.send(JSON.stringify(reserva));
                    client.emit('toClient', "<b>Reserva realizada:</b> " + JSON.stringify(reserva));
                }
            }
        });
    });
}