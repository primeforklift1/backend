module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('menu', {
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
        parent: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        order: {
          type: Sequelize.STRING(50),
          allowNull: true
        },
        menu_type: {
            type: Sequelize.TINYINT(1),
            allowNull: true,
            defaultValue: 0
        },
        menu_name: {
          type: Sequelize.STRING(50),
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
      await queryInterface.dropTable('menu');
    }
  };
  