module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE VIEW v_article AS
      SELECT 
        article.id AS id,
        article.slug AS slug,
        article.title AS title,
        article.preface AS preface,
        article.detail AS detail,
        article.keyword AS keyword,
        article.image AS image,
        article.status AS status,
        article.insert_user AS insert_user,
        article.insert_date AS insert_date,
        article.update_user AS update_user,
        article.update_date AS update_date,
        article.release_date AS release_date,
        (SELECT TO_DAYS(CURRENT_TIMESTAMP()) - TO_DAYS(article.release_date)) AS release_age
      FROM article;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP VIEW IF EXISTS v_article;
    `);
  }
};
