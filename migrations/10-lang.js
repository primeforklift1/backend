module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lang', {
      id: {
        type: Sequelize.STRING(3),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('lang');
  }
};
