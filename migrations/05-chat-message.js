module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chat_message', {
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
      chat_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'chat_main', // Nama tabel yang direferensikan
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      message: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      admin_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      datetime: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('chat_message');
  }
};
