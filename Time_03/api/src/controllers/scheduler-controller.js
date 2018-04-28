'use strict';

var DB = require('../models/scheduler-model');
const d__dirname = 'E:/Projetos/pbl2018/Time_03/api/src/views/bryntum';

exports.get = (req, res, next) => {
    res.sendFile('/src/views/bryntum/index.html', { root: '.' });
};




