const Sequelize = require('sequelize');
const connection = require('../database/database');

const modelGenero = connection.define(
    'tbl_genero',
    {
        cod_genero: { 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        genero: {
            type: Sequelize.STRING(100),
            allowNull: true
        }
    }
);

// modelGenero.sync({ force: true }); 

module.exports = modelGenero;
