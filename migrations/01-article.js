module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('article', {
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
      slug: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(255),
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
      keyword: {
        type: Sequelize.STRING(75),
        allowNull: true
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      insert_user: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      insert_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      update_user: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      update_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      release_date: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('article');
  }
};
