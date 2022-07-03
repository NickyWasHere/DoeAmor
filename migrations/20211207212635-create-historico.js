'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('historico', {
			id_historico: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			nome_doador: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			produto:  {
				type: Sequelize.TEXT,
				allowNull: false,
			}, 
			_data:  {
				type: Sequelize.DATE,
				allowNull: false,
			},
			nome_instituicao:  {
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
  
    await queryInterface.dropTable('historico');
  }
};
