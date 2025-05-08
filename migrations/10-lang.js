module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lang', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      sort_name: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      flag_image: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('lang');
  }
};
