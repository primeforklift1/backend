module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE VIEW v_catalogues AS
      SELECT 
        a.id AS id,
        a.slug AS slug,
        a.name AS name,
        a.id_merk AS id_merk,
        b.nama AS merk,
        a.description AS description,
        a.image AS image,
        a.type AS type,
        a.status AS status
      FROM catalogues a
      JOIN merk b ON a.id_merk = b.id;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP VIEW IF EXISTS v_catalogues;
    `);
  }
};
