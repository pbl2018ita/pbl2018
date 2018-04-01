'use strict';


//post -> enviar informacoes
exports.post = (req, res, next) => {
    res.status(201).send(req.body);
};


//put -> atualizar informacoes
exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};

//delete
exports.delete = (req, res, next) => {
    res.status(201).send(req.body);
};
