module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('promosi', {
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
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('promosi');
  }
};
