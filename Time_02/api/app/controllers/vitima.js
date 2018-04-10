'use strict'

exports.getVitimas = function (req, res) {

    res.json({
        "from":"cross / Bigchain",
        "to":"HC",
        "content":{
            "Vitimma": {
                "ID_Vitima":1000,
                "Situação Atual da Vitima":"Ferido",
                "Gravidade":{
                    "Vermelho": [
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

                    "Laranja":  [
                        {
                            "Cefaleia intensa de início súbito ou rapidamente progressiva, acompanhada de sinais ou sintomas neurológicos, alterações do campo visual, dislalia, afasia":false,
                            "Alteração aguda de comportamento – agitação, letargia ou confusão mental":false,
                            "Dor severa":false,
                            "Hemorragia moderada sem sinais de choque ou instabilidade hemodinâmica":false,
                            "Arritmia (sem sinais de instabilidade)":false
                        }
                    ],

                    "Amarelo":  [
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

                    "Verde":    [
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

                    "Azul":     [
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
        }).send();

    }
