'use strict';

/**
 * Sample transaction
 * @param {x.AutorizarTransaction} autorizarTransaction
 * @transaction
 */
async function autorizarTransaction(tx) {
    const oldValue = tx.asset.valor;
    tx.asset.valor = tx.novoValor;

    const assetRegistry = await getAssetRegistry('x.AutorizacaoAsset');
    await assetRegistry.update(tx.asset);

    let event = getFactory().newEvent('x', 'AutorizarEvent');
    event.asset = tx.asset;
    event.valor = oldValue;
    event.novoValor = tx.novoValor;
    emit(event);
}
