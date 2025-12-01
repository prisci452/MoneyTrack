const { Router } = require("express");
const usuariosContoller =
require("../controller/UsuariosController");
const router = Router();

router.post('/usuarios/add', (req, res) => {
const usuarios = req.body;
usuariosContoller.insertar(usuarios).then((result) => {
return res.json(result);
}).catch((err) => {
console.log(err);
return res.status(500).send('excepcion generada10');
});
});

router.get('/usuarios/get/all', (req, res) => {
usuariosContoller.obtenerTodos().then((result) => {
return res.json(result);
}).catch((err) => {
console.log(err);
return res.status(500).send('excepcion generada11');
});
});

router.get('/usuarios/delete/:id', (req, res) => {
const { id } = req.params;
usuariosContoller.eliminarById(id).then((result) => {
return res.json(result);
}).catch((err) => {
console.log(err);
return res.status(500).send('excepcion generada12');
});
});

module.exports = router;
