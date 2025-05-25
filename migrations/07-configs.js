module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('configs', {
      config_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      lang: {
        type: Sequelize.STRING(50),
        allowNull: true
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
      order: {
        type: Sequelize.STRING(25),
        allowNull: false,
        defaultValue: 'text'
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 'text'
      },
      icon_class: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: 'text'
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
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
