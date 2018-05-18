'use strict';

var io = require('../io.controllers/scheduler-io');
var util = require('util');

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




exports.reservas = (req, res, next) => {
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "stagihobd.hashtagsource.com",
        user: "root",
        password: "nai6eo3yahNaip3shoh3g",
        database: "stagihobd"
    });

    con.connect(function (err) {
        if (err) throw err;

        var sql1 = `SELECT
                    CONCAT('r', PLA_Id) Id
                    , PLA_Name Name
                    , PLA_Resource Resource
                    , PLA_FavoriteColor FavoriteColor
                    , HOS_Id
                    FROM TBL_PLANTONISTA`;


        con.query(sql1, function (err, r1, fields) {
            if (err) throw err;

            var sql2 = `SELECT CONCAT('r', r.PLA_Id) ResourceId, 
                        CONCAT('p', p.PAC_Id) PatientId,
                        0 PercentDone, 
                        --DATE_FORMAT(RES_StartDate, "%Y/%m/%d %H:%i") StartDate, 
                        --DATE_FORMAT(RES_EndDate, "%Y/%m/%d %H:%i") EndDate, 
                        RES_StartDate StartDate, 
                        RES_EndDate EndDate, 
                         
                        PAC_Name Name, PAC_Title Title, PAC_Age age, PAC_Blood blood, PAC_Temperature temperature, PAC_Heartbeat heartbeat, PAC_Comentario text, '' place
                     FROM TBL_RESERVA r, TBL_PACIENTE p
                    where r.PAC_Id = p.PAC_Id`;


            con.query(sql2, function (err, r2, fields) {
                if (err) throw err;
                var data = {
                    resources: r1,
                    events: r2
                }
                res.status(200).send(JSON.stringify(data));
                //res.status(200).send(result);
            });
            //res.status(200).send(JSON.stringify(result));
            //res.status(200).send(result);
        });
    });
}

exports.reservasPost = (req, res, next) => {
    var msg = req.body;
    //console.log(msg);
    //console.log(msg.gravidade)

    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "stagihobd.hashtagsource.com",
        user: "root",
        password: "nai6eo3yahNaip3shoh3g",
        database: "stagihobd"
    });


    var sql = `SELECT * FROM stagihobd.TBL_AVALIACAO
    where upper(PM_Descricao) = upper("%s")
    and upper(LE_DESCRICAO) = upper("%s")
    and upper(AC_DESCRICAO) = upper("%s")
    ORDER BY prio desc
    limit 1`

    sql = util.format(sql, msg.gravidade, msg.lesao, msg.areacorporal);


    con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, r1, fields) {
            if (err) throw err;
            //console.log(r1);
            var h = 1;
            if (r1.peso > 20) {
                h = 5
            }else if (r1.peso > 14){
                h = 3
            } else if (r1.pese >10){
                h=2
            }
            var sql1 = `INSERT INTO  TBL_RESERVA 
            (RES_StartDate ,
             RES_EndDate ,
             PAC_Id ,
             LEI_Id ,
             PLA_Id )
            VALUES
            (NOW(),
            DATE_ADD(NOW(), INTERVAL %d HOUR),
            %d ,
            1,
            %d )`

            sql1 = util.format(sql1,
                Math.floor(Math.random() * 4) + 1,
                Math.floor(Math.random() * 3) + 1,
                h);


            con.query(sql1, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");

                //res.status(200).send(result);
                exports.reservas(req, res, next);
            });


        });
    });


}

