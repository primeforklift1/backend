module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('info', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      lang: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      preface: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      update_user: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('info');
  }
};
