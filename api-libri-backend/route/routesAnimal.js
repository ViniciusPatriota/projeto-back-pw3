const express = require('express');
const modelAnimal = require('../model/modelAnimal');
const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({ status: 'TESTE DE CONEXÃO COM A API!' });
});

/* ROTA DE INSERÇÃO DE ANIMAL */
router.post('/inserirAnimal', (req, res) => {
    let { especie, raca, idade_m, descricao } = req.body;  // Adicionado `especie` como campo comum

    modelAnimal.create({ especie, raca, idade_m, descricao })  // Incluído `especie`
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            mensageStatus: 'ANIMAL INSERIDO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO INSERIR O ANIMAL',
            errorObject: error
        });
    });
});

/* ROTA DE LISTAGEM GERAL DE ANIMAIS */
router.get('/listagemAnimais', (req, res) => {
    modelAnimal.findAll()
    .then((response) => {
        return res.status(200).json({  // Alterado para 200 (OK)
            errorStatus: false,
            mensageStatus: 'ANIMAIS LISTADOS COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO LISTAR OS ANIMAIS',
            errorObject: error
        });
    });
});

/* ROTA DE LISTAGEM DE ANIMAL POR ID */
router.get('/listagemAnimal/:id_animal', (req, res) => {  // Corrigido para id_animal
    let { id_animal } = req.params;

    modelAnimal.findByPk(id_animal)  // Usando `id_animal` como chave primária
    .then((response) => {
        if (!response) {
            return res.status(404).json({
                errorStatus: true,
                mensageStatus: 'ANIMAL NÃO ENCONTRADO'
            });
        }
        return res.status(200).json({  // Alterado para 200 (OK)
            errorStatus: false,
            mensageStatus: 'ANIMAL RECUPERADO COM SUCESSO',
            data: response
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO RECUPERAR O ANIMAL',
            errorObject: error
        });
    });
});

/* ROTA DE EXCLUSÃO DE ANIMAL */
router.delete('/excluirAnimal/:id_animal', (req, res) => {  // Corrigido para id_animal
    let { id_animal } = req.params;

    modelAnimal.destroy({ where: { id_animal } })
    .then((rowDeleted) => {
        if (rowDeleted === 0) {
            return res.status(404).json({
                errorStatus: true,
                mensageStatus: 'ANIMAL NÃO ENCONTRADO'
            });
        }
        return res.status(200).json({  // Alterado para 200 (OK)
            errorStatus: false,
            mensageStatus: 'ANIMAL EXCLUÍDO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO EXCLUIR O ANIMAL',
            errorObject: error
        });
    });
});

/* ROTA DE ALTERAÇÃO DE ANIMAL */
router.put('/alterarAnimal', (req, res) => {
    let { id_animal, especie, raca, idade_m } = req.body;  // Usando `id_animal` como chave primária

    modelAnimal.update({ especie, raca, idade_m }, { where: { id_animal } })  // Usando `id_animal`
    .then((rowsUpdated) => {
        if (rowsUpdated[0] === 0) {
            return res.status(404).json({
                errorStatus: true,
                mensageStatus: 'ANIMAL NÃO ENCONTRADO'
            });
        }
        return res.status(200).json({  // Alterado para 200 (OK)
            errorStatus: false,
            mensageStatus: 'ANIMAL ALTERADO COM SUCESSO'
        });
    })
    .catch((error) => {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO ALTERAR O ANIMAL',
            errorObject: error
        });
    });
});

module.exports = router;
