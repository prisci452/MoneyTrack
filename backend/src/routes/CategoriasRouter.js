const { Router } = require("express");
const categoriasController =
require("../controller/CategoriasController");
const router = Router();

router.post('/categorias/add', (req, res) => {
  console.log("Body recibido:", req.body);
  categoriasController.insertar(req.body)
    .then(result => res.json(result))
    .catch(err => {
      console.log("Error al insertar:", err);
      res.status(500).send('excepcion generada');
    });
});


router.get('/categorias/get/all', (req, res) => {
categoriasController.obtenerTodos().then((result) => {
return res.json(result);
}).catch((err) => {
console.log(err);
return res.status(500).send('excepcion generada11');
});
});

router.get('/categorias/delete/:id', (req, res) => {
const { id } = req.params;
categoriasController.eliminarById(id).then((result) => {
return res.json(result);
}).catch((err) => {
console.log(err);
return res.status(500).send('excepcion generada12');
});
});

module.exports = router;
