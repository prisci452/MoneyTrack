module.exports = {
  insertar(gasto) {
    const sql = `
      INSERT INTO gastos (usuario_id, categoria_id, monto, fecha, observacion)
      VALUES (${gasto.usuario_id}, ${gasto.categoria_id}, ${gasto.monto}, '${gasto.fecha}', '${gasto.observacion}')
    `;
    return sql;
  },

  obtenerTodos() {
    const sql = `
      SELECT g.id, g.monto, g.descripcion, g.fecha, g.activo,
             u.nombre AS usuario, c.nombre AS categoria
      FROM gastos g
      JOIN usuarios u ON g.id_usuario = u.id
      JOIN categorias c ON g.id_categoria = c.id
      ORDER BY g.fecha DESC
    `;
    return sql;
  },

  eliminarById(idGasto) {
    const sql = `DELETE FROM gastos WHERE id = ${idGasto}`;
    return sql;
  },

  actualizar(gasto) {
  const sql = `
    UPDATE gastos
    SET usuario_id = ${gasto.usuario_id},
        categoria_id = ${gasto.categoria_id},
        monto = ${gasto.monto},
        fecha = '${gasto.fecha}',
        observacion = '${gasto.observacion}'
    WHERE id = ${gasto.id}`;
    return sql;
    }

};
