const Sequelize = require('sequelize');
const database = require('../db');
 
const Doador = database.define('doador', {
    id_doador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome_doador: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpf:  {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:  {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    rua:  {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    estado:  {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cidade:  {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ddd:  {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    telefone:  {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nascimento:  {
        type: Sequelize.DATE,
        allowNull: false,
    },
    sexo:  {
        type: Sequelize.ENUM('M', 'F', 'N/A'),
        allowNull: false,
    },
    senha:  {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
})
 
module.exports = Doador;