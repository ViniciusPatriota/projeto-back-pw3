const Sequelize = require('sequelize');


const connection = new Sequelize(
    'Adopt', 
    'root',        
    '',    
    {
        host: 'localhost',
        port: '3306',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;


module.exports = connection;