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
 * Funcao generalizada para transacoes no blockchain e chamar eventos
 * @param {stagihobd.atendimento.RegistrarAutorizacao} registrarAutorizacao
 * @transaction
 */

async function registrar(tx, asset, event, msg){
    const assetRegistry = await getAssetRegistry('stagihobd.atendimento.'+asset);
    await assetRegistry.update(tx.asset);

    let event = getFactory().newEvent('stagihobd.atendimento', event);
    event.asset = tx.asset;
    event.mensagem = msg;
    emit(event);
}

/**
 * Funcao para registrar Autorizacao do Hospital
 * @param {stagihobd.atendimento.RegistrarAutorizacao} registrarAutorizacao
 * @transaction
 */
async function registrarAutorizacao(tx) {
    registrar(tx, 'RegistrarAutorizacao', 'RegistrarAutorizacaoEvent', 'Autorizacao de Atendimento Registrada com Sucesso' );
    /*
        const assetRegistry = await getAssetRegistry('stagihobd.atendimento.RegistrarAutorizacao');
        await assetRegistry.update(tx.asset);

        let event = getFactory().newEvent('stagihobd.atendimento', 'RegistrarAutorizacaoEvent');
        event.asset = tx.asset;
        event.mensagem = 'Autorizacao de Atendimento Registrada com Sucesso';
        emit(event);
    */
}

/**
 * Funcao para registrar o Atendimento Clinico do Medico
 * @param {stagihobd.atendimento.RegistrarAtendimentoClinico} registrarAtendimentoClinico
 * @transaction
 */
async function registrarAtendimentoClinico(tx) {
    registrar(tx, 'RegistrarAtendimentoClinico', 'RegistrarAtendimentoClinicoEvent', 'Atendimento Clinico Registrado com Sucesso' );
    /*
        const assetRegistry = await getAssetRegistry('stagihobd.atendimento.RegistrarAtendimentoClinico');
        await assetRegistry.update(tx.asset);

        let event = getFactory().newEvent('stagihobd.atendimento', 'RegistrarAtendimentoClinicoEvent');
        event.asset = tx.asset;
        event.mensagem = 'Atendimento Clinico Registrado com Sucesso';
        emit(event);
    */
}

/**
 * Funcao para registrar o Prontuario do Paciente
 * @param {stagihobd.atendimento.RegistrarProntuario} registrarProntuario
 * @transaction
 */
async function registrarProntuario(tx) {
    registrar(tx, 'RegistrarProntuario', 'RegistrarProntuarioEvent', 'Prontuario Registrado com Sucesso');
    /*
        const assetRegistry = await getAssetRegistry('stagihobd.atendimento.RegistrarProntuario');
        await assetRegistry.update(tx.asset);

        let event = getFactory().newEvent('stagihobd.atendimento', 'RegistrarProntuarioEvent');
        event.asset = tx.asset;
        event.mensagem = 'Prontuario Registrado com Sucesso';
        emit(event);
    */
}