------------------------------------------------------------
-- POST [HospitalParticipant]
------------------------------------------------------------
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \
   "$class": "x.HospitalParticipant", \
   "hospitalID": "001", \
   "Name": "HC", \
   "Endereco": "Rua Eneas" \
 }' 'http://w.blockchain.wgetdev.tech:3000/api/x.HospitalParticipant'

------------------------------------------------------------
-- GET [HospitalParticipant]
------------------------------------------------------------
curl -X GET --header 'Accept: application/json' 'http://w.blockchain.wgetdev.tech:3000/api/x.HospitalParticipant'

------------------------------------------------------------
-- POST [AutorizacaoAsset com HospitalParticipant como dono]
------------------------------------------------------------
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \
   "$class": "x.AutorizacaoAsset", \
   "autorizacaoID": "999", \
   "owner": "resource:x.HospitalParticipant#001", \
   "valor": "RESERVADO" \
 }' 'http://w.blockchain.wgetdev.tech:3000/api/x.AutorizacaoAsset'

------------------------------------------------------------
-- GET [AutorizacaoAsset]
------------------------------------------------------------
curl -X GET --header 'Accept: application/json' 'http://w.blockchain.wgetdev.tech:3000/api/x.AutorizacaoAsset'

-- APENAS 1
curl -X GET --header 'Accept: application/json' 'http://w.blockchain.wgetdev.tech:3000/api/x.AutorizacaoAsset/999'


------------------------------------------------------------
-- POST [AutorizarTransaction com AutorizacaoAsset como dono]
------------------------------------------------------------
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \
   "$class": "x.AutorizarTransaction", \
   "asset": "resource:x.AutorizacaoAsset#999", \
   "novoValor": "LIBERADO" \
 }' 'http://w.blockchain.wgetdev.tech:3000/api/x.AutorizarTransaction'

retorno:
{
  "$class": "x.AutorizarTransaction",
  "asset": "resource:x.AutorizacaoAsset#999",
  "novoValor": "LIBERADO",
  "transactionId": "885f7024a59365415b892632d8604fab2cde4bd548881b0e1a9ae60a4216a6cd"
}

------------------------------------------------------------
-- GET [AutorizacaoAsset]
------------------------------------------------------------
curl -X GET --header 'Accept: application/json' 'http://w.blockchain.wgetdev.tech:3000/api/x.AutorizarTransaction'

-- APENAS 1
