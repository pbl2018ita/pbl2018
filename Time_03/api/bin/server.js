'use strict'

const http = require('http');
const debug = require('debug')('nodestr:server');
const app = require('../src/app'); //importando modulo para aplicacao

const port = normalizePort(process.env.PORT || 3000); //Define porta da aplicacao
app.set('port', port);
const server = http.createServer(app); //Cria server


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('Api rodando na porta ' + port);


//funcao de normalizacao da porta
function normalizePort(val){
    const port = parseInt(val, 10);
    if (isNaN(port)){  return val;  }
    if (port>0){return port}
    return false;
}


//funcao para tratamento de erro
function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Pipe ' + port;

    switch(error.code){
        case 'EACCES': //erro de permissao
            console.log(bind + ' require elevated privilages');
            processs.exit(1);
            break;
        case 'EADDRINUSE': //erro de endereco em uso
            console.log(bind + ' is already in use');
            processs.exit(1);
            break;
        default:
            throw error;
    }

}

//funcao de debug
function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'Pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}