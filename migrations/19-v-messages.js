module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE VIEW v_messages AS
      SELECT 
        a.id AS id,
        a.chat_id AS chat_id,
        a.message AS message,
        a.admin_id AS admin_id,
        b.name AS name,
        a.datetime AS datetime
      FROM chat_message a
      LEFT JOIN users b ON a.admin_id = b.id;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP VIEW IF EXISTS v_messages;
    `);
  }
};
