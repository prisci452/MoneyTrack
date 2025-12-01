const pool = require("../database/connection");
const gastosQuery = require("../querys/GastosQuery");

module.exports = {
  async insertar(gasto) {
    try {
      const [result] = await pool.execute(gastosQuery.insertar(gasto));
      return result.insertId;
    } catch (err) {
      console.error("Error al insertar gasto:", err);
      throw err;
    }
  },

  async obtenerTodos() {
    try {
      const [result] = await pool.query(gastosQuery.obtenerTodos());
      return result;
    } catch (err) {
      console.error("Error al obtener gastos:", err);
      throw err;
    }
  },

  async eliminarById(idGasto) {
    try {
      const [result] = await pool.execute(gastosQuery.eliminarById(idGasto));
      return result.affectedRows;
    } catch (err) {
      console.error("Error al eliminar gasto:", err);
      throw err;
    }
  },

  async actualizar(gasto) {
    try {
        console.log("Controller recibido:", gasto);
        const [result] = await pool.execute(gastosQuery.actualizar(gasto));
        return result.affectedRows; // número de filas modificadas
    } catch (err) {
        console.error("Error al actualizar gasto:", err);
        throw err;
    }
    }
  
};
