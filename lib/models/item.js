const pool = require('../utils/pool');

module.exports = class Item {
    id;
    cost;

    constructor(row) {
        this.id = row.id;
        this.cost = row.cost;
    }

    static async insert(order) {
        const { rows, }
        = await pool.query(
            'INSERT INTO items (cost) VALUES ($1) RETURNING *',
            [order.cost]
        );
        return new Item(rows[0]);
    }

    static async getAll() {
        const { rows }
         = await pool.query(
             'SELECT * FROM items'
         );
         return rows;
    }

    static async getByID(id) {
        const { rows }
         = await pool.query(
          'SELECT * FROM items WHERE id=$1',
          [id]);
    
        return new Item(rows[0]);
      }

      static async update(item) {
        const { rows }
         = await pool.query(
          `UPDATE items SET cost = $1 WHERE id = $2 RETURNING *`,
          [
            item.cost,
            item.id
          ]);
        return new Item(rows[0]);
      }

      static async delete(id) {
        const { rows }
         = await pool.query(
          `DELETE FROM items WHERE id=$1 RETURNING *`,
          [id]);
          return new Item(rows[0]);
      }
}