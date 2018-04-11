'use strict'

var mongoose = require('mongoose')
var Paciente = mongoose.model('Paciente')

exports.getRecebimento = function (req, res) {

  	var result = {
  		"from":"hc",
  		"to":"cross"
  	}

    console.log(req.query)

    if(Object.keys(req.query).length == 0){
      res.send("Parametros inválidos")
    }

    if(req.query.id_vitima == "" || req.query.id_vitima == undefined){
     res.send("É necessário o ID da vítima") 
    }else{
  
    	var id_vitima = req.query.id_vitima
    	var medico = {
                 "physicianID":8,
                 "firstName":"Vitoria",
                 "lastName":"Arthan",
                 "email":"vitoria.arthan@gmail.com",
                 "phones":{"phone":[{"(12) 99876-5432":"Home","(12) 99876-5435":"Work"}]},
                 "city":"São Paulo",
                 "uf":"SP",
                 "address":{"street":"American","number":"0119", "zip":"16739-627"}
      }

    	Paciente.find({patientID:id_vitima}, function(err, patient) {
      	if (err) return res.status(400).send(err)
      	if (patient){
      		result["contant"] = {"id_vitima":patient["patientID"],
      	                     "id_leito":"5abecfd3a447514b314339a6",
      	                     "medicos":medico["physicianID"],"status":"em análise"}
      		res.send(result)
      	}
      	else return res.status(400).json({ message: 'Leito não encontrado' })
    	});
  }
}