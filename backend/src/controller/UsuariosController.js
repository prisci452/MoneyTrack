const pool = require("../database/connection")
const usuariosQuery = require("../querys/UsuariosQuery")
module.exports = {
async insertar(departamento) {
const [
result
] = await pool.execute(
usuariosQuery.insertar(
departamento
)
);
return result.insertId;
},
async obtenerTodos() {
const [
result
] = await pool.query(
usuariosQuery.obtenerTodos()
);
return result;
},
async eliminarById(idDepartamento) {
const [
result
] = await pool.execute(
usuariosQuery.eliminarById(
idDepartamento
)
);
return result.affectedRows;
}
}