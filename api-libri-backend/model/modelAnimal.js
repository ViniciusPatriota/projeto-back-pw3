const Sequelize = require('sequelize');
const connection = require('../database/database');

const modelAnimal = connection.define(
    'tbl_Animal',
    {
        id_animal: { 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        especie: { 
            type: Sequelize.STRING(100), 
            allowNull: true
        },
        raca: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
        idade_m: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        descricao: {
            type: Sequelize.STRING(100),
            allowNull: true
        },
    }
);


// modelAnimal.sync({ force: true });

module.exports = modelAnimal;
