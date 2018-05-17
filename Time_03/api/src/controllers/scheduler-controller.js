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
    //con.end();


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

}



