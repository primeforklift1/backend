module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE VIEW catalogues_view AS
      SELECT 
        IF(catalogues.slug IS NULL OR catalogues.slug = '', catalogues.id, catalogues.slug) AS id,
        catalogues.slug AS slug,
        catalogues.name AS name,
        catalogues.id_merk AS id_merk,
        merk.nama AS merk,
        catalogues.description AS description,
        catalogues.image AS image,
        catalogues.type AS type,
        catalogues.status AS status
      FROM catalogues
      JOIN merk ON merk.id = catalogues.id_merk;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP VIEW IF EXISTS catalogues_view;
    `);
  }
};
