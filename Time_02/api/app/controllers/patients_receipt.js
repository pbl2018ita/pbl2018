'use strict'

var mongoose = require('mongoose')
var Leitos = mongoose.model('Leitos')
//var Recebimento = mongoose.model('recebimento')
//var Vitima = mongoose.model('vitima')

exports.getPatientsReceipt = function (req, res) {

  console.log(req.body)

  res.send('US 109b')
  
  /*var vitima = req.body.hospital
  var status = req.query.status
  var identificador = req.query.identificador

  var result = {
      "hospital": {
        "identificador": identificador,
        "nome": hospital,
      }
  }
    
  Vitima.find({hospital:hospital, status:status}, function(err, leitos) {
    if (err) return res.status(400).send(err)
    if (leitos){
      result["hospital"]["leitos"] = leitos
      res.send(result)
    }
    else return res.status(400).json({ message: 'Leito não encontrado' })
  });  */

}

/*

 {
                      "id_iitima":1000, 
                      "situacao_atual_vitima":"Ferido", 
                      "gravidade":{
                          "vermelho": [
                                        {
                                          "Politraumatizado grave":false,
                                          "Queimaduras > 25%":false,
                                          "Problemas Respiratórios":false,
                                          "Trauma Cranioencefálico grave":false,
                                          "Estado mental alterado":false,
                                          "Coma":false,
                                          "Comprometimento da coluna vertebral":false,
                                          "Desconforto respiratório grave":false,
                                          "Dor no peito associada à falta de ar":false,
                                          "Crises Convulsivas - Inclusive pós crise":false,
                                          "Intoxicações exógenas ou tentativas de suicídio":false,
                                          "Reações alérgicas associadas à insuficiência respiratória":false,
                                          "Complicações de diabetes (hipo ou hiperglicemia)":false,
                                          "Parada cardiorrespiratória":false,
                                          "Hemorragias não controláveis":false,
                                          "Alterações de sinais vitais em paciente com sintomas diversos":false
                                         }
                                      ], 
                  
                          "laranja":  [
                                        {
                                          "Cefaleia intensa de início súbito ou rapidamente progressiva, acompanhada de sinais ou sintomas neurológicos, alterações do campo visual, dislalia, afasia":false, 
                                          "Alteração aguda de comportamento – agitação, letargia ou confusão mental":false, 
                                          "Dor severa":false,
                                          "Hemorragia moderada sem sinais de choque ou instabilidade hemodinâmica":false,
                                          "Arritmia (sem sinais de instabilidade)":false
                                        }
                                      ],
                  
                          "amarelo":  [
                                        {
                                          "Politraumatizado sem alterações de sinais vitais":false, 
                                          "Trauma cranioencefálico leve":false, 
                                          "Convulsão nas últimas 24 horas":false,
                                          "Desmaios":false,
                                          "Alterações de sinais vitais em paciente sintomático":false,
                                          "Idade superior a 60 anos":false,
                                          "Hemorragia moderada (controlada) sem sinais de choque":false,
                                          "Vômito intenso":false,
                                          "Crise de pânico":false,
                                          "Dor moderada":false,
                                          "Pico hipertensivo":false
                                        }
                                      ],

                          "verde":    [
                                        {
                                          "Asma fora de crise":false, 
                                          "Enxaqueca – pacientes com diagnóstico anterior de enxaqueca":false, 
                                          "Estado febril sem alteração nos sinais vitais":false,
                                          "Refriados e viroses sem alteração nos sinais vitais":false,
                                          "Dor leve":false,
                                          "Náusea e tontura":false,
                                          "Torcicolo":false,
                                          "Hemorragia em pequena quantidade controlada (sem sinais de instabilidade hemodinâmica)":false,
                                          "Drenagem de abscesso":false
                                        }
                                      ],
                  
                          "azul":     [
                                        {
                                          "Queixas crônicas sem alterações agudas":false, 
                                          "Unha encravada":false, 
                                          "Troca de sondas":false,
                                          "Aplicação de medicação externa com receita":false
                                        }
                                      ]
                  
                                  },
                      "Previsão de Chegada": "60 minutos", 
                      "Dados do Paciente":"BigChain"
                    }
                }
*/