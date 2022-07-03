'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('doadores', {
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
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: sequelize.fn('NOW')
			},
			updateAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: sequelize.fn('NOW')
			}
		});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('doadores');
  }
};
