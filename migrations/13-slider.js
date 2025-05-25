module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('slider', {
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
        type: Sequelize.STRING(255),
        allowNull: true
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      text: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      link: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      status: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
        defaultValue: 1
      },
      insert_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      insert_by: {
        type: Sequelize.STRING(20),
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('slider');
  }
};
