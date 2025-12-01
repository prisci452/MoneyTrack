module.exports = {
insertar(categoria) {
var sql = `INSERT INTO categorias (activo, nombre)
VALUES ('${categoria.activo}', '${categoria.nombre}')`;
return sql;
},
obtenerTodos() {
var sql = `SELECT * FROM categorias
WHERE activo = 'Y' ORDER BY nombre ASC`;
return sql;
},
eliminarById(idCategoria) {
var sql = `DELETE FROM categorias
WHERE id = ${idCategoria}`;
return sql;
}
}
