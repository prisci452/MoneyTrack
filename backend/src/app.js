const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
const ip = 'localhost'
// importamos las rutas
app.use((req, res, next) => {
  console.log(`Request recibida: ${req.method} ${req.url}`);
  next();
});

const pasatiempos = require('./routes/PasatiemposRouter');
const departamentos = require('./routes/DepartamentosRouter');
const categorias = require('./routes/CategoriasRouter');
const usuarios = require('./routes/UsuariosRouter');
const gastos = require('./routes/GastosRouter');

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

// usamos las rutas
/*app.use('/api/pasatiempos', pasatiempos);
app.use('/api/departamentos', departamentos);
app.use('/api/categorias', categorias);
app.use('/api/usuarios', usuarios);
app.use('/api/gastos', gastos);*/

app.use(pasatiempos);
app.use(departamentos);
app.use(categorias);
app.use(usuarios);
app.use(gastos);

app.listen(port, ip, () => {
  console.log(`Servidor iniciado y escuchando en http://${ip}:${port}`);
});