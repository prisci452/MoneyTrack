const { Router } = require("express");
const gastosController = require("../controller/GastosController");
const router = Router();

router.post('/gastos/add', (req, res) => {
  console.log("Body recibido:", req.body);
  gastosController.insertar(req.body)
    .then(result => res.json({ id: result }))
    .catch(err => res.status(500).send("Error al insertar gasto"));
});

router.get('/gastos/get/all', (req, res) => {
  gastosController.obtenerTodos()
    .then(result => res.json(result))
    .catch(err => res.status(500).send("Error al obtener gastos"));
});

router.get('/gastos/delete/:id', (req, res) => {
  const { id } = req.params;
  gastosController.eliminarById(id)
    .then(result => res.json({ affectedRows: result }))
    .catch(err => res.status(500).send("Error al eliminar gasto"));
});

router.put('/update', (req, res) => {
  console.log("req.body raw:", req.body);
  gastosController.actualizar(req.body)
    .then(result => res.json({ affectedRows: result }))
    .catch(err => res.status(500).send("Error al actualizar gasto"));
});
module.exports = router;
