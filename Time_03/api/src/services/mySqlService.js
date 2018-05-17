'use strict';

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "stagihobd.hashtagsource.com",
    user: "root",
    password: "nai6eo3yahNaip3shoh3g",
    database: "stagihobd"
});

exports.con;

//"SELECT * FROM TBL_PLANTONISTA"

//console.log(select("SELECT * FROM TBL_PLANTONISTA"));

exports.select = function (sql) {


    con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            return result;
        });
    });
}


