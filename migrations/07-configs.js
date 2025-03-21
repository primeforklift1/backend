module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('configs', {
      config_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      config_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      config_value: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      config_type: {
        type: Sequelize.STRING(25),
        allowNull: false,
        defaultValue: 'text'
      },
      insert_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('configs');
  }
};
