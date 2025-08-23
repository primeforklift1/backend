module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('gallery', {
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
      file: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      caption: {
        type: Sequelize.STRING(75),
        allowNull: true
      },
      upload_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM('normal', 'catalogue', 'logo'),
        allowNull: false,
        defaultValue: 'normal'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('gallery');
  }
};
