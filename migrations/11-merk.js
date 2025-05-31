module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('merk', {
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
      nama: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      image: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('merk');
  }
};
