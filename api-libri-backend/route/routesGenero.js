const express = require('express');
const modelGenero = require('../model/modelGenero');  // Ajuste no nome do modelo para refletir "gênero".
const router = express.Router();

// Rota para criação de um novo registro de gênero
router.post('/inserirGenero', (req, res) => {
    let { genero } = req.body;

    modelGenero.create({ genero })
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'GÊNERO INSERIDO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO INSERIR O GÊNERO',
            errorObject: error
        });
    });
});

// Rota para listagem de todos os registros de gênero
router.get('/listagemGeneros', (req, res) => {
    modelGenero.findAll()
    .then((response) => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'GÊNEROS LISTADOS COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO LISTAR OS GÊNEROS',
            errorObject: error
        });
    });
});

// Rota para listar um registro específico de gênero
router.get('/listagemGeneros/:cod_genero', (req, res) => {
    let { cod_genero } = req.params;

    modelGenero.findByPk(cod_genero)
    .then((response) => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'GÊNERO RECUPERADO COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO RECUPERAR O GÊNERO',
            errorObject: error
        });
    });
});

// Rota para exclusão de um registro de gênero
router.delete('/excluirGenero/:cod_genero', (req, res) => {
    let { cod_genero } = req.params;

    modelGenero.destroy({ where: { cod_genero } })
    .then(() => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'GÊNERO EXCLUÍDO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO EXCLUIR O GÊNERO',
            errorObject: error
        });
    });
});

// Rota para alteração de um registro de gênero
router.put('/alterarGenero', (req, res) => {
    let { cod_genero, genero } = req.body;

    modelGenero.update(
        { genero },
        { where: { cod_genero } }
    )
    .then(() => {
        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'GÊNERO ALTERADO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO ALTERAR O GÊNERO',
            errorObject: error
        });
    });
});

module.exports = router;
