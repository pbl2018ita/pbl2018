'use strict';


var vagas = `{
    "from": "hc",
    "to": "cross",
    "content": {
        "hospital": {
            "identificador": 3,
            "nome": "HC",
            "location": {
                "lat": -23.198176,
                "lng": -45.915881
            },
            "leitos": [
                {
                    "_id": "5abecfd3a447514b314339a6",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "1",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5abecffca447514b314339a7",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "1",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac23392734d1d4f8af990f7",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "terreo",
                    "ala": "A",
                    "tipo": "UTI"
                },
                {
                    "_id": "5ac7acf0734d1d2fb5426480",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "10",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac8fd82734d1d2fb542f60b",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "7",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac8ff52734d1d2fb542f6d6",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "7",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac8ff73734d1d2fb542f6ef",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "9",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac8ff8a734d1d2fb542f6f6",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "4",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac8ffa1734d1d2fb542f6fe",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "3",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac8ffc2734d1d2fb542f700",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "5",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac8ffda734d1d2fb542f703",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "4",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac90008734d1d2fb542f716",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "9",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac90021734d1d2fb542f71a",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "6",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac90040734d1d2fb542f728",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "5",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac90222734d1d2fb542f7dc",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "6",
                    "ala": "C",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac90245734d1d2fb542f7e6",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "4",
                    "ala": "C",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac90258734d1d2fb542f7e8",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "9",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac9027b734d1d2fb542f7ea",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "8",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac902ae734d1d2fb542f80c",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "4",
                    "ala": "C",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac902bb734d1d2fb542f818",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "6",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac902dc734d1d2fb542f826",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "5",
                    "ala": "C",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac902ee734d1d2fb542f82a",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "5",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac90300734d1d2fb542f830",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "9",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac90312734d1d2fb542f84a",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "6",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac90324734d1d2fb542f853",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "7",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac9033a734d1d2fb542f856",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "7",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac90347734d1d2fb542f859",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "5",
                    "ala": "C",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac90353734d1d2fb542f85f",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "3",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac9035f734d1d2fb542f860",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "4",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac9036f734d1d2fb542f864",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "5",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac903a2734d1d2fb542f872",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "7",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac903ae734d1d2fb542f874",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "6",
                    "ala": "C",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac903bf734d1d2fb542f878",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "9",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac903cb734d1d2fb542f879",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "7",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac903d7734d1d2fb542f87b",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "4",
                    "ala": "C",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac906e3734d1d2fb542f9ef",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "4",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac906f9734d1d2fb542fa05",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "5",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac90707734d1d2fb542fa11",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "4",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac9071c734d1d2fb542fa14",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "6",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac9072c734d1d2fb542fa18",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "3",
                    "ala": "C",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac9073c734d1d2fb542fa1b",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "9",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac9074a734d1d2fb542fa1d",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "10",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac90758734d1d2fb542fa21",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "10",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac9076a734d1d2fb542fa27",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "8",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac90777734d1d2fb542fa29",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "9",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac9078f734d1d2fb542fa43",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "9",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac907a3734d1d2fb542fa5c",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "8",
                    "ala": "A",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac907b3734d1d2fb542fa73",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "4",
                    "ala": "D",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac907cb734d1d2fb542fa7e",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "8",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac907d9734d1d2fb542fa84",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "6",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac907ee734d1d2fb542fa85",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "ortopedia e traumatologia",
                    "andar": "9",
                    "ala": "C",
                    "tipo": "enfermaria"
                },
                {
                    "_id": "5ac90814734d1d2fb542fa8a",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "6",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac90820734d1d2fb542fa8f",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "6",
                    "ala": "B",
                    "tipo": "uti"
                },
                {
                    "_id": "5ac90820734d1d2fb542fa90",
                    "hospital": "hc",
                    "status": "livre",
                    "setor": "emergencia",
                    "andar": "6",
                    "ala": "B",
                    "tipo": "uti"
                }
            ],
            "especialistas": [
                {
                    "_id": "123456",
                    "especialidade": "ortopedia",
                    "status": "disponivel",
                    "__v": 0
                }
            ],
            "plantonistas": [
                {
                    "_id": "5adfdcaf860f6f45cee4c6c4",
                    "codigo": 1,
                    "nome": "Jose Junior",
                    "crm": 100,
                    "hospital": "hospital 1",
                    "__v": 0
                },
                {
                    "_id": "5aef92b8124bc3b4db6932b7",
                    "codigo": 2,
                    "nome": "nome do plantonista 1",
                    "crm": 222,
                    "hospital": "hc",
                    "__v": 0
                },
                {
                    "_id": "5b1f391ada800b0fb0d9cc12",
                    "crm": 100,
                    "codigo": 5,
                    "nome": "carlos",
                    "hospital": "h3",
                    "__v": 0
                },
                {
                    "_id": "5b1f3947da800b0fb0d9cc13",
                    "crm": 100,
                    "codigo": 500,
                    "nome": "carlos",
                    "hospital": "h3",
                    "__v": 0
                },
                {
                    "_id": "5b1f39deda800b0fb0d9cc14",
                    "codigo": 5000,
                    "nome": "Jean",
                    "crm": 5000,
                    "hospital": "H1",
                    "__v": 0
                },
                {
                    "_id": "5b1f3a8466e70f32841de5f5",
                    "codigo": 15,
                    "nome": "Jean",
                    "crm": 40,
                    "hospital": "H1",
                    "__v": 0
                }
            ]
        }
    }
}`

exports.vagas = vagas;