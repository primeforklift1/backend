module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('category', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      group_s: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lang: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      name: {
        type: Sequelize.STRING(20),
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
    await queryInterface.dropTable('category');
  }
};
