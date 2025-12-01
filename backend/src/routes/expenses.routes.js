const express = require('express');
const router = express.Router();
const pool = require('../database/connection');

// Helper: comprobar existencia de user y category
async function existsUser(user_id) {
  const [rows] = await pool.query('SELECT id FROM users WHERE id = ?', [user_id]);
  return rows.length > 0;
}
async function existsCategory(category_id) {
  const [rows] = await pool.query('SELECT id FROM categories WHERE id = ?', [category_id]);
  return rows.length > 0;
}

// Obtener todos los gastos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM expenses ORDER BY date DESC, id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error GET /api/expenses:', error);
    res.status(500).json({ error: 'Error al obtener los gastos' });
  }
});

// Obtener un gasto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM expenses WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error GET /api/expenses/:id', error);
    res.status(500).json({ error: 'Error al obtener el gasto' });
  }
});

// Crear gasto
router.post('/', async (req, res) => {
  try {
    const { user_id, category_id, amount, date, note } = req.body;

    // Validaciones básicas
    if (!user_id || !category_id || !amount || !date) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: user_id, category_id, amount, date' });
    }

    // Verificar que user y category existan (evita error FK)
    if (!(await existsUser(user_id))) {
      return res.status(400).json({ error: `El user_id ${user_id} no existe` });
    }
    if (!(await existsCategory(category_id))) {
      return res.status(400).json({ error: `El category_id ${category_id} no existe` });
    }

    const [result] = await pool.query(
      'INSERT INTO expenses (user_id, category_id, amount, date, note) VALUES (?, ?, ?, ?, ?)',
      [user_id, category_id, amount, date, note || null]
    );

    res.status(201).json({ message: 'Gasto registrado exitosamente', expense_id: result.insertId });
  } catch (error) {
    console.error('Error POST /api/expenses:', error);
    // Mostrar mensaje útil al cliente
    res.status(500).json({ error: 'Error al registrar el gasto' });
  }
});

// Actualizar gasto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, category_id, amount, date, note } = req.body;

    // Validación básica: al menos un campo a actualizar
    if (!user_id && !category_id && !amount && !date && note === undefined) {
      return res.status(400).json({ error: 'Debes enviar al menos un campo para actualizar' });
    }

    // Si vienen user_id o category_id, verificar existencia
    if (user_id && !(await existsUser(user_id))) {
      return res.status(400).json({ error: `El user_id ${user_id} no existe` });
    }
    if (category_id && !(await existsCategory(category_id))) {
      return res.status(400).json({ error: `El category_id ${category_id} no existe` });
    }

    // Construir SET dinámico para no sobrescribir con undefined
    const updates = [];
    const values = [];

    if (user_id !== undefined) { updates.push('user_id = ?'); values.push(user_id); }
    if (category_id !== undefined) { updates.push('category_id = ?'); values.push(category_id); }
    if (amount !== undefined) { updates.push('amount = ?'); values.push(amount); }
    if (date !== undefined) { updates.push('date = ?'); values.push(date); }
    if (note !== undefined) { updates.push('note = ?'); values.push(note); }

    values.push(id); // para WHERE

    const sql = `UPDATE expenses SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(sql, values);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Gasto no encontrado' });

    res.json({ message: 'Gasto actualizado exitosamente' });
  } catch (error) {
    console.error('Error PUT /api/expenses/:id', error);
    res.status(500).json({ error: 'Error al actualizar gasto' });
  }
});

// Eliminar gasto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM expenses WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.json({ message: 'Gasto eliminado exitosamente' });
  } catch (error) {
    console.error('Error DELETE /api/expenses/:id', error);
    res.status(500).json({ error: 'Error al eliminar gasto' });
  }
});

module.exports = router;
