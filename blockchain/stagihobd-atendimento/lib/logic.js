/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Transação para Autorizar o Atendimento
 * @param {stagihobd.atendimento.AutorizarTransaction} autorizarTransaction
 * @transaction
 */
async function autorizarTransaction(tx) {
    const statusAntigo = tx.asset.status;
    tx.asset.status = tx.status;

    const assetRegistry = await getAssetRegistry('stagihobd.atendimento.AutorizacaoAsset');
    await assetRegistry.update(tx.asset);

    let event = getFactory().newEvent('stagihobd.atendimento', 'AutorizarEvent');

    console.log( 'event.asset = '+tx.asset +
                'event.pacienteID = '+tx.status +
                'event.status = '+tx.asset.status + 
                'event.hospitalID = '+tx.asset.dono.hospitalID +
                'event.statusAntigo = '+statusAntigo);

    event.asset = tx.asset;
    event.pacienteID = tx.status;
    event.status = tx.asset.status; 
    event.hospitalID = tx.asset.dono.hospitalID;
    event.statusAntigo = statusAntigo;
    emit(event);
}

/**
 * Transação para Autorizar o Realizar Atendimento Clínico
 * @param {stagihobd.atendimento.AtenderTransaction} atenderTransaction
 * @transaction
 */
async function atenderTransaction(tx) {
    const statusAntigo = tx.asset.status;
    tx.asset.status = tx.status;

    const assetRegistry = await getAssetRegistry('stagihobd.atendimento.AtendimentoAsset');
    await assetRegistry.update(tx.asset);

    let event = getFactory().newEvent('stagihobd.atendimento', 'AtenderEvent');
    console.log( 'event.asset = '+tx.asset +
                'event.autorizacaoID = '+tx.asset.autorizacaoID +
                'event.pacienteID = '+tx.asset.pacienteID + 
                'event.status = '+tx.asset.status +
                'event.atendimentoID = '+tx.asset.atendimentoID +
                'event.crm = '+tx.asset.dono.crm +
                'event.statusAntigo = '+statusAntigo);

    event.asset = tx.asset;
    event.autorizacaoID = tx.asset.autorizacaoID;
    event.pacienteID = tx.asset.pacienteID;
    event.status = tx.asset.status;
    event.atendimentoID = tx.asset.atendimentoID;
    event.crm = tx.asset.dono.crm;
    event.statusAntigo = statusAntigo;
    emit(event);
}

/**
 * Transação para Autorizar o Realizar Atendimento Clínico
 * @param {stagihobd.atendimento.RegistrarProntuarioTransaction} registrarProntuarioTransaction
 * @transaction
 */
async function registrarProntuarioTransaction(tx) {
    const statusAntigo = tx.asset.status;
    tx.asset.status = tx.status;

    const assetRegistry = await getAssetRegistry('stagihobd.atendimento.ProntuarioAsset');
    await assetRegistry.update(tx.asset);

    let event = getFactory().newEvent('stagihobd.atendimento', 'RegistrarProntuarioEvent');
    console.log( 'event.asset = '+tx.asset +
                'event.prontuarioID = '+tx.asset.prontuarioID +
                'event.atendimentoID = '+tx.asset.atendimentoID +
                'event.autorizacaoID = '+tx.asset.autorizacaoID +
                'event.pacienteID = '+tx.asset.pacienteID + 
                'event.status = '+tx.asset.status +
                'event.crm = '+tx.asset.dono.crm +
                'event.statusAntigo = '+statusAntigo);
    event.asset = tx.asset;
    event.prontuarioID = tx.asset.prontuarioID;
    event.atendimentoID = tx.asset.atendimentoID;
    event.autorizacaoID = tx.asset.autorizacaoID;
    event.pacienteID = tx.asset.pacienteID;
    event.status = tx.asset.status;
    event.crm = tx.asset.dono.crm;
    event.statusAntigo = statusAntigo;
    emit(event);

}