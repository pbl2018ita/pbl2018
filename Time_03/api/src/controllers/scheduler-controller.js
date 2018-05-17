'use strict';

var io = require('../io.controllers/scheduler-io');

//post -> enviar informacoes
exports.post = (req, res, next) => {
    try {
        io.send(JSON.stringify(req.body));

        res.status(200).send({
            result: "ok"
        });
    } catch (err) {
        console.error(err);

        res.status(500).send({
            result: "fail"
        });
    }
};

exports.get = (req, res, next) => {
    try {
        //para permitir o correto direcionamento entre diretorios
        var path = require("path");

        //res.sendFile('/src/views/bryntum/index.html', { root: '.' });
        res.sendFile(path.join(__dirname, '/../views/bryntum/index.html'));
    } catch (err) {
        console.error(err);

        res.status(500).send({
            result: "fail"
        });
    }
};

var mysql = require('mysql');

exports.resource = (req, res, next) => {

    var con = mysql.createConnection({
        host: "stagihobd.hashtagsource.com",
        user: "root",
        password: "nai6eo3yahNaip3shoh3g",
        database: "stagihobd"
    });

    /*
    con.connect(function (err) {
        if (err) throw err;

        var sql = `SELECT
        CONCAT('r', PLA_Id) Id
                    , PLA_Name Name
                    , PLA_Resource Resource
                    , PLA_FavoriteColor FavoriteColor
                    , HOS_Id
                    FROM TBL_PLANTONISTA`;

        con.query(sql, function (err, result, fields) {
            if (err) throw err;

            //res.status(200).send(JSON.stringify(result));
            res.status(200).send(result);

        });

    });
    */
    //con.end();

    var data = {
        resources: [
            { Id: "r1", Name: 'Dr. João Paulo', Resource: "Especialista", FavoriteColor: 'red' },
            { Id: "r2", Name: 'Dra. Maria', Resource: "Especialista", FavoriteColor: 'navy' },
            { Id: "r3", Name: 'Dr. Rodney', Resource: "Clinico", FavoriteColor: 'navy' },
            { Id: "r4", Name: 'Fernanda', Resource: "Enfermeiro", FavoriteColor: 'black' },
            { Id: "r5", Name: 'Lurdes', Resource: "Enfermeiro", FavoriteColor: 'green' },
            //{ Id: "r6", Name: 'Medicamento', Resource: "Medicamento", FavoriteColor: 'lime' }
        ],

        events: [{
                ResourceId: 'r1',
                PatientId: 'p1',
                PercentDone: 60,
                StartDate: new Date(2018, 0, 11, 10),
                EndDate: new Date(2018, 0, 11, 12),
                Title: "Paciente 1",
                Name: "Mr. Beans",
                blood: "O+",
                temperature: 36.6,
                heartbeat: 80,
                age: 50,
                place: "1o Andar / Ala 1 / Sala 8",
                text: "Case insolens persecuti et est, id aliquip viderer adolescens sed, fugit saepe eu per. Enim ullum quo id, modus eleifend temporibus eu vis. Te mea assum doctus verear, nec at sint tempor deterruisset. Cu qui facer reformidans, ea est."
                //IconCls : "fa fa-user-circle"
            },
            {
                ResourceId: 'r2',
                PatientId: 'p2',
                PercentDone: 20,
                StartDate: new Date(2018, 0, 11, 12),
                EndDate: new Date(2018, 0, 11, 13),
                Title: "Paciente 1",
                Name: "Jerry Lewis",
                blood: "A+",
                temperature: 36.4,
                heartbeat: 75,
                age: 88,
                place: "2o Andar / Ala 1 / Sala 3",
                text: "Tollit repudiare adolescens an mea, ut mei electram delicatissimi. Ut vel elitr iriure nusquam, delicatissimi mediocritatem cum cu."
            },
            {
                ResourceId: 'r3',
                PatientId: 'p3',
                PercentDone: 80,
                StartDate: new Date(2018, 0, 11, 14),
                EndDate: new Date(2018, 0, 11, 16),
                Title: "Paciente 1",
                Name: "Jo Soares",
                IconCls: "fa fa-users",
                blood: "B-",
                temperature: 40.1,
                heartbeat: 98,
                age: 75,
                place: "1o Andar / Ala 1 / Sala 7",
                text: "Eu per solum pertinax complectitur, volumus appellantur vel an, at utroque recusabo indoctum cum. Ius ad eirmod epicuri. Ad magna affert semper eam."
            },
            {
                ResourceId: 'r4',
                PatientId: 'p4',
                PercentDone: 70,
                StartDate: new Date(2018, 0, 11, 16),
                EndDate: new Date(2018, 0, 11, 20),
                Draggable: true,
                Title: "Paciente 2",
                Name: "Quico",
                blood: "O+",
                temperature: 36.0,
                heartbeat: 110,
                age: 12,
                place: "1o Andar / Ala 2 / Sala 1",
                text: "An mollis scaevola apeirian eum, ad eam lorem nonumy, aeque dolorum postulant vel in."

            }
        ]
    }
    res.status(200).send(JSON.stringify(data));
}



exports.reservas = (req, res, next) => {
    var con = mysql.createConnection({
        host: "stagihobd.hashtagsource.com",
        user: "root",
        password: "nai6eo3yahNaip3shoh3g",
        database: "stagihobd"
    });

    
    con.connect(function (err) {
        if (err) throw err;

        var sql = `SELECT
        RES_Id
      , RES_StartDate
      , RES_EndDate
      , PAC_Id
      , LEI_Id
      FROM TBL_RESERVA
      `;

        con.query(sql, function (err, result, fields) {
            if (err) throw err;

            //res.status(200).send(JSON.stringify(result));
            res.status(200).send(result);

        });

    });
    



    //res.status(200).send(data);


}