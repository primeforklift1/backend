module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chat_main', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING(12),
        allowNull: true
      },
      insert_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      locked: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chat_main');
  }
};
