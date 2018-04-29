'use strict' //forca o javascript ser mais criterioso, para falhar durante a compilacao

const http = require('http');
const app = require('../src/app'); //nossa app
const server = http.createServer(app);

//socket.io - precisa melhorar este bloco. acho que nao deve ficar aqui.
const io = require('socket.io').listen(server);

require('../src/io.controllers/cross-io')(io);
require('../src/io.controllers/scheduler-io')(io);

server.listen(process.env.PORT || 3000);