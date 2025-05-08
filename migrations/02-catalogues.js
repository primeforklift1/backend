module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('catalogues', {
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
      slug: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      id_merk: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM('unit', 'part', 'ban', 'battery', 'attachment'),
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
    await queryInterface.dropTable('catalogues');
  }
};
