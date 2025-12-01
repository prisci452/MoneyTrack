const express = require('express');
const router = express.Router();
const pool = require('../database/connection');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, age, total_income FROM users');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT id, name, email, age, total_income FROM users WHERE id = ?', [id]);

        if (rows.length === 0)
            return res.status(404).json({ message: "Usuario no encontrado" });

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

// Registrar usuario
router.post('/', async (req, res) => {
    try {
        const { name, email, password, age, total_income } = req.body;

        // Validación básica
        if (!name || !email || !password || !age) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, age, total_income) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, age, total_income || 0]
        );

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            user_id: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, age, total_income } = req.body;

        // Revisar si el usuario existe primero
        const [existing] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (existing.length === 0)
            return res.status(404).json({ message: "Usuario no encontrado" });

        // Si viene password, hashearla
        let hashedPassword = existing[0].password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        await pool.query(
            'UPDATE users SET name=?, email=?, password=?, age=?, total_income=? WHERE id=?',
            [
                name || existing[0].name,
                email || existing[0].email,
                hashedPassword,
                age || existing[0].age,
                total_income !== undefined ? total_income : existing[0].total_income,
                id
            ]
        );

        res.json({ message: "Usuario actualizado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ message: "Usuario eliminado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
});

module.exports = router;
