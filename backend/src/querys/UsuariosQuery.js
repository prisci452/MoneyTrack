module.exports = {
insertar(usuario) {
var sql = `INSERT INTO usuarios (activo, nombre, email, contrasena, edad, presupuesto)
VALUES ('${usuario.activo}', '${usuario.nombre}', '${usuario.email}', 
'${usuario.contrasena}', '${usuario.edad}', '${usuario.presupuesto}')`;
return sql;
},
obtenerTodos() {
var sql = `SELECT * FROM usuarios
WHERE activo = 'Y' ORDER BY nombre ASC`;
return sql;
},
eliminarById(idusuario) {
var sql = `DELETE FROM usuarios WHERE id =
${idusuario}`;
return sql;
}
}