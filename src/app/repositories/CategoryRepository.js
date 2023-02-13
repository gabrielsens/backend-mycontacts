const db = require('../../database');

class CategoryRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT id, name
      FROM categories
    `);
    return rows;
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories (name)
      VALUES($1)
      RETURNING *
    `, [name]);
    return row;
  }
}

module.exports = new CategoryRepository();
