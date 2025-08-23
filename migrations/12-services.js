module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('services', {
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
      title_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      group: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      preface: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable('services');
  }
};
