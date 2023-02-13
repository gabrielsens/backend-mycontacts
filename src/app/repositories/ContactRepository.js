const db = require('../../database');

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    // Método com nome genérico para ser mais facil identificar
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT c.id, c.name, c.email, c.phone, c.category_id, e.name category_name
      FROM contacts c
      LEFT JOIN categories e on e.id = c.category_id
      ORDER BY c.name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT c.id, c.name, c.email, c.phone, c.category_id, e.name category_name
      FROM contacts c
      LEFT JOIN categories e on e.id = c.category_id
      WHERE c.id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT id,name,email,phone,category_id
      FROM contacts
      WHERE email = $1
    `, [email]);
    return row;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);
    return row;
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5
    RETURNING *
    `, [name, email, phone, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM contacts
      WHERE id = $1
    `, [id]);
    return deleteOp;
  }
}

module.exports = new ContactRepository();
