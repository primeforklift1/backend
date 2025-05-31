module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('message', {
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
        country: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        email: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        telp: {
            type: Sequelize.STRING(50),
            allowNull: true,
            defaultValue: 0
        },
        address: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        message: {
          type: Sequelize.TEXT,
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
        }
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('message');
    }
  };
  